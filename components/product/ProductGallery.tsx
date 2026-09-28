"use client";
import * as React from "react";
import { Lightbox } from "./Lightbox";
import Image from "next/image";

const IMAGES = [
  "/images/main.jpg",
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
];

export function ProductGallery() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in bg-gray-100"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={IMAGES[currentIndex]}
          alt={"San pham " + (currentIndex + 1)}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={currentIndex === 0}
          loading="eager"
        />
        {/* Zoom hint */}
        <div className="absolute bottom-2 right-2 bg-black/40 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
          Phóng to
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex space-x-2 overflow-x-auto pb-1 p-2">
        {IMAGES.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition ${
              currentIndex === idx
                ? "border-red-600 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={src}
              alt={"Thu nho " + (idx + 1)}
              fill
              className="object-cover"
              sizes="64px"
              loading="eager"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={IMAGES}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
