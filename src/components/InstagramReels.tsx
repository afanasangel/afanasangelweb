"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

interface ReelItem {
  id: string;
  videoSrc: string;
  instagramUrl: string;
  title: string;
}

const INITIAL_REELS: ReelItem[] = [
  {
    id: "DYmXZfxo_M-",
    videoSrc: "/reels/DYmXZfxo_M-.mp4",
    instagramUrl: "https://www.instagram.com/reel/DYmXZfxo_M-/",
    title: "Premium Pakistani Gown & Bridal Collection",
  },
  {
    id: "DT0JQgOiS8r",
    videoSrc: "/reels/DT0JQgOiS8r.mp4",
    instagramUrl: "https://www.instagram.com/reel/DT0JQgOiS8r/",
    title: "Imported Luxury Abayas with Fine Handwork",
  },
  {
    id: "DZuTKHXOZeq",
    videoSrc: "/reels/DZuTKHXOZeq.mp4",
    instagramUrl: "https://www.instagram.com/reel/DZuTKHXOZeq/",
    title: "Pakistani Suits Collection Part 2",
  },
  {
    id: "DV8lS2ACBjB",
    videoSrc: "/reels/DV8lS2ACBjB.mp4",
    instagramUrl: "https://www.instagram.com/reel/DV8lS2ACBjB/",
    title: "In-Store Showcase | Kasaragod Store",
  },
  {
    id: "DYbqJ-aJZrm",
    videoSrc: "/reels/DYbqJ-aJZrm.mp4",
    instagramUrl: "https://www.instagram.com/reel/DYbqJ-aJZrm/",
    title: "Designer Pakistani Suits Maryam Trade Centre",
  },
];

function ReelCard({ reel }: { reel: ReelItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const [isInView, setIsInView] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (videoRef.current && isPlaying) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={cardRef}
      onClick={togglePlay}
      className="group relative flex-shrink-0 w-[68vw] max-w-[280px] sm:w-[260px] md:w-[280px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-black select-none border border-stone-200/50 snap-center"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={isInView ? reel.videoSrc : undefined}
        preload="none"
        className="w-full h-full object-cover"
        playsInline
        loop
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Mute/Unmute Button (Top Right) */}
      <button
        onClick={toggleMute}
        type="button"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/75 transition-colors"
      >
        {isMuted ? (
          <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      {/* Play/Pause Center Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 backdrop-blur-[1px]">
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform transform scale-100">
            <svg className="w-7 h-7 fill-current ml-1" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}

      {/* Subtle Bottom Title & Link to Reel */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 pt-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-between opacity-90 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-[11px] font-medium tracking-wide truncate pr-2 drop-shadow-sm">
          {reel.title}
        </span>
        <Link
          href={reel.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
          title="Open Reel on Instagram"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function InstagramReels() {
  const [reels, setReels] = useState<ReelItem[]>(INITIAL_REELS);

  useEffect(() => {
    // Dynamic fetch: checks for updated reels every time page loads
    async function fetchLatestReels() {
      try {
        const res = await fetch("/api/reels");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.reels) && data.reels.length > 0) {
            setReels(data.reels);
          }
        }
      } catch (err) {
        // Keeps initial fallback reels if network fails
      }
    }

    fetchLatestReels();
  }, []);

  return (
    <section className="w-full bg-[#fcfbfa] py-12 md:py-20 border-y border-[#ede8e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-zinc-900 tracking-tight">
              AFANA’S Angel Diaries
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 mt-1">
              Watch real previews of our latest abayas &amp; Pakistani suits
            </p>
          </div>

          <Link
            href="https://www.instagram.com/afanasangel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-700 transition-colors shrink-0"
          >
            <span>View All</span>
            <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Dynamic Video Reel Cards: Side-scrolling carousel on mobile & desktop matching OurStores */}
        <div className="flex items-center gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory scroll-smooth">
          {reels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}
