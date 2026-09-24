import Link from "next/link";
import Image from "next/image";

export default function Journal() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary block mb-space-xs">
              THE ATELIER JOURNAL
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">
              Stories &amp; Styling Guides
            </h2>
          </div>
          <Link
            href="#"
            className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary hover:underline"
          >
            DISCOVER ALL STORIES →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
          {/* Article 1 */}
          <article className="flex flex-col bg-surface-container-lowest overflow-hidden group">
            <div className="w-full aspect-[16/10] overflow-hidden bg-surface-container relative">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Modern high fashion model styling an open lightweight silk jalabiya"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsYkcylbb_u7g45AVyDNzvrmacxMm6Jlh7JImH1K97kmbXwaJ-SdxA9aLlYPx0MfIMeqV_6oGUF8pFo3T3bR_ihYOwpPn_ABmY3CpJma5hNtl9qN5xSy20G2deMOqXlmdMS68xJEF_Ph1NSONxcUpkS_JI8FQmn6FfaVHliref8Ld_5fYNH-j3nfsvw3XsclJinJEybeIZCXNzDWz1vpAdcfOQWQaHsyUKG0a3BAGwT2u3JWy-KvNIfw"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-space-lg flex flex-col flex-grow justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-primary uppercase tracking-widest block mb-space-xs">
                  STYLING DIRECTORY
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  The Art of Modern Jalabiya Styling for Warm Gulf Evenings
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md">
                  How to effortlessly transition fluid, gold-bordered drapes from private family gatherings to five-star gala events.
                </p>
              </div>
              <Link
                href="#"
                className="font-label-caps-sm text-label-caps-sm text-on-surface uppercase tracking-widest font-semibold hover:text-primary inline-flex items-center gap-1"
              >
                READ FULL ARTICLE →
              </Link>
            </div>
          </article>
          {/* Article 2 */}
          <article className="flex flex-col bg-surface-container-lowest overflow-hidden group">
            <div className="w-full aspect-[16/10] overflow-hidden bg-surface-container relative">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Macro close-up shot of delicate antique gold zari embroidery threads"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSGE1toahPXkRkAi9CVI5R3-IFP9sOFIMbbRNSTnm0RN6Tfxiq3UcHtHVMezwFuhOWwais0gg5MOCsPQj9Nf7xWGIevhWY5j5azzsN6AfjU9Ao0nmvFl0IWbulYmaV__3SPTkKM0XqiKT8O7GZPCsZNeyClnpHE0M0Q7donNKItUjS9e03CckFVmxZ0PryrAAFsX_tNRd-5k-3qMDgQDRUAhWQZt43sXbO9WRCdR0LOTE5vEkNUl9A8g"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-space-lg flex flex-col flex-grow justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-primary uppercase tracking-widest block mb-space-xs">
                  HEIRLOOM CARE
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  Preserving Hand-Embroidered Zari Fabrics Across Generations
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md">
                  Our atelier conservators share the definitive protocols for storing, steaming, and protecting delicate gold metal threads.
                </p>
              </div>
              <Link
                href="#"
                className="font-label-caps-sm text-label-caps-sm text-on-surface uppercase tracking-widest font-semibold hover:text-primary inline-flex items-center gap-1"
              >
                READ FULL ARTICLE →
              </Link>
            </div>
          </article>
          {/* Article 3 */}
          <article className="flex flex-col bg-surface-container-lowest overflow-hidden group">
            <div className="w-full aspect-[16/10] overflow-hidden bg-surface-container relative">
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Two models wearing minimalist luxury matching silk co-ords"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Jd-Ql4gL0R4YrgR3uGtSp9V-2Or-4Llqk3xd7Yqn8baGCl6BEHJVNTSlfdei5vvfWJqkJFZtDzzbAp96p-J__b8qNHwC4aE6JNov0gGXhkPjWfYUWvXToM6lBnMzhEvCUPuHBDP-hGl0cp2qnFlDjZaDkZiSLKaaCugTPrNmu7wTHyeCkYq_-j_4V9ua7S_AHbhhC-PBnuIprD_I_pijIxysq9zvbuAyFgywDFxd8iIuRrvXq5GRnw"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-space-lg flex flex-col flex-grow justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-primary uppercase tracking-widest block mb-space-xs">
                  TREND ANALYSIS
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
                  Why Sculpted Silk Co-Ords Are The Ultimate Modest Uniform
                </h3>
                <p className="font-body-sm text-body-sm text-secondary mb-space-md">
                  Dissecting the sharp tailoring and effortless drape making monochromatic sets the foundational luxury wardrobe essential.
                </p>
              </div>
              <Link
                href="#"
                className="font-label-caps-sm text-label-caps-sm text-on-surface uppercase tracking-widest font-semibold hover:text-primary inline-flex items-center gap-1"
              >
                READ FULL ARTICLE →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
