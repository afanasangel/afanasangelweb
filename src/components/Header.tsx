"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { openCart, items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHomePage && !isScrolled && !isHovered;

  const headerClass = isHomePage 
    ? "fixed top-0 w-full z-50 transition-colors duration-300"
    : "sticky top-0 w-full z-50 bg-white transition-colors duration-300";

  const textColor = isTransparent ? "text-white" : "text-gray-800";
  const hoverTextColor = isTransparent ? "hover:text-gray-200" : "hover:text-black";
  const borderColor = isTransparent ? "border-transparent" : "border-gray-100";
  const bgClass = isTransparent ? "bg-transparent" : "bg-white";
  const shadowClass = isTransparent ? "shadow-none" : "shadow-sm";

  return (
    <div className={headerClass} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`w-full bg-[#1a1a1a] text-white py-2 px-4 flex items-center justify-center gap-6 text-[11px] tracking-[0.1em] md:tracking-[0.2em] font-medium uppercase`}>
        <span className="material-symbols-outlined text-[16px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">chevron_left</span>
        <span>
          UNLOCK FREE SHIPPING ON NATIONWIDE PAID ORDERS <Link href="#" className="underline font-bold ml-1">SHOP NOW</Link>
        </span>
        <span className="material-symbols-outlined text-[16px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">chevron_right</span>
      </div>
      <header className={`w-full border-b ${borderColor} ${bgClass} ${shadowClass} transition-all duration-300`}>
        <div className="w-full px-4 md:px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
              className={`lg:hidden ${textColor} ${hoverTextColor} transition-colors mr-4`}
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Afana's Angel" 
                width={200} 
                height={60} 
                className={`object-contain w-auto h-auto max-h-[60px] transition-all duration-300`}
                priority
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-center gap-8 flex-auto">
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${isTransparent ? 'text-[#e5ca99]' : 'text-[#cda662]'} ${hoverTextColor} transition-colors`} href="/shop">
              Budget Friendly Abaya
            </Link>
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${textColor} ${hoverTextColor} transition-colors`} href="/shop">
              Abaya
            </Link>
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${textColor} ${hoverTextColor} transition-colors`} href="/shop">
              Premium Abaya
            </Link>
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${textColor} ${hoverTextColor} transition-colors`} href="/shop">
              Pakistani Suit
            </Link>
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${textColor} ${hoverTextColor} transition-colors`} href="/shop">
              Premium Pakistani Suits
            </Link>
            <Link className={`text-[12px] uppercase tracking-[0.15em] font-medium ${textColor} ${hoverTextColor} transition-colors`} href="/shop">
              Bridal Collections
            </Link>
          </nav>
          <div className={`flex items-center justify-end gap-5 flex-1 ${textColor}`}>
            <Link href="#" className={`${hoverTextColor} transition-colors flex items-center`}>
              <span className="material-symbols-outlined text-[28px] font-light">person</span>
            </Link>
            <button type="button" className={`${hoverTextColor} transition-colors flex items-center`}>
              <span className="material-symbols-outlined text-[28px] font-light">search</span>
            </button>
            <button onClick={openCart} type="button" className={`${hoverTextColor} transition-colors flex items-center relative`}>
              <span className="material-symbols-outlined text-[28px] font-light">local_mall</span>
              {totalItems > 0 && (
                <span className={`absolute -top-1 -right-2 ${isTransparent ? 'bg-white text-black' : 'bg-black text-white'} text-[10px] w-4 h-4 rounded-full flex items-center justify-center`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
