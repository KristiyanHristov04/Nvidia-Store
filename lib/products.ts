export type Product = {
  id: string;
  name: string;
  spec: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "New" | "Top Seller" | "Limited";
};

export const products: Product[] = [
  {
    id: "rtx-5090",
    name: "GeForce RTX 5090",
    spec: "32GB GDDR7 · 21,760 CUDA cores · DLSS 4",
    price: 1999,
    rating: 4.9,
    reviews: 2841,
    image: "/products/gpu.svg",
    badge: "Top Seller",
  },
  {
    id: "rtx-5080",
    name: "GeForce RTX 5080",
    spec: "16GB GDDR7 · 10,752 CUDA cores · DLSS 4",
    price: 999,
    rating: 4.8,
    reviews: 1932,
    image: "/products/gpu.svg",
  },
  {
    id: "rtx-5070-ti",
    name: "GeForce RTX 5070 Ti",
    spec: "16GB GDDR7 · 8,960 CUDA cores · DLSS 4",
    price: 749,
    rating: 4.8,
    reviews: 1411,
    image: "/products/gpu.svg",
    badge: "Limited",
  },
  {
    id: "dgx-spark",
    name: "DGX Spark",
    spec: "GB10 Grace Blackwell · 1 PFLOP AI · 128GB",
    price: 3999,
    rating: 4.9,
    reviews: 312,
    image: "/products/cpu.svg",
    badge: "New",
  },
  {
    id: "jetson-orin-nano",
    name: "Jetson Orin Nano Super",
    spec: "67 TOPS · 8GB · Edge AI developer kit",
    price: 249,
    rating: 4.7,
    reviews: 856,
    image: "/products/ram.svg",
  },
  {
    id: "rtx-laptop",
    name: "RTX 5080 Gaming Laptop",
    spec: "16\" QHD+ 240Hz · 32GB · Max-Q",
    price: 2499,
    rating: 4.7,
    reviews: 489,
    image: "/products/laptop.svg",
    badge: "New",
  },
  {
    id: "gsync-pulsar",
    name: "G-SYNC Pulsar 27\" 360Hz",
    spec: "QHD OLED · Pulsar anti-blur · Reflex",
    price: 799,
    rating: 4.9,
    reviews: 1093,
    image: "/products/monitor.svg",
  },
  {
    id: "shield-tv-pro",
    name: "SHIELD TV Pro",
    spec: "Tegra X1+ · 4K AI upscaling · GeForce NOW",
    price: 199,
    rating: 4.8,
    reviews: 3645,
    image: "/products/case.svg",
  },
];

export const categories = [
  { name: "GeForce GPUs", count: 24, image: "/products/gpu.svg" },
  { name: "DGX & AI Systems", count: 9, image: "/products/cpu.svg" },
  { name: "Gaming Laptops", count: 48, image: "/products/laptop.svg" },
  { name: "G-SYNC Monitors", count: 31, image: "/products/monitor.svg" },
  { name: "SHIELD & Streaming", count: 6, image: "/products/case.svg" },
  { name: "Jetson & Robotics", count: 14, image: "/products/ram.svg" },
];

export const technologies = [
  "DLSS 4",
  "Ray Tracing",
  "Reflex 2",
  "G-SYNC",
  "NVENC",
  "NVIDIA Studio",
  "CUDA",
  "NVIDIA ACE",
  "Omniverse",
  "GeForce NOW",
];
