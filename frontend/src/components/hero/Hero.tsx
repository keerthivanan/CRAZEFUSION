"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const Grainient = dynamic(() => import("@/components/reactbits/Grainient"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// Your real Cloudinary poster images
const P1 = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973815/crazefusion/mockups/movies/3174_Avengers_Endgame_Poster.jpg";
const P2 = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973902/crazefusion/mockups/movies/3340_John_Wick_Chapter_3_Poster.jpg";
const P3 = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973780/crazefusion/mockups/car-posters/3104_Porsche_911_GT2_RS_Poster.jpg";
const P4 = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973745/crazefusion/mockups/car-posters/3014_Bugatti_La_Voiture_Noire_Poster.jpg";
const P5 = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777974050/crazefusion/mockups/coffee-shop-posters/2899_Lose_Yourself_in_Coffee_Books_Poster.jpg";

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
    <section style={{
      position: "relative",
      overflow: "hidden",
      background: "#b8a5c8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Grainient BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#94a3b8" color2="#d77abf" color3="#e19de1"
          timeSpeed={2.45} colorBalance={0} warpStrength={1}
          warpFrequency={5} warpSpeed={2} warpAmplitude={50}
          blendAngle={0} blendSoftness={0.05} rotationAmount={510}
          noiseScale={0.75} grainAmount={0} grainScale={1.5}
          grainAnimated={false} contrast={1.5} gamma={1} saturation={1}
          centerX={0} centerY={0} zoom={0.9}
        />
      </div>

      {/* Navbar clearance */}
      <div style={{ height: 84, flexShrink: 0 }} />

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
        padding: "24px 64px 64px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "50% 50%",
          alignItems: "center",
        }} className="hero-grid">

          {/* ── LEFT ── */}
          <div style={{
            paddingRight: 52,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(26,10,46,0.1)", border: "1px solid rgba(26,10,46,0.18)",
              borderRadius: 50, padding: "6px 16px", marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a0a2e", display: "inline-block" }} />
              <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a0a2e" }}>
                Premium Wall Art · UK Delivery
              </span>
            </div>

            <h1 style={{
              fontFamily: FH,
              fontSize: "clamp(50px, 6vw, 96px)",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#1a0a2e",
              margin: "0 0 28px",
            }}>
              Your<br />
              Walls<br />
              <span style={{ color: "#fff", WebkitTextStroke: "2.5px #1a0a2e" }}>Deserve</span><br />
              The Best
            </h1>

            <p style={{
              fontFamily: FB, fontSize: 14, color: "#2d1b4e",
              lineHeight: 1.85, maxWidth: 400, margin: "0 0 36px", fontWeight: 500,
            }}>
              Premium quality posters for Cars, Movies, Coffee Shop &amp; more.
              Starting from £9.99 — free UK delivery on orders over £30.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
              <ClickSpark sparkColor="#1a0a2e" sparkCount={10} sparkRadius={24}>
                <Link href="/collection" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "16px 36px", background: "#1a0a2e", color: "#fff",
                  fontFamily: FB, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 50,
                  boxShadow: "0 8px 32px rgba(26,10,46,0.3)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(26,10,46,0.42)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(26,10,46,0.3)"; }}>
                  Shop Collection →
                </Link>
              </ClickSpark>

              <Link href="/create" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: FB, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#1a0a2e", textDecoration: "none",
                padding: "15px 28px",
                border: "2px solid rgba(26,10,46,0.3)",
                borderRadius: 50,
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,10,46,0.1)"; e.currentTarget.style.borderColor = "rgba(26,10,46,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.borderColor = "rgba(26,10,46,0.3)"; }}>
                ✦ AI Studio
              </Link>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              borderTop: "1.5px solid rgba(26,10,46,0.18)", paddingTop: 28,
            }} className="stats-grid">
              {STATS.map((s, i) => (
                <div key={i} style={{
                  borderRight: i < STATS.length - 1 ? "1.5px solid rgba(26,10,46,0.18)" : "none",
                  paddingRight: 16, paddingLeft: i > 0 ? 16 : 0,
                }}>
                  <div style={{ fontFamily: FH, fontSize: 26, fontWeight: 900, color: "#1a0a2e", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: FB, fontSize: 10, color: "#4a2a6e", marginTop: 6, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: poster collage ── */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
            height: "min(68vh, 600px)",
            position: "relative",
          }} className="hero-images">

            {/* Poster 1 — large, back-left, tilted */}
            <div style={{
              position: "absolute",
              left: "2%", top: "0%",
              width: "44%", height: "90%",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 32px 72px rgba(26,10,46,0.4)",
              transform: "rotate(-4deg)",
              transformOrigin: "bottom center",
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(-4deg) translateY(-16px) scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-4deg)")}>
              <img src={P1} alt="Avengers" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(26,10,46,0.85)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 11px", borderRadius: 50 }}>Movies</span>
            </div>

            {/* Poster 2 — center, tallest, slightly forward */}
            <div style={{
              position: "absolute",
              left: "28%", top: "2%",
              width: "38%", height: "96%",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(26,10,46,0.45)",
              transform: "translateY(-8px)",
              transformOrigin: "bottom center",
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
              zIndex: 2,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-22px) scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(-8px)")}>
              <img src={P2} alt="John Wick" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(26,10,46,0.85)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 11px", borderRadius: 50 }}>Movies</span>
            </div>

            {/* Poster 3 — right, tilted */}
            <div style={{
              position: "absolute",
              right: "0%", top: "8%",
              width: "35%", height: "80%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 24px 56px rgba(26,10,46,0.35)",
              transform: "rotate(4deg) translateY(4px)",
              transformOrigin: "bottom center",
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(4deg) translateY(-10px) scale(1.02)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(4deg) translateY(4px)")}>
              <img src={P3} alt="Porsche" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", top: 11, left: 11, background: "rgba(26,10,46,0.85)", backdropFilter: "blur(6px)", color: "#fff", fontFamily: FB, fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 50 }}>Cars</span>
            </div>

            {/* Floating mini card — bottom left */}
            <div style={{
              position: "absolute",
              left: "0%", bottom: "4%",
              width: "26%", height: "30%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(26,10,46,0.3)",
              transform: "rotate(-2deg)",
              zIndex: 3,
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(-2deg) translateY(-8px) scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(-2deg)")}>
              <img src={P5} alt="Coffee" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Floating mini card — bottom right */}
            <div style={{
              position: "absolute",
              right: "2%", bottom: "2%",
              width: "24%", height: "28%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 16px 40px rgba(26,10,46,0.3)",
              transform: "rotate(2deg)",
              zIndex: 3,
              transition: "transform 0.4s cubic-bezier(.22,.68,0,1.2)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(2deg) translateY(-8px) scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "rotate(2deg)")}>
              <img src={P4} alt="Bugatti" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-grid > div:first-child { padding-right: 0 !important; }
          .hero-images { height: 300px !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; row-gap: 20px !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { padding-left: 0 !important; }
        }
        @media (max-width: 540px) {
          .hero-images { height: 220px !important; }
          .hero-grid { padding: 20px 18px 40px !important; }
        }
      `}</style>
    </section>
  );
}
