"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Shop", href: "#products" },
  { label: "Products", href: "#categories" },
  { label: "RTX 50 Series", href: "#deals" },
  { label: "Support", href: "#support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/nvidia-logo-white.png"
            alt="NVIDIA"
            width={479}
            height={101}
            unoptimized
            priority
            className="h-6 w-auto"
          />
          <span className="text-lg font-bold tracking-tight text-nv">
            STORE
          </span>
          <span className="hidden border border-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 sm:block">
            Concept
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="border-b-2 border-transparent pb-0.5 text-sm font-medium text-zinc-300 transition-colors hover:border-nv hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="hidden p-2 text-zinc-300 transition-colors hover:text-nv sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <button
            aria-label="Cart"
            className="relative p-2 text-zinc-300 transition-colors hover:text-nv"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 grid h-4.5 w-4.5 place-items-center bg-nv text-[10px] font-bold text-black">
              3
            </span>
          </button>
          <a
            href="#products"
            className="hidden bg-nv px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-nv-bright md:block"
          >
            Buy Now
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-zinc-300 hover:text-nv md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-nv"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
