"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const multiPosters = [
  { id:1, title: "Black Panther Legacy | 3 Piece Set",             price: 349, original: 399, badge: "Sale", img: "https://www.posterized.in/cdn/shop/files/blackpanther1_22c3b291-1166-4186-8189-936711466fec.jpg?v=1777101350&width=533", img2: "https://www.posterized.in/cdn/shop/files/blackpanther2_c2573cea-00e8-4119-87a4-6fef555895d1.jpg?v=1777101350&width=533" },
  { id:2, title: "Captain America | I Can Do This All Day | 4 Piece", price: 297, original: 199, img: "https://www.posterized.in/cdn/shop/files/CaptainAmericaICanDoThisAllDay4PieceSet_1.jpg?v=1773471928&width=533", img2: "https://www.posterized.in/cdn/shop/files/CaptainAmericaICanDoThisAllDay4PieceSet_2.jpg?v=1773471928&width=533" },
  { id:3, title: "Mercedes Benz 190E W201 | Classic Benz | 3 Piece", price: 349, original: 399, badge: "Sale", img: "https://www.posterized.in/cdn/shop/files/MercedesBenz190EW201ClassicBenzStreetArtSet3PieceSet_2.jpg?v=1773471754&width=533", img2: "https://www.posterized.in/cdn/shop/files/MercedesBenz190EW201ClassicBenzStreetArtSet3PieceSet_1.jpg?v=1773471754&width=533" },
  { id:4, title: "Toyota Supra MK4 JDM Street Racing | 4 Piece",    price: 297, original: 199, img: "https://www.posterized.in/cdn/shop/files/1_9ac5f738-6163-4f7e-911f-18b203151330.jpg?v=1773060055&width=533", img2: "https://www.posterized.in/cdn/shop/files/2_455948a3-89d6-445e-9d33-5633fb626de7.jpg?v=1773060057&width=533" },
  { id:5, title: "Rolls Royce Phantom | Car Set | 3 Piece",         price: 349, original: 399, badge: "Sale", img: "https://www.posterized.in/cdn/shop/files/1_6fe4c087-b893-4509-a9c2-bcd7500be406.jpg?v=1773231934&width=533", img2: "https://www.posterized.in/cdn/shop/files/2_ee3959d1-85d3-426a-9d94-e647c33300dc.jpg?v=1773231934&width=533" },
  { id:6, title: "The Bride Samurai | Kill Bill | 3 Piece Set",     price: 349, original: 199, img: "https://www.posterized.in/cdn/shop/files/2_df5f0cae-bffb-4c75-bbe3-4d9839ed11d9.jpg?v=1772716027&width=533", img2: "https://www.posterized.in/cdn/shop/files/3.jpg?v=1772716027&width=533" },
  { id:7, title: "Rise | Ghost of Sparta | Kratos | 3 Piece",       price: 349, original: 399, badge: "Sale", img: "https://www.posterized.in/cdn/shop/files/1_957f5038-b6d5-4187-a0d6-7bba94a938f4.webp?v=1772195234&width=533", img2: "https://www.posterized.in/cdn/shop/files/2_6196eff2-a87e-4ae3-8b92-1139a69e7d54.webp?v=1772195234&width=533" },
  { id:8, title: "SpiderMan Trio | Spider-Verse | 3 Piece Set",     price: 349, original: 399, badge: "Sale", img: "https://www.posterized.in/cdn/shop/files/SpiderManTrioSpiderVerse3PieceSet_1.webp?v=1771496420&width=533", img2: "https://www.posterized.in/cdn/shop/files/SpiderManTrioSpiderVerse3PieceSet_2.webp?v=1771496421&width=533" },
];

function MultiCard({ p }: { p: typeof multiPosters[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", marginBottom: 10, background: "#f7f7f7" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.35s ease" }} />
        {p.badge && (
          <span style={{ position: "absolute", top: 8, left: 8, background: "#dc2626", color: "#fff", fontFamily: F, fontSize: 9, fontWeight: 800, padding: "3px 7px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sale</span>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.25s ease" }}>
          <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
            style={{ width: "100%", padding: "9px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
            {added ? "✓ Added!" : "Quick Add"}
          </button>
        </div>
      </div>
      <Link href="/collection" style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FE, fontSize: 12, fontWeight: 700, color: "#111", textTransform: "uppercase", marginBottom: 3, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 800, color: "#111" }}>From ₹{p.price}</span>
          {p.badge && <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}

export default function MultiPosters() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "l" | "r") => ref.current?.scrollBy({ left: dir === "l" ? -320 : 320, behavior: "smooth" });

  return (
    <section style={{ padding: "48px 0", background: "#f7f7f7", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <img src="https://www.posterized.in/cdn/shop/t/109/assets/COLLECTION.svg?v=3093978380303881611771843117"
            alt="Collection" style={{ height: 34 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; const next = e.currentTarget.nextElementSibling as HTMLElement; if (next) next.style.display = "block"; }} />
          <h2 style={{ display: "none", fontFamily: FE, fontSize: 32, fontWeight: 900, color: "#111", textTransform: "uppercase", margin: 0 }}>Multi Poster Collections</h2>
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
          {multiPosters.map((p, i) => (
            <AnimatedContent key={p.id} distance={20} delay={i * 0.05} duration={0.5} threshold={0.05}
              style={{ flexShrink: 0, width: 220 }}>
              <MultiCard p={p} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
