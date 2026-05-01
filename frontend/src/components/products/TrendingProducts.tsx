"use client";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";
import FireHeading from "@/components/ui/FireHeading";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const trendingIds = [3, 4, 5, 6, 1, 2];
const trending = trendingIds.map(id => products.find(p => p.id === id)!).filter(Boolean);

function TCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
  };

  return (
    <div>
      <div
        style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", borderRadius: 50 }}
        onMouseEnter={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.06)";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.opacity = "1";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.transform = "translateY(0)";
        }}
        onMouseLeave={e => {
          (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.opacity = "0";
          (e.currentTarget.querySelector(".tcard-btn") as HTMLDivElement).style.transform = "translateY(8px)";
        }}
      >
        <img src={p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
        {p.badge && (
          <span style={{ position: "absolute", top: 12, left: 12, background: "#000", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 12px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {p.badge}
          </span>
        )}
        <div className="tcard-btn" style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0, transform: "translateY(8px)", transition: "all 0.25s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={18}>
            <button onClick={handleQuickAdd}
              style={{ width: "100%", padding: "12px 0", background: "rgba(17,17,17,0.92)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
              Quick Add
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 4, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, textAlign: "center" }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: "var(--c-text)" }}>From ₹{p.price}</span>
          <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
        </div>
      </Link>
    </div>
  );
}

export default function TrendingProducts() {
  return (
    <section style={{ padding: "64px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36, gap: 20 }}>
          <FireHeading
            text="#Trending Now!"
            subtitle="New Arrival"
            size="clamp(32px,4.5vw,64px)"
            align="center"
            as="h2"
          />
          <Link href="/collection"
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-btn-text)", background: "var(--c-btn-bg)", textDecoration: "none", padding: "9px 22px", borderRadius: 50, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>
            View All
          </Link>
        </div>
        <div className="trending-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
          {trending.map(p => (
            <TCard key={p.id} p={p} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .trending-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
