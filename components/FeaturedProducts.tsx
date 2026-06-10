import Image from "next/image";
import { products, type Product } from "@/lib/products";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  New: "bg-nv text-black",
  "Top Seller": "bg-white text-black",
  Limited: "bg-zinc-800 text-nv border border-nv/50",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#76b900" : "#3f3f46"}
        >
          <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
        </svg>
      ))}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col border border-white/10 bg-card p-4 transition-all hover:-translate-y-1 hover:border-nv/60">
      <div className="relative overflow-hidden">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={450}
          unoptimized
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-bold text-white">{product.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-zinc-500">
          {product.spec}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-zinc-500">({product.reviews})</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span className="text-lg font-extrabold text-white">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-zinc-500 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
          <button className="bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-nv hover:text-black">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-nv">
            Shop
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Featured Hardware
          </h2>
        </div>
        <a
          href="#"
          className="hidden text-sm font-semibold text-nv hover:text-nv-bright sm:block"
        >
          View All Products →
        </a>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
