"use client";
import * as React from 'react';

export function ProductDescription() {
  const [activeTab, setActiveTab] = React.useState<'description' | 'specs'>('description');

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('description')}
          className={`pb-2 px-4 cursor-pointer ${activeTab === 'description' ? 'border-b-2 border-gray-900 font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Mô tả chi tiết sản phẩm
        </button>
        <button 
          onClick={() => setActiveTab('specs')}
          className={`pb-2 px-4 cursor-pointer ${activeTab === 'specs' ? 'border-b-2 border-gray-900 font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Thông số kỹ thuật & Chất liệu
        </button>
      </div>
      
      {activeTab === 'description' && (
        <>
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>
              Móc Khóa Clicker Bàn Phím Cơ Custom Theo Tên là món phụ kiện EDC kiêm đồ chơi Fidget thư giãn đang cực hot trong giới trẻ và dân văn phòng. 
              Sản phẩm kết hợp giữa nghệ thuật in 3D chính xác và các switch bàn phím cơ thật, mang lại trải nghiệm gõ lách cách giòn rụm gây nghiện, 
              giúp bạn giải tỏa âu lo, giảm stress và tăng tập trung trong giờ học tập hay làm việc căng thẳng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                Âm Thanh Giòn Rụm
              </h4>
              <p className="text-sm text-gray-500">Sử dụng switch cơ thật (Blue/Red/Brown), độ nảy tactile rõ rệt, âm thanh đã tai giúp xả stress tức thì mọi lúc mọi nơi.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Cá Nhân Hóa 100%
              </h4>
              <p className="text-sm text-gray-500">Tùy biến ghép chữ cái theo tên bạn, nickname, ngày kỷ niệm hoặc từ đặc biệt từ 3 đến 8 ký tự với chữ in 3D nổi bật.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                Thiết Kế Retro & Charm Xinh
              </h4>
              <p className="text-sm text-gray-500">Khung bo viền bánh quy mềm mại, keycap phong cách retro pastel ngọt ngào kèm móc treo balo, chìa khóa cực phong cách.</p>
            </div>
          </div>
        </>
      )}

      {activeTab === 'specs' && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left text-gray-600">
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="px-6 py-4 font-semibold text-gray-900 w-1/3">Chất liệu khung & Keycap</td>
                <td className="px-6 py-4">Nhựa ABS/PLA thân thiện môi trường, chi tiết đúc/in 3D độ phân giải cao</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">Loại Switch cơ học</td>
                <td className="px-6 py-4">Outemu / Gateron cơ học tiêu chuẩn (Hỗ trợ tháo lắp, thay đổi switch dễ dàng)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-semibold text-gray-900">Độ bền phím bấm</td>
                <td className="px-6 py-4">{'>'} 50.000.000 lần nhấn</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">Kích thước</td>
                <td className="px-6 py-4">~1.8cm x 1.8cm mỗi nút, chiều dài theo số ký tự (khoảng 6cm - 15cm)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-semibold text-gray-900">Phụ kiện kèm theo</td>
                <td className="px-6 py-4">Móc khóa càng cua kim loại mạ chống rỉ + Charm hoạt hình trang trí</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">Trọng lượng</td>
                <td className="px-6 py-4">Chỉ từ 25 - 55 gram (rất nhẹ để đeo chìa khóa, balo, túi xách)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
