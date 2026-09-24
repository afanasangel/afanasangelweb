export default function HighlightTicker() {
  return (
    <div className="w-full bg-surface-container py-space-sm overflow-hidden">
      <div className="flex items-center justify-around gap-space-xl max-w-7xl mx-auto px-gutter text-secondary font-label-caps-sm text-label-caps-sm uppercase tracking-widest whitespace-nowrap overflow-x-auto">
        <span className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> PRIVATE ATELIER FITTINGS
        </span>
        <span className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> COMPLIMENTARY EXPRESS WORLDWIDE COURIER
        </span>
        <span className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> HANDCRAFTED LIMITED CAPSULES
        </span>
        <span className="flex items-center gap-space-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> BESPOKE BRIDAL CONSULTS
        </span>
      </div>
    </div>
  );
}
