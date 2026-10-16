import Image from "next/image";
import Link from "next/link";
import { getShopifyProducts, getShopifyCollections } from "@/lib/shopify";

const fallbackProducts = [
  {
    id: "1",
    tag: "SAVE 35%",
    title: "Tropical Style Printed Shirt",
    category: "Pret Collection",
    price: "RS. 1,245.00",
    priceAed: "AED 530",
    imageUrl: "/IMG_6494.JPG",
  },
  {
    id: "2",
    tag: "SAVE 35%",
    title: "Ethereal Green Floral Tunic",
    category: "Summer Edit",
    price: "RS. 1,500.00",
    priceAed: "AED 600",
    imageUrl: "/IMG_6545.JPG",
  },
  {
    id: "3",
    tag: "SAVE 35%",
    title: "Blue Printed Set",
    category: "Pret Collection",
    price: "RS. 1,125.00",
    priceAed: "AED 450",
    imageUrl: "/IMG_6494.JPG",
  },
  {
    id: "4",
    tag: "SAVE 35%",
    title: "Red Floral Tunic",
    category: "Summer Edit",
    price: "RS. 1,350.00",
    priceAed: "AED 550",
    imageUrl: "/IMG_6545.JPG",
  },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ collection?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentCollection = resolvedSearchParams?.collection;

  const [shopifyProducts, liveCollections] = await Promise.all([
    getShopifyProducts(currentCollection, 50),
    getShopifyCollections(50),
  ]);

  const products = shopifyProducts.length > 0 ? shopifyProducts : fallbackProducts;

  const activeCollectionObj = liveCollections.find((c) => c.handle === currentCollection);
  const collectionTitle = activeCollectionObj
    ? activeCollectionObj.title
    : currentCollection
    ? currentCollection
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Ready to Wear";

  // Build collection tabs dynamically from Shopify with fallback
  const collectionTabs = [
    { label: "All", href: "/shop", active: !currentCollection },
    ...(liveCollections.length > 0
      ? liveCollections.map((col) => ({
          label: col.title,
          href: `/shop?collection=${col.handle}`,
          active: currentCollection === col.handle,
        }))
      : [
          { label: "Premium Abaya", href: "/shop?collection=premium-abaya", active: currentCollection === "premium-abaya" },
          { label: "Abaya", href: "/shop?collection=abaya", active: currentCollection === "abaya" },
          { label: "Pakistani Suit", href: "/shop?collection=pakistani-suit", active: currentCollection === "pakistani-suit" },
          { label: "Premium Pakistani Suits", href: "/shop?collection=premium-pakistani-suit", active: currentCollection === "premium-pakistani-suit" },
          { label: "Co-ords Sets", href: "/shop?collection=coords", active: currentCollection === "coords" },
        ]),
  ];

  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-[40px] md:pt-[60px] pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="text-[10px] md:text-[11px] text-gray-400 tracking-widest uppercase mb-8 mt-4">
          <Link href="/" className="hover:text-black transition-colors">Home</Link> / 
          <Link href="/shop" className="mx-2 hover:text-black transition-colors">Shop</Link> / 
          <span className="mx-2 text-gray-800">{collectionTitle}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl text-center font-light tracking-[0.1em] uppercase mb-12">
          {collectionTitle}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[10px] md:text-[11px] tracking-widest uppercase mb-8">
          {collectionTabs.map((tab, idx) => (
            <div key={tab.label} className="flex items-center gap-3 md:gap-6">
              <Link
                href={tab.href}
                className={`transition-colors font-medium ${
                  tab.active ? "text-black border-b border-black pb-0.5 font-semibold" : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </Link>
              {idx < collectionTabs.length - 1 && <span className="text-gray-300">|</span>}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-center border-t border-b border-gray-200 py-3 mb-8 text-[11px] tracking-[0.2em] text-gray-600 uppercase font-medium">
          {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any) => {
            const tag = product.tag || (product.tags && product.tags[0]);
            const comparePrice = product.originalPrice || product.priceAed;
            const linkHref = product.handle ? `/product/${product.handle}` : `/product/${product.id}`;

            return (
              <Link key={product.id} href={linkHref} className="group flex flex-col relative cursor-pointer block">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.title}
                    src={product.imageUrl}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  {tag && (
                    <span className="absolute top-4 left-4 bg-[#e22d2d] text-white text-[10px] tracking-widest px-2 py-1 uppercase z-20">
                      {tag}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[11px] md:text-xs text-gray-600 tracking-widest uppercase mb-1 truncate">
                    {product.title}
                  </h3>
                  <span className="font-bold text-[11px] md:text-sm text-black uppercase mb-2">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs tracking-widest">
                    <span className="text-[#e22d2d] font-medium">{product.price}</span>
                    {comparePrice && (
                      <span className="text-gray-400 line-through">{comparePrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </main>
  );
}
