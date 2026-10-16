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

  const fallbackItems: any[] = [
    {
      id: "1",
      handle: "1",
      tag: "Selling Fast",
      title: "Tropical Style Printed Shirt",
      category: "Pret Collection",
      price: "$145",
      priceAed: "AED 530",
      imageUrl: "/IMG_6494.JPG",
    },
    {
      id: "2",
      handle: "2",
      tag: "New In",
      title: "Ethereal Green Floral Tunic",
      category: "Summer Edit",
      price: "$165",
      priceAed: "AED 600",
      imageUrl: "/IMG_6545.JPG",
    },
  ];

  const allProducts = products.length > 0 ? products : fallbackItems;

  // Filter products based on selected collection tab
  const displayedProducts =
    activeCollectionHandle === "all"
      ? allProducts
      : allProducts.filter((p) => {
          // Check product.collections
          const hasInCollections = p.collections?.some(
            (c: { handle: string; title: string }) =>
              c.handle.toLowerCase() === activeCollectionHandle.toLowerCase()
          );
          if (hasInCollections) return true;

          // Also check title or tags as fallback
          const handleTerms = activeCollectionHandle.toLowerCase().split("-");
          const matchesTitle = handleTerms.some((t: string) =>
            p.title.toLowerCase().includes(t)
          );
          const matchesTag = p.tags?.some((tag: string) =>
            tag.toLowerCase().includes(activeCollectionHandle.toLowerCase())
          );
          return matchesTitle || matchesTag;
        });

  const filterButtonClasses = (handle: string) =>
    `px-space-md py-space-xs font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors ${
      activeCollectionHandle === handle
        ? "bg-on-surface text-on-primary"
        : "bg-surface-container-lowest text-secondary hover:text-on-surface"
    }`;

  return (
    <section className="w-full bg-surface-container-low py-8 md:py-space-3xl" id="artful-edit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-gutter">
        {/* Section Header with Dynamic Collection Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 md:mb-space-2xl gap-3 md:gap-space-md">
          <div>
            <span className="font-label-caps-sm text-[10px] md:text-label-caps-sm uppercase tracking-widest text-primary block mb-1 md:mb-space-xs">
              THE ARTFUL EDIT
            </span>
            <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-headline-xl text-on-surface">
              Signature Haute Releases
            </h2>
          </div>

          {/* Dynamic Filter Tabs from Shopify */}
          <div className="flex flex-wrap gap-1.5 sm:gap-space-xs" id="productFilterNav">
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

        {/* Product Cards Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-space-lg">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((p) => (
              <ProductCard
                key={p.id}
                id={p.handle || p.id}
                tag={p.tag || (p.tags && p.tags[0]) || "New In"}
                title={p.title}
                category={
                  p.collections && p.collections[0]
                    ? p.collections[0].title
                    : p.category || "Collection"
                }
                price={p.price}
                priceAed={p.originalPrice || (p as any).priceAed || ""}
                imageAlt={p.title}
                imageUrl={p.imageUrl}
                isVisible={true}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 tracking-widest uppercase text-sm">
              No products found in this collection.
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
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-2.5 sm:mb-4 rounded-xs">
        <Image
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={imageAlt}
          src={imageUrl}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
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
