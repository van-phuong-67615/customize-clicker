"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  onBack: () => void;
  onConfirmCOD: () => void;
  onConfirmQR: (method: "qr" | "cod") => void;
  qrData?: any;
  loading: boolean;
  createOrder: (method: "cod" | "qr") => void;
}

export function Step2_Payment({ onBack, onConfirmCOD, onConfirmQR, qrData, loading, createOrder }: Props) {
  const [method, setMethod] = React.useState<"cod" | "qr">("qr");
  const [canConfirmQR, setCanConfirmQR] = React.useState(false);

  React.useEffect(() => {
    if (qrData) {
      // Allow manual confirm after 60 seconds
      const timer = setTimeout(() => {
        setCanConfirmQR(true);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [qrData]);

  if (!qrData && method === "qr" && loading) {
    return <div className="p-8 text-center">Đang tạo đơn hàng...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-gray-500 uppercase">Chọn hình thức thanh toán:</p>
        
        {/* COD Option */}
        <label className={`block border-2 rounded-lg p-4 cursor-pointer ${method === "cod" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}>
          <div className="flex items-center space-x-3">
            <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} className="w-5 h-5 accent-gray-900" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">Kiểm hàng trước</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Quý khách thanh toán trực tiếp cho shipper khi nhận được bưu phẩm, được kiểm tra đúng tên và phân loại.</p>
            </div>
          </div>
        </label>

        {/* QR Option */}
        <label className={`block border-2 rounded-lg p-4 cursor-pointer ${method === "qr" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}>
          <div className="flex items-center space-x-3">
            <input type="radio" checked={method === "qr"} onChange={() => setMethod("qr")} className="w-5 h-5 accent-gray-900" />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Chuyển khoản quét mã QR (VietQR)</span>
                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">Xử lý ưu tiên</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Quét mã bằng bất kỳ App ngân hàng nào, tự động điền số tiền và nội dung.</p>
            </div>
          </div>
        </label>
      </div>

      {method === "qr" && !qrData && (
        <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>← Quay lại</Button>
          <Button onClick={() => createOrder("qr")} disabled={loading}>Tạo mã QR thanh toán</Button>
        </div>
      )}

      {method === "qr" && qrData && (
        <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-blue-900 flex justify-between mb-4">
            <span>Quét mã VietQR để thanh toán</span>
            <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-sm">#{qrData.description}</span>
          </h4>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex justify-center">
              {/* QR Image */}
              <div className="w-48 h-48 bg-white border border-gray-200 flex items-center justify-center overflow-hidden rounded-lg">
                <img src={qrData.qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-sm border-b pb-2"><span className="text-gray-500">Ngân hàng:</span><span className="font-semibold">{qrData.bankName}</span></div>
              <div className="flex justify-between text-sm border-b pb-2"><span className="text-gray-500">Chủ tài khoản:</span><span className="font-semibold">{qrData.accountHolder}</span></div>
              <div className="flex justify-between text-sm border-b pb-2 items-center">
                <span className="text-gray-500">Số tài khoản:</span>
                <span className="font-semibold">{qrData.accountNumber}</span>
              </div>
              <div className="flex justify-between text-sm border-b pb-2"><span className="text-gray-500">Số tiền:</span><span className="font-bold text-red-600">{new Intl.NumberFormat("vi-VN").format(qrData.amount)}đ</span></div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Nội dung CK:</span>
                <span className="font-semibold">{qrData.description}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
            Vui lòng giữ đúng nội dung chuyển khoản để hệ thống xác thực đơn nhanh nhất. Sau khi chuyển xong, bấm nút xác nhận bên dưới.
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={onBack}>← Quay lại</Button>
            <Button variant="secondary" onClick={() => onConfirmQR("qr")} disabled={!canConfirmQR}>
              {canConfirmQR ? "Tôi đã chuyển khoản xong (Xác nhận)" : "Đang chờ xác nhận tự động..."}
            </Button>
          </div>
        </div>
      )}

      {method === "cod" && (
        <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>← Quay lại</Button>
          <Button onClick={onConfirmCOD} disabled={loading}>Xác nhận đặt hàng COD</Button>
        </div>
      )}
    </div>
  );
}