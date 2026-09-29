'use client';
import * as React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

interface Props {
  price: number;
  loading: boolean;
}

export function PriceDisplay({ price, loading }: Props) {
  return (
    <div className="md:flex flex-wrap items-baseline gap-3">
      {loading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <span className="text-2xl font-bold text-red-600">
          {new Intl.NumberFormat('vi-VN').format(price)}đ
        </span>
      )}
      <span className="text-sm text-gray-500">(Tùy số ký tự: 0đ - 100.000đ)</span>
      <div className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200 ml-auto sm:ml-0">
        ✨ Free ship nội thành Đà Nẵng
      </div>
    </div>
  );
}
