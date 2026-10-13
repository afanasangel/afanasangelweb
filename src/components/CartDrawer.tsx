"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, removeFromCart, updateQuantity, totalNumeric } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "afnasangel.myshopify.com";
    const validItems = items.filter((i) => Boolean(i.variantId));
    if (validItems.length > 0) {
      const permalink = validItems
        .map((i) => {
          const id = i.variantId!.includes("/") ? i.variantId!.split("/").pop() : i.variantId;
          return `${id}:${i.quantity}`;
        })
        .join(",");
      window.location.href = `https://${domain}/cart/${permalink}`;
    } else {
      window.location.href = `https://${domain}/cart`;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/20 flex justify-end"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-[400px] h-full bg-[#f3f3f3] shadow-2xl flex flex-col translate-x-0 transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#f3f3f3]">
          <h2 className="text-xl tracking-[0.2em] font-medium text-black uppercase">Cart</h2>
          <button onClick={closeCart} className="text-gray-500 hover:text-black">
            <span className="material-symbols-outlined font-light">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f3f3f3]">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-12 uppercase tracking-widest text-sm">
              Your cart is empty.
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex gap-4">
                  <div className="relative w-[120px] aspect-[3/4] bg-gray-200 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div className="flex flex-col flex-1 pt-1">
                    <h3 className="text-xs font-medium text-black uppercase tracking-widest mb-1 leading-relaxed">
                      {item.title}
                    </h3>
                    {item.variantTitle && item.variantTitle !== "Default Title" && (
                      <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-1 font-medium">
                        {item.variantTitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 tracking-widest mb-3">
                      {item.price}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center border border-gray-300 w-24 bg-transparent">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-medium text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs underline text-gray-500 hover:text-black transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-[#f3f3f3]">
            <p className="text-sm text-gray-700 mb-2">Add order note</p>
            <p className="text-sm text-gray-500 mb-6">
              Taxes and shipping calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#1a1a1a] text-white py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-black transition-colors mb-4 flex justify-center gap-2 cursor-pointer"
            >
              <span>CHECKOUT</span>
              <span>•</span>
              <span>RS. {totalNumeric.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </button>
            <div className="flex items-center justify-center gap-2">
              <span className="bg-[#5900d8] text-white text-[11px] font-bold px-3 py-1 rounded-sm">baadmay</span>
              <span className="text-sm text-black font-medium">
                Pay in 3 Installments of <span className="text-[#5900d8]">Rs. {(totalNumeric / 3).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
