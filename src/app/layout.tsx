import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://afanasangel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AFANA'S ANGEL | Haute Couture & Luxury Abayas",
    template: "%s | AFANA'S ANGEL",
  },
  description:
    "Discover bespoke couture abayas, luxury Pakistani suits, and handcrafted modest wear crafted with timeless elegance, premium fabrics, and royal embellishments.",
  keywords: [
    "Afana's Angel",
    "Afanas Angel",
    "Luxury Abayas",
    "Premium Abayas",
    "Pakistani Suits",
    "Modest Fashion",
    "Haute Couture Dubai",
    "Kasaragod Boutique",
    "Co-ord Sets",
    "Designer Abayas",
  ],
  authors: [{ name: "AFANA'S ANGEL", url: SITE_URL }],
  creator: "AFANA'S ANGEL",
  publisher: "AFANA'S ANGEL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "AFANA'S ANGEL",
    title: "AFANA'S ANGEL | Haute Couture & Luxury Abayas",
    description:
      "Discover bespoke couture abayas, luxury Pakistani suits, and handcrafted modest wear crafted with timeless elegance and premium fabrics.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "AFANA'S ANGEL Haute Couture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFANA'S ANGEL | Haute Couture & Luxury Abayas",
    description:
      "Discover bespoke couture abayas, luxury Pakistani suits, and handcrafted modest wear crafted with timeless elegance and premium fabrics.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "b0d3cf536190e6b0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "AFANA'S ANGEL",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      "Haute couture modest fashion, luxury designer abayas, and Pakistani suits crafted with timeless royal elegance.",
    telephone: "+91 85904 44448",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ground Floor, Maryam Trade Centre, Old Bus Stand",
      addressLocality: "Kasaragod",
      addressRegion: "Kerala",
      postalCode: "671121",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/afanasangel",
      "https://www.facebook.com/share/1D7XSiyox2/?mibextid=wwXIfr",
    ],
    priceRange: "₹₹₹",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
