"use client";

import { useState, useRef, TouchEvent } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const displayImages = images.filter(Boolean);
  const currentImage = displayImages[activeImageIndex] || displayImages[0] || "";

  const handlePrev = () => {
    if (displayImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1));
  };

  const handleNext = () => {
    if (displayImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Preload next and prev images into browser cache
  return (
    <div className="w-full">
      {/* Mobile view (< lg) */}
      <div className="block lg:hidden w-full">
        <div
          className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden select-none touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Stacked pre-rendered images for zero-lag instant switching */}
          {displayImages.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-out ${
                idx === activeImageIndex ? "opacity-100 z-1 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={img}
                alt={`${title} image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
                priority={idx === 0 || idx === 1}
                loading={idx <= 2 ? "eager" : "lazy"}
              />
            </div>
          ))}

          {/* Left / Right arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-black shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer z-10"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-black shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer z-10"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              {/* Image Counter Badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] tracking-widest px-2.5 py-1 uppercase rounded-full font-medium z-10">
                {activeImageIndex + 1} / {displayImages.length}
              </div>
            </>
          )}
        </div>

        {/* Mobile Thumbnail Row with Instant Switch */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto py-2.5 px-1 scrollbar-none">
            {displayImages.map((img, idx) => (
              <button
                key={`thumb-${img}-${idx}`}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-14 aspect-[3/4] flex-shrink-0 bg-gray-200 border-2 transition-all cursor-pointer overflow-hidden rounded-xs ${
                  activeImageIndex === idx
                    ? "border-black ring-1 ring-black scale-[1.02] opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="56px"
                  loading="eager"
                  priority={idx < 4}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================================
          DESKTOP VIEW (>= lg): Clean 2-column image grid without side preview strip.
          Full width grid. Additional images (like 3rd or 4th) come naturally as you scroll down.
         ========================================================================= */}
      <div className="hidden lg:block w-full">
        {displayImages.length >= 2 ? (
          <div className="grid grid-cols-2 gap-4">
            {displayImages.map((img, idx) => (
              <div
                key={`${img}-${idx}`}
                className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden group shadow-xs"
              >
                <Image
                  src={img}
                  alt={`${title} image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1200px) 50vw, 38vw"
                  priority={idx < 2}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center items-start">
            <div className="relative w-full max-w-[480px] h-[calc(100vh-150px)] max-h-[720px] bg-[#f3f3f3] overflow-hidden shadow-xs rounded-xs flex items-center justify-center">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={title}
                  fill
                  className="object-contain hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 1024px) 70vw, 480px"
                  priority
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
