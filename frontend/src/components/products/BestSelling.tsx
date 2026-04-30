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

const bestSellerIds = [16, 1, 13, 5, 2, 6, 14, 3, 4];
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
        <div style={{ background: p.badge === "Best Seller" ? "#e8a000" : p.badge === "Sale" ? "#dc2626" : "#111", color: p.badge === "Best Seller" ? "#000" : "#fff", fontFamily: FO, fontSize: 9, fontWeight: 900, padding: "3px 8px", textTransform: "uppercase", letterSpacing: "0.08em", alignSelf: "flex-start" }}>
          {p.badge}
        </div>
      )}
      <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
        <button onClick={handleQuickAdd}
          style={{ width: "100%", padding: "11px 0", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
          Quick Add
        </button>
      </ClickSpark>
    </div>
  );

  return (
    <SpotlightCard spotlightColor="rgba(232,160,0,0.1)" style={{ padding: 10, background: "var(--c-bg)", border: "1px solid #f0f0f0", borderRadius: 4 }}>
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
            <span style={{ fontFamily: FO, fontSize: 15, fontWeight: 900, color: "var(--c-text)" }}>₹{p.price}</span>
            <span style={{ fontFamily: FO, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
            <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 800, color: "#dc2626", marginLeft: "auto" }}>
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
  const scroll = (dir: "l" | "r") => ref.current?.scrollBy({ left: dir === "l" ? -280 : 280, behavior: "smooth" });

  return (
    <section style={{ padding: "56px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0, display: "flex", gap: "0.2em", alignItems: "center", flexWrap: "wrap" }}>
            <BlurText text="Best" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Selling" delay={160} animateBy="words" direction="bottom" /></span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/collection" style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-text)", textDecoration: "none", borderBottom: "1.5px solid var(--c-text)" }}>View All</Link>
            <div style={{ display: "flex", gap: 6 }}>
              {["←", "→"].map((d, i) => (
                <button key={d} onClick={() => scroll(i === 0 ? "l" : "r")}
                  style={{ width: 34, height: 34, border: "1px solid #e0e0e0", background: "var(--c-bg)", cursor: "pointer", fontSize: 14, color: "var(--c-text)", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--c-bg)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--c-text)"; }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
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
