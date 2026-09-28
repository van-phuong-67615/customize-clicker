"use client";
import * as React from "react";
import { Step1_CustomerForm } from "./Step1_CustomerForm";
import { Step2_Payment } from "./Step2_Payment";
import { Step3_Success } from "./Step3_Success";
import { ProductSelection, PricingBreakdown } from "@/lib/types";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productSelection: ProductSelection;
  pricing: PricingBreakdown;
}

export function OrderModal({
  isOpen,
  onClose,
  productSelection,
  pricing,
}: Props) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [customerInfo, setCustomerInfo] = React.useState<any>(null);
  const [orderData, setOrderData] = React.useState<any>(null);
  const [qrData, setQrData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      // reset on close
      setTimeout(() => {
        setStep(1);
        setCustomerInfo(null);
        setOrderData(null);
        setQrData(null);
        setOrderId(null);
      }, 300);
    }
  }, [isOpen]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (orderId && step === 2) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/orders/status?orderId=${orderId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "paid") {
              clearInterval(interval);
              handlePaymentSuccess();
            }
          }
        } catch (e) {
          console.error("Polling error:", e);
        }
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderId, step]);

  const handlePaymentSuccess = () => {
    setOrderData((prev: any) => ({ ...prev, paymentMethod: "qr" }));
    setStep(3);
  };

  const createOrder = async (method: "cod" | "qr") => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customerInfo,
          product: productSelection,
          payment: { method },
          clientTotal: pricing.total,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderData({
          orderId: data.orderId,
          orderCode: data.orderCode,
          total: data.serverTotal,
          customer: customerInfo,
          product: productSelection,
          paymentMethod: method,
        });

        if (method === "cod") {
          setStep(3);
        } else {
          setOrderId(data.orderId);
          setQrData(data.paymentInfo);
        }
      } else {
        alert(data.detail || data.error || "Có lỗi xảy ra");
      }
    } catch (e) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center mb-6">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Đặt hàng tùy chỉnh theo tên
          </h2>

          <div className="flex justify-between items-center mb-8 px-4 relative">
            <div className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -z-10"></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 ${step >= num ? "bg-green-500 text-white" : step === num ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {step > num ? "✓" : num}
                </div>
                <span
                  className={`text-xs ${step >= num ? "font-semibold text-gray-900" : "text-gray-500"}`}
                >
                  {num === 1
                    ? "1. Thông tin giao hàng"
                    : num === 2
                      ? "2. Thanh toán"
                      : "3. Hoàn tất"}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900">
                      Móc Khóa Clicker Custom Theo Tên
                    </h4>
                    <span className="text-sm text-gray-500">SL: 1</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
                    <div>
                      Tên custom:{" "}
                      <span className="font-semibold text-gray-900">
                        {productSelection.customText}
                      </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <span>Màu:</span>
                      <span className="font-semibold text-gray-900">
                        {productSelection.colorMode === "single"
                          ? "Đơn màu"
                          : "Phối màu"}
                      </span>
                      <div className="flex items-center space-x-0.5 ml-0.5">
                        {productSelection.colors
                          .filter(
                            (_, i) =>
                              productSelection.colorMode === "single" && i == 0 || productSelection.colorMode !== "single",
                          )
                          .map((c, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 mt-1">
                    {new Intl.NumberFormat("vi-VN").format(pricing.total)}đ
                  </div>
                </div>
              </div>
              <Step1_CustomerForm
                initialData={customerInfo}
                onNext={(data) => {
                  setCustomerInfo(data);
                  setStep(2);
                }}
              />
            </>
          )}

          {step === 2 && (
            <Step2_Payment
              loading={loading}
              qrData={qrData}
              createOrder={createOrder}
              onBack={() => setStep(1)}
              onConfirmCOD={() => createOrder("cod")}
              onConfirmQR={() => handlePaymentSuccess()}
            />
          )}

          {step === 3 && (
            <Step3_Success orderData={orderData} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
