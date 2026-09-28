"use client";
import * as React from "react";
import Image from "next/image";

interface Props {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: Props) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate, currentIndex, images.length]);

  const prev = () => onNavigate((currentIndex - 1 + images.length) % images.length);
  const next = () => onNavigate((currentIndex + 1) % images.length);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black/80 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image area */}
      <div className="relative flex items-center justify-center w-full flex-1 px-16">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-4 w-11 h-11 flex items-center justify-center text-white bg-black/40 hover:bg-black/70 rounded-full transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full max-w-2xl max-h-[65vh] aspect-square">
          <Image
            src={images[currentIndex]}
            alt={"Anh " + (currentIndex + 1)}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 w-11 h-11 flex items-center justify-center text-white bg-black/40 hover:bg-black/70 rounded-full transition z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 py-4 px-4 overflow-x-auto max-w-full">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => onNavigate(idx)}
            className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition ${
              idx === currentIndex
                ? "border-white scale-110"
                : "border-white/30 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={"Thu nho " + (idx + 1)}
              fill
              className="object-cover"
              sizes="56px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
