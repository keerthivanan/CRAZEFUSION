"use client";
import { useRef } from "react";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";
import BlurText from "@/components/reactbits/BlurText";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const multiIds = [7, 8, 9, 10, 11, 12, 15];
const multiProducts = multiIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

function MultiCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
  };

  const badgeColor = p.badge === "Sale" ? "#dc2626" : p.badge === "Best Seller" ? "#e8a000" : "#111";
  const badgeTextColor = p.badge === "Best Seller" ? "#000" : "#fff";

  return (
    <div style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", borderRadius: 4 }}
        onMouseEnter={e => (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.08)"}
        onMouseLeave={e => (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)"}>
        <img src={p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
        {p.badge && (
          <span style={{ position: "absolute", top: 10, left: 10, background: badgeColor, color: badgeTextColor, fontFamily: FO, fontSize: 10, fontWeight: 900, padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {p.badge}
          </span>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={handleQuickAdd}
              style={{ width: "100%", padding: "12px 0", background: "rgba(10,10,10,0.88)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
              Quick Add
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 5, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 800, color: "var(--c-text)" }}>₹{p.price}</span>
          {p.original > p.price && <span style={{ fontFamily: FO, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}

export default function MultiPosters() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section style={{ padding: "56px 0", background: "var(--c-bg-soft)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", margin: 0, letterSpacing: "-0.03em", display: "flex", gap: "0.2em", flexWrap: "wrap", alignItems: "center" }}>
            <BlurText text="Multi Poster" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Collections" delay={200} animateBy="words" direction="bottom" /></span>
          </h2>
          <Link href="/collection"
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-text)", textDecoration: "none", border: "1px solid var(--c-border)", padding: "8px 18px", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-btn-bg)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-btn-text)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-btn-bg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-border)"; }}>
            View All
          </Link>
        </div>
        <div ref={ref} className="no-scrollbar multi-carousel" style={{ display: "flex", gap: 16, overflowX: "auto" }}>
          {multiProducts.map(p => (
            <div key={p.id} style={{ flexShrink: 0, width: 220 }}>
              <MultiCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
