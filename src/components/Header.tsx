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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    ? "fixed top-0 w-full z-40 transition-colors duration-300"
    : "sticky top-0 w-full z-40 bg-black transition-colors duration-300";

  const textColor = isTransparent ? "text-white" : "text-white";
  const hoverTextColor = isTransparent ? "hover:text-gray-200" : "hover:text-gray-300";
  const borderColor = isTransparent ? "border-transparent" : "border-gray-800";
  const bgClass = isTransparent ? "bg-transparent" : "bg-black";
  const shadowClass = isTransparent ? "shadow-none" : "shadow-md shadow-black/50";

  return (
    <>
      <div className={headerClass} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className={`w-full bg-[#1a1a1a] text-white py-2 px-4 flex items-center justify-center gap-6 text-[11px] tracking-[0.1em] md:tracking-[0.2em] font-medium uppercase`}>
          <span className="material-symbols-outlined text-[16px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">chevron_left</span>
          <span>
            UNLOCK FREE SHIPPING ON NATIONWIDE PAID ORDERS <Link href="#" className="underline font-bold ml-1">SHOP NOW</Link>
          </span>
          <span className="material-symbols-outlined text-[16px] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">chevron_right</span>
        </div>
        <header className={`w-full border-b ${borderColor} ${bgClass} ${shadowClass} transition-all duration-300`}>
          <div className="w-full px-4 md:px-8 h-[60px] md:h-[80px] grid grid-cols-3 items-center">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center justify-start">
              <button
                className={`${textColor} ${hoverTextColor} transition-colors`}
                type="button"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="material-symbols-outlined text-2xl md:text-3xl">menu</span>
              </button>
            </div>
            
            {/* Center: Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo-transparent.png" 
                  alt="Afana's Angel" 
                  width={1007} 
                  height={318} 
                  className={`object-contain w-[130px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-auto transition-all duration-300 ${isTransparent ? 'brightness-125' : ''}`}
                  priority
                />
              </Link>
            </div>

            {/* Right: Icons */}
            <div className={`flex items-center justify-end gap-5 ${textColor}`}>
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

      {/* Side Menu Panel */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 left-0 h-full w-[300px] bg-white z-50 transform transition-transform duration-300 flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <span className="text-lg font-medium tracking-widest uppercase">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-black">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
        <nav className="flex flex-col py-6 px-6 gap-6 overflow-y-auto">
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Budget Friendly Abaya
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Abaya
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Premium Abaya
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Pakistani Suit
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Premium Pakistani Suits
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors" href="/shop">
            Bridal Collections
          </Link>
        </nav>
      </div>
    </>
  );
}
