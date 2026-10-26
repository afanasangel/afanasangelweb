import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import { getShopifyProductByHandle, getShopifyProducts, ShopifyProduct } from "@/lib/shopify";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getShopifyProductByHandle(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const cleanDesc =
    product.description?.replace(/<[^>]*>?/gm, "").slice(0, 160) ||
    `Explore ${product.title} from AFANA'S ANGEL. Timeless elegance crafted with luxurious materials.`;

  return {
    title: product.title,
    description: cleanDesc,
    alternates: {
      canonical: `/product/${product.handle}`,
    },
    openGraph: {
      title: `${product.title} | AFANA'S ANGEL`,
      description: cleanDesc,
      url: `/product/${product.handle}`,
      images: product.imageUrl
        ? [
            {
              url: product.imageUrl,
              width: 800,
              height: 1200,
              alt: product.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | AFANA'S ANGEL`,
      description: cleanDesc,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const shopifyProduct = await getShopifyProductByHandle(resolvedParams.id);
  
  if (!shopifyProduct) {
    notFound();
  }

  const allShopifyProducts = await getShopifyProducts(undefined, 8);
  
  const product = {
    title: shopifyProduct.title,
    sku: shopifyProduct.variants[0]?.sku || shopifyProduct.handle,
    price: shopifyProduct.price,
    priceNumeric: shopifyProduct.priceNumeric,
    originalPrice: shopifyProduct.originalPrice,
    installment: `Rs.${Math.round(shopifyProduct.priceNumeric / 3)}`,
    saleTag: shopifyProduct.tags[0] || (shopifyProduct.originalPrice ? "SALE" : ""),
    image: shopifyProduct.imageUrl,
    images: shopifyProduct.images && shopifyProduct.images.length > 0 ? shopifyProduct.images : [shopifyProduct.imageUrl],
    description: shopifyProduct.description || "",
    descriptionHtml: shopifyProduct.descriptionHtml || shopifyProduct.description || "",
    detail: shopifyProduct.description || shopifyProduct.title,
    fabric: shopifyProduct.tags?.find(t => t.toLowerCase().startsWith("fabric:"))?.replace(/fabric:/i, "") || "Premium Fabric",
    color: shopifyProduct.options?.find(o => o.name.toLowerCase().includes("color"))?.values?.join(", ") || "",
    variantId: shopifyProduct.variants[0]?.id,
    options: shopifyProduct.options,
    variants: shopifyProduct.variants,
  };

  // Suggestions: live Shopify products excluding current product, or fallback
  const suggestedProducts = allShopifyProducts
    .filter((p: ShopifyProduct) => p.handle !== resolvedParams.id && p.id !== product.title)
    .slice(0, 4);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    description: product.description || `AFANA'S ANGEL ${product.title}`,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "AFANA'S ANGEL",
    },
    offers: {
      "@type": "Offer",
      url: `https://afanasangel.com/product/${shopifyProduct.handle}`,
      priceCurrency: "INR",
      price: product.priceNumeric,
      availability: shopifyProduct.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "AFANA'S ANGEL",
      },
    },
  };

  const isSingleImage = product.images.length <= 1;

  return (
    <div className="min-h-screen bg-[#f3f3f3] pt-0 lg:pt-6">
      {/* Product JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb / Top Nav */}
      <div className="max-w-[1920px] mx-auto pb-16 lg:pb-24 bg-[#f3f3f3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Images + Desktop Description (Scrolls naturally) */}
          <div className={`${isSingleImage ? 'lg:col-span-6 xl:col-span-6 max-w-[620px] mx-auto lg:mx-0' : 'lg:col-span-7 xl:col-span-8'} w-full px-0 sm:px-4 lg:pl-12 lg:pr-0`}>
            <ProductGallery images={product.images} title={product.title} />

            {/* Desktop-only Description & Details (Scrolls with the images) */}
            <div className="hidden lg:block mt-12 pt-4">
              <ProductTabs
                description={product.description}
                descriptionHtml={(product as any).descriptionHtml}
                detail={product.detail}
                fabric={(product as any).fabric}
                color={(product as any).color}
              />
            </div>
          </div>
          
          {/* Right Column: Static Purchase Box (Fixed/Sticky on desktop as images & details scroll) */}
          <div className={`${isSingleImage ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-5 xl:col-span-4'} px-4 lg:pr-12 flex flex-col pt-4 lg:sticky lg:top-28`}>
            <h1 className="font-headline-sm text-xl tracking-[0.2em] uppercase mb-4 text-black">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#e22d2d] tracking-widest text-lg">{product.price}</span>
              <span className="text-gray-400 line-through tracking-widest text-lg">{product.originalPrice}</span>
            </div>
            
            {product.saleTag ? (
              <div className="mb-6">
                <span className="bg-[#e22d2d] text-white text-[10px] tracking-widest px-2 py-1 uppercase">{product.saleTag}</span>
              </div>
            ) : null}
            
            <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest">SKU: {product.sku}</p>
            
            <AddToCartButton product={{
              id: resolvedParams.id,
              variantId: (product as any).variantId,
              title: product.title,
              sku: product.sku,
              price: product.price,
              priceNumeric: product.priceNumeric,
              originalPrice: product.originalPrice,
              image: product.image,
              options: (product as any).options,
              variants: (product as any).variants,
            }} />
            
            <div className="mt-8 flex items-center gap-2 text-gray-500">
              <span className="text-[10px] tracking-[0.2em] uppercase">SHARE</span>
              <svg className="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            {/* Mobile-only Description & Details: Shown after Images, Price, Size, and Buttons */}
            <div className="block lg:hidden mt-12 pt-4 border-t border-gray-200">
              <ProductTabs
                description={product.description}
                descriptionHtml={(product as any).descriptionHtml}
                detail={product.detail}
                fabric={(product as any).fabric}
                color={(product as any).color}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like */}
      <div className="border-t border-gray-200 bg-[#f3f3f3] py-12 md:py-16 px-3 sm:px-6 md:px-12">
        <h2 className="font-headline-md text-xl md:text-2xl font-bold tracking-[0.1em] text-black mb-8 md:mb-12">
          You may also like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 max-w-[1920px] mx-auto">
           {suggestedProducts.length > 0 ? (
             suggestedProducts.map((item: ShopifyProduct) => (
               <Link href={`/product/${item.handle}`} key={item.id} className="group relative block cursor-pointer">
                  <div className="relative w-full aspect-[3/4] bg-gray-200 mb-3 sm:mb-4 overflow-hidden rounded-xs">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs uppercase tracking-wider">
                        No Image
                      </div>
                    )}
                    {item.tags[0] && (
                      <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#e22d2d] text-white text-[9px] sm:text-[10px] tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-1 uppercase z-10">{item.tags[0]}</span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-black mb-1 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-[#e22d2d] font-semibold">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 line-through text-[11px] sm:text-xs">{item.originalPrice}</span>
                    )}
                  </div>
               </Link>
             ))
            ) : null}
        </div>
      </div>
    </div>
  );
}