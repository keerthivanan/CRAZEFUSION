"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// ORIGINALS — actual poster artwork, not room mockups
const CLD = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto";
const IMAGES = [
  { src: `${CLD}/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp`,      alt: "Avengers Endgame" },
  { src: `${CLD}/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp`,           alt: "Joker" },
  { src: `${CLD}/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp`, alt: "Porsche 911 Turbo" },
  { src: `${CLD}/v1777973893/crazefusion/originals/movies/3323_Inception_City_Street_Scene_Poster.webp`, alt: "Inception" },
  { src: `${CLD}/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp`,      alt: "Avengers" },
  { src: `${CLD}/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp`, alt: "Porsche" },
  { src: `${CLD}/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp`,           alt: "Joker 2" },
  { src: `${CLD}/v1777973893/crazefusion/originals/movies/3323_Inception_City_Street_Scene_Poster.webp`, alt: "Inception 2" },
  { src: `${CLD}/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp`,      alt: "Avengers 3" },
  { src: `${CLD}/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp`, alt: "Porsche 3" },
  { src: `${CLD}/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp`,           alt: "Joker 3" },
  { src: `${CLD}/v1777973893/crazefusion/originals/movies/3323_Inception_City_Street_Scene_Poster.webp`, alt: "Inception 3" },
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
    <section style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      background: "#080808",
      // NO overflow:hidden — dome sphere needs to render freely
    }}>

      {/* DomeGallery fills full section */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DomeGallery
          images={IMAGES}
          fit={0.8}
          minRadius={650}
          maxVerticalRotationDeg={16}
          segments={34}
          dragDampening={1.8}
          grayscale={false}
          overlayBlurColor="#080808"
          imageBorderRadius="20px"
          openedImageBorderRadius="16px"
          openedImageWidth="320px"
          openedImageHeight="460px"
        />
      </div>

      {/* Bottom overlay — headline + CTAs + stats */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 10,
        padding: "0 64px 52px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 45%, transparent 100%)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.8s 0.4s",
        pointerEvents: mounted ? "auto" : "none",
      }} className="hero-bottom">

        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.25)",
            borderRadius: 50, padding: "5px 14px", marginBottom: 20,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c084fc", display: "inline-block" }} />
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              Premium Wall Art · UK Delivery
            </span>
          </div>

          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(44px, 5.5vw, 88px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#fff",
            margin: "0 0 28px",
          }}>
            Your Walls<br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>Deserve</span><br />
            The Best
          </h1>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <ClickSpark sparkColor="#c084fc" sparkCount={10} sparkRadius={24}>
              <Link href="/collection" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 34px",
                background: "#fff", color: "#080808",
                fontFamily: FB, fontSize: 12, fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5)"; }}>
                Shop Collection →
              </Link>
            </ClickSpark>

            <Link href="/create" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: FB, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#fff", textDecoration: "none",
              padding: "14px 26px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 50,
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
              ✦ AI Studio
            </Link>
          </div>
        </div>

        {/* Right — stats */}
        <div style={{ display: "flex", gap: 36, alignItems: "flex-end", paddingBottom: 4 }} className="hero-stats">
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FH, fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center",
        opacity: mounted ? 0.45 : 0, transition: "opacity 1s 1.2s",
        pointerEvents: "none",
      }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: "#fff", letterSpacing: "0.22em", textTransform: "uppercase" }}>Drag to Explore</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-bottom { padding: 0 20px 36px !important; flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .hero-stats  { gap: 18px !important; }
        }
      `}</style>
    </section>
  );
}
