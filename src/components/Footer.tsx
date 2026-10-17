import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-outline-variant/40 mt-space-3xl pt-space-3xl pb-space-lg">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-24 mb-space-3xl">
          
          {/* Column 1: CONTACT US */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-2 font-medium">
              CONTACT US
            </h4>
            <div className="space-y-1">
              <p className="font-body-sm font-medium text-gray-800">Flagship Store (India):</p>
              <p className="font-body-sm text-gray-500 text-xs leading-relaxed">
                Ground Floor, Maryam Trade Centre, Old Bus Stand, Kasaragod, Kerala 671121
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-body-sm font-medium text-gray-800">Dubai Boutique:</p>
              <p className="font-body-sm text-gray-500 text-xs leading-relaxed">
                Angel & Codex, Al Khaleej - Zaa'beel St, Al Karama, Dubai, UAE
              </p>
            </div>
            <p className="font-body-sm text-gray-600 text-xs">
              <a href="tel:+919656363263" className="hover:text-black transition-colors font-medium">
                +91 96563 63263
              </a>
            </p>
            <div className="flex items-center gap-4 pt-2">
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
            </div>
          </div>

          {/* Column 2: INFORMATION */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-3 font-medium">
              INFORMATION
            </h4>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Blogs</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">About Us</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Catalogues</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Privacy Policy</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Terms &amp; Conditions</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Terms &amp; Conditions Boutique</Link>
          </div>

          {/* Column 3: CUSTOMER SERVICES */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-3 font-medium">
              CUSTOMER SERVICES
            </h4>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">FAQs</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Order Tracking</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Store Locator</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Contact Us</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Return &amp; Exchange Policy</Link>
            <Link className="font-body-sm text-gray-500 hover:text-black transition-colors" href="#">Return &amp; Exchange Policy Boutique</Link>
          </div>

          {/* Column 4: NEWSLETTER */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-label-caps-sm text-sm uppercase tracking-widest text-black mb-2 font-medium">
              NEWSLETTER
            </h4>
            <p className="font-body-sm text-gray-500 leading-relaxed pr-8">
              Sign up to our newsletter to receive exclusive offers.
            </p>
            <form className="flex flex-col gap-4 mt-2">
              <input
                className="px-4 py-3 bg-white border border-gray-200 text-sm text-black focus:outline-none focus:border-black w-full"
                placeholder="E-mail"
                type="email"
                required
              />
              <button
                className="bg-[#1a1a1a] text-white hover:bg-black px-8 py-3 text-xs uppercase tracking-widest transition-colors font-medium self-start"
                type="submit"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-body-sm text-xs text-gray-500 uppercase tracking-widest">
            © 2026 - AFANA'S ANGEL
          </p>
          <div className="flex items-center gap-3">
             <span className="font-bold italic text-black text-xl">VISA</span>
             <div className="flex items-center relative w-8 h-8 opacity-80">
               <div className="w-5 h-5 rounded-full bg-red-500 absolute left-0 mix-blend-multiply"></div>
               <div className="w-5 h-5 rounded-full bg-orange-400 absolute left-3 mix-blend-multiply"></div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
