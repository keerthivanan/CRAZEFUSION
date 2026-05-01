"use client";
import { useRef } from "react";
import Link from "next/link";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import TiltedCard from "@/components/reactbits/TiltedCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import BlurText from "@/components/reactbits/BlurText";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const bestSellerIds = [1, 2, 3, 4, 5, 6];
const bestSellers = bestSellerIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
  };

  const overlay = (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 10 }}>
      {p.badge && (
        <div style={{ background: p.badge === "Best Seller" ? "#e8a000" : p.badge === "Sale" ? "#dc2626" : "#111", color: p.badge === "Best Seller" ? "#000" : "#fff", fontFamily: FO, fontSize: 9, fontWeight: 400, padding: "3px 8px", textTransform: "uppercase", letterSpacing: "0.08em", alignSelf: "flex-start" }}>
          {p.badge}
        </div>
      )}
      <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
        <button onClick={handleQuickAdd}
          style={{ width: "100%", padding: "11px 0", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
          Quick Add
        </button>
      </ClickSpark>
    </div>
  );

  return (
    <SpotlightCard spotlightColor="rgba(232,160,0,0.1)" style={{ padding: 10, background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: 4 }}>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
        <TiltedCard
          imageSrc={p.img} altText={p.title}
          containerHeight="240px" containerWidth="100%"
          imageHeight="240px" imageWidth="100%"
          scaleOnHover={1.07} rotateAmplitude={8}
          borderRadius="2px" displayOverlayContent overlayContent={overlay}
        />
        <div style={{ padding: "10px 4px 4px" }}>
          <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 5, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
          <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.sub}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: FO, fontSize: 15, fontWeight: 400, color: "var(--c-text)" }}>₹{p.price}</span>
            <span style={{ fontFamily: FO, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
            <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 500, color: "#dc2626", marginLeft: "auto" }}>
              -{Math.round((1 - p.price / p.original) * 100)}%
            </span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}

export default function BestSelling() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "56px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0, display: "flex", gap: "0.2em", alignItems: "center", flexWrap: "wrap" }}>
            <BlurText text="Best" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Selling" delay={160} animateBy="words" direction="bottom" /></span>
          </h2>
          <Link href="/collection"
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-text)", textDecoration: "none", border: "1px solid var(--c-border)", padding: "8px 18px", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-btn-bg)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-btn-text)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-btn-bg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-border)"; }}>
            View All
          </Link>
        </div>
        <div ref={ref} className="no-scrollbar product-carousel" style={{ display: "flex", gap: 16, overflowX: "auto" }}>
          {bestSellers.map(p => (
            <div key={p.id} style={{ flexShrink: 0, width: 230 }}>
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
