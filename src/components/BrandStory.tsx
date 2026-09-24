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
            THE ATELIER MANIFESTO
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-md leading-tight">
            Where Ethereal Grace Meets Architectural Tailoring.
          </h2>
          <p className="font-body-lg text-body-lg text-secondary mb-space-md">
            Founded on the principle that luxury modest fashion should possess both the gravitas of Middle Eastern heritage and the crisp precision of global haute couture, Afana's Angel transforms ancestral textiles into modern icons.
          </p>
          <p className="font-body-md text-body-md text-secondary mb-space-xl">
            Every piece is designed within our private Downtown Dubai salon, woven from organic unadulterated silks, and rendered with custom 24k gold bullion needlework that requires weeks of focused artisanal concentration.
          </p>
          <div className="grid grid-cols-2 gap-space-lg w-full mb-space-xl">
            <div className="bg-surface-container-low p-space-md">
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-primary tracking-wider block mb-1">
                BESPOKE SIZING
              </span>
              <p className="font-body-sm text-body-sm text-secondary">
                Every silhouette can be customized to your precise measurements with our master tailors.
              </p>
            </div>
            <div className="bg-surface-container-low p-space-md">
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-primary tracking-wider block mb-1">
                ROYAL BRIDAL SUITE
              </span>
              <p className="font-body-sm text-body-sm text-secondary">
                Private salons available by invitation in Downtown Dubai and London Mayfair.
              </p>
            </div>
          </div>
          <Link
            href="#"
            className="bg-on-surface text-on-primary hover:bg-primary px-space-xl py-space-md font-label-caps-sm text-label-caps-sm uppercase tracking-widest transition-colors"
          >
            BOOK A PRIVATE ATELIER APPOINTMENT
          </Link>
        </div>
      </div>
    </section>
  );
}
