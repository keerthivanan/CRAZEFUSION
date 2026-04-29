"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const trending = [
  { id:1,  title: "BMW M2 | Vector Style Cars #01",   price: 79, original: 149, img: "https://www.posterized.in/cdn/shop/files/BMWM2.jpg?v=1736616556&width=533" },
  { id:2,  title: "GTR | Vector Style Cars #01",      price: 79, original: 149, img: "https://www.posterized.in/cdn/shop/files/GTR.jpg?v=1736617693&width=533" },
  { id:3,  title: "Porsche 911 GT3 RS | Supercar",    price: 79, original: 149, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=533&fit=crop&q=80" },
  { id:4,  title: "HUSTLE | Entrepreneur Motivation", price: 79, original: 149, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=533&fit=crop&q=80" },
  { id:5,  title: "Lamborghini Huracán | Supercar",   price: 79, original: 149, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=533&fit=crop&q=80" },
  { id:6,  title: "Virat Kohli | Century King",       price: 89, original: 149, img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=533&fit=crop&q=80" },
  { id:7,  title: "Joker | Dark Knight | Premium",    price: 79, original: 149, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=533&fit=crop&q=80" },
  { id:8,  title: "Ferrari SF-23 | F1 Champion",      price: 89, original: 149, img: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=400&h=533&fit=crop&q=80" },
  { id:9,  title: "DISCIPLINE | Anime Gym Motivation",price: 79, original: 149, img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=533&fit=crop&q=80" },
  { id:10, title: "Ronaldo | SIUUU | Football Legend", price: 89, original: 149, img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=533&fit=crop&q=80" },
];

function TCard({ p }: { p: typeof trending[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const disc = Math.round((1 - p.price / p.original) * 100);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 10, background: "#f7f7f7" }}>
        <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }} />
        <span style={{ position: "absolute", top: 8, left: 8, background: "#dc2626", color: "#fff", fontFamily: F, fontSize: 9, fontWeight: 800, padding: "3px 7px", textTransform: "uppercase" }}>-{disc}%</span>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "all 0.25s ease" }}>
          <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 1500); }}
            style={{ width: "100%", padding: "9px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
            {added ? "✓ Added!" : "Quick Add"}
          </button>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FE, fontSize: 12, fontWeight: 700, color: "#111", textTransform: "uppercase", marginBottom: 3, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.title}</div>
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
  const scroll = (dir: "l" | "r") => ref.current?.scrollBy({ left: dir === "l" ? -280 : 280, behavior: "smooth" });

  return (
    <section style={{ padding: "48px 0", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
            Trending <span style={{ color: "#e8a000" }}>Now</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/collection" style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", textDecoration: "none", borderBottom: "1.5px solid #111" }}>View All</Link>
            <div style={{ display: "flex", gap: 6 }}>
              {["←","→"].map((d, i) => (
                <button key={d} onClick={() => scroll(i === 0 ? "l" : "r")}
                  style={{ width: 34, height: 34, border: "1px solid #e0e0e0", background: "#fff", cursor: "pointer", fontSize: 14, transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#111"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#111"; (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0"; }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div ref={ref} className="no-scrollbar" style={{ display: "flex", gap: 14, overflowX: "auto" }}>
          {trending.map((p, i) => (
            <AnimatedContent key={p.id} distance={16} delay={i * 0.04} duration={0.5} threshold={0.05}
              style={{ flexShrink: 0, width: 185 }}>
              <TCard p={p} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
