import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { getShopifyProductByHandle } from "@/lib/shopify";

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
    images: ["/IMG_6494.JPG", "/IMG_6494.JPG"],
    detail: "Tropical Style Shirt",
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
    images: ["/IMG_6545.JPG", "/IMG_6545.JPG"],
    detail: "Ethereal Green Floral Tunic",
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
        images: shopifyProduct.images.length > 1 ? shopifyProduct.images : [shopifyProduct.imageUrl, shopifyProduct.imageUrl],
        detail: shopifyProduct.description || shopifyProduct.title,
        fabric: "Lawn",
        color: "Standard",
        variantId: shopifyProduct.variants[0]?.id,
        options: shopifyProduct.options,
        variants: shopifyProduct.variants,
      }
    : (fallbackProducts[resolvedParams.id as keyof typeof fallbackProducts] || fallbackProducts["1"]);
  
  return (
    <div className="min-h-screen bg-[#f3f3f3] pt-24">
      {/* Breadcrumb / Top Nav Placeholder (optional if matching reference header exactly, but layout provides header) */}
      
      <div className="max-w-[1920px] mx-auto pb-24 bg-[#f3f3f3]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Images (using 2 column grid of same image for demo) */}
          <div className="lg:col-span-8 pl-4 lg:pl-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
               <div className="relative w-full aspect-[3/4] bg-gray-200">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
               </div>
               <div className="relative w-full aspect-[3/4] bg-gray-200 hidden md:block">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
               </div>
            </div>
          </div>
          
          {/* Right Column: Details */}
          <div className="lg:col-span-4 px-4 lg:pr-12 flex flex-col pt-4">
            <h1 className="font-headline-sm text-xl tracking-[0.2em] uppercase mb-4 text-black">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#e22d2d] tracking-widest text-lg">{product.price}</span>
              <span className="text-gray-400 line-through tracking-widest text-lg">{product.originalPrice}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-[#5900d8] text-white text-[11px] font-bold px-3 py-1 rounded-sm">baadmay</span>
              <span className="text-sm text-black font-medium">Pay in 3 Installments of <span className="text-[#5900d8]">{product.installment}</span></span>
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
            
            {/* Accordion area */}
            <div className="border-t border-gray-300 pt-6 flex items-center gap-8 mb-6">
              <button className="text-black font-semibold text-xs tracking-widest uppercase border-b-[3px] border-black pb-2">DETAILS</button>
              <button className="text-gray-500 text-xs tracking-widest uppercase hover:text-black transition-colors pb-2">DESCRIPTION</button>
            </div>
            
            <div className="text-xs text-black space-y-4 leading-relaxed font-medium">
              <p><strong>Product Detail:</strong><br/>{product.detail}</p>
              <p><strong>SHIRT</strong><br/>Printed Cross Hatch Lawn Shirt: 2.25 Meter<br/>Wider Width 58"</p>
              <p><strong>Fabric:</strong> {product.fabric}<br/><strong>Color:</strong> {product.color}</p>
              <p><strong>Note:</strong><br/>Product color may slightly vary due to photographic lighting sources or your device settings.</p>
            </div>
            
            <div className="mt-12 flex items-center gap-2 text-gray-500">
              <span className="text-[10px] tracking-[0.2em] uppercase">SHARE</span>
              <span className="material-symbols-outlined text-sm">share</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like */}
      <div className="border-t border-gray-200 bg-[#f3f3f3] py-16 px-4 md:px-12">
        <h2 className="text-center font-headline-md text-2xl tracking-[0.2em] uppercase mb-16 text-black">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-[1920px] mx-auto">
           {/* Reusing the styling for suggestions */}
           {[1, 2, 3, 4].map((i) => {
             const isAlternate = i % 2 === 0;
             const sugProduct = isAlternate ? fallbackProducts["2"] : fallbackProducts["1"];
             return (
               <Link href={`/product/${isAlternate ? "2" : "1"}`} key={i} className="group relative block cursor-pointer">
                  <div className="relative w-full aspect-[3/4] bg-gray-200 mb-6 overflow-hidden">
                    <Image
                      src={sugProduct.image}
                      alt={sugProduct.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <span className="absolute top-4 left-4 bg-[#e22d2d] text-white text-[10px] tracking-widest px-2 py-1 uppercase z-10">{sugProduct.saleTag}</span>
                  </div>
                  <h3 className="text-xs tracking-widest uppercase text-black mb-2">{sugProduct.title.replace(" - 42602310", ` - 4260231${i}`).replace(" - 42602311", ` - 4260231${i}`)}</h3>
                  <div className="flex items-center gap-3 text-xs tracking-widest">
                    <span className="text-[#e22d2d] font-medium">{sugProduct.price}</span>
                    <span className="text-gray-400 line-through">{sugProduct.originalPrice}</span>
                  </div>
               </Link>
             );
           })}
        </div>
      </div>
    </div>
  );
}
