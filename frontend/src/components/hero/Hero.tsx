"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const IMGS = [
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp", rotate: "-6deg", label: "Movies" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp", rotate: "4deg", label: "Cars" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp", rotate: "-2deg", label: "Movies" },
];

const STATS = [
  { val: "609+", label: "Designs" },
  { val: "10K+", label: "Customers" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ background: "#080808", minHeight: "100vh", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>

      {/* Noise overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.035, pointerEvents: "none", zIndex: 1 }} />

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(232,160,0,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Background word */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(80px,18vw,260px)", fontWeight: 900, letterSpacing: "-0.06em", color: "rgba(255,255,255,0.02)", userSelect: "none", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 0, textTransform: "uppercase", fontFamily: FO }}>
        WALL ART
      </div>

      {/* Main grid */}
      <div style={{ flex: 1, maxWidth: 1400, margin: "0 auto", width: "100%", padding: "clamp(80px,10vh,120px) 40px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative", zIndex: 2 }} className="hero-grid">

        {/* LEFT */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s" }}>

          {/* AI pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,160,0,0.08)", border: "1px solid rgba(232,160,0,0.2)", borderRadius: 50, padding: "8px 16px", marginBottom: 32, animation: "fadeUp 0.6s ease 0.1s both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8a000", display: "inline-block", boxShadow: "0 0 8px #e8a000" }} />
            <span style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8a000" }}>AI Studio Now Live</span>
            <Link href="/create" style={{ fontFamily: FO, fontSize: 10, color: "#e8a000", opacity: 0.7, textDecoration: "none", fontWeight: 600 }}>Try it</Link>
          </div>

          {/* Headline */}
          <div style={{ overflow: "hidden", animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(52px,7vw,104px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", color: "#fff", textTransform: "uppercase", margin: 0 }}>
              Your
            </h1>
          </div>
          <div style={{ overflow: "hidden", animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both" }}>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(52px,7vw,104px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "6px 0", background: "linear-gradient(135deg,#e8a000 0%,#fff176 50%,#e8a000 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Walls
            </h1>
          </div>
          <div style={{ overflow: "hidden", animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.29s both" }}>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(52px,7vw,104px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", color: "#fff", textTransform: "uppercase", margin: 0 }}>
              Deserve
            </h1>
          </div>
          <div style={{ overflow: "hidden", animation: "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.36s both" }}>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(52px,7vw,104px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", textTransform: "uppercase", margin: "6px 0 0", WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" as any }}>
              The Best
            </h1>
          </div>

          <p style={{ fontFamily: FO, fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: 420, margin: "28px 0 0", lineHeight: 1.8, animation: "fadeUp 0.7s ease 0.55s both" }}>
            Premium wall art for your space. 609+ curated designs — Cars, Movies, Coffee & more. Printed & shipped in 48 hours across the UK.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36, animation: "fadeUp 0.7s ease 0.65s both" }}>
            <ClickSpark sparkColor="#e8a000" sparkCount={12} sparkRadius={28}>
              <Link href="/collection" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 36px", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 40px rgba(232,160,0,0.3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(232,160,0,0.5)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(232,160,0,0.3)"; }}>
                Shop Now
              </Link>
            </ClickSpark>
            <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
              <Link href="/create" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 32px", background: "rgba(255,255,255,0.05)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.2s", backdropFilter: "blur(8px)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)"; }}>
                AI Studio
              </Link>
            </ClickSpark>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 28, marginTop: 44, animation: "fadeUp 0.7s ease 0.75s both", flexWrap: "wrap" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: 16 }}>
                <div style={{ fontFamily: FO, fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{s.val}</div>
                <div style={{ fontFamily: FO, fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — floating posters */}
        <div style={{ position: "relative", height: "clamp(420px,60vh,640px)", animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both" }} className="hero-images">
          {IMGS.map((img, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                width: i === 0 ? "52%" : "42%",
                aspectRatio: "3/4",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: hovered === i ? "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)" : "0 20px 60px rgba(0,0,0,0.6)",
                transform: `rotate(${img.rotate}) ${hovered === i ? "scale(1.04) translateY(-8px)" : "scale(1)"}`,
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                zIndex: hovered === i ? 10 : i === 0 ? 3 : i === 1 ? 2 : 1,
                top: i === 0 ? "0%" : i === 1 ? "30%" : "10%",
                left: i === 0 ? "5%" : i === 1 ? "42%" : "25%",
                background: "#111",
              }}>
              <img src={img.src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", transform: hovered === i ? "scale(1.06)" : "scale(1)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "4px 12px", fontFamily: FO, fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {img.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "16px 0", position: "relative", zIndex: 2 }}>
        <div ref={marqueeRef} style={{ display: "flex", gap: 0, width: "max-content", animation: "marquee 25s linear infinite" }}>
          {[...Array(3)].map((_, r) => (
            <div key={r} style={{ display: "flex", gap: 0 }}>
              {["PREMIUM QUALITY", "FREE UK DELIVERY", "609+ DESIGNS", "48HR PRINTING", "AI STUDIO LIVE", "PRINT ON DEMAND"].map((t, i) => (
                <span key={i} style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(255,255,255,0.25)" : "#e8a000", padding: "0 32px", whiteSpace: "nowrap" }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 48px !important; gap: 48px !important; }
          .hero-images { height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
