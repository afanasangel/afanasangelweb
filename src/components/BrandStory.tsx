import Link from "next/link";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="max-w-7xl mx-auto px-gutter py-space-3xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container">
            <Image
              className="w-full h-full object-cover"
              alt="Fashion designer Afana Shammaz hands inspecting gold embroidery threads"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs-zXZDfqRG4OgjKk5F4gIcBQI4IBaS1S7l32K7cFCg8ynnM7i-hvpfoPV05Dtz3bQr0nb6a-1jpBnktQ6G5iMj28VswaBj6MOSZ7E5reWmkk5cPest1jM_GFPNZR9SVFj156CzZUOIVAzg9mP6gyOMU6kGqjW0xGaJmbIW3QqJ5bOrdI15__6IbgANE6RgUFULEuQxg8I7C9td-8T3ym7bx_WW_uVyFHbiQrvDfU02P82J_AReDuHXA"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-space-md -right-space-md bg-surface-container-lowest p-space-md max-w-[240px] shadow-lg hidden sm:block">
            <span className="font-headline-sm text-headline-sm text-primary block mb-1">
              Afana Shammaz
            </span>
            <span className="font-body-sm text-body-sm text-secondary block">
              Founder &amp; Creative Director
            </span>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col items-start lg:pl-space-xl">
          <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary block mb-space-xs">
            OUR STORY
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-md leading-tight">
            AFANA’S ANGEL
          </h2>
          <div className="space-y-4 font-body-md text-secondary leading-relaxed">
            <p>
              AFANA’S Angel was born in 2020 from a childhood dream of bringing authentic abayas and original Pakistani suits from the UAE to India and the world.
            </p>
            <p>
              With my husband’s love and support, I turned my dream into reality. What started as an online store has now grown into two stores and a family of over 10,000 happy customers.
            </p>
            <p>
              Our promise has always been to provide original products with quality, trust, and love. Every step of this journey has been possible because of the wonderful people who believed in us and helped us grow.
            </p>
            <p>
              From a childhood dream to a brand filled with love and gratitude, AFANA’S Angel will always be more than just a brand — it is my dream, my passion, and my heart.
            </p>
            <div className="pt-2">
              <p className="font-medium text-on-surface italic">
                With love,<br />
                <span className="font-bold not-italic">Afana Shammaz ❤️</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
