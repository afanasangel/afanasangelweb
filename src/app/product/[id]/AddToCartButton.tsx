"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

type AddToCartProps = {
  product: {
    id: string;
    title: string;
    sku: string;
    price: string;
    priceNumeric: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: AddToCartProps) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      title: product.title,
      sku: product.sku,
      price: product.price,
      priceNumeric: product.priceNumeric,
      image: product.image,
      quantity,
    });
  };

  return (
    <>
      <div className="flex items-center border border-gray-300 w-32 mb-8 bg-transparent">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          -
        </button>
        <span className="flex-1 text-center font-medium text-sm">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        className="w-full bg-[#f4f4f4] border border-gray-300 text-gray-600 py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-gray-200 transition-colors mb-4"
      >
        ADD TO CART
      </button>

      <button
        onClick={() => openCart()}
        className="w-full bg-[#1a1a1a] text-white py-4 uppercase tracking-[0.2em] text-xs font-medium hover:bg-black transition-colors mb-16"
      >
        BUY IT NOW
      </button>
    </>
  );
}
