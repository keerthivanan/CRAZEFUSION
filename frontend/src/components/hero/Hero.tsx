"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const DomeGallery = dynamic(() => import("@/components/reactbits/DomeGallery"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

const IMAGES = [
  { src: "/dome-images/cars/0001_bugatti.webp", alt: "Bugatti" },
  { src: "/dome-images/cars/0002_bugatti.webp", alt: "Bugatti" },
  { src: "/dome-images/cars/0003_bugatti.webp", alt: "Bugatti" },
  { src: "/dome-images/cars/0004_bugatti_chiron.webp", alt: "Bugatti Chiron" },
  { src: "/dome-images/cars/0005_bugatti_chiron.webp", alt: "Bugatti Chiron" },
  { src: "/dome-images/cars/0006_bugatti_chiron.webp", alt: "Bugatti Chiron" },
  { src: "/dome-images/cars/0007_bugatti_chiron.webp", alt: "Bugatti Chiron" },
  { src: "/dome-images/cars/0008_bugatti_veyron.webp", alt: "Bugatti Veyron" },
  { src: "/dome-images/cars/0009_lamborghini.webp", alt: "Lamborghini" },
  { src: "/dome-images/cars/0010_lamborghini_aventado.webp", alt: "Lamborghini Aventador" },
  { src: "/dome-images/cars/0011_lamborghini_huracan.webp", alt: "Lamborghini Huracán" },
  { src: "/dome-images/cars/0012_lamborghini_urus.webp", alt: "Lamborghini Urus" },
  { src: "/dome-images/cars/0013_ferrari_f40.webp", alt: "Ferrari F40" },
  { src: "/dome-images/cars/0014_ferrari_laferrari.webp", alt: "Ferrari LaFerrari" },
  { src: "/dome-images/cars/0015_ferrari_laferrari.webp", alt: "Ferrari LaFerrari" },
  { src: "/dome-images/cars/0016_porsche.webp", alt: "Porsche" },
  { src: "/dome-images/cars/0017_porsche.webp", alt: "Porsche" },
  { src: "/dome-images/cars/0018_porsche_911.webp", alt: "Porsche 911" },
  { src: "/dome-images/cars/0019_mclaren_720s.webp", alt: "McLaren 720S" },
  { src: "/dome-images/cars/0020_mclaren_720s.webp", alt: "McLaren 720S" },
  { src: "/dome-images/cars/0021_aston_martin.webp", alt: "Aston Martin" },
  { src: "/dome-images/cars/0022_rolls_royce.webp", alt: "Rolls Royce" },
  { src: "/dome-images/cars/0023_bentley.webp", alt: "Bentley" },
  { src: "/dome-images/cars/0024_mercedes_slr.webp", alt: "Mercedes SLR" },
  { src: "/dome-images/cars/0025_mercedes_slr.webp", alt: "Mercedes SLR" },
  { src: "/dome-images/anime/0001.webp", alt: "Anime" },
  { src: "/dome-images/anime/0002.webp", alt: "Anime" },
  { src: "/dome-images/anime/0003.webp", alt: "Anime" },
  { src: "/dome-images/anime/0004.webp", alt: "Anime" },
  { src: "/dome-images/anime/0005.webp", alt: "Anime" },
  { src: "/dome-images/anime/0006.webp", alt: "Anime" },
  { src: "/dome-images/anime/0007.webp", alt: "Anime" },
  { src: "/dome-images/anime/0008.webp", alt: "Anime" },
  { src: "/dome-images/anime/0009.webp", alt: "Anime" },
  { src: "/dome-images/anime/0010.webp", alt: "Anime" },
  { src: "/dome-images/anime/0011.webp", alt: "Anime" },
  { src: "/dome-images/anime/0012.webp", alt: "Anime" },
  { src: "/dome-images/anime/0013.webp", alt: "Anime" },
  { src: "/dome-images/anime/0014.webp", alt: "Anime" },
  { src: "/dome-images/anime/0015.webp", alt: "Anime" },
  { src: "/dome-images/anime/0016.webp", alt: "Anime" },
  { src: "/dome-images/anime/0017.webp", alt: "Anime" },
  { src: "/dome-images/anime/0018.webp", alt: "Anime" },
  { src: "/dome-images/movies/0001.webp", alt: "Movies" },
  { src: "/dome-images/movies/0002.webp", alt: "Movies" },
  { src: "/dome-images/movies/0003.webp", alt: "Movies" },
  { src: "/dome-images/movies/0004.webp", alt: "Movies" },
  { src: "/dome-images/movies/0005.webp", alt: "Movies" },
  { src: "/dome-images/movies/0006.webp", alt: "Movies" },
  { src: "/dome-images/movies/0007.webp", alt: "Movies" },
  { src: "/dome-images/movies/0008.webp", alt: "Movies" },
  { src: "/dome-images/movies/0009.webp", alt: "Movies" },
  { src: "/dome-images/movies/0010.webp", alt: "Movies" },
  { src: "/dome-images/movies/0012.webp", alt: "Movies" },
  { src: "/dome-images/movies/0013.webp", alt: "Movies" },
  { src: "/dome-images/movies/0014.webp", alt: "Movies" },
  { src: "/dome-images/movies/0015.webp", alt: "Movies" },
  { src: "/dome-images/movies/0016.webp", alt: "Movies" },
  { src: "/dome-images/movies/0017.webp", alt: "Movies" },
  { src: "/dome-images/movies/0018.webp", alt: "Movies" },
  { src: "/dome-images/movies/0019.webp", alt: "Movies" },
  { src: "/dome-images/movies/0020.webp", alt: "Movies" },
  { src: "/dome-images/movies/0021.webp", alt: "Movies" },
  { src: "/dome-images/music/0002.webp", alt: "Music" },
  { src: "/dome-images/music/0003.webp", alt: "Music" },
  { src: "/dome-images/music/0004.webp", alt: "Music" },
  { src: "/dome-images/music/0005.webp", alt: "Music" },
  { src: "/dome-images/music/0006.webp", alt: "Music" },
  { src: "/dome-images/music/0007.webp", alt: "Music" },
  { src: "/dome-images/music/0008.webp", alt: "Music" },
  { src: "/dome-images/music/0009.webp", alt: "Music" },
  { src: "/dome-images/music/0011.webp", alt: "Music" },
  { src: "/dome-images/music/0012.webp", alt: "Music" },
  { src: "/dome-images/music/0013.webp", alt: "Music" },
  { src: "/dome-images/music/0014.webp", alt: "Music" },
  { src: "/dome-images/music/0015.webp", alt: "Music" },
  { src: "/dome-images/music/0016.webp", alt: "Music" },
  { src: "/dome-images/music/0017.webp", alt: "Music" },
  { src: "/dome-images/music/0018.webp", alt: "Music" },
  { src: "/dome-images/music/0019.webp", alt: "Music" },
  { src: "/dome-images/music/0021.webp", alt: "Music" },
  { src: "/dome-images/astronomy/0002.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0003.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0004.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0005.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0006.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0007.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0008.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0009.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0010.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0011.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0012.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0013.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0014.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0015.webp", alt: "Astronomy" },
  { src: "/dome-images/astronomy/0016.webp", alt: "Astronomy" },
  { src: "/dome-images/nature/0002.webp", alt: "Nature" },
  { src: "/dome-images/nature/0003.webp", alt: "Nature" },
  { src: "/dome-images/nature/0004.webp", alt: "Nature" },
  { src: "/dome-images/nature/0005.webp", alt: "Nature" },
  { src: "/dome-images/nature/0006.webp", alt: "Nature" },
  { src: "/dome-images/nature/0007.webp", alt: "Nature" },
  { src: "/dome-images/nature/0008.webp", alt: "Nature" },
  { src: "/dome-images/nature/0009.webp", alt: "Nature" },
  { src: "/dome-images/nature/0010.webp", alt: "Nature" },
  { src: "/dome-images/nature/0011.webp", alt: "Nature" },
  { src: "/dome-images/nature/0012.webp", alt: "Nature" },
  { src: "/dome-images/nature/0013.webp", alt: "Nature" },
  { src: "/dome-images/nature/0014.webp", alt: "Nature" },
  { src: "/dome-images/nature/0015.webp", alt: "Nature" },
  { src: "/dome-images/nature/0016.webp", alt: "Nature" },
  { src: "/dome-images/real-artists/from_artists_0002_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0003_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0005_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0006_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0007_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0008_billie_eilish.webp", alt: "Billie Eilish" },
  { src: "/dome-images/real-artists/from_artists_0009_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0010_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0011_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0012_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0013_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0014_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0015_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/real-artists/from_artists_0016_taylor_swift.webp", alt: "Taylor Swift" },
  { src: "/dome-images/gaming/0002.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0003.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0004.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0005.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0006.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0007.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0009.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0010.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0011.webp", alt: "Gaming" },
  { src: "/dome-images/gaming/0012.webp", alt: "Gaming" },
  { src: "/dome-images/wanderlust/0001.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0002.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0003.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0004.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0005.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0006.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0007.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0008.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0009.webp", alt: "Wanderlust" },
  { src: "/dome-images/wanderlust/0010.webp", alt: "Wanderlust" },
  { src: "/dome-images/f1/0001.webp", alt: "Formula 1" },
  { src: "/dome-images/f1/0003.webp", alt: "Formula 1" },
  { src: "/dome-images/f1/0013_formula_1_car_art.webp", alt: "Formula 1" },
  { src: "/dome-images/f1/0014_formula_1_car_art.webp", alt: "Formula 1" },
  { src: "/dome-images/f1/0015_red_bull_racing_f1.webp", alt: "Red Bull Racing" },
  { src: "/dome-images/f1/0016_ferrari_f1_car.webp", alt: "Ferrari F1" },
  { src: "/dome-images/f1/0017_mercedes_amg_f1.webp", alt: "Mercedes AMG F1" },
  { src: "/dome-images/f1/0018_mercedes_amg_f1.webp", alt: "Mercedes AMG F1" },
  { src: "/dome-images/aesthetic/0001.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0004.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0005.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0006.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0007.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0008.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0009.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0010.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0011.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0012.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0013.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0014.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0015.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0016.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0017.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0018.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0019.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0020.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0021.webp", alt: "Aesthetic" },
  { src: "/dome-images/aesthetic/0022.webp", alt: "Aesthetic" },
  { src: "/dome-images/football/0003.webp", alt: "Football" },
  { src: "/dome-images/football/0004.webp", alt: "Football" },
  { src: "/dome-images/football/0005.webp", alt: "Football" },
  { src: "/dome-images/football/0006.webp", alt: "Football" },
  { src: "/dome-images/football/0007.webp", alt: "Football" },
  { src: "/dome-images/football/0008.webp", alt: "Football" },
  { src: "/dome-images/football/0009.webp", alt: "Football" },
  { src: "/dome-images/football/0010_ronaldo.webp", alt: "Ronaldo" },
  { src: "/dome-images/football/0011_ronaldo.webp", alt: "Ronaldo" },
  { src: "/dome-images/football/0012_ronaldo.webp", alt: "Ronaldo" },
  { src: "/dome-images/football/0014_messi.webp", alt: "Messi" },
  { src: "/dome-images/football/0015_messi.webp", alt: "Messi" },
  { src: "/dome-images/football/0016_ronaldinho.webp", alt: "Ronaldinho" },
  { src: "/dome-images/football/0017_lewandowski.webp", alt: "Lewandowski" },
  { src: "/dome-images/football/0018_lewandowski.webp", alt: "Lewandowski" },
  { src: "/dome-images/football/0019_ronaldo.webp", alt: "Ronaldo" },
  { src: "/dome-images/football/0020_messi.webp", alt: "Messi" },
  { src: "/dome-images/football/0021_messi.webp", alt: "Messi" },
  { src: "/dome-images/football/0022_messi.webp", alt: "Messi" },
  { src: "/dome-images/football/0023_lewandowski.webp", alt: "Lewandowski" },
  { src: "/dome-images/football/0024_lewandowski.webp", alt: "Lewandowski" },
  { src: "/dome-images/football/0025_ronaldinho.webp", alt: "Ronaldinho" },
  { src: "/dome-images/football/football_001.webp", alt: "Football" },
  { src: "/dome-images/tvshows/0003.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0010.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0011.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0012.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0013.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0014.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0015.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0016.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0017.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0018.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0019.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0020.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0021.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0022.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0023.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0024.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0025.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0026.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0027.webp", alt: "TV Shows" },
  { src: "/dome-images/tvshows/0028.webp", alt: "TV Shows" },
  { src: "/dome-images/kpop/0001.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0002.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0003.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0004.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0006.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0007.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0008.webp", alt: "K-Pop" },
  { src: "/dome-images/kpop/0009.webp", alt: "K-Pop" },
  { src: "/dome-images/motivation/0001.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0002.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0004.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0005.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0006.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0011.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0014.webp", alt: "Motivation" },
  { src: "/dome-images/motivation/0015.webp", alt: "Motivation" },
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
    }}>

      {/* DomeGallery fills full section */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DomeGallery
          images={IMAGES}
          fit={1.05}
          fitBasis="max"
          minRadius={700}
          maxVerticalRotationDeg={40}
          segments={36}
          dragDampening={1.8}
          grayscale={false}
          autoRotate={true}
          autoRotateSpeed={5}
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
