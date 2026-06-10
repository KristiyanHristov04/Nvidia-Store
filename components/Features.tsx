const features = [
  {
    title: "Game Ready Drivers",
    text: "Day-one optimizations for every major release, tuned and tested.",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6zM9 12l2 2 4-4" />
    ),
  },
  {
    title: "DLSS 4 Multi Frame Gen",
    text: "AI generates up to three frames per rendered frame for 4X performance.",
    icon: (
      <path d="M4 6h7v12H4zM13 6h7v5h-7zM13 13h7v5h-7z" />
    ),
  },
  {
    title: "Free Express Shipping",
    text: "Founders Editions ship free, with stock alerts so you never miss a drop.",
    icon: (
      <path d="M1 7h13v9H1zM14 10h4l3 3v3h-7zM5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    ),
  },
  {
    title: "Expert RTX Support",
    text: "From driver installs to NVApp settings — real specialists, 24/7.",
    icon: (
      <path d="M12 3a9 9 0 0 0-9 9v4a3 3 0 0 0 3 3h2v-7H5a7 7 0 0 1 14 0h-3v7h2a3 3 0 0 0 3-3v-4a9 9 0 0 0-9-9z" />
    ),
  },
];

export default function Features() {
  return (
    <section id="support" className="border-y border-white/10 bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center border border-nv/40 bg-nv/10 text-nv">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {feature.icon}
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
