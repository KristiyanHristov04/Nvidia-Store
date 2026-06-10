import Image from "next/image";
import { categories } from "@/lib/products";

export default function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-nv">
            Products
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Explore the Lineup
          </h2>
        </div>
        <a
          href="#products"
          className="hidden text-sm font-semibold text-nv hover:text-nv-bright sm:block"
        >
          Browse All →
        </a>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <a
            key={category.name}
            href="#products"
            className="group border border-white/10 bg-card p-4 transition-all hover:-translate-y-1 hover:border-nv/60"
          >
            <div className="overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={225}
                unoptimized
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 text-sm font-bold text-white">
              {category.name}
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">
              {category.count} products
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
