import Image from "next/image";
import Link from "next/link";

interface Store {
  id: string;
  badge?: string;
  name: string;
  cityState: string;
  address: string;
  phone: string;
  phoneRaw: string;
  instagram: string;
  instagramUrl: string;
  mapUrl: string;
  imageUrl: string;
  hasWhatsApp?: boolean;
  whatsappUrl?: string;
}

const STORES: Store[] = [
  {
    id: "india-kasaragod",
    name: "Afana's Angel India",
    cityState: "Kasaragod, Kerala",
    address: "Ground Floor, Maryam Trade Centre, Old Bus Stand, Kasaragod, Kerala 671121",
    phone: "+91 85904 44448",
    phoneRaw: "+918590444448",
    instagram: "@afanasangel",
    instagramUrl: "https://www.instagram.com/afanasangel",
    mapUrl: "https://maps.app.goo.gl/4Br6NzsU8kEqtmgk8?g_st=iw",
    imageUrl: "/store_india_real.jpg",
  },
];

export default function OurStores() {
  return (
    <section className="w-full bg-[#fafafa] py-12 md:py-16 border-t border-gray-200" id="our-stores">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-8 md:mb-10">
          <h2 className="font-headline-md text-2xl md:text-3xl font-bold tracking-tight text-black">
            Our Stores
          </h2>
        </div>

        {/* Stores Container */}
        <div className="max-w-2xl">
          {STORES.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch w-full"
            >
              {/* Store Image Container */}
              <div className="relative w-full sm:w-[220px] md:w-[260px] aspect-[4/3] sm:aspect-auto sm:min-h-[290px] shrink-0 bg-gray-100 overflow-hidden">
                <Image
                  src={store.imageUrl}
                  alt={store.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 84vw, 260px"
                />
              </div>

              {/* Store Information Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-4">
                    {store.cityState}
                  </p>

                  <div className="space-y-2.5 text-xs text-gray-700">
                    {/* Address with Map pin icon */}
                    <div className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[17px] text-gray-500 shrink-0 mt-0.5">
                        location_on
                      </span>
                      <span className="leading-relaxed">
                        {store.address}
                      </span>
                    </div>

                    {/* Phone with call icon */}
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[17px] text-gray-500 shrink-0">
                        call
                      </span>
                      <a
                        href={`tel:${store.phoneRaw}`}
                        className="hover:text-black transition-colors font-medium"
                      >
                        {store.phone}
                      </a>
                    </div>

                    {/* Instagram handle */}
                    <div className="flex items-center gap-2.5">
                      <svg
                        className="w-4 h-4 text-gray-500 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <a
                        href={store.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors"
                      >
                        {store.instagram}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 space-y-2 pt-2">
                  {/* Primary Get Directions Button */}
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#4a2417] hover:bg-[#381a10] text-white py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">near_me</span>
                    <span>Get directions</span>
                  </a>

                  {/* Secondary Buttons (Call store / WhatsApp) */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${store.phoneRaw}`}
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-2 px-3 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base text-gray-600">call</span>
                      <span>Call store</span>
                    </a>

                    {store.hasWhatsApp && store.whatsappUrl && (
                      <a
                        href={store.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-2 px-3 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
