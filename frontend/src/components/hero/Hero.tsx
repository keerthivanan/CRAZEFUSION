"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const Grainient = dynamic(() => import("@/components/reactbits/Grainient"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

const POSTERS = [
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp",
    label: "Movies",
  },
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp",
    label: "Movies",
  },
  {
    src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp",
    label: "Cars",
  },
];

const STATS = [
  { val: "10K+", label: "Customers" },
  { val: "609+", label: "Designs" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#94a3b8", paddingTop: 108 }}>

      {/* Grainient background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#94a3b8"
          color2="#d77abf"
          color3="#e19de1"
          timeSpeed={2.45}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={510}
          noiseScale={0.75}
          grainAmount={0}
          grainScale={1.5}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Main grid */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 48, alignItems: "center",
        padding: "72px 48px 64px",
        position: "relative", zIndex: 1,
      }} className="hero-grid">

        {/* LEFT — text */}
        <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s" }}>

          {/* Headline — dark so it's readable on any pink/lavender */}
          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(52px,6.5vw,96px)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "#1a0a2e",
            margin: "0 0 28px",
          }}>
            Your Walls<br />
            <span style={{ color: "#fff", WebkitTextStroke: "2px #1a0a2e" }}>Deserve</span><br />
            The Best
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: FB, fontSize: 15,
            color: "#2d1b4e",
            lineHeight: 1.75, maxWidth: 400,
            margin: "0 0 36px", fontWeight: 500,
          }}>
            Premium quality posters for Cars, Movies, Coffee Shop &amp; more.
            Starting from £9.99 — free UK delivery on orders over £30.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 52 }}>
            <ClickSpark sparkColor="#1a0a2e" sparkCount={10} sparkRadius={24}>
              <Link href="/collection"
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "14px 32px",
                  background: "#1a0a2e", color: "#fff",
                  fontFamily: FB, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 50,
                  boxShadow: "0 4px 24px rgba(26,10,46,0.25)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Shop Collection
              </Link>
            </ClickSpark>

            <Link href="/collection"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: FB, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#1a0a2e", textDecoration: "none",
                padding: "13px 24px",
                border: "1.5px solid rgba(26,10,46,0.35)",
                borderRadius: 50, transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(26,10,46,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              Browse All ↗
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1.5px solid rgba(26,10,46,0.15)", paddingTop: 28,
          }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} style={{
                borderRight: i < STATS.length - 1 ? "1.5px solid rgba(26,10,46,0.15)" : "none",
                paddingRight: 16, paddingLeft: i > 0 ? 16 : 0,
              }}>
                <div style={{ fontFamily: FH, fontSize: 22, fontWeight: 800, color: "#1a0a2e", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: FB, fontSize: 10, color: "#5a3a7e", marginTop: 5, letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — posters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 12,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s 0.15s",
        }} className="hero-images">

          {/* Large poster — spans 2 rows */}
          <div style={{ gridRow: "1 / 3", borderRadius: 16, overflow: "hidden", position: "relative", boxShadow: "0 24px 64px rgba(26,10,46,0.25)", aspectRatio: "3/4" }}>
            <img src={POSTERS[0].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 12, left: 12, background: "#1a0a2e", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 50 }}>
              {POSTERS[0].label}
            </span>
          </div>

          {/* Small poster 1 */}
          <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", boxShadow: "0 12px 32px rgba(26,10,46,0.2)", aspectRatio: "3/4" }}>
            <img src={POSTERS[1].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 10, left: 10, background: "#1a0a2e", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 50 }}>
              {POSTERS[1].label}
            </span>
          </div>

          {/* Small poster 2 */}
          <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", boxShadow: "0 12px 32px rgba(26,10,46,0.2)", aspectRatio: "3/4" }}>
            <img src={POSTERS[2].src} alt="poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")} />
            <span style={{ position: "absolute", top: 10, left: 10, background: "#1a0a2e", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 50 }}>
              {POSTERS[2].label}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid   { grid-template-columns: 1fr !important; padding: 40px 20px 48px !important; gap: 36px !important; }
          .hero-images { display: flex !important; gap: 10px !important; height: 240px !important; }
          .hero-images > div { flex: 1 !important; aspect-ratio: unset !important; height: 100% !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; row-gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
