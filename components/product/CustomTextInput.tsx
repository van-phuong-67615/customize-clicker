"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface Props {
  value: string;
  onChange: (val: string) => void;
  maxLength: number;
}

export function CustomTextInput({ value, onChange, maxLength }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.toUpperCase();
    // allow letters, numbers, spaces
    raw = raw.replace(/[^A-Z0-9 ]/g, "");
    if (raw.length <= maxLength) {
      onChange(raw);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <Label htmlFor="customText">Nhập Tên / Ký Tự Cần Ghép (Custom Theo Tên)</Label>
        <span className="text-xs text-gray-500">Tối đa {maxLength} ký tự</span>
      </div>
      <Input
        id="customText"
        type="text"
        placeholder={`Ví dụ: PHUONG (Tối đa ${maxLength} ký tự)`}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <p className="text-xs text-gray-500">* Mỗi ký tự tương ứng với 1 nút switch bấm clicky siêu êm tai. Vui lòng tắt gõ tiếng Việt khi nhập</p>
    </div>
  );
}