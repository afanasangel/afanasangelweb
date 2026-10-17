import Link from "next/link";
import Image from "next/image";

export default function CategoryTiles() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-gutter py-8 md:py-space-3xl w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-space-2xl gap-2 md:gap-space-md">
        <div>
          <span className="font-label-caps-sm text-[10px] md:text-label-caps-sm uppercase tracking-widest text-primary block mb-1 md:mb-space-xs">
            Curated Haute Edits
          </span>
          <h2 className="font-headline-xl text-2xl sm:text-3xl md:text-headline-xl text-on-surface">
            Explore By Universe
          </h2>
        </div>
        <p className="font-body-md text-xs sm:text-sm md:text-body-md text-secondary max-w-md">
          From fluid silk jalabiyas tailored for balmy evenings to sculpted bridal creations designed to endure generations.
        </p>
      </div>

      {/* Grid: 2 columns on mobile, 3 columns on tablet/desktop, 6 total categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-3 lg:gap-4">
        {/* Category 1: Abaya */}
        <Link
          href="/shop?collection=abaya"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Abaya"
            src="/cat_abaya.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Abaya
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>

        {/* Category 2: Premium Abaya */}
        <Link
          href="/shop?collection=premium-abaya"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Premium Abaya"
            src="/cat_premium_abaya.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Premium Abaya
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>

        {/* Category 3: Budget Friendly Abaya */}
        <Link
          href="/shop?collection=budget-friendly-abaya"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Budget Friendly Abaya"
            src="/cat_budget_friendly_abaya.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Budget Friendly Abaya
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>

        {/* Category 4: Pakistani Suit */}
        <Link
          href="/shop?collection=pakistani-suit"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Pakistani Suit"
            src="/cat_pakistani_suit.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Pakistani Suit
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>

        {/* Category 5: Premium Pakistani Suit */}
        <Link
          href="/shop?collection=premium-pakistani-suit"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Premium Pakistani Suits"
            src="/cat_premium_pakistani_suit_real.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Premium Pakistani Suits
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>

        {/* Category 6: Co-ord Sets */}
        <Link
          href="/shop?collection=coords"
          className="group relative overflow-hidden flex flex-col w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[9/16] lg:h-[580px] rounded-xs"
        >
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Co-ord Sets"
            src="/cat_coord_set.jpg"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 transition-opacity group-hover:opacity-100"></div>
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col items-start z-10">
            <h3 className="font-headline-md text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2 uppercase tracking-widest leading-snug">
              Co-ord Sets
            </h3>
            <span className="font-label-caps-sm text-[9px] sm:text-[11px] md:text-xs uppercase text-white tracking-widest inline-flex items-center border-b border-white pb-0.5 hover:text-gray-200 hover:border-gray-200 transition-colors">
              SHOP NOW
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
