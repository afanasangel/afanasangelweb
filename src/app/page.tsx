import Hero from "@/components/Hero";
import CategoryTiles from "@/components/CategoryTiles";
import ArtfulEdit from "@/components/ArtfulEdit";
import BrandStory from "@/components/BrandStory";
import Perks from "@/components/Perks";

export default function Home() {
  return (
    <>
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          <Hero />
          <CategoryTiles />
          <ArtfulEdit />
          <BrandStory />
          <Perks />
        </div>
      </main>
    </>
  );
}
