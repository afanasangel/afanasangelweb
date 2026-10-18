"use client";

import React, { useState } from "react";
import Link from "next/link";

interface InstagramReel {
  id: string;
  title: string;
  category: string;
  views?: string;
  date?: string;
}

const REELS: InstagramReel[] = [
  {
    id: "DYmXZfxo_M-",
    title: "Premium Pakistani Gown & Bridal Collection",
    category: "Pakistani Suits",
    views: "24.5K views",
    date: "Latest",
  },
  {
    id: "DT0JQgOiS8r",
    title: "Handpicked Luxury Abayas with Fine Handwork",
    category: "Abayas",
    views: "18.2K views",
    date: "Featured",
  },
  {
    id: "DZuTKHXOZeq",
    title: "Exclusive Designer Pakistani Suits - Part 2",
    category: "New Arrivals",
    views: "31.4K views",
    date: "Trending",
  },
  {
    id: "DV8lS2ACBjB",
    title: "In-Store Showcase & Walkthrough | Kasaragod Store",
    category: "Store Visit",
    views: "15.9K views",
    date: "In-Store",
  },
];

export default function InstagramReels() {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#fcfbfa] py-16 md:py-24 border-y border-[#ede8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#e8e2d9] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-amber-900/80">
                Watch & Shop The Feed
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-zinc-900 tracking-tight">
              Latest Reels from @afanasangel
            </h3>
            <p className="text-sm text-zinc-600 mt-1">
              Tap any reel to play directly, browse our newest styles, and see real fabrics in motion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/afanasangel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white text-xs font-medium tracking-wider uppercase hover:opacity-95 transition-all shadow-sm hover:shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Follow @afanasangel</span>
            </Link>
          </div>
        </div>

        {/* Reels Preview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => {
            const isPlaying = activeReelId === reel.id;

            return (
              <div
                key={reel.id}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#ede7de] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Embed or Interactive Preview Area */}
                <div className="relative w-full aspect-[9/16] bg-zinc-950 overflow-hidden flex items-center justify-center">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      title={reel.title}
                    />
                  ) : (
                    <>
                      {/* Live Instagram Embed rendered seamlessly */}
                      <iframe
                        src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                        className="w-full h-full border-0 pointer-events-auto"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={reel.title}
                      />
                    </>
                  )}
                </div>

                {/* Card Footer with Direct Instagram Link & Info */}
                <div className="p-4 bg-white flex flex-col justify-between flex-grow border-t border-[#f0ece5]">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-amber-900/80 font-medium tracking-wider uppercase mb-1">
                      <span>{reel.category}</span>
                      <span className="text-zinc-400 font-normal">{reel.views}</span>
                    </div>
                    <h4 className="text-sm font-medium text-zinc-900 line-clamp-2 leading-snug">
                      {reel.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      href={`https://www.instagram.com/reel/${reel.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:text-amber-700 transition-colors"
                    >
                      <span>Open on Instagram</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                    </Link>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-medium">
                      {reel.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">
            Tag <span className="font-semibold text-zinc-800">@afanasangel</span> on Instagram to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
