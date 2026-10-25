"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct, ShopifyCollection } from "@/lib/shopify";

interface ArtfulEditProps {
  initialProducts?: ShopifyProduct[];
  initialCollections?: ShopifyCollection[];
}

export default function ArtfulEdit({
  initialProducts = [],
  initialCollections = [],
}: ArtfulEditProps) {
  const [activeCollectionHandle, setActiveCollectionHandle] = useState<string>("all");
  const [collections, setCollections] = useState<ShopifyCollection[]>(initialCollections);
  const [products, setProducts] = useState<ShopifyProduct[]>(initialProducts);

  useEffect(() => {
    if (initialCollections.length === 0) {
      fetch("/api/collections")
        .then((res) => res.json())
        .then((data) => {
          if (data?.collections) {
            setCollections(data.collections);
          }
        })
        .catch((err) => console.error("Failed to load collections:", err));
    }
  }, [initialCollections.length]);

  const allProducts = products;

  // Helper to normalize collection handles for matching
  const normalizeHandle = (h: string) =>
    h.toLowerCase().replace(/-1$/, "").replace(/[\s\-_]/g, "");

  // Filter products based on selected collection tab
  const displayedProducts =
    activeCollectionHandle === "all"
      ? allProducts
      : allProducts.filter((p) => {
          const targetNorm = normalizeHandle(activeCollectionHandle);

          // Check product.collections
          const hasInCollections = p.collections?.some((c: { handle: string; title: string }) => {
            const colHandleNorm = normalizeHandle(c.handle);
            const colTitleNorm = normalizeHandle(c.title);
            return colHandleNorm === targetNorm || colTitleNorm === targetNorm;
          });
          if (hasInCollections) return true;

          // Check tags
          const matchesTag = p.tags?.some((tag: string) => {
            const tagNorm = normalizeHandle(tag);
            return tagNorm.includes(targetNorm) || targetNorm.includes(tagNorm);
          });
          return matchesTag;
        });

  const filterButtonClasses = (handle: string) =>
    `px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-[11px] md:text-xs font-medium tracking-wider uppercase transition-all duration-300 shrink-0 cursor-pointer ${
      activeCollectionHandle === handle
        ? "bg-black text-white shadow-sm ring-1 ring-black"
        : "bg-white text-neutral-600 hover:text-black hover:bg-neutral-50 border border-neutral-200/80 shadow-2xs"
    }`;

  return (
    <section className="w-full bg-surface-container-low py-10 md:py-16" id="artful-edit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-gutter">
        {/* Section Header with Dynamic Collection Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-5">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-primary block">
              Curated Selection
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-on-surface tracking-tight">
              New Arrivals
            </h2>
          </div>

          {/* Luxury Filter Pills: horizontal swipe on mobile with fade hint, wrapped neatly on desktop */}
          <div className="relative w-full md:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 md:flex-wrap"
              id="productFilterNav"
            >
              <button
                className={filterButtonClasses("all")}
                onClick={() => setActiveCollectionHandle("all")}
              >
                All Silhouettes
              </button>
              {collections.map((col) => (
                <button
                  key={col.id || col.handle}
                  className={filterButtonClasses(col.handle)}
                  onClick={() => setActiveCollectionHandle(col.handle)}
                >
                  {col.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-space-lg">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.handle || p.id}
                tag=""
                title={p.title}
                category={
                  p.collections && p.collections[0]
                    ? p.collections[0].title
                    : p.category || "Collection"
                }
                price={p.price}
                priceAed={p.originalPrice || ""}
                imageAlt={p.title}
                imageUrl={p.imageUrl}
                isVisible={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 px-4 flex flex-col items-center justify-center">
              <span className="font-label-caps-sm text-[11px] uppercase tracking-[0.25em] text-[#775a19] mb-2 font-semibold">
                Haute Couture
              </span>
              <p className="font-headline-md text-xl md:text-2xl text-black tracking-[0.15em] uppercase font-light mb-3">
                Coming Soon
              </p>
              <p className="text-gray-500 text-xs tracking-wider max-w-md">
                Pieces for this collection are currently being crafted and will be available soon.
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-space-2xl">
          <Link
            className="inline-block bg-transparent text-primary hover:bg-surface-container px-6 md:px-space-2xl py-3 md:py-space-md font-label-caps-sm text-[11px] md:text-label-caps-sm uppercase tracking-widest transition-colors"
            href={
              activeCollectionHandle === "all"
                ? "/shop"
                : `/shop?collection=${activeCollectionHandle}`
            }
          >
            VIEW ALL PIECES →
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
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-2.5 sm:mb-4 rounded-xs">
        {imageUrl ? (
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={imageAlt}
            src={imageUrl}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : null}
        {tag && (
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#e22d2d] text-white text-[9px] sm:text-[10px] tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-1 uppercase z-20">
            {tag}
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-[11px] sm:text-xs text-gray-600 tracking-widest uppercase mb-0.5 sm:mb-1 truncate">
          {title}
        </h3>
        <span className="font-bold text-xs sm:text-sm text-black uppercase mb-1 sm:mb-2 truncate">
          {category}
        </span>
        <div className="flex items-center gap-2 sm:gap-3 text-xs tracking-widest">
          <span className="text-[#e22d2d] font-semibold">{price}</span>
          {priceAed && (
            <span className="text-gray-400 line-through text-[11px] sm:text-xs">{priceAed}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
