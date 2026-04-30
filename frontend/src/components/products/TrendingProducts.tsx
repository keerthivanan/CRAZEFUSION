"use client";
import { useRef } from "react";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";
import BlurText from "@/components/reactbits/BlurText";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const trendingIds = [1, 2, 5, 6, 4, 3, 11, 12, 7, 13];
const trending = trendingIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

function TCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const disc = Math.round((1 - p.price / p.original) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
  };

  return (
    <div>
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 10, background: "var(--c-bg-soft)", borderRadius: 4 }}
        onMouseEnter={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.06)";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.opacity = "1";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.transform = "translateY(0)";
        }}
        onMouseLeave={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.opacity = "0";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.transform = "translateY(6px)";
        }}>
        <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
        <span style={{ position: "absolute", top: 8, left: 8, background: "#dc2626", color: "#fff", fontFamily: F, fontSize: 9, fontWeight: 800, padding: "3px 7px", textTransform: "uppercase" }}>
          -{disc}%
        </span>
        <div className="tcard-btn" style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0, transform: "translateY(6px)", transition: "all 0.25s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={18}>
            <button onClick={handleQuickAdd}
              style={{ width: "100%", padding: "10px 0", background: "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
              Quick Add
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 3, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: "#111" }}>From ₹{p.price}</span>
          <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
        </div>
      </Link>
    </div>
  );
}

export default function TrendingProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "l" | "r") => ref.current?.scrollBy({ left: dir === "l" ? -200 : 200, behavior: "smooth" });

  return (
    <section style={{ padding: "56px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,40px)", fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0, display: "flex", gap: "0.2em", flexWrap: "wrap", alignItems: "center" }}>
            <BlurText text="Trending" delay={60} animateBy="words" direction="bottom" />
            <span style={{ color: "#e8a000" }}><BlurText text="Now" delay={160} animateBy="words" direction="bottom" /></span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/collection" style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", textDecoration: "none", borderBottom: "1.5px solid #111" }}>View All</Link>
            <div style={{ display: "flex", gap: 6 }}>
              {["←", "→"].map((d, i) => (
                <button key={d} onClick={() => scroll(i === 0 ? "l" : "r")}
                  style={{ width: 34, height: 34, border: "1px solid #e0e0e0", background: "var(--c-bg)", cursor: "pointer", fontSize: 14, transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#111"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0"; }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar trending-carousel" style={{ display: "flex", gap: 14, overflowX: "auto" }}>
          {trending.map(p => (
            <div key={p.id} style={{ flexShrink: 0, width: 185 }}>
              <TCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
