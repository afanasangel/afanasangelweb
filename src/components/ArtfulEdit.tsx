"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FilterType = "all" | "jalabiya" | "coords" | "couture";

export default function ArtfulEdit() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filterButtonClasses = (filter: FilterType) =>
    `px-space-md py-space-xs font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors ${
      activeFilter === filter
        ? "bg-on-surface text-on-primary"
        : "bg-surface-container-lowest text-secondary hover:text-on-surface"
    }`;

  const sizes = ["XS", "S", "M", "L", "Custom"];

  return (
    <section className="w-full bg-surface-container-low py-space-3xl" id="artful-edit">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Section Header with Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary block mb-space-xs">
              THE ARTFUL EDIT
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">
              Signature Haute Releases
            </h2>
          </div>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-space-xs" id="productFilterNav">
            <button
              className={filterButtonClasses("all")}
              onClick={() => setActiveFilter("all")}
            >
              All Silhouettes
            </button>
            <button
              className={filterButtonClasses("jalabiya")}
              onClick={() => setActiveFilter("jalabiya")}
            >
              Jalabiyas
            </button>
            <button
              className={filterButtonClasses("coords")}
              onClick={() => setActiveFilter("coords")}
            >
              Co-Ords
            </button>
            <button
              className={filterButtonClasses("couture")}
              onClick={() => setActiveFilter("couture")}
            >
              Evening Haute
            </button>
          </div>
        </div>
        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <ProductCard
            id="1"
            tag="Selling Fast"
            title="Tropical Style Printed Shirt"
            category="Pret Collection"
            price="$145"
            priceAed="AED 530"
            imageAlt="Tropical Style Printed Shirt"
            imageUrl="/IMG_6494.JPG"
            isVisible={activeFilter === "all" || activeFilter === "coords"}
          />
          <ProductCard
            id="2"
            tag="New In"
            title="Ethereal Green Floral Tunic"
            category="Summer Edit"
            price="$165"
            priceAed="AED 600"
            imageAlt="Ethereal Green Floral Tunic"
            imageUrl="/IMG_6545.JPG"
            isVisible={activeFilter === "all" || activeFilter === "jalabiya"}
          />
        </div>
        {/* View All Button */}
        <div className="text-center mt-space-2xl">
          <Link
            className="inline-block bg-transparent text-primary hover:bg-surface-container px-space-2xl py-space-md font-label-caps-sm text-label-caps-sm uppercase tracking-widest transition-colors"
            href="/shop"
          >
            VIEW ALL 48 ATELIER PIECES →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  id,
  tag,
  title,
  category,
  price,
  priceAed,
  imageAlt,
  imageUrl,
  isVisible,
}: {
  id: string;
  tag: string;
  title: string;
  category: string;
  price: string;
  priceAed: string;
  imageAlt: string;
  imageUrl: string;
  isVisible: boolean;
}) {
  if (!isVisible) return null;

  return (
    <Link href={`/product/${id}`} className="group flex flex-col relative cursor-pointer block">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
        <Image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={imageAlt}
          src={imageUrl}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {tag && (
          <span className="absolute top-4 left-4 bg-[#e22d2d] text-white text-[10px] tracking-widest px-2 py-1 uppercase z-20">
            {tag}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-xs text-gray-600 tracking-widest uppercase mb-1 truncate">
          {title}
        </h3>
        <span className="font-bold text-sm text-black uppercase mb-2">
          {category}
        </span>
        <div className="flex items-center gap-3 text-xs tracking-widest">
          <span className="text-[#e22d2d] font-medium">{price}</span>
          <span className="text-gray-400 line-through">{priceAed}</span>
        </div>
      </div>
    </Link>
  );
}
