"use client";
import * as React from "react";

const PRESET_COLORS = [
  { name: "Tím", hex: "#663399" },
  { name: "Xanh lá nhạt", hex: "#74F225" },
  { name: "Skin", hex: "#F7C7C2" },
  { name: "Đỏ", hex: "#EF2727" },
  { name: "Vàng", hex: "#FFE83B" },
  { name: "Cam", hex: "#FF7A2F" },
  { name: "Nâu", hex: "#7A3B0A" },
  { name: "Vàng nhạt", hex: "#FBE6A6" },
  { name: "Trắng", hex: "#F8FAFC" },
  { name: "Đen", hex: "#1D1D1D" },
  { name: "Xám", hex: "#9CA3AF" },
  { name: "Xanh dương", hex: "#2F80ED" },
  { name: "Xanh lá", hex: "#137D4D" },
  { name: "Hồng", hex: "#EC4899" },
  { name: "Xanh nước biển", hex: "#0F5EAF" },
];

interface Props {
  colors: string[];
  onChange: (colors: string[]) => void;
  mode: "single" | "dual";
}

export function ColorPickerGroup({ colors, onChange, mode }: Props) {
  const count = mode === "single" ? 1 : 2;
  const currentColors = colors.slice(0, count);
  const notes = [
    "đơn màu, mặc định đế sẽ là màu bạn chọn, nền keycap màu trắng, màu chữ là màu bạn chọn",
    "mix màu, mặt định đế của ký tự đầu tiên sẽ là màu 1, nền keycap là màu 2, màu chữ là màu trắng, cứ thế luân phiên",
  ];

  const handleColorChange = (index: number, newColor: string) => {
    const next = [...colors];
    next[index] = newColor;
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {currentColors.map((color, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 min-w-[120px]">
            {mode === "dual" ? `Màu ${index + 1}` : "MÀU CHỦ ĐẠO"}
          </span>
          <div className="flex space-x-2 items-center flex-wrap gap-y-2">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.hex}
                onClick={() => handleColorChange(index, preset.hex)}
                className={`w-8 h-8 rounded-md border-2 transition-transform cursor-pointer ${color === preset.hex ? "border-gray-900 scale-110" : "border-transparent"}`}
                style={{
                  backgroundColor: preset.hex,
                  boxShadow:
                    preset.hex === "#F8FAFC"
                      ? "inset 0 0 0 1px #e5e7eb"
                      : "none",
                }}
                aria-label={`Chọn màu ${preset.name}`}
                title={`${preset.name} (${preset.hex})`}
              />
            ))}
            |
            <div className="relative flex items-center ml-2">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="w-8 h-8 p-0 border-0 rounded-md overflow-hidden cursor-pointer opacity-0 absolute inset-0"
              />
              <div
                className="w-8 h-8 rounded-md border-2 border-gray-300 flex items-center justify-center pointer-events-none"
                style={{ backgroundColor: color }}
              >
                {!PRESET_COLORS.some((preset) => preset.hex === color) && (
                  <span className="text-white text-xs mix-blend-difference">
                    #
                  </span>
                )}
              </div>
              <span className="ml-2 text-xs text-gray-500 uppercase">
                {color}
              </span>
              <span className="ml-2 text-xs text-gray-500">{"< nhấn ô này để custom màu tùy ý bạn"}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="text-gray-700 text-xs">
        Đối với {notes[mode === "dual" ? 1 : 0]}
      </div>
    </div>
  );
}
