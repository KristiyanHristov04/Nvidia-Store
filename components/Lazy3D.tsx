"use client";

import dynamic from "next/dynamic";

function GlowPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-cyan-500/10 blur-2xl" />
    </div>
  );
}

// three.js scenes only render in the browser, so they load client-side
// behind a lightweight placeholder.
export const LazySsd3D = dynamic(() => import("./Ssd3D"), {
  ssr: false,
  loading: GlowPlaceholder,
});

export const LazyChip3D = dynamic(() => import("./Chip3D"), {
  ssr: false,
  loading: GlowPlaceholder,
});
