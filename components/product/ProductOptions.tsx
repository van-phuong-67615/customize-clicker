"use client";
import * as React from "react";
import { CustomTextInput } from "./CustomTextInput";
import { PriceDisplay } from "./PriceDisplay";
import { ColorPickerGroup } from "./ColorPickerGroup";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/Button";
import { OrderModal } from "@/components/checkout/OrderModal";
import { PricingBreakdown } from "@/lib/types";

export function ProductOptions() {
  const [text, setText] = React.useState("");
  const [colorMode, setColorMode] = React.useState<"single" | "dual">("single");
  const [colors, setColors] = React.useState<string[]>(["#8B5CF6", "#F59E0B"]);

  const [priceInfo, setPriceInfo] = React.useState<PricingBreakdown>({
    base: 0,
    textAddon: 0,
    total: 0,
    charCount: 0,
  });
  const [loadingPrice, setLoadingPrice] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      setLoadingPrice(true);
      try {
        const res = await fetch("/api/calculate-price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (res.ok) {
          const data = await res.json();
          setPriceInfo(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPrice(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="space-y-6">
      <PriceDisplay price={priceInfo.total} loading={loadingPrice} />

      <div className="border-t border-gray-200 pt-6">
        <CustomTextInput value={text} onChange={setText} maxLength={8} />
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Kiểu phối màu Keycap & Khung viền
          </span>
        </div>
        <div className="text-gray-700 text-xs flex flex-col gap-1.5">
          <span>
            * Đối với màu bạn custom chúng tôi sẽ lấy màu nhựa gần giống nhất mà
            chúng tôi có sẵn
          </span>
          <span>Nếu bạn cần màu chính xác tuyệt đối theo những gì bạn chọn, vui lòng để lại note ở bước sau, chúng tôi sẽ confrim qua tin nhắn (quá trình chuẩn bị nhựa này có thể mất thêm 2-3 ngày chuẩn bị) </span>
        </div>
        <SegmentedControl
          options={[
            { label: "Đơn màu (Solid)", value: "single" },
            { label: "Phối màu (Color Block)", value: "dual" },
          ]}
          value={colorMode}
          onChange={(v) => setColorMode(v as "single" | "dual")}
        />
        <div className="pt-2">
          <ColorPickerGroup
            colors={colors}
            onChange={setColors}
            mode={colorMode}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          fullWidth
          onClick={() => setModalOpen(true)}
          className="text-lg py-3 cursor-pointer"
          disabled={text.trim().length === 0}
        >
          TIẾN HÀNH ĐẶT HÀNG
        </Button>
      </div>

      {modalOpen && (
        <OrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productSelection={{ customText: text, colorMode, colors }}
          pricing={priceInfo}
        />
      )}
    </div>
  );
}
