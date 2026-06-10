"use client";

import dynamic from "next/dynamic";

// three.js can only render in the browser, so the canvas loads client-side
// behind a lightweight placeholder.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-cyan-500/10 blur-2xl" />
    </div>
  ),
});

export default function HeroScene() {
  return <Hero3D />;
}
