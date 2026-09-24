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
            <p className="font-body-sm text-gray-500">
              21 Km Ferozpur Road Lahore Pakistan.
            </p>
            <p className="font-body-sm text-gray-500">
              nishatonline@nishatmills.com
            </p>
            <p className="font-body-sm text-gray-500">
              +92 42 111 647 428
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">public</span> {/* Facebook placeholder */}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">photo_camera</span> {/* Instagram placeholder */}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">play_circle</span> {/* YouTube placeholder */}
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
