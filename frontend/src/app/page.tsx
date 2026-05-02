import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import CategoryIcons from "@/components/categories/CategoryIcons";
import BestSelling from "@/components/products/BestSelling";
import MultiPosters from "@/components/products/MultiPosters";
import TrendingProducts from "@/components/products/TrendingProducts";
import WhyChooseUs from "@/components/trust/WhyChooseUs";
import ReviewsMarquee from "@/components/reviews/ReviewsMarquee";
import Newsletter from "@/components/footer/Newsletter";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--c-bg)", minHeight: "100vh", paddingTop: 124 }}>
      <Navbar />
      <Hero />
      <CategoryIcons />
      <BestSelling />
      <MultiPosters />
      <TrendingProducts />
      <WhyChooseUs />
      <ReviewsMarquee />
      <Newsletter />
      <Footer />
    </main>
  );
}
