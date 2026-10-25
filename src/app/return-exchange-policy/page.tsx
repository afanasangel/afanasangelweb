import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | AFANA'S Angel",
  description: "Read AFANA'S Angel return and exchange policy. Full details on our mandatory unboxing video, exchange window, and claims process.",
};

export default function ReturnPolicyPage() {
  return (
    <main className="w-full min-h-screen bg-[#faf9f7] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black font-medium">Return & Exchange Policy</span>
        </nav>

        {/* Header Banner */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a19] block mb-2">
            Customer Care
          </span>
          <h1 className="font-headline-xl text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-4">
            Return & Exchange Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            At AFANA’S Angel, we want you to be happy with your purchase. Please read our return and exchange policy carefully before placing your order.
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight">
                  Unboxing Video Required
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  A full, unedited video of the package opening is mandatory to claim an exchange for any damaged or defective product. The video must clearly show the package and the product from the moment of opening.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight">
                  Damaged or Defective Products
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  If you receive a damaged or defective product, please contact us with your unboxing video as proof. Claims without a full unboxing video may not be accepted.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight">
                  No Refund Policy
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  We do not offer refunds. Eligible claims are handled through our exchange policy only.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-2xs">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 text-white text-xs font-semibold shrink-0 mt-0.5">
                4
              </span>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight">
                  Exchange Period
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Exchange requests must be made within 7 days of receiving your product. Products received more than 7 days ago will not be accepted for exchange.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: How to Request an Exchange (WhatsApp CTA) */}
          <div className="bg-gradient-to-br from-neutral-900 to-[#1e1e1e] text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-neutral-900 text-xs font-semibold shrink-0 mt-0.5">
                5
              </span>
              <div className="space-y-4 flex-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white mb-2">
                    How to Request an Exchange
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    For any exchange-related queries, please contact our support team directly on WhatsApp with your order details and unboxing video:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <a
                    href="https://wa.me/918590444448?text=Hello%20AFANA%27S%20Angel%2C%20I%20would%20like%20to%20request%20an%20exchange."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors shadow-xs"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp: +91 85904 44448</span>
                  </a>

                  <a
                    href="tel:+918590444448"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-xs sm:text-sm font-medium tracking-wider transition-colors border border-white/20"
                  >
                    <span>Call Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
