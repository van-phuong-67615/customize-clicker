"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  orderData: any;
  onClose: () => void;
}

export function Step3_Success({ orderData, onClose }: Props) {
  const isQR = orderData?.paymentMethod === "qr";

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Cảm ơn bạn! Đơn hàng đã được đặt thành công
        </h3>
        <p className="text-gray-500 mt-2">
          Lumos 3DPrint đã tiếp nhận thông tin đơn hàng và sẽ liên hệ qua Zalo
          để gửi ảnh mockup phím in 3D trước khi giao.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 grid grid-cols-3 gap-4 text-sm divide-x divide-blue-200">
        <div>
          <span className="block text-gray-500 mb-1">Mã đơn hàng:</span>
          <span className="font-semibold text-gray-900">
            #
            {orderData?.transferCode ||
              orderData?.orderId?.slice(0, 6).toUpperCase()}
          </span>
        </div>
        <div>
          <span className="block text-gray-500 mb-1">Dự kiến giao hàng:</span>
          <span className="font-semibold text-gray-900">
            2 - 4 ngày làm việc
          </span>
        </div>
        <div>
          <span className="block text-gray-500 mb-1">
            Trạng thái thanh toán:
          </span>
          {isQR ? (
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
              Đã chuyển khoản qua QR
            </span>
          ) : (
            <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
              Thanh toán khi nhận hàng
            </span>
          )}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h4 className="font-semibold text-gray-900 border-b pb-2 mb-3 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Chi tiết đơn hàng đã xác nhận
        </h4>

        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="font-semibold text-gray-900">
              Móc Khóa Clicker Bàn Phím Cơ Custom
            </div>
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
              <div>
                Ký tự/Tên ghép:{" "}
                <span className="font-semibold text-gray-900">
                  {orderData?.product?.customText || "Không"}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5">
                <span>Màu:</span>
                <span className="font-semibold text-gray-900">
                  {orderData?.product?.colorMode === "single"
                    ? "Đơn màu"
                    : "Phối màu"}
                </span>
                {orderData?.product?.colors && (
                  <div className="flex items-center space-x-0.5 ml-0.5">
                    {orderData.product.colors
                      .filter(
                        (_: string, i: number) =>
                          (orderData?.product?.colorMode === "single" &&
                            i == 0) ||
                          orderData?.product?.colorMode !== "single",
                      )
                      .map((c: string, i: number) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900">
              {new Intl.NumberFormat("vi-VN").format(orderData?.total || 0)}đ
            </div>
            <div className="text-sm text-gray-500">Số lượng: 1</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              Thông tin nhận hàng:
            </div>
            <div className="text-gray-600">{orderData?.customer?.name}</div>
            <div className="text-gray-600">
              {orderData?.customer?.phone} (Zalo)
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">
              Địa chỉ giao hàng:
            </div>
            <div className="text-gray-600">{orderData?.customer?.address}</div>
            <div className="text-gray-600">
              {orderData?.customer?.district}, {orderData?.customer?.city}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <Button fullWidth onClick={onClose} className="text-lg py-3">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          OK / Hoàn tất & Về trang chủ
        </Button>

        {process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER && (
          <Button
            fullWidth
            variant="outline"
            onClick={() => {
              const orderCode =
                orderData?.orderCode ||
                orderData?.orderId?.slice(0, 6).toUpperCase();
              const zaloMessage = encodeURIComponent(
                `Chào shop, tôi vừa thanh toán thành công đơn hàng #${orderCode}. Mong shop kiểm tra lại nhé.`,
              );
              window.open(
                `https://zalo.me/${process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}?text=${zaloMessage}`,
                "_blank",
              );
            }}
            className="text-lg py-3 border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              className="w-5 h-5 mr-2"
              alt="Zalo"
            />
            Mở Zalo nhắn cho Shop
          </Button>
        )}
      </div>
    </div>
  );
}
