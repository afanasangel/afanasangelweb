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
  const [collections, setCollections] = useState<Array<{ id: string; title: string; handle: string }>>([
    { id: "1", title: "Budget Friendly Abaya", handle: "budget-friendly-abaya" },
    { id: "2", title: "Abaya", handle: "abaya" },
    { id: "3", title: "Premium Abaya", handle: "premium-abaya" },
    { id: "4", title: "Pakistani Suit", handle: "pakistani-suit" },
    { id: "5", title: "Premium Pakistani Suits", handle: "premium-pakistani-suit" },
    { id: "6", title: "Bridal Collections", handle: "bridal-collections" },
  ]);

  useEffect(() => {
    async function loadCollections() {
      try {
        const res = await fetch("/api/collections");
        if (res.ok) {
          const data = await res.json();
          if (data?.collections && data.collections.length > 0) {
            setCollections(data.collections);
          }
        }
      } catch (e) {
        console.error("Failed to load collections for menu:", e);
      }
    }
    loadCollections();
  }, []);

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
        <header className={`w-full border-b ${borderColor} ${bgClass} ${shadowClass} transition-all duration-300`}>
          <div className="w-full px-4 md:px-8 h-[60px] md:h-[80px] grid grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: Hamburger Menu */}
            <div className="flex items-center justify-start">
              <button
                className={`${textColor} ${hoverTextColor} transition-colors p-1`}
                type="button"
                aria-label="Open menu"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-6 h-6 md:w-7 md:h-7 stroke-current stroke-[1.75]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
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
                  className={`object-contain w-[180px] sm:w-[200px] md:w-[220px] lg:w-[260px] h-auto transition-all duration-300 ${isTransparent ? 'brightness-125' : ''}`}
                  priority
                />
              </Link>
            </div>

            {/* Right: Icons */}
            <div className={`flex items-center justify-end ${textColor}`}>
              <button onClick={openCart} type="button" aria-label="Shopping bag" className={`${hoverTextColor} transition-colors flex items-center relative p-1`}>
                <svg className="w-6 h-6 md:w-7 md:h-7 stroke-current stroke-[1.75]" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-2 ${isTransparent ? 'bg-white text-black' : 'bg-black text-white'} text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold`}>
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
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-gray-500 hover:text-black p-1">
            <svg className="w-6 h-6 stroke-current stroke-2" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col py-6 px-6 gap-6 overflow-y-auto">
          {collections.map((col) => (
            <Link
              key={col.id || col.handle}
              onClick={() => setIsMenuOpen(false)}
              className="text-[14px] uppercase tracking-[0.15em] font-medium text-gray-800 hover:text-[#cda662] transition-colors"
              href={`/shop?collection=${col.handle}`}
            >
              {col.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
