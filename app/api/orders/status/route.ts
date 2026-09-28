import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrder } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");
  const result = z.string().cuid().safeParse(orderId);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  const order = await getOrder(result.data);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: order.paymentStatus === "PAID" ? "paid" : "pending",
    orderId: order.id,
  });
}
