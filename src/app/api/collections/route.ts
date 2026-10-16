import { NextResponse } from "next/server";
import { getShopifyCollections } from "@/lib/shopify";

export const revalidate = 10;

export async function GET() {
  try {
    const collections = await getShopifyCollections(50);
    return NextResponse.json({ collections });
  } catch (error) {
    console.error("Failed to fetch collections API:", error);
    return NextResponse.json({ collections: [] }, { status: 500 });
  }
}
