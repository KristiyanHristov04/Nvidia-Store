const testimonials = [
  {
    quote:
      "Went from a 3070 to the RTX 5080 — DLSS 4 with Multi Frame Generation honestly feels like cheating. Path tracing at 4K, fully playable.",
    name: "Marcus T.",
    title: "Competitive FPS player",
  },
  {
    quote:
      "I render in Blender and stream with NVENC on the same card. Studio drivers have been rock solid — not one crash since I switched.",
    name: "Elena P.",
    title: "3D artist & streamer",
  },
  {
    quote:
      "Our lab fine-tunes models on a DGX Spark on the desk. It replaced a cloud bill that was eating our whole budget.",
    name: "Dimitar K.",
    title: "ML research lead",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <span className="block text-center text-xs font-bold uppercase tracking-[0.3em] text-nv">
        Community
      </span>
      <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Built for Gamers and Creators
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-zinc-400">
        Over 12,000 five-star reviews from people pushing RTX hardware every
        day.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="border border-white/10 bg-card p-6"
          >
            <div className="flex gap-1 text-nv" aria-hidden>
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-zinc-300">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center bg-nv/20 font-bold text-nv">
                {testimonial.name[0]}
              </span>
              <span>
                <span className="block text-sm font-bold text-white">
                  {testimonial.name}
                </span>
                <span className="block text-xs text-zinc-500">
                  {testimonial.title}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
