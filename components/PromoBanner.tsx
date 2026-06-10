"use client";

import { useEffect, useState } from "react";
import { LazyChip3D } from "./Lazy3D";

const DEAL_DURATION_MS = 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000;

function useCountdown() {
  // null until mounted so the server and first client render match
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = Date.now() + DEAL_DURATION_MS;
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining === null) return null;
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor(remaining / 3_600_000) % 24,
    minutes: Math.floor(remaining / 60_000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
}

export default function PromoBanner() {
  const countdown = useCountdown();
  const units = [
    { label: "Days", value: countdown?.days },
    { label: "Hours", value: countdown?.hours },
    { label: "Min", value: countdown?.minutes },
    { label: "Sec", value: countdown?.seconds },
  ];

  return (
    <section id="deals" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden border border-white/10 bg-card p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-nv/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-nv">
              NVIDIA Blackwell Architecture
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              GB202. <span className="text-nv">92 billion transistors.</span>
            </h2>
            <p className="mt-3 max-w-lg text-zinc-400">
              Fifth-gen Tensor Cores, fourth-gen Ray Tracing Cores, and neural
              shaders. The next GeForce drop unlocks in:
            </p>

            <div className="mt-6 flex gap-3">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="w-16 border border-white/15 bg-black py-2.5 text-center"
                >
                  <div className="font-mono text-2xl font-bold text-nv tabular-nums">
                    {unit.value !== undefined
                      ? String(unit.value).padStart(2, "0")
                      : "--"}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#products"
              className="mt-8 inline-block bg-nv px-7 py-3.5 text-sm font-bold text-black transition-colors hover:bg-nv-bright"
            >
              Get Notified
            </a>
          </div>

          <div className="hidden h-80 w-100 lg:block" aria-hidden>
            <LazyChip3D />
          </div>
        </div>
      </div>
    </section>
  );
}
