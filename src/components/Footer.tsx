import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-outline-variant/40 mt-space-3xl pt-space-3xl pb-space-lg">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-24 mb-space-3xl">
          
          {/* Column 1: CONTACT US */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-2 font-medium">
              CONTACT US
            </h4>
            <div className="space-y-1">
              <p className="font-body-sm text-gray-500 text-xs leading-relaxed">
                Ground Floor, Maryam Trade Centre, Old Bus Stand, Kasaragod, Kerala 671121
              </p>
            </div>
            <p className="font-body-sm text-gray-600 text-xs">
              <a href="tel:+918590444448" className="hover:text-black transition-colors font-medium">
                +91 85904 44448
              </a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://www.instagram.com/afanasangel"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Afana's Angel on Instagram"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-700 transition-all flex items-center justify-center shadow-xs"
              >
                <svg
                  className="w-4 h-4"
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
              </Link>
              <Link
                href="https://www.facebook.com/share/1D7XSiyox2/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Afana's Angel on Facebook"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-700 transition-all flex items-center justify-center shadow-xs"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-3 font-medium">
              QUICK LINKS
            </h4>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop">All Collections</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=budget-friendly-abaya">Budget Friendly Abaya</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=abaya">Abaya</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=premium-abaya">Premium Abaya</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=pakistani-suits">Pakistani Suits</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=premium-pakistani-suits">Premium Pakistani Suits</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/shop?collection=bridal-collections">Bridal Collections</Link>
          </div>

          {/* Column 3: CUSTOMER SERVICES */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-3 font-medium">
              CUSTOMER SERVICES
            </h4>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/contact-us">Contact Us</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="/return-exchange-policy">Return &amp; Exchange Policy</Link>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-body-sm text-xs text-gray-500 uppercase tracking-widest">
            © 2026 - AFANA'S ANGEL
          </p>
        </div>
      </div>
    </footer>
  );
}
