import { technologies } from "@/lib/products";

export default function BrandsMarquee() {
  return (
    <section className="border-y border-white/10 bg-card py-6">
      <div className="marquee-mask relative mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Two identical halves; translating -50% lands exactly on the seam,
            so the loop is seamless. */}
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0" aria-hidden={half === 1}>
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-8 text-lg font-bold uppercase tracking-wider text-zinc-600 transition-colors hover:text-nv"
                >
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
