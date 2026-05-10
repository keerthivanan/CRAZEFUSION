"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

const POSTERS = [
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp",
    label: "Movies", size: "large",
  },
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp",
    label: "Movies", size: "small",
  },
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp",
    label: "Cars", size: "small",
  },
];

const STATS = [
  { val: "10,000+", label: "Happy customers" },
  { val: "609+",    label: "Designs" },
  { val: "48hr",    label: "Printed & shipped" },
  { val: "4.8★",    label: "Average rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ background: "var(--c-bg)", overflow: "hidden", paddingTop: 108 }}>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 48, alignItems: "center",
        padding: "72px 48px 56px",
      }} className="hero-grid">

        {/* LEFT — text */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s" }}>

          {/* Headline */}
          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(52px, 6.5vw, 96px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "var(--c-text)",
            margin: "0 0 28px",
          }}>
            Your Walls<br />
            <span style={{ color: "#e8a000" }}>Deserve</span><br />
            The Best
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: FB,
            fontSize: 15,
            color: "var(--c-text-muted)",
            lineHeight: 1.75,
            maxWidth: 400,
            margin: "0 0 36px",
          }}>
            Premium quality posters for Cars, Movies, Coffee Shop &amp; more.
            Starting from £9.99 — free UK delivery on orders over £30.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
            <ClickSpark sparkColor="#e8a000" sparkCount={10} sparkRadius={24}>
              <Link href="/collection"
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "14px 32px",
                  background: "var(--c-text)", color: "var(--c-btn-text)",
                  fontFamily: FB, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 50,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Shop Collection
              </Link>
            </ClickSpark>
            <Link href="/collection"
              style={{
                fontFamily: FB, fontSize: 12, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--c-text-muted)", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 6,
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-text-muted)")}>
              Browse All <span style={{ fontSize: 14 }}>↗</span>
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            gap: 0, borderTop: "1px solid var(--c-border)", paddingTop: 28,
          }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} style={{
                borderRight: i < STATS.length - 1 ? "1px solid var(--c-border)" : "none",
                paddingRight: 20, paddingLeft: i > 0 ? 20 : 0,
              }}>
                <div style={{ fontFamily: FH, fontSize: 22, fontWeight: 800, color: "var(--c-text)", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: FB, fontSize: 10, color: "var(--c-text-muted)", marginTop: 5, letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — poster images */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 12,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s 0.15s",
        }} className="hero-images">

          {/* Large poster — spans 2 rows */}
          <div style={{ gridRow: "1 / 3", borderRadius: 16, overflow: "hidden", position: "relative", boxShadow: "0 24px 64px rgba(0,0,0,0.12)", aspectRatio: "3/4" }}>
            <img src={POSTERS[0].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 12, left: 12, background: "#e8a000", color: "#000", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 50 }}>
              {POSTERS[0].label}
            </span>
          </div>

          {/* Small poster 1 */}
          <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", boxShadow: "0 12px 32px rgba(0,0,0,0.1)", aspectRatio: "3/4" }}>
            <img src={POSTERS[1].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 10, left: 10, background: "#e8a000", color: "#000", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 50 }}>
              {POSTERS[1].label}
            </span>
          </div>

          {/* Small poster 2 */}
          <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", boxShadow: "0 12px 32px rgba(0,0,0,0.1)", aspectRatio: "3/4" }}>
            <img src={POSTERS[2].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 10, left: 10, background: "#e8a000", color: "#000", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 50 }}>
              {POSTERS[2].label}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid   { grid-template-columns: 1fr !important; padding: 40px 20px 48px !important; gap: 40px !important; }
          .hero-images { display: flex !important; gap: 10px !important; height: 260px !important; }
          .hero-images > div { flex: 1 !important; aspect-ratio: unset !important; height: 100% !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  );
}
