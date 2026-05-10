"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

// 40 unique originals — Cars, Movies, Coffee Shop
const IMAGES = [
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp", alt: "Avengers Endgame" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp", alt: "Joker" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp", alt: "Porsche 911" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973893/crazefusion/originals/movies/3323_Inception_City_Street_Scene_Poster.webp", alt: "Inception" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973895/crazefusion/originals/movies/3326_Inferno_Movie_Poster.webp", alt: "Inferno" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973919/crazefusion/originals/movies/3373_Mean_Girls_2_Poster.webp", alt: "Mean Girls 2" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974044/crazefusion/originals/movies/582_Deadpool_Poster_Movie_Poster.webp", alt: "Deadpool" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973950/crazefusion/originals/movies/3431_The_Avengers_Poster.webp", alt: "The Avengers" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973746/crazefusion/originals/car-posters/3018_Chevrolet_ZR1_Corvette_Poster.webp", alt: "Chevrolet ZR1" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973769/crazefusion/originals/car-posters/3071_Lamborghini_Miura_Roadster_Poster.webp", alt: "Lamborghini Miura" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973765/crazefusion/originals/car-posters/3064_Koenigsegg_Regera_Hypercar_Poster.webp", alt: "Koenigsegg Regera" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973991/crazefusion/originals/movies/3502_Thor_Movie_Poster.webp", alt: "Thor" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973776/crazefusion/originals/car-posters/3095_Nissan_GT-R_R35_Poster.webp", alt: "Nissan GT-R" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973775/crazefusion/originals/car-posters/3087_McLaren_F1_Supercar_Poster.webp", alt: "McLaren F1" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974079/crazefusion/originals/coffee-shop-posters/4341_Espresso_Tonic_Drink_Poster.webp", alt: "Espresso Tonic" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974063/crazefusion/originals/coffee-shop-posters/3952_Matcha_Espresso_Drink_Poster.webp", alt: "Matcha Espresso" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973778/crazefusion/originals/car-posters/3098_Pagani_Huayra_BC_Roadster_Poster.webp", alt: "Pagani Huayra" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973767/crazefusion/originals/car-posters/3065_Lamborghini_Aventador_Poster.webp", alt: "Lamborghini Aventador" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973962/crazefusion/originals/movies/3452_The_Favourite_Poster.webp", alt: "The Favourite" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974067/crazefusion/originals/coffee-shop-posters/4007_Americano_Coffee_Drink_Poster.webp", alt: "Americano Coffee" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973747/crazefusion/originals/car-posters/3040_Dodge_Viper_ACR_Poster.webp", alt: "Dodge Viper ACR" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973757/crazefusion/originals/car-posters/3044_Ferrari_488_GTB_Poster.webp", alt: "Ferrari 488 GTB" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973792/crazefusion/originals/movies/2783_The_End_of_The_Fucking_World_Poster.webp", alt: "End of the World" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974061/crazefusion/originals/coffee-shop-posters/3942_Macchiato_Coffee_Drink_Poster.webp", alt: "Macchiato" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974048/crazefusion/originals/coffee-shop-posters/2897_A_Glass_of_Iced_Matcha_Latte_Poster.webp", alt: "Iced Matcha Latte" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973787/crazefusion/originals/car-posters/3116_SSC_Tuatara_Supercar_Poster.webp", alt: "SSC Tuatara" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973787/crazefusion/originals/car-posters/3114_Porsche_Cayman_GT4_RS_Poster.webp", alt: "Porsche Cayman GT4 RS" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974050/crazefusion/originals/coffee-shop-posters/2903_Coffee_Matcha_Drink_Close-Up_Poster.webp", alt: "Coffee Matcha" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973995/crazefusion/originals/movies/3510_Toy_Story_3_Poster.webp", alt: "Toy Story 3" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974008/crazefusion/originals/movies/513_Batman_Poster.webp", alt: "Batman" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973802/crazefusion/originals/movies/3138_A_Family_Affair_Poster.webp", alt: "A Family Affair" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973758/crazefusion/originals/car-posters/3046_Ferrari_Enzo_Roadster_Poster.webp", alt: "Ferrari Enzo" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973902/crazefusion/originals/movies/3340_John_Wick_Chapter_3_Poster.webp", alt: "John Wick 3" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973760/crazefusion/originals/car-posters/3048_Ferrari_F40_Coastal_Drive_Poster.webp", alt: "Ferrari F40" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974048/crazefusion/originals/coffee-shop-posters/2898_Il_Caffe_E_Pronto_Coffee_Is_Ready_Poster.webp", alt: "Il Caffe E Pronto" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973765/crazefusion/originals/car-posters/3062_Koenigsegg_Jesko_Roadster_Poster.webp", alt: "Koenigsegg Jesko" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973859/crazefusion/originals/movies/3259_Fantastic_Four_4K_UHD_Poster.webp", alt: "Fantastic Four" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973743/crazefusion/originals/car-posters/2973_Aston_Martin_One-77_Roadster_Poster.webp", alt: "Aston Martin One-77" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777974059/crazefusion/originals/coffee-shop-posters/3932_Turkish_Coffee_Cup_Poster.webp", alt: "Turkish Coffee" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/v1777973807/crazefusion/originals/movies/3151_American_Hustle_Poster.webp", alt: "American Hustle" },
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
          fit={1.6}
          fitBasis="max"
          minRadius={900}
          maxVerticalRotationDeg={12}
          segments={30}
          dragDampening={1.8}
          grayscale={false}
          overlayBlurColor="#080808"
          imageBorderRadius="16px"
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
          .hero-bottom {
            padding: 0 18px 32px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .hero-bottom h1 { font-size: clamp(32px, 8vw, 56px) !important; margin-bottom: 16px !important; }
          .hero-stats { gap: 16px !important; }
          .hero-stats > div > div:first-child { font-size: 20px !important; }
          .hero-stats > div > div:last-child { font-size: 9px !important; }
        }
        @media (max-width: 480px) {
          .hero-bottom { padding: 0 14px 24px !important; }
          .hero-stats { gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}
