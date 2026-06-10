"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        // Smooth-scroll anchor links too, stopping below the fixed navbar
        anchors: { offset: -72 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
