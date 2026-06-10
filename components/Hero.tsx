import HeroScene from "./HeroScene";

const stats = [
  { value: "92B", label: "Transistors" },
  { value: "4X", label: "DLSS 4 performance" },
  { value: "32GB", label: "GDDR7 memory" },
];

export default function Hero() {
  return (
    <section className="bg-grid relative overflow-hidden pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-150 w-150 -translate-x-1/2 rounded-full bg-nv/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-nv">
            GeForce RTX 50 Series
          </span>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Game{" "}
            <span className="text-nv">Changer.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
            Powered by NVIDIA Blackwell, GeForce RTX 50 Series GPUs bring
            game-changing capabilities to gamers and creators. Multiply
            performance with DLSS 4 and unleash next-level graphics fidelity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-nv px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-nv-bright"
            >
              See All Buying Options
            </a>
            <a
              href="#deals"
              className="border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-nv hover:text-nv"
            >
              Explore Blackwell
            </a>
          </div>

          <dl className="mt-10 flex gap-10 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-nv">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-sm text-zinc-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3D graphics card — drag to rotate */}
        <div className="relative h-80 sm:h-105 lg:h-130">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
