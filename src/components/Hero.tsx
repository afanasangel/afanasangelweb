"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/hero-bridal-v2.jpg",
    mobileImage: "/hero-bridal-mobile.webp",
    category: "BRIDAL COLLECTION",
    title: "LUXURY",
    href: "/shop",
  },
  {
    id: 2,
    image: "/hero-abaya-v2.jpg",
    mobileImage: "/hero-abaya-mobile.webp",
    category: "MODEST ELEGANCE",
    title: "ABAYA",
    href: "/shop",
  },
  {
    id: 3,
    image: "/hero-kurtha-v2.jpg",
    mobileImage: "/hero-kurtha-mobile.webp",
    category: "PAKISTANI SUIT",
    title: "PREMIUM KURTHA",
    href: "/shop",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-end justify-start overflow-hidden bg-black">
      {slides.map((slide, index) => {
        // Render slide 0 immediately for instant SSR paint. Only mount background slides once client hydrates.
        if (index > 0 && !mounted) return null;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Single responsive image element: eliminates dual-image download on mobile & desktop */}
            <picture className="absolute inset-0 w-full h-full">
              <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
              <img
                src={slide.image}
                alt={slide.title}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding={index === 0 ? "sync" : "async"}
                className="w-full h-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
          </div>
        );
      })}
      
      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-16 flex flex-col items-start text-left">
        <p className="font-label-caps-sm text-xs md:text-sm uppercase text-white tracking-[0.25em] mb-2 drop-shadow-md">
          {slides[currentSlide].category}
        </p>
        <h1 className="font-display-hero text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-widest drop-shadow-lg uppercase">
          {slides[currentSlide].title}
        </h1>
        <Link
          href={slides[currentSlide].href}
          className="text-white border-b-2 border-white pb-1 font-label-caps-sm text-xs md:text-sm uppercase tracking-widest hover:text-gray-300 hover:border-gray-300 transition-colors"
        >
          SHOP NOW
        </Link>
      </div>

      {/* Scroll Indicator (Middle) */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-label-caps-sm text-[10px] uppercase tracking-widest">
          SCROLL NOW
        </span>
        <svg className="w-5 h-5 animate-bounce stroke-current stroke-2" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Slider Controls (Right) */}
      <div className="absolute bottom-10 right-4 md:right-12 z-20 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
