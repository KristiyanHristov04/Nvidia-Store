import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandsMarquee from "@/components/BrandsMarquee";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandsMarquee />
        <CategoryGrid />
        <FeaturedProducts />
        <PromoBanner />
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
