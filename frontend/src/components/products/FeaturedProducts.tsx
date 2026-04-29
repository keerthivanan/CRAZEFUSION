"use client";
import ProductCard from "@/components/products/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { products } from "@/data";

export default function FeaturedProducts() {
  return (
    <section style={{ padding: "96px 0", background: "#131313" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        <SectionHeader
          label="Handpicked for you"
          title="Best"
          highlight="Sellers"
          subtitle="Our most loved designs — rated 4.8+ by customers"
          viewAllHref="/collection"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 28 }}>
          {products.slice(0, 8).map((p, i) => (
            <AnimatedContent key={p.id} distance={30} delay={i * 0.07} duration={0.6} threshold={0.05}>
              <ProductCard p={p} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
