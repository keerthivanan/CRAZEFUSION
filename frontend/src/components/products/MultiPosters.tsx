"use client";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";
import BlurText from "@/components/reactbits/BlurText";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const CARD_W = 260;
const GAP    = 20;

const multiProducts = products.filter(p => p.sub.includes("Panel") || p.sub.includes("Split")).slice(0, 8);

function MultiCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
  };
  return (
    <div style={{ flexShrink: 0, width: CARD_W, scrollSnapAlign: "start" }}>
      <div
        style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", borderRadius: 0, background: "var(--c-bg-soft)", marginBottom: 12 }}
        onMouseEnter={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.06)";
          const btn = e.currentTarget.querySelector(".mp-qa") as HTMLElement;
          if (btn) { btn.style.opacity = "1"; btn.style.transform = "translateY(0)"; }
        }}
        onMouseLeave={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)";
          const btn = e.currentTarget.querySelector(".mp-qa") as HTMLElement;
          if (btn) { btn.style.opacity = "0"; btn.style.transform = "translateY(10px)"; }
        }}
      >
        <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }} />
        {p.badge && (
          <span style={{ position: "absolute", bottom: 10, left: 10, background: "#111", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 13px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {p.badge}
          </span>
        )}
        <div className="mp-qa" style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0, transform: "translateY(10px)", transition: "all 0.25s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={handleQuickAdd} style={{ width: "100%", padding: "13px 0", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
              Quick Add
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block", textAlign: "center", padding: "0 4px" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "#1a6fa8", marginBottom: 4, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {p.original > p.price && <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: "var(--c-text)" }}>From ₹{p.price}</span>
        </div>
      </Link>
    </div>
  );
}

export default function MultiPosters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const total = multiProducts.length;

  const scroll = useCallback((dir: 1 | -1) => {
    const next = Math.max(0, Math.min(total - 1, page + dir));
    setPage(next);
    trackRef.current?.scrollTo({ left: next * (CARD_W + GAP), behavior: "smooth" });
  }, [page, total]);

  return (
    <section style={{ padding: "64px 0", background: "var(--c-bg-soft)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,40px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0, display: "flex", gap: "0.2em", flexWrap: "wrap", alignItems: "center" }}>
            <BlurText text="Multi Poster" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Collections" delay={200} animateBy="words" direction="bottom" /></span>
          </h2>
          <Link href="/collection"
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-btn-text)", background: "var(--c-btn-bg)", textDecoration: "none", padding: "9px 22px", borderRadius: 50, whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>
            View All
          </Link>
        </div>

        {/* Carousel */}
        <div ref={trackRef} className="no-scrollbar"
          style={{ display: "flex", gap: GAP, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px 32px 8px", WebkitOverflowScrolling: "touch" as any }}>
          {multiProducts.map(p => <MultiCard key={p.id} p={p} />)}
        </div>

        {/* Pagination — bottom center */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 28 }}>
          <button onClick={() => scroll(-1)} disabled={page === 0}
            style={{ width: 36, height: 36, border: "1px solid var(--c-border)", borderRadius: "50%", background: "var(--c-bg)", color: "var(--c-text)", cursor: page === 0 ? "not-allowed" : "pointer", opacity: page === 0 ? 0.3 : 1, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            ‹
          </button>
          <span style={{ fontFamily: FO, fontSize: 12, color: "var(--c-text-muted)", minWidth: 44, textAlign: "center" }}>{page + 1}/{total}</span>
          <button onClick={() => scroll(1)} disabled={page === total - 1}
            style={{ width: 36, height: 36, border: "1px solid var(--c-border)", borderRadius: "50%", background: "var(--c-bg)", color: "var(--c-text)", cursor: page === total - 1 ? "not-allowed" : "pointer", opacity: page === total - 1 ? 0.3 : 1, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
