import type { Metadata } from "next";
import Link from "next/link";
import OurStores from "@/components/OurStores";

export const metadata: Metadata = {
  title: "Contact Us & Our Stores",
  description: "Visit AFANA'S ANGEL flagship boutique in Kasaragod, Kerala or contact us for bespoke appointments, bridal consultations, and customer care.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us & Our Stores | AFANA'S ANGEL",
    description: "Visit AFANA'S ANGEL boutique in Kasaragod, Kerala or contact our team for bespoke styling.",
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <main className="w-full min-h-screen bg-[#faf9f7] pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Contact Us</span>
        </nav>

        {/* Page Title & Intro */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a19] block mb-2">
            Get In Touch
          </span>
          <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">
            Contact Us &amp; Our Stores
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            We would love to welcome you at our flagship boutique or assist you directly through WhatsApp and phone.
          </p>
        </div>

      </div>

      {/* Embedded Our Stores Section */}
      <OurStores />
    </main>
  );
}
