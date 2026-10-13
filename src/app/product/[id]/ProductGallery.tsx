"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ["/IMG_6494.JPG"];
  const currentImage = displayImages[activeImageIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
      {/* Thumbnails (if multiple images) */}
      {displayImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[700px] scrollbar-thin py-1">
          {displayImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 aspect-[3/4] flex-shrink-0 bg-gray-200 border-2 transition-all cursor-pointer overflow-hidden ${
                activeImageIndex === idx ? "border-black shadow-md scale-[1.02]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image presentation: Grid of images or large interactive hero with secondary */}
      <div className="flex-1">
        {displayImages.length >= 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden group">
              <Image
                src={displayImages[0]}
                alt={`${title} 1`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden group">
              <Image
                src={displayImages[1]}
                alt={`${title} 2`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {displayImages.slice(2).map((img, i) => (
              <div key={i} className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden group">
                <Image
                  src={img}
                  alt={`${title} ${i + 3}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full aspect-[3/4] bg-gray-200 overflow-hidden">
            <Image
              src={currentImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
