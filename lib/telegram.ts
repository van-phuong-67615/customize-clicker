import { OrderModal } from "@/components/checkout/OrderModal";
import { PaymentMethod, PaymentStatus, type Order } from "@prisma/client";

const TELEGRAM_API_URL = "https://api.telegram.org";

export async function sendTelegramToAdmin(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error(
      "[Telegram] Missing environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID",
    );
    return false;
  }

  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Telegram returned ${response.status}: ${detail}`);
    }

    console.log(`[Telegram] Message sent successfully to chat ${chatId}`);
    return true;
  } catch (error) {
    console.error("[Telegram] Failed to send message:", error);
    return false;
  }
}

export function buildOrderMessage(order: Order): string {
  const productOptions = order.productOptions as Record<string, unknown>;
  const customText = (productOptions?.customText as string) || "Không";
  const colorMode =
    productOptions?.colorMode === "single" ? "Đơn màu" : "Phối màu";
  const colors = Array.isArray(productOptions?.colors)
    ? (
        (productOptions?.colorMode === "single"
          ? [productOptions.colors[0]]
          : productOptions.colors) as string[]
      ).join(", ")
    : "";
  const payment_status =
    order.paymentStatus == PaymentStatus.PAID
      ? "ĐÃ THANH TOÁN"
      : "CHỜ THANH TOÁN";
  return [
    "CÓ ĐƠN HÀNG MỚI " + payment_status + ` (${order.paymentMethod})`,
    `- Mã đơn hàng: ${order.orderCode}`,
    `- Tên khách: ${order.customerName}`,
    `- Số điện thoại: ${order.customerPhone}`,
    `- Địa chỉ: ${order.customerAddress}`,
    `- Custom Text: ${customText}`,
    `- Kiểu màu: ${colorMode}${colors ? ` (${colors})` : ""}`,
    `- Tổng tiền: ${new Intl.NumberFormat("vi-VN").format(order.totalPrice)}đ`,
    `- Thời gian thanh toán: ${new Date().toLocaleString("vi-VN")}`,
  ].join("\n");
}
