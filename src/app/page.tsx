import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import ArtfulEdit from "@/components/ArtfulEdit";
import BrandStory from "@/components/BrandStory";
import Perks from "@/components/Perks";
import { getShopifyProducts } from "@/lib/shopify";

export default async function Home() {
  const shopifyProducts = await getShopifyProducts();

  return (
    <>
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          <Hero />
          <CategoryTiles />
          <ArtfulEdit initialProducts={shopifyProducts} />
          <BrandStory />
          <Perks />
        </div>
      </main>
    </>
  );
}
