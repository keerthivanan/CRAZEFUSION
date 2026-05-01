"use client";
import Link from "next/link";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import TiltedCard from "@/components/reactbits/TiltedCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import BlurText from "@/components/reactbits/BlurText";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

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
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 12 }}>
      {p.badge && (
        <div style={{ background: "#000", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 12px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em", alignSelf: "flex-start" }}>
          {p.badge}
        </div>
      )}
      <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
        <button onClick={handleQuickAdd}
          style={{ width: "100%", padding: "12px 0", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
          Quick Add
        </button>
      </ClickSpark>
    </div>
  );

  return (
    <SpotlightCard spotlightColor="rgba(160,160,160,0.1)" style={{ padding: 10, background: "var(--c-bg)", border: "1px solid var(--c-border)", borderRadius: 50 }}>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
        <TiltedCard
          imageSrc={p.img} altText={p.title}
          containerHeight="300px" containerWidth="100%"
          imageHeight="300px" imageWidth="100%"
          scaleOnHover={1.06} rotateAmplitude={7}
          borderRadius="6px" displayOverlayContent overlayContent={overlay}
        />
        <div style={{ padding: "14px 4px 6px", textAlign: "center" }}>
          <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 5, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
          <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.sub}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontFamily: FO, fontSize: 15, fontWeight: 600, color: "var(--c-text)" }}>From ₹{p.price}</span>
            <span style={{ fontFamily: F, fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}

export default function BestSelling() {
  return (
    <section style={{ padding: "64px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36, gap: 20 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0, display: "flex", gap: "0.2em", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <BlurText text="Best" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Selling" delay={160} animateBy="words" direction="bottom" /></span>
          </h2>
          <Link href="/collection"
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-btn-text)", background: "var(--c-btn-bg)", textDecoration: "none", padding: "9px 22px", borderRadius: 50, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>
            View All
          </Link>
        </div>
        <div className="bestselling-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {bestSellers.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .bestselling-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
