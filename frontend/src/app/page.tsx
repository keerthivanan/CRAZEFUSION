import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import AIBanner from "@/components/ui/AIBanner";
import BestSelling from "@/components/products/BestSelling";
import MultiPosters from "@/components/products/MultiPosters";
import TrendingProducts from "@/components/products/TrendingProducts";
import WhyChooseUs from "@/components/trust/WhyChooseUs";
import ReviewsMarquee from "@/components/reviews/ReviewsMarquee";
import Newsletter from "@/components/footer/Newsletter";
import Footer from "@/components/footer/Footer";

const SITE = process.env.NEXT_PUBLIC_SITE_URL  ?? "http://localhost:3000";
const NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "CrazeFusion";

export const metadata: Metadata = {
  title: `${NAME} — Premium Wall Art Posters UK | AI Poster Generator`,
  description: `Shop 609+ premium wall art posters. Cars, Movies, Coffee & more. Generate custom AI posters and sell them to earn 30%. Free UK delivery over £30. Printed in 48hrs.`,
  alternates: { canonical: SITE },
  openGraph: {
    title:       `${NAME} — Premium Wall Art Posters UK`,
    description: "609+ premium wall art posters. AI poster generator. Free UK delivery over £30.",
    url:         SITE,
  },
};

export default function Home() {
  return (
    <main style={{ background: "var(--c-bg)", minHeight: "100vh", paddingTop: 108 }}>
      <Navbar />
      <Hero />
      <AIBanner />
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
