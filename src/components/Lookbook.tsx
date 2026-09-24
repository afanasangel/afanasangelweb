import Link from "next/link";
import Image from "next/image";

export default function Lookbook() {
  return (
    <section className="max-w-7xl mx-auto px-gutter py-space-3xl w-full" id="lookbook-gallery">
      <div className="text-center max-w-2xl mx-auto mb-space-2xl">
        <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-primary block mb-space-xs">
          #AFANASANGEL — STYLED BY YOU
        </span>
        <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-sm">
          The Curated Circle
        </h2>
        <p className="font-body-md text-body-md text-secondary">
          Witness our signature silhouettes brought to life by patrons across Dubai, Riyadh, London, and Paris. Mention @AfanasAngel on Instagram to be featured.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
        {/* User Look 1 */}
        <div className="group relative aspect-square overflow-hidden bg-surface-container">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="High society client wearing Afana's Angel ivory and gold silk kaftan"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9b2_IYfxj6s_L3Z84ZgQBQUxqa8PxGievrGFlPjpJYLDOO6m_Jb-kxhEH-eg5-CUlDQ6V5UYu0BzCJhBWkAn7T7f84GG5w-9VqHkyDrNBocVlNG41Em9wgikLrKsFw2jUWGiuRzp6SDgihpGgBTOqpgruB2DQED-b0ry33lB45zcfKo1CNLS7rnsthxhCcxRtOn7oCDYC0nKL-dE68BxEzvSZvqDGU7IEm8gcxg1a3ZPqpM7sEO3QA"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-space-sm text-center text-on-primary">
            <span className="material-symbols-outlined text-2xl mb-1">shopping_bag</span>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
              Shop This Silhouette
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed mt-1">
              @layla.alrashid
            </span>
          </div>
        </div>
        {/* User Look 2 */}
        <div className="group relative aspect-square overflow-hidden bg-surface-container">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Discerning patron in gold embroidered raw silk co-ord"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtpbwpGbrVfsJC1-0HEhre_p68tTp6GXgYIYGr9il8RSyWMgV9lal1fmUv4tOJBFxX4JOebyM0bdWFDdKlqLEY6kexKYAhMEh3f5xi9NRRj91cImZybrysroqBqvzfdq9jWKWNFN1BnuzPFpQZ4tBH16vNOWZ3XRXmo-ZiWBZPGPLrOzsc1aG5Thp9eCCGfOIK03Y30ZXAB9ivh22xL2Pf3w1O2yes-4_i0SHWDEST_JweusIOS49wvg"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-space-sm text-center text-on-primary">
            <span className="material-symbols-outlined text-2xl mb-1">shopping_bag</span>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
              Shop This Silhouette
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed mt-1">
              @sarah_couture
            </span>
          </div>
        </div>
        {/* User Look 3 */}
        <div className="group relative aspect-square overflow-hidden bg-surface-container">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Patron wearing pure organza festive ensemble"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKsfjpZxaN96LPjYpXIQq4WXgLLA_jHaXhYoapM4Q3gcEgHiBfz9KepNfRA60tNHEkLIBnO98K56qWdGKHlQkneVwclbAKVlbpdMaLwD49-a9GDho6IHwq0gdamf9WKWGin1gyRn_cfJpG79TbH4X4atDKorR5CPUc2Pp3qRzRqb5focIHIZcPt7GBIeIu2R71-6xjZF0eJP0IfOYdCmCQvij5I0F5t5VQ3M6FHXey1IRDSYzJT5pmkg"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-space-sm text-center text-on-primary">
            <span className="material-symbols-outlined text-2xl mb-1">shopping_bag</span>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
              Shop This Silhouette
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed mt-1">
              @mariam.k
            </span>
          </div>
        </div>
        {/* User Look 4 */}
        <div className="group relative aspect-square overflow-hidden bg-surface-container">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt="Patron styled in velvet tilla embroidered jacket"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0RhsCT7E78DauCFJ4CmBpx4QiTslEtL7vVCL7fpUvF-r20KEEDexbA7KgEa-abmNNglZJbiwhFSdtDAYj5Fu1UnMG4QpM2fdNdj8mhaHJoNYJqRe3qVvCfInxVe7kI_go6vi2DHlOA49howurR47NSlYRrcj03RGt-1D0RlPK2tKL_3u0Q1j6tAlU6DVQh6-Q2d1AV523Yl9kj8wqO14M-pHFuzyuSwzLSgz0ha0kge2AU1XEY1VsRQ"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-space-sm text-center text-on-primary">
            <span className="material-symbols-outlined text-2xl mb-1">shopping_bag</span>
            <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
              Shop This Silhouette
            </span>
            <span className="font-body-sm text-body-sm text-primary-fixed mt-1">
              @fatima_style
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
