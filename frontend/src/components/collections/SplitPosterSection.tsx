"use client";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const splits = [
  { id: 1, pieces: "9-Piece", title: "DEFENDER | Built For No Roads", price: 499, img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop" },
  { id: 2, pieces: "8-Panel", title: "MOST WANTED | Street Racing Legends", price: 499, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { id: 3, pieces: "5-Piece", title: "HUSTLE | Entrepreneur Motivation", price: 399, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop" },
  { id: 4, pieces: "9-Piece", title: "DISCIPLINE | Anime Gym Motivation", price: 499, img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&h=400&fit=crop" },
];

const gridSize = (pieces: string) =>
  pieces.startsWith("9") ? "33.33% 33.33%" : pieces.startsWith("8") ? "25% 25%" : "33.33% 33.33%";

export default function SplitPosterSection() {
  return (
    <section style={{ padding: "96px 0", background: "#0e0e0e" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
        <SectionHeader
          label="Multi-piece wall sets"
          title="Split Poster"
          highlight="Collections"
          subtitle="One image. Multiple panels. Transform your entire wall."
          viewAllHref="/collection"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {splits.map(item => (
            <Link key={item.id} href="/collection" style={{ textDecoration: "none" }}>
              <div
                style={{ background: "#1c1b1b", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease", cursor: "pointer" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,215,0,0.35)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}>
                  <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  {/* Grid overlay simulating split panels */}
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.55) 1px, transparent 1px)", backgroundSize: gridSize(item.pieces) }} />
                  {/* Badge */}
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{ background: "#FFD700", color: "#000", fontFamily: "var(--font-space-var, sans-serif)", fontSize: 10, fontWeight: 800, padding: "4px 10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {item.pieces} Split
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div style={{ padding: "16px 18px 18px" }}>
                  <div style={{ fontFamily: "var(--font-epilogue-var, sans-serif)", fontSize: 13, fontWeight: 700, color: "#ccc", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 6 }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-epilogue-var, sans-serif)", fontSize: 18, fontWeight: 800, color: "#FFD700" }}>
                    From ₹{item.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
