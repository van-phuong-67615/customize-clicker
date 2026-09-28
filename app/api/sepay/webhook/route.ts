import { NextResponse } from "next/server";
import { verifyWebhookApiKey } from "@/lib/sepay";
import { findOrderByOrderCode, updateOrderStatus } from "@/lib/orders";
import { sendTelegramToAdmin, buildOrderMessage } from "@/lib/telegram";
import { PaymentStatus } from "@prisma/client";
import { z } from "zod";
import { plainText } from "@/lib/input-security";

const webhookSchema = z.object({
  transferType: z.string(),
  code: plainText(64).optional(),
  transferAmount: z.coerce.number().nonnegative(),
  id: z.union([z.string(), z.number()]),
}).passthrough();

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const apiKey = authHeader?.replace("Apikey ", "") || null;

    if (!verifyWebhookApiKey(apiKey)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payloadResult = webhookSchema.safeParse(await request.json());

    if (!payloadResult.success) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    const payload = payloadResult.data;

    if (payload.transferType !== "in") {
      return NextResponse.json({
        received: true,
        message: "Ignored non-in transfer",
      });
    }

    const orderCode = payload.code;

    if (!orderCode) {
      return NextResponse.json(
        { error: "No order code in payload" },
        { status: 400 },
      );
    }

    const order = await findOrderByOrderCode(orderCode);

    if (!order) {
      return NextResponse.json({ received: true, message: "Order not found" });
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      return NextResponse.json({ received: true, message: "Already paid" });
    }

    if (payload.transferAmount < order.totalPrice) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    await updateOrderStatus(
      order.id,
      PaymentStatus.PAID,
      payload.id.toString(),
    );

    // Async notify without blocking response
    const message = buildOrderMessage(order);
    sendTelegramToAdmin(message).catch(console.error);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
