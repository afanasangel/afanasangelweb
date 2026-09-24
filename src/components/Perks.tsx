export default function Perks() {
  return (
    <section className="w-full bg-surface-container py-space-2xl">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xl text-center md:text-left">
          {/* Perk 1 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Complimentary Courier
              </h4>
              <p className="font-body-sm text-body-sm text-secondary">
                Free white-glove express shipping across GCC on orders over $250.
              </p>
            </div>
          </div>
          {/* Perk 2 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">straighten</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Bespoke Atelier Fit
              </h4>
              <p className="font-body-sm text-body-sm text-secondary">
                Made-to-measure customizations crafted by master couturiers.
              </p>
            </div>
          </div>
          {/* Perk 3 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">
                featured_seasonal_and_gifts
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Gold Atelier Box
              </h4>
              <p className="font-body-sm text-body-sm text-secondary">
                Signature gift packaging with scented silk paper and brass seal.
              </p>
            </div>
          </div>
          {/* Perk 4 */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-space-md">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                24/7 Private Concierge
              </h4>
              <p className="font-body-sm text-body-sm text-secondary">
                Direct VIP styling assistance via WhatsApp and personal phone line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
