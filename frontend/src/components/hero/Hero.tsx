"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FB = "var(--font-poppins-var,'Poppins',sans-serif)";
const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const CLD = "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto";

const POSTER_IMAGES = [
  { src: `${CLD}/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp`,      alt: "Avengers Endgame" },
  { src: `${CLD}/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp`,           alt: "Joker" },
  { src: `${CLD}/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp`, alt: "Porsche 911" },
  { src: `${CLD}/v1777973893/crazefusion/originals/movies/3323_Inception_City_Street_Scene_Poster.webp`, alt: "Inception" },
  { src: `${CLD}/v1777807959/crazefusion/mockups/mockup_naruto_-_jun_9.jpg`,                       alt: "Naruto" },
  { src: `${CLD}/v1777807993/crazefusion/mockups/mockup_ronaldo.jpg`,                              alt: "Ronaldo" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",               alt: "Anime Art" },
  { src: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=600&q=80",               alt: "Sports Car" },
  { src: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80",               alt: "Movie Poster" },
  { src: "https://images.unsplash.com/photo-1559181567-c3190ca9d421?w=600&q=80",                  alt: "Coffee Art" },
  { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",                  alt: "Ferrari" },
  { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",                  alt: "Car Poster" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",               alt: "Porsche" },
  { src: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?w=600&q=80",               alt: "Lamborghini" },
  { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",                  alt: "Dark Aesthetic" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",               alt: "Landscape" },
  { src: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80",               alt: "Cat Art" },
  { src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",                  alt: "Wolf Art" },
  { src: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80",               alt: "Book Aesthetic" },
  { src: "https://images.unsplash.com/photo-1529417305485-480f579e7578?w=600&q=80",               alt: "Anime Style" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", background: "#080808", overflow: "hidden" }}>

      {/* DomeGallery — fills entire hero */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DomeGallery
          images={POSTER_IMAGES}
          fit={0.8}
          minRadius={650}
          maxVerticalRotationDeg={16}
          segments={34}
          dragDampening={1.8}
          grayscale={false}
          overlayBlurColor="#080808"
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
          openedImageWidth="340px"
          openedImageHeight="480px"
        />
      </div>

      {/* Overlay: bottom text + CTA */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        zIndex: 10,
        padding: "0 64px 56px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.5) 50%, transparent 100%)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.8s 0.3s",
      }} className="hero-bottom">

        {/* Left — headline + CTA */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 50, padding: "5px 14px", marginBottom: 18,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c084fc", display: "inline-block" }} />
            <span style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
              Premium Wall Art · UK Delivery
            </span>
          </div>

          <h1 style={{
            fontFamily: FH,
            fontSize: "clamp(42px, 5.5vw, 88px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#fff",
            margin: "0 0 24px",
          }}>
            Your Walls<br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px #fff" }}>Deserve</span><br />
            The Best
          </h1>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <ClickSpark sparkColor="#c084fc" sparkCount={10} sparkRadius={24}>
              <Link href="/collection" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px",
                background: "#fff", color: "#080808",
                fontFamily: FB, fontSize: 12, fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)"; }}>
                Shop Collection →
              </Link>
            </ClickSpark>

            <Link href="/create" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: FB, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#fff", textDecoration: "none",
              padding: "13px 24px",
              border: "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 50,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}>
              ✦ AI Studio
            </Link>
          </div>
        </div>

        {/* Right — stats */}
        <div style={{ display: "flex", gap: 40, alignItems: "flex-end", paddingBottom: 4 }} className="hero-stats">
          {[
            { val: "10K+", label: "Customers" },
            { val: "609+", label: "Designs" },
            { val: "48hr", label: "Delivery" },
            { val: "4.8★", label: "Rating" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FH, fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", top: 96, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, textAlign: "center",
        opacity: mounted ? 0.5 : 0, transition: "opacity 1s 1s",
        pointerEvents: "none",
      }}>
        <div style={{ fontFamily: FB, fontSize: 10, color: "#fff", letterSpacing: "0.2em", textTransform: "uppercase" }}>Drag to Explore</div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-bottom { padding: 0 20px 40px !important; flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .hero-stats  { gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
