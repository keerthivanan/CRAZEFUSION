import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import Ticker from "@/components/ticker/Ticker";
import CategoryIcons from "@/components/categories/CategoryIcons";
import DesignYourOwn from "@/components/categories/DesignYourOwn";
import BestSelling from "@/components/products/BestSelling";
import MultiPosters from "@/components/products/MultiPosters";
import TrendingProducts from "@/components/products/TrendingProducts";
import WhyChooseUs from "@/components/trust/WhyChooseUs";
import ReviewsMarquee from "@/components/reviews/ReviewsMarquee";
import Newsletter from "@/components/footer/Newsletter";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", paddingTop: 64 }}>
      <Navbar />
      <Ticker />
      <Hero />
      <CategoryIcons />
      <DesignYourOwn />
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
