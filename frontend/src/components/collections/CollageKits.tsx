"use client";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

const kits = [
  { id: 1, title: "Marvel 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop" },
  { id: 2, title: "Anime 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop" },
  { id: 3, title: "Cars 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=400&fit=crop" },
  { id: 4, title: "Music 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop" },
  { id: 5, title: "Sports 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop" },
  { id: 6, title: "Movies 50-Piece Collage Kit", pieces: 50, price: 389, originalPrice: 999, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=400&fit=crop" },
];

export default function CollageKits() {
  return (
    <section style={{ padding: "80px 0", background: "#0a0900" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader label="Fill your entire wall" title="50-Piece Collage" highlight="Kits" subtitle="61% off · 50 individual posters · One theme · Endless vibe" viewAllHref="/collection" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {kits.map(kit => (
            <Link key={kit.id} href="/collection" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--surface)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(255,215,0,0.4)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.5)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
                  <img src={kit.img} alt={kit.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 8, right: 8, background: "#ef4444", color: "#fff", fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700, padding: "3px 7px", borderRadius: 3 }}>
                    61% OFF
                  </div>
                </div>
                <div style={{ padding: "12px" }}>
                  <div style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "#999", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{kit.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-epilogue)", fontSize: 15, fontWeight: 800, color: "var(--gold)" }}>₹{kit.price}</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "#444", textDecoration: "line-through" }}>₹{kit.originalPrice}</span>
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
