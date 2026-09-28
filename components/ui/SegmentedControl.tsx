"use client";
import * as React from "react";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2 text-sm font-medium rounded-md min-h-[40px] transition-all cursor-pointer ${
              isSelected
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}