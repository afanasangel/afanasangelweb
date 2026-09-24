import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const products = [
    {
      id: "1",
      tag: "SAVE 35%",
      title: "Tropical Style Printed Shirt",
      category: "Pret Collection",
      price: "$145",
      priceAed: "AED 530",
      imageUrl: "/IMG_6494.JPG",
    },
    {
      id: "2",
      tag: "SAVE 35%",
      title: "Ethereal Green Floral Tunic",
      category: "Summer Edit",
      price: "$165",
      priceAed: "AED 600",
      imageUrl: "/IMG_6545.JPG",
    },
    {
      id: "3",
      tag: "SAVE 35%",
      title: "Blue Printed Set",
      category: "Pret Collection",
      price: "$125",
      priceAed: "AED 450",
      imageUrl: "/IMG_6494.JPG",
    },
    {
      id: "4",
      tag: "SAVE 35%",
      title: "Red Floral Tunic",
      category: "Summer Edit",
      price: "$150",
      priceAed: "AED 550",
      imageUrl: "/IMG_6545.JPG",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f8f8] pt-[40px] md:pt-[60px] pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="text-[10px] md:text-[11px] text-gray-400 tracking-widest uppercase mb-8 mt-4">
          <Link href="/" className="hover:text-black transition-colors">Home</Link> / 
          <span className="mx-2">Shop</span> / 
          <span className="mx-2 text-gray-800">Ready To Wear</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl text-center font-light tracking-[0.1em] uppercase mb-12">
          Ready to Wear
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[10px] md:text-[11px] tracking-widest text-gray-500 uppercase mb-8">
          <button className="hover:text-black transition-colors font-medium">Printed</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">Embroidered</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">Aura</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">Co-ords Sets</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">1 Piece</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">2 Piece</button>
          <span className="text-gray-300">|</span>
          <button className="hover:text-black transition-colors font-medium">3 Piece</button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-gray-200 py-4 mb-8 text-[10px] md:text-[11px] tracking-widest text-gray-500 uppercase">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="material-symbols-outlined text-[18px] text-gray-400 cursor-pointer hover:text-black transition-colors">grid_view</span>
            <span className="material-symbols-outlined text-[18px] text-gray-400 cursor-pointer hover:text-black transition-colors">view_module</span>
            <span className="material-symbols-outlined text-[18px] text-gray-400 cursor-pointer hover:text-black transition-colors">view_list</span>
          </div>
          <div className="text-center flex-1 font-medium">
            490 PRODUCTS
          </div>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-1 hover:text-black transition-colors font-medium">
              SORT BY <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <button className="hover:text-black transition-colors font-medium text-left border-l border-gray-200 pl-8">FILTER</button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col relative cursor-pointer block">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-4">
                <Image
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={product.title}
                  src={product.imageUrl}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-[#e22d2d] text-white text-[10px] tracking-widest px-2 py-1 uppercase z-20">
                    {product.tag}
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
                  <span className="text-gray-400 line-through">{product.priceAed}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </main>
  );
}
