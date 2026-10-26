import { MetadataRoute } from "next";
import { getShopifyProducts, getShopifyCollections } from "@/lib/shopify";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://afanasangel.com");

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/return-exchange-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic Products
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getShopifyProducts(undefined, 100);
    productRoutes = products
      .filter((p) => Boolean(p.handle))
      .map((product) => ({
        url: `${SITE_URL}/product/${product.handle}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Failed to generate sitemap product routes:", error);
  }

  // Dynamic Collections / Shop Filters
  let collectionRoutes: MetadataRoute.Sitemap = [];
  try {
    const collections = await getShopifyCollections(50);
    collectionRoutes = collections
      .filter((c) => Boolean(c.handle))
      .map((collection) => ({
        url: `${SITE_URL}/shop?collection=${collection.handle}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch (error) {
    console.error("Failed to generate sitemap collection routes:", error);
  }

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
