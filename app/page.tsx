import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductOptions } from '@/components/product/ProductOptions';
import { ProductDescription } from '@/components/product/ProductDescription';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery />
          </div>

          {/* Right Column - Product Info & Options */}
          <div className="lg:col-span-7">
            <div className="mb-6">
              <div className="md:flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 uppercase tracking-wide">SKU: CLK-NAME-01</span>
                <span className="text-sm text-green-600 flex items-center font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Tình trạng: Còn hàng (Custom theo yêu cầu)
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                Móc Khóa Clicker Bàn Phím Cơ Custom Theo Tên - Fidget Đồ Chơi Xả Stress & Decor Độc Đáo
              </h1>
              <p className="text-gray-500 text-sm">Móc khóa / Fidget Toy / Phụ kiện bàn phím & Decor</p>
            </div>
            
            <ProductOptions />

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Switch cơ học độ bền {'>'}50 triệu lần bấm</div>
                <div className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Nhựa in 3D PLA an toàn cao cấp</div>
                <div className="flex items-center"><svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Được kiểm tra tên và màu trước khi giao</div>
              </div>
            </div>
            
          </div>
        </div>

        <ProductDescription />
      </main>

      <Footer />
    </div>
  );
}