import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";
import { getShopifyProductByHandle, getShopifyProducts, ShopifyProduct } from "@/lib/shopify";

const fallbackProducts = {
  "1": {
    title: "1 PIECE - PRINTED SHIRT - 42602310",
    sku: "001692862104",
    price: "RS. 1,245.00",
    priceNumeric: 1245.00,
    originalPrice: "RS. 2,490.00",
    installment: "Rs.477",
    saleTag: "SAVE 50%",
    image: "/IMG_6494.JPG",
    images: ["/IMG_6494.JPG"],
    detail: "Tropical Style Shirt",
    description: "Tropical Style Printed Shirt crafted in pure lawn.",
    fabric: "Lawn",
    color: "Light Mint",
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] }
    ],
    variants: [
      { id: "fb-1-xs", title: "XS", price: "RS. 1,245.00", priceNumeric: 1245.00, sku: "001692862104-XS", availableForSale: true, selectedOptions: [{ name: "Size", value: "XS" }] },
      { id: "fb-1-s", title: "S", price: "RS. 1,245.00", priceNumeric: 1245.00, sku: "001692862104-S", availableForSale: true, selectedOptions: [{ name: "Size", value: "S" }] },
      { id: "fb-1-m", title: "M", price: "RS. 1,245.00", priceNumeric: 1245.00, sku: "001692862104-M", availableForSale: true, selectedOptions: [{ name: "Size", value: "M" }] },
      { id: "fb-1-l", title: "L", price: "RS. 1,245.00", priceNumeric: 1245.00, sku: "001692862104-L", availableForSale: true, selectedOptions: [{ name: "Size", value: "L" }] },
      { id: "fb-1-xl", title: "XL", price: "RS. 1,245.00", priceNumeric: 1245.00, sku: "001692862104-XL", availableForSale: false, selectedOptions: [{ name: "Size", value: "XL" }] },
    ]
  },
  "2": {
    title: "1 PIECE - PRINTED SHIRT - 42602311",
    sku: "001692862105",
    price: "RS. 1,500.00",
    priceNumeric: 1500.00,
    originalPrice: "RS. 3,000.00",
    installment: "Rs.500",
    saleTag: "SAVE 50%",
    image: "/IMG_6545.JPG",
    images: ["/IMG_6545.JPG"],
    detail: "Ethereal Green Floral Tunic",
    description: "Ethereal Green Floral Tunic with delicate embroidery.",
    fabric: "Lawn",
    color: "Green",
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] }
    ],
    variants: [
      { id: "fb-2-xs", title: "XS", price: "RS. 1,500.00", priceNumeric: 1500.00, sku: "001692862105-XS", availableForSale: true, selectedOptions: [{ name: "Size", value: "XS" }] },
      { id: "fb-2-s", title: "S", price: "RS. 1,500.00", priceNumeric: 1500.00, sku: "001692862105-S", availableForSale: true, selectedOptions: [{ name: "Size", value: "S" }] },
      { id: "fb-2-m", title: "M", price: "RS. 1,500.00", priceNumeric: 1500.00, sku: "001692862105-M", availableForSale: true, selectedOptions: [{ name: "Size", value: "M" }] },
      { id: "fb-2-l", title: "L", price: "RS. 1,500.00", priceNumeric: 1500.00, sku: "001692862105-L", availableForSale: true, selectedOptions: [{ name: "Size", value: "L" }] },
      { id: "fb-2-xl", title: "XL", price: "RS. 1,500.00", priceNumeric: 1500.00, sku: "001692862105-XL", availableForSale: false, selectedOptions: [{ name: "Size", value: "XL" }] },
    ]
  }
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const shopifyProduct = await getShopifyProductByHandle(resolvedParams.id);
  const allShopifyProducts = await getShopifyProducts(undefined, 8);
  
  const product = shopifyProduct
    ? {
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
      }
    : (fallbackProducts[resolvedParams.id as keyof typeof fallbackProducts] || fallbackProducts["1"]);

  // Suggestions: live Shopify products excluding current product, or fallback
  const suggestedProducts = allShopifyProducts
    .filter((p: ShopifyProduct) => p.handle !== resolvedParams.id && p.id !== product.title)
    .slice(0, 4);
  
  const isSingleImage = product.images.length <= 1;

  return (
    <div className="min-h-screen bg-[#f3f3f3] pt-0 lg:pt-6">
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
              <span className="material-symbols-outlined text-sm">share</span>
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
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
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
           ) : (
             [1, 2, 3, 4].map((i) => {
               const isAlternate = i % 2 === 0;
               const sugProduct = isAlternate ? fallbackProducts["2"] : fallbackProducts["1"];
               return (
                 <Link href={`/product/${isAlternate ? "2" : "1"}`} key={i} className="group relative block cursor-pointer">
                    <div className="relative w-full aspect-[3/4] bg-gray-200 mb-3 sm:mb-4 overflow-hidden rounded-xs">
                      <Image
                        src={sugProduct.image}
                        alt={sugProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#e22d2d] text-white text-[9px] sm:text-[10px] tracking-widest px-1.5 py-0.5 sm:px-2 sm:py-1 uppercase z-10">{sugProduct.saleTag}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-medium text-black mb-1 line-clamp-2">{sugProduct.title.replace(" - 42602310", ` - 4260231${i}`).replace(" - 42602311", ` - 4260231${i}`)}</h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="text-[#e22d2d] font-semibold">{sugProduct.price}</span>
                      <span className="text-gray-400 line-through text-[11px] sm:text-xs">{sugProduct.originalPrice}</span>
                    </div>
                 </Link>
               );
             })
           )}
        </div>
      </div>
    </div>
  );
}
