import Image from "next/image";

const columns = [
  {
    heading: "Shop",
    links: ["GeForce GPUs", "Gaming Laptops", "G-SYNC Monitors", "DGX & AI", "SHIELD TV"],
  },
  {
    heading: "Technologies",
    links: ["DLSS 4", "Ray Tracing", "Reflex 2", "NVIDIA Studio", "GeForce NOW"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Drivers", "Track Order", "Returns", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/nvidia-logo-white.png"
              alt="NVIDIA"
              width={479}
              height={101}
              unoptimized
              className="h-6 w-auto"
            />
            <span className="text-lg font-bold tracking-tight text-nv">
              STORE
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            The ultimate destination for GeForce RTX hardware, AI systems, and
            everything powered by NVIDIA Blackwell.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-zinc-500 transition-colors hover:text-nv"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © 2026 GeForce Store. Independent design concept — not affiliated
            with or endorsed by NVIDIA Corporation. NVIDIA, GeForce, RTX, DLSS,
            and G-SYNC are trademarks of NVIDIA Corporation.
          </span>
          <span className="shrink-0">Visa · Mastercard · PayPal · Apple Pay</span>
        </div>
        <p className="mx-auto max-w-7xl px-4 pb-6 text-xs leading-relaxed text-zinc-700 sm:px-6 lg:px-8">
          This work is based on{" "}
          <a
            href="https://sketchfab.com/3d-models/geforce-rtx-4090-founders-edition-d417c0b4c3bd475eb9669afcd14a2601"
            className="underline hover:text-nv"
          >
            &quot;GeForce RTX 4090 Founders Edition&quot;
          </a>{" "}
          by{" "}
          <a href="https://sketchfab.com/exela" className="underline hover:text-nv">
            exéla
          </a>{" "}
          licensed under{" "}
          <a
            href="http://creativecommons.org/licenses/by-nc/4.0/"
            className="underline hover:text-nv"
          >
            CC-BY-NC-4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
