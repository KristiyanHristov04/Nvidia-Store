import { LazySsd3D } from "./Lazy3D";

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="bg-grid relative overflow-hidden border border-white/10 bg-gradient-to-b from-card to-black px-6 pb-14 pt-6 text-center sm:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-150 -translate-x-1/2 rounded-full bg-nv/10 blur-3xl" />

        <div className="relative mx-auto h-48 max-w-sm" aria-hidden>
          <LazySsd3D />
        </div>

        <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Don&apos;t Miss the Next Drop
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-zinc-400">
          RTX restocks, Game Ready driver releases, and DLSS game updates. One
          email a week — unsubscribe anytime.
        </p>

        <form
          className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          action="#"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="h-12 flex-1 border border-white/20 bg-black px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-nv"
          />
          <button
            type="submit"
            className="h-12 bg-nv px-6 text-sm font-bold text-black transition-colors hover:bg-nv-bright"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
