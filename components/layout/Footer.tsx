import * as React from "react";

export function Footer() {
  return (
    <footer className="bg-[#e8eaf0] border-t border-gray-200">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Về Lumos 3DPrint</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Lumos 3DPrint xưởng sáng tạo phụ kiện công nghệ, đồ decor bàn làm việc - nhà cửa, móc khóa clicker custom, móc khóa thẻ tên và quà tặng handmade in 3D cá nhân hóa độc đáo.
          </p>
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Đà Nẵng, Việt Nam
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <span>&copy; 2025 Lumos 3DPrint Store. Bản quyền thuộc về Lumos 3DPrint.</span>

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-700 text-xs tracking-wide">PHƯƠNG THỨC THANH TOÁN:</span>
            {/* QR / VietQR icon */}
            <span className="flex items-center justify-center w-8 h-6 bg-white border border-gray-300 rounded text-gray-600" title="VietQR">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M3 3h7v7H3V3zm1 1v5h5V4H4zm1 1h3v3H5V5zM3 14h7v7H3v-7zm1 1v5h5v-5H4zm1 1h3v3H5v-3zM14 3h7v7h-7V3zm1 1v5h5V4h-5zm1 1h3v3h-3V5zM14 14h2v2h-2v-2zm2 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v-2h2v2h-2v2h-2v-2zm2-4h2v2h-2v-2zm0 4h2v2h-2v-2zm2-2h2v2h-2v-2z"/>
              </svg>
            </span>
            {/* Bank transfer icon */}
            <span className="flex items-center justify-center w-8 h-6 bg-white border border-gray-300 rounded text-gray-600" title="Chuyển khoản ngân hàng">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
                <path d="M6 15h4" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
