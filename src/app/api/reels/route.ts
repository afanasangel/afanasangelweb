import { NextResponse } from "next/server";

export interface DynamicReelItem {
  id: string;
  videoSrc: string;
  poster?: string;
  instagramUrl: string;
  title: string;
  category?: string;
}

// Fallback high quality reel list in case external feed or token is updating
const DEFAULT_REELS: DynamicReelItem[] = [
  {
    id: "DYmXZfxo_M-",
    videoSrc: "/reels/DYmXZfxo_M-.mp4",
    poster: "/reels/DYmXZfxo_M-.jpg",
    instagramUrl: "https://www.instagram.com/reel/DYmXZfxo_M-/",
    title: "Premium Pakistani Gown & Bridal Collection",
    category: "Pakistani Suits",
  },
  {
    id: "DT0JQgOiS8r",
    videoSrc: "/reels/DT0JQgOiS8r.mp4",
    poster: "/reels/DT0JQgOiS8r.jpg",
    instagramUrl: "https://www.instagram.com/reel/DT0JQgOiS8r/",
    title: "Imported Luxury Abayas with Fine Handwork",
    category: "Abayas",
  },
  {
    id: "DZuTKHXOZeq",
    videoSrc: "/reels/DZuTKHXOZeq.mp4",
    poster: "/reels/DZuTKHXOZeq.jpg",
    instagramUrl: "https://www.instagram.com/reel/DZuTKHXOZeq/",
    title: "Pakistani Suits Collection Part 2",
    category: "New Arrivals",
  },
  {
    id: "DV8lS2ACBjB",
    videoSrc: "/reels/DV8lS2ACBjB.mp4",
    poster: "/reels/DV8lS2ACBjB.jpg",
    instagramUrl: "https://www.instagram.com/reel/DV8lS2ACBjB/",
    title: "In-Store Showcase | Kasaragod Store",
    category: "Store Visit",
  },
  {
    id: "DYbqJ-aJZrm",
    videoSrc: "/reels/DYbqJ-aJZrm.mp4",
    poster: "/reels/DYbqJ-aJZrm.jpg",
    instagramUrl: "https://www.instagram.com/reel/DYbqJ-aJZrm/",
    title: "Designer Pakistani Suits Maryam Trade Centre",
    category: "Pakistani Suits",
  },
];

export const revalidate = 60; // Refresh cache every 60 seconds

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const igUserId = process.env.INSTAGRAM_USER_ID;

    // 1. If official Instagram Graph API access token is provided
    if (accessToken && igUserId) {
      const graphRes = await fetch(
        `https://graph.facebook.com/v22.0/${igUserId}/media?fields=id,caption,media_type,media_product_type,media_url,permalink&limit=10&access_token=${accessToken}`,
        { next: { revalidate: 60 } }
      );

      if (graphRes.ok) {
        const json = await graphRes.json();
        const apiReels = (json.data || [])
          .filter((item: any) => item.media_type === "VIDEO" && item.media_url)
          .map((item: any) => ({
            id: item.id,
            videoSrc: item.media_url,
            instagramUrl: item.permalink || `https://www.instagram.com/afanasangel`,
            title: item.caption?.slice(0, 60) || "Latest AFANA’S Angel Reel",
            category: "New Release",
          }));

        if (apiReels.length > 0) {
          return NextResponse.json({ reels: apiReels, source: "live_api" });
        }
      }
    }

    // 2. If a custom feed URL / webhook endpoint is configured in env
    const customFeedUrl = process.env.INSTAGRAM_FEED_URL;
    if (customFeedUrl) {
      const feedRes = await fetch(customFeedUrl, { next: { revalidate: 60 } });
      if (feedRes.ok) {
        const customData = await feedRes.json();
        if (Array.isArray(customData) && customData.length > 0) {
          return NextResponse.json({ reels: customData, source: "custom_feed" });
        }
      }
    }

    // 3. Fallback to current curated list of active reels
    return NextResponse.json({ reels: DEFAULT_REELS, source: "cached" });
  } catch (error) {
    console.error("Error fetching dynamic reels:", error);
    return NextResponse.json({ reels: DEFAULT_REELS, source: "fallback" });
  }
}
