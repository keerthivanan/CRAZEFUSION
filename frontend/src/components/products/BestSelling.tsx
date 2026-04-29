"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const products = [
  { id:1,  title: "Personalize Your Wall | 8 Panel Split Wall Set",        price: 529, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/CustomNEW8WALLSPILT_35c3afa0-9eab-4f72-9015-f5645e9183a4.jpg?v=1775134132&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:2,  title: "1966 Shelby Mustang GT350 | Muscle Car | 8 Panel",      price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/1966ShelbyMustangGT350MuscleCarWallArt8PanelSplitWallSet_1.jpg?v=1773060314&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:3,  title: "GTR | Vector Style Cars #01 | 8 Panel Split",            price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/GTRVECTORSTYLECARS_018PanelSplitWallSet_2bd0f0ec-7b22-4c1e-8e9c-27b7b6410269.jpg?v=1772684558&width=533", img2: "https://www.posterized.in/cdn/shop/files/GTRVECTORSTYLECARS_018PanelSplitWallSet_292626bc-2488-4cf5-9eb6-9611698c3b36.jpg?v=1772684558&width=533" },
  { id:4,  title: "BMW M2 | Vector Style Cars | 8 Panel Split",             price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/BMWM2VECTORSTYLECARS8PanelSplitWallSet_1_fc7bb781-f546-4429-842e-48e2dd7e4ff2.jpg?v=1772684563&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:5,  title: "DEFENDER | Built For No Roads | 8 Panel",                price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/NEWDWALL8SPILT_jpg.jpg?v=1769703364&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:6,  title: "MOST WANTED | Street Racing Legends | 8 Panel",          price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/NEWNWALL8SPILT_jpg.jpg?v=1769703069&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:7,  title: "HUSTLE | Entrepreneur Motivation | 8 Panel",             price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/NEWMWALL8SPILT_jpg.jpg?v=1769702161&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:8,  title: "DISCIPLINE | Anime Gym Motivation | 8 Panel",            price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/NEWAWALLSPILT_jpg.jpg?v=1769701946&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
  { id:9,  title: "BMW M4 DOMINANCE | Super Car | 8 Panel",                 price: 499, original: 199, href: "/collection", img: "https://www.posterized.in/cdn/shop/files/NEWbWALL8SPILT_jpg.jpg?v=1769701721&width=533", img2: "https://www.posterized.in/cdn/shop/files/reviewwall1_jpg.jpg?v=1775134132&width=533" },
];

function ProductCard({ p }: { p: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", marginBottom: 10, background: "#f7f7f7" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.4s ease" }} />
        {/* Quick add */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.25s ease" }}>
          <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
            style={{ width: "100%", padding: "10px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
            {added ? "✓ Added!" : "Quick Add"}
          </button>
        </div>
      </div>
      <Link href={p.href} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FE, fontSize: 12, fontWeight: 700, color: "#111", textTransform: "uppercase", marginBottom: 4, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: "#111" }}>From ₹{p.price}</span>
          <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
        </div>
      </Link>
    </div>
  );
}

export default function BestSelling() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "l" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "48px 0", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        {/* Header image like posterized */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <img src="https://www.posterized.in/cdn/shop/t/109/assets/BEST%20SELLING.svg?v=79949710555257469041771843115"
            alt="Best Selling" style={{ height: 36 }}
            onError={e => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = "none";
              const next = el.nextElementSibling as HTMLElement;
              if (next) next.style.display = "block";
            }} />
          <h2 style={{ display: "none", fontFamily: FE, fontSize: 32, fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>Best Selling</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {["←","→"].map((d, i) => (
              <button key={d} onClick={() => scroll(i === 0 ? "l" : "r")}
                style={{ width: 36, height: 36, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontSize: 14, color: "#111", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div ref={ref} className="no-scrollbar" style={{ display: "flex", gap: 16, overflowX: "auto" }}>
          {products.map((p, i) => (
            <AnimatedContent key={p.id} distance={20} delay={i * 0.05} duration={0.5} threshold={0.05}
              style={{ flexShrink: 0, width: 220 }}>
              <ProductCard p={p} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
