"use client";

import { useCart } from "@/context/CartContext";
import { useState, useMemo } from "react";
import type { ShopifyProductOption, ShopifyVariant } from "@/lib/shopify";

export interface AddToCartProps {
  product: {
    id: string;
    handle?: string;
    variantId?: string;
    title: string;
    sku: string;
    price: string;
    priceNumeric: number;
    originalPrice?: string;
    image: string;
    options?: ShopifyProductOption[];
    variants?: ShopifyVariant[];
  };
}

const COLOR_HEX_MAP: Record<string, string> = {
  black: "#111111",
  red: "#b91c1c",
  blue: "#1e3a8a",
  green: "#15803d",
  white: "#ffffff",
  beige: "#d4b996",
  pink: "#f472b6",
  grey: "#6b7280",
  gray: "#6b7280",
  navy: "#0f172a",
  brown: "#78350f",
  maroon: "#881337",
  emerald: "#065f46",
};

const SIZE_GUIDE_DATA = [
  { size: "XS", bustIn: "34", waistIn: "28", hipIn: "36", lengthIn: "52", bustCm: "86", waistCm: "71", hipCm: "91", lengthCm: "132" },
  { size: "S",  bustIn: "36", waistIn: "30", hipIn: "38", lengthIn: "54", bustCm: "91", waistCm: "76", hipCm: "97", lengthCm: "137" },
  { size: "M",  bustIn: "38", waistIn: "32", hipIn: "40", lengthIn: "56", bustCm: "97", waistCm: "81", hipCm: "102", lengthCm: "142" },
  { size: "L",  bustIn: "40", waistIn: "35", hipIn: "43", lengthIn: "56", bustCm: "102", waistCm: "89", hipCm: "109", lengthCm: "142" },
  { size: "XL", bustIn: "43", waistIn: "38", hipIn: "46", lengthIn: "58", bustCm: "109", waistCm: "97", hipCm: "117", lengthCm: "147" },
  { size: "XXL",bustIn: "46", waistIn: "41", hipIn: "49", lengthIn: "58", bustCm: "117", waistCm: "104", hipCm: "124", lengthCm: "147" },
];

