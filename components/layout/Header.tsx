import * as React from 'react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-bold text-xl text-gray-900 tracking-tight">Lumos 3DPrint</div>
        <div className="text-sm text-gray-500">Giỏ hàng</div>
      </div>
    </header>
  );
}