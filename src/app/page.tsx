import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import ArtfulEdit from "@/components/ArtfulEdit";
import BrandStory from "@/components/BrandStory";
import InstagramReels from "@/components/InstagramReels";
import OurStores from "@/components/OurStores";
import { getShopifyProducts, getShopifyCollections } from "@/lib/shopify";

export default async function Home() {
  const [shopifyProducts, liveCollections] = await Promise.all([
    getShopifyProducts(undefined, 50),
    getShopifyCollections(50),
  ]);

  return (
    <>
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          <Hero />
          <CategoryTiles />
          <ArtfulEdit initialProducts={shopifyProducts} initialCollections={liveCollections} />
          <BrandStory />
          <InstagramReels />
          <OurStores />
        </div>
      </main>
    </>
  );
}
