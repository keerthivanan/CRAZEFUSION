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
  { val: "10K+", label: "Happy Customers" },
  { val: "609+", label: "Designs" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{
      position: "relative",
      overflow: "hidden",
      background: "#b8a5c8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Grainient background — fills full section */}
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

      {/* Navbar clearance: top(12) + height(60) = 72px */}
      <div style={{ height: 72, flexShrink: 0 }} />

      {/* Main layout */}
      <div style={{
        flex: 1,
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "48px 72px 72px",
        position: "relative",
        zIndex: 1,
        gap: 0,
      }} className="hero-grid">

        {/* ── LEFT: Copy ── */}
        <div style={{
          paddingRight: 56,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.65s ease, transform 0.65s ease",
        }}>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(26,10,46,0.1)",
            border: "1px solid rgba(26,10,46,0.18)",
            borderRadius: 50,
            padding: "7px 18px",
            marginBottom: 32,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a0a2e", display: "inline-block" }} />
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#1a0a2e" }}>
              Premium Wall Art · UK Delivery
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(68px, 9vw, 136px)",
            fontWeight: 900,
            lineHeight: 0.87,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#1a0a2e",
            margin: "0 0 36px",
          }}>
            Your<br />
            Walls<br />
            <span style={{ color: "#fff", WebkitTextStroke: "3px #1a0a2e" }}>Deserve</span><br />
            The Best
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: FB,
            fontSize: 15,
            color: "#2d1b4e",
            lineHeight: 1.85,
            maxWidth: 430,
            margin: "0 0 44px",
            fontWeight: 500,
          }}>
            Premium quality posters for Cars, Movies, Coffee Shop &amp; more.
            Starting from £9.99 — free UK delivery on orders over £30.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 60 }}>
            <ClickSpark sparkColor="#1a0a2e" sparkCount={10} sparkRadius={24}>
              <Link href="/collection" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "17px 38px",
                background: "#1a0a2e", color: "#fff",
                fontFamily: FB, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                boxShadow: "0 8px 36px rgba(26,10,46,0.32)",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 14px 44px rgba(26,10,46,0.42)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(26,10,46,0.32)"; }}>
                Shop Collection <span style={{ fontSize: 15 }}>→</span>
              </Link>
            </ClickSpark>

            <Link href="/create" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontFamily: FB, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#1a0a2e", textDecoration: "none",
              padding: "16px 30px",
              border: "2px solid rgba(26,10,46,0.28)",
              borderRadius: 50,
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,10,46,0.12)"; e.currentTarget.style.borderColor = "rgba(26,10,46,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(26,10,46,0.28)"; }}>
              ✦ AI Studio
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1.5px solid rgba(26,10,46,0.18)",
            paddingTop: 32,
          }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} style={{
                borderRight: i < STATS.length - 1 ? "1.5px solid rgba(26,10,46,0.18)" : "none",
                paddingRight: 20, paddingLeft: i > 0 ? 20 : 0,
              }}>
                <div style={{ fontFamily: FH, fontSize: 28, fontWeight: 900, color: "#1a0a2e", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: FB, fontSize: 10, color: "#4a2a6e", marginTop: 7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Fanned posters ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 16,
          height: "min(72vh, 660px)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.75s 0.18s, transform 0.75s 0.18s",
          paddingBottom: 12,
        }} className="hero-images">

          {/* Poster 1 — tallest, tilts left */}
          <div style={{
            flex: "0 0 37%",
            height: "100%",
            borderRadius: 22,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 48px 96px rgba(26,10,46,0.4), 0 16px 32px rgba(26,10,46,0.2)",
            transform: "rotate(-5deg) translateY(-18px)",
            transformOrigin: "bottom center",
            transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "rotate(-5deg) translateY(-34px) scale(1.02)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-5deg) translateY(-18px)")}>
            <img src={POSTERS[0].src} alt="Movie poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", top: 14, left: 14, background: "rgba(26,10,46,0.9)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "5px 13px", borderRadius: 50 }}>
              {POSTERS[0].label}
            </span>
          </div>

          {/* Poster 2 — medium, center, highest */}
          <div style={{
            flex: "0 0 30%",
            height: "86%",
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 48px 96px rgba(26,10,46,0.45), 0 16px 32px rgba(26,10,46,0.25)",
            transform: "translateY(-36px)",
            transformOrigin: "bottom center",
            transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
            zIndex: 2,
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-54px) scale(1.03)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateY(-36px)")}>
            <img src={POSTERS[1].src} alt="Movie poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(26,10,46,0.9)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 11px", borderRadius: 50 }}>
              {POSTERS[1].label}
            </span>
          </div>

          {/* Poster 3 — smaller, tilts right */}
          <div style={{
            flex: "0 0 27%",
            height: "72%",
            borderRadius: 18,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 36px 80px rgba(26,10,46,0.35), 0 12px 24px rgba(26,10,46,0.18)",
            transform: "rotate(5deg) translateY(-6px)",
            transformOrigin: "bottom center",
            transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "rotate(5deg) translateY(-22px) scale(1.02)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "rotate(5deg) translateY(-6px)")}>
            <img src={POSTERS[2].src} alt="Car poster" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <span style={{ position: "absolute", top: 11, left: 11, background: "rgba(26,10,46,0.9)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 11px", borderRadius: 50 }}>
              {POSTERS[2].label}
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid   { grid-template-columns: 1fr !important; padding: 40px 28px 56px !important; gap: 44px !important; }
          .hero-grid > div:first-child { padding-right: 0 !important; }
          .hero-images { height: 280px !important; gap: 10px !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; row-gap: 22px !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { padding-left: 0 !important; }
        }
        @media (max-width: 540px) {
          .hero-grid   { padding: 28px 18px 44px !important; gap: 32px !important; }
          .hero-images { height: 220px !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