export default function AddToCartButton({ product }: AddToCartProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<"in" | "cm">("in");

  // Determine available options and normalize
  const options = useMemo(() => {
    if (product.options && product.options.length > 0) {
      // Filter out dummy single options like "Title: Default Title"
      const realOptions = product.options.filter(
        (opt) => !(opt.name.toLowerCase() === "title" && opt.values.includes("Default Title"))
      );
      if (realOptions.length > 0) {
        return realOptions;
      }
    }

    // Fallback: If no real options, create default Size option
    return [
      {
        id: "size",
        name: "Size",
        values: ["XS", "S", "M", "L", "XL"],
      },
    ];
  }, [product.options]);

  const variants = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants;
    }
    // Fallback mock variants matching fallback sizes
    return ["XS", "S", "M", "L", "XL"].map((sz) => ({
      id: `${product.id}-${sz.toLowerCase()}`,
      title: sz,
      sku: `${product.sku}-${sz}`,
      price: product.price,
      priceNumeric: product.priceNumeric,
      compareAtPrice: product.originalPrice || null,
      availableForSale: true,
      selectedOptions: [{ name: "Size", value: sz }],
    }));
  }, [product.variants, product.id, product.sku, product.price, product.priceNumeric, product.originalPrice]);

  // Initial options state - pick first available variant if possible
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstAvailable = variants.find((v) => v.availableForSale) || variants[0];
    const initial: Record<string, string> = {};

    options.forEach((opt) => {
      const match = firstAvailable?.selectedOptions?.find(
        (so) => so.name.toLowerCase() === opt.name.toLowerCase()
      );
      initial[opt.name] = match ? match.value : opt.values[0] || "";
    });

    return initial;
  });

  // Current matched variant
  const currentVariant = useMemo(() => {
    return (
      variants.find((v) =>
        options.every((opt) => {
          const selectedVal = selectedOptions[opt.name];
          if (!selectedVal) return true;
          const optMatch = v.selectedOptions?.find(
            (so) => so.name.toLowerCase() === opt.name.toLowerCase()
          );
          return optMatch && optMatch.value.toLowerCase() === selectedVal.toLowerCase();
        })
      ) || variants[0]
    );
  }, [variants, options, selectedOptions]);

  const isAvailableForSale = Boolean(currentVariant?.availableForSale);

  // Helper to test if a specific option value has in-stock inventory given the other selected options
  const isOptionValueAvailable = (optionName: string, optionValue: string) => {
    return variants.some((v) => {
      const matchesTarget = v.selectedOptions?.some(
        (so) => so.name.toLowerCase() === optionName.toLowerCase() && so.value.toLowerCase() === optionValue.toLowerCase()
      );
      if (!matchesTarget) return false;

      // Check if other current selections match
      const matchesOthers = options.every((opt) => {
        if (opt.name.toLowerCase() === optionName.toLowerCase()) return true;
        const curVal = selectedOptions[opt.name];
        if (!curVal) return true;
        const so = v.selectedOptions?.find((item) => item.name.toLowerCase() === opt.name.toLowerCase());
        return so && so.value.toLowerCase() === curVal.toLowerCase();
      });

      return matchesOthers && v.availableForSale;
    });
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Add to cart handler
  const handleAdd = () => {
    if (!currentVariant || !isAvailableForSale) return;

    const variantId = currentVariant.id || product.variantId || product.id;
    const variantTitle =
      currentVariant.title && currentVariant.title !== "Default Title"
        ? currentVariant.title
        : Object.entries(selectedOptions)
            .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
            .join(" / ");

    addToCart({
      id: variantId,
      productId: product.id,
      variantId,
      title: product.title,
      variantTitle,
      sku: currentVariant.sku || product.sku,
      price: currentVariant.price || product.price,
      priceNumeric: currentVariant.priceNumeric || product.priceNumeric,
      image: product.image,
      quantity,
      selectedOptions: Object.entries(selectedOptions).map(([name, value]) => ({ name, value })),
    });
  };

  // Instant direct Shopify checkout
  const handleBuyNow = () => {
    if (!currentVariant || !isAvailableForSale) return;
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "afnasangel.myshopify.com";
    const rawId = currentVariant.id.includes("/") ? currentVariant.id.split("/").pop() : currentVariant.id;
    window.location.href = `https://${domain}/cart/${rawId}:${quantity}`;
  };

  // Separate Size option vs other options
  const sizeOption = options.find((opt) => opt.name.toLowerCase().includes("size"));
  const nonSizeOptions = options.filter((opt) => !opt.name.toLowerCase().includes("size"));

  return (
    <>
      {/* Non-size Options (e.g. Color) */}
      {nonSizeOptions.map((opt) => {
        const isColor = opt.name.toLowerCase().includes("color");
        const selectedVal = selectedOptions[opt.name] || opt.values[0];
        const displayLabel = isColor ? "COLOR" : opt.name.toUpperCase();

        return (
          <div key={opt.name} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.18em] text-black font-semibold">
                {displayLabel}: <span className="font-normal text-gray-700 capitalize">{selectedVal}</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {opt.values.map((val) => {
                const isSelected = selectedVal.toLowerCase() === val.toLowerCase();
                const isAvailable = isOptionValueAvailable(opt.name, val);
                const colorHex = isColor ? (COLOR_HEX_MAP[val.toLowerCase()] || "#cccccc") : null;

                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleOptionChange(opt.name, val)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 border text-xs tracking-wider uppercase transition-all cursor-pointer ${
                      isSelected
                        ? "border-black bg-black text-white font-semibold shadow-sm"
                        : isAvailable
                        ? "border-gray-300 bg-white text-gray-800 hover:border-black"
                        : "border-gray-200 bg-gray-100 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {isColor && colorHex && (
                      <span
                        className={`w-3.5 h-3.5 rounded-full border ${
                          isSelected ? "border-white" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: colorHex }}
                      />
                    )}
                    <span className="capitalize">{val}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Size Option */}
      {sizeOption && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-[0.18em] text-black font-semibold">
              SIZE: <span className="font-normal text-gray-700">{selectedOptions[sizeOption.name] || sizeOption.values[0]}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-[11px] uppercase tracking-wider text-gray-500 hover:text-black flex items-center gap-1.5 transition-colors underline underline-offset-4 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21.3 8.7 8.7 21.3a2.1 2.1 0 0 1-3 0l-3-3a2.1 2.1 0 0 1 0-3L15.3 2.7a2.1 2.1 0 0 1 3 0l3 3a2.1 2.1 0 0 1 0 3Z" />
                <path d="m14.5 3.5 2 2" /><path d="m11.5 6.5 2 2" /><path d="m8.5 9.5 2 2" /><path d="m5.5 12.5 2 2" />
              </svg>
              <span>SIZE GUIDE</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {sizeOption.values.map((sizeVal) => {
              const currentSelectedSize = selectedOptions[sizeOption.name] || sizeOption.values[0];
              const isSelected = currentSelectedSize.toLowerCase() === sizeVal.toLowerCase();
              const isAvailable = isOptionValueAvailable(sizeOption.name, sizeVal);

              return (
                <button
                  key={sizeVal}
                  type="button"
                  onClick={() => handleOptionChange(sizeOption.name, sizeVal)}
                  className={`min-w-[52px] h-[44px] px-3.5 border text-xs tracking-widest uppercase font-medium transition-all relative flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? "bg-black text-white border-black font-semibold shadow-sm"
                      : isAvailable
                      ? "bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50"
                      : "bg-[#f7f7f7] text-gray-400 border-gray-200 hover:border-gray-300"
                  }`}
                  title={!isAvailable ? `${sizeVal} is currently out of stock` : sizeVal}
                >
                  <span>{sizeVal}</span>
                  {!isAvailable && (
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                      <span className="w-[125%] h-[1px] bg-gray-400 rotate-[-25deg]"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Availability Indicator */}
      <div className="mb-6 flex items-center gap-2">
        {isAvailableForSale ? (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
            <span className="text-[11px] tracking-widest uppercase text-emerald-800 font-medium">
              IN STOCK • READY TO DISPATCH
            </span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            <span className="text-[11px] tracking-widest uppercase text-red-600 font-medium">
              OUT OF STOCK FOR THIS SELECTION
            </span>
          </>
        )}
      </div>

      {/* Quantity Stepper */}
      <div className="flex items-center border border-gray-300 w-32 mb-8 bg-transparent">
        <button
          type="button"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={!isAvailableForSale}
          className="px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="flex-1 text-center font-medium text-sm text-black">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity(quantity + 1)}
          disabled={!isAvailableForSale}
          className="px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>

      {/* Add To Cart Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={!isAvailableForSale}
        className={`w-full py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-colors mb-4 ${
          isAvailableForSale
            ? "bg-[#f4f4f4] border border-gray-300 text-gray-800 hover:bg-gray-200 cursor-pointer"
            : "bg-gray-200 border border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isAvailableForSale ? "ADD TO CART" : "OUT OF STOCK"}
      </button>

      {/* Buy It Now Button */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={!isAvailableForSale}
        className={`w-full py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-colors mb-6 ${
          isAvailableForSale
            ? "bg-[#1a1a1a] text-white hover:bg-black cursor-pointer shadow-md"
            : "bg-gray-300 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isAvailableForSale ? "BUY IT NOW" : "SOLD OUT"}
      </button>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="bg-white max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <div>
                <h3 className="font-headline-sm text-lg tracking-[0.2em] uppercase text-black">SIZE GUIDE</h3>
                <p className="text-[11px] text-gray-500 tracking-wider uppercase mt-1">Haute Couture & Abaya Measurements</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-gray-400 hover:text-black transition-colors p-1 cursor-pointer flex items-center justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Units Switcher */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">UNIT:</span>
              <button
                type="button"
                onClick={() => setSizeUnit("in")}
                className={`px-3 py-1 text-[11px] tracking-wider uppercase font-medium border transition-colors cursor-pointer ${
                  sizeUnit === "in" ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                INCHES
              </button>
              <button
                type="button"
                onClick={() => setSizeUnit("cm")}
                className={`px-3 py-1 text-[11px] tracking-wider uppercase font-medium border transition-colors cursor-pointer ${
                  sizeUnit === "cm" ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"
                }`}
              >
                CM
              </button>
            </div>

            {/* Measurements Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs text-left tracking-wider">
                <thead className="bg-gray-100 text-gray-800 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-gray-200">SIZE</th>
                    <th className="p-3 border-b border-gray-200">BUST</th>
                    <th className="p-3 border-b border-gray-200">WAIST</th>
                    <th className="p-3 border-b border-gray-200">HIPS</th>
                    <th className="p-3 border-b border-gray-200">LENGTH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SIZE_GUIDE_DATA.map((row) => (
                    <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-semibold text-black">{row.size}</td>
                      <td className="p-3 text-gray-600">{sizeUnit === "in" ? `${row.bustIn}"` : `${row.bustCm} cm`}</td>
                      <td className="p-3 text-gray-600">{sizeUnit === "in" ? `${row.waistIn}"` : `${row.waistCm} cm`}</td>
                      <td className="p-3 text-gray-600">{sizeUnit === "in" ? `${row.hipIn}"` : `${row.hipCm} cm`}</td>
                      <td className="p-3 text-gray-600">{sizeUnit === "in" ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fit Notes */}
            <div className="bg-[#f9f9f9] border border-gray-200 p-4 text-xs text-gray-600 space-y-2 leading-relaxed">
              <p className="font-semibold text-black uppercase tracking-wider text-[11px]">Fit & Styling Advice:</p>
              <p>• <strong>Abayas:</strong> Designed for an elegant, modest drape. Select length according to your height (e.g. 54" for 5'2" - 5'4", 56" for 5'5" - 5'7").</p>
              <p>• <strong>Suits & Tunics:</strong> Standard true-to-size couture tailoring. If between sizes, we recommend sizing up for layering.</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="bg-black text-white px-6 py-2.5 uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
