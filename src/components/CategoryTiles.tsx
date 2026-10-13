import Link from "next/link";
import Image from "next/image";

export default function CategoryTiles() {
  return (
    <section className="max-w-7xl mx-auto px-gutter py-space-3xl w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
        <div>
          <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary block mb-space-xs">
            Curated Haute Edits
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">
            Explore By Universe
          </h2>
        </div>
        <p className="font-body-md text-body-md text-secondary max-w-md">
          From fluid silk jalabiyas tailored for balmy evenings to sculpted bridal creations designed to endure generations.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {/* Category 1 */}
        <Link
          href="/shop?collection=abaya"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-[700px]"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Abaya"
            src="/cat_abaya.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-headline-md text-white mb-4 uppercase tracking-widest leading-snug">
              Abaya
            </h3>
            <span className="font-label-caps-sm text-sm uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>
        {/* Category 2 */}
        <Link
          href="/shop?collection=premium-abaya"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-[700px]"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Premium Abaya"
            src="/cat_premium_abaya.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-headline-md text-white mb-4 uppercase tracking-widest leading-snug">
              Premium Abaya
            </h3>
            <span className="font-label-caps-sm text-sm uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>
        {/* Category 3 */}
        <Link
          href="/shop?collection=pakistani-suit"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-[700px]"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Pakistani Suit"
            src="/cat_pakistani_suit.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-headline-md text-white mb-4 uppercase tracking-widest leading-snug">
              Pakistani Suit
            </h3>
            <span className="font-label-caps-sm text-sm uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>
        {/* Category 4 */}
        <Link
          href="/shop?collection=premium-pakistani-suit"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-[700px]"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Premium Pakistani Suits"
            src="/cat_premium_pakistani_suit.jpg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-8 left-8 right-8 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-headline-md text-white mb-4 uppercase tracking-widest leading-snug">
              Premium Pakistani<br/>Suits
            </h3>
            <span className="font-label-caps-sm text-sm uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
