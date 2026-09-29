import { NextResponse } from "next/server";
import { z } from "zod";
import {
  CodOrderLimitError,
  createCodOrderWithinLimit,
  createOrder,
} from "@/lib/orders";
import { getPricingBreakdown } from "@/lib/pricing";
import { getPaymentInfo } from "@/lib/sepay";
import { PaymentStatus, PaymentMethod } from "@prisma/client";
import {
  customText,
  hexColor,
  plainText,
  vietnamesePhoneNumber,
} from "@/lib/input-security";
import { buildOrderMessage, sendTelegramToAdmin } from "@/lib/telegram";
import { waitUntil } from "@vercel/functions";

const schema = z.object({
  customer: z.object({
    name: plainText(100).min(1),
    phone: vietnamesePhoneNumber,
    city: plainText(100).min(1),
    district: plainText(100).min(1),
    address: plainText(250).min(1),
    notes: plainText(100).optional(),
  }),
  product: z.object({
    customText: customText.refine(
      (value) => value.length > 0,
      "Vui lòng nhập tên custom.",
    ),
    colorMode: z.enum(["single", "dual"]),
    colors: z.array(hexColor).min(1).max(2),
  }),
  payment: z.object({
    method: z.enum(["cod", "qr"]),
  }),
  clientTotal: z.number().int().nonnegative().max(1_000_000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.format() },
        { status: 400 },
      );
    }

    const data = result.data;
    const serverPricing = getPricingBreakdown(data.product.customText);

    if (serverPricing.total !== data.clientTotal) {
      return NextResponse.json(
        { error: "PRICE_MISMATCH", detail: "Giá không khớp" },
        { status: 400 },
      );
    }

    const paymentMethod =
      data.payment.method === "cod"
        ? PaymentMethod.COD
        : PaymentMethod.QR_SEPAY;
    const paymentStatus = PaymentStatus.PENDING;
    const customerAddress = `${data.customer.city} / ${data.customer.district} / ${data.customer.address} ${data.customer.notes ? `(${data.customer.notes.slice(0, 99)})` : ""}`;

    const orderData = {
      customerName: data.customer.name,
      customerPhone: data.customer.phone,
      customerAddress,
      productOptions: data.product,
      totalPrice: serverPricing.total,
      paymentMethod,
      paymentStatus,
    };

    let order;
    try {
      order =
        paymentMethod === PaymentMethod.COD
          ? await createCodOrderWithinLimit(orderData)
          : await createOrder(orderData);
    } catch (error) {
      if (error instanceof CodOrderLimitError) {
        return NextResponse.json(
          {
            error: "COD_ORDER_LIMIT_REACHED",
            detail:
              "Bạn đã đặt quá giới hạn đơn COD. Vui lòng liên hệ admin để được hỗ trợ.",
          },
          { status: 429 },
        );
      }

      throw error;
    }

    if (paymentMethod === PaymentMethod.QR_SEPAY) {
      const paymentInfo = await getPaymentInfo(
        order.orderCode,
        order.totalPrice,
      );
      return NextResponse.json(
        {
          orderId: order.id,
          orderCode: order.orderCode,
          serverTotal: order.totalPrice,
          paymentInfo,
        },
        { status: 201 },
      );
    } else {
      // Async notify without blocking response
      const message = buildOrderMessage(order);
      // Báo cho Vercel giữ Serverless Instance tiếp tục chạy cho đến khi sendTelegramToAdmin hoàn thành
      waitUntil(sendTelegramToAdmin(message).catch(console.error));
    }

    return NextResponse.json(
      {
        orderId: order.id,
        orderCode: order.orderCode,
        serverTotal: order.totalPrice,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
