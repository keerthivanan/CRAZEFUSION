"use client";
import { useRef } from "react";
import Link from "next/link";

const reviewPhotos = [
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_6.webp?v=1755674100",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_2.webp?v=1755674100",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_3.webp?v=1755674102",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_4.webp?v=1755674101",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_5.webp?v=1755674104",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_1.webp?v=1755674103",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_7.webp?v=1755674103",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_9.webp?v=1755674102",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_11.webp?v=1755674101",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_12.webp?v=1755674109",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_13.webp?v=1755674107",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_14.webp?v=1755674098",
];

const doubled = [...reviewPhotos, ...reviewPhotos];

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ background: "#fff", paddingTop: 64 }}>

      {/* ── Hero Text ── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "72px 32px 48px", textAlign: "center" }}>
        <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8a000", marginBottom: 16, animation: "fadeUp 0.5s ease 0.1s both" }}>
          India&apos;s #1 Premium Poster Store
        </div>

        <h1 style={{ fontFamily: FE, fontSize: "clamp(48px,8vw,96px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: "#111", textTransform: "uppercase", margin: 0, animation: "fadeUp 0.5s ease 0.2s both" }}>
          Your Walls
        </h1>
        <h1 style={{ fontFamily: FE, fontSize: "clamp(48px,8vw,96px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: "#111", textTransform: "uppercase", margin: "4px 0", animation: "fadeUp 0.5s ease 0.3s both" }}>
          Deserve
        </h1>
        <h1 style={{ fontFamily: FE, fontSize: "clamp(48px,8vw,96px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.04em", color: "#111", textTransform: "uppercase", margin: 0, animation: "fadeUp 0.5s ease 0.4s both" }}>
          The Best
        </h1>

        <p style={{ fontFamily: F, fontSize: 15, color: "#777", maxWidth: 440, margin: "24px auto 36px", lineHeight: 1.7, animation: "fadeUp 0.5s ease 0.5s both" }}>
          Premium quality posters. Cars, Anime, Movies, Sports &amp; custom prints. Starting ₹79. Free shipping on prepaid orders.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.5s ease 0.6s both" }}>
          <Link href="/collection"
            style={{ padding: "14px 40px", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#333"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#111"}>
            Shop Now
          </Link>
          <Link href="/custom-builder"
            style={{ padding: "14px 40px", background: "#fff", color: "#111", border: "1.5px solid #111", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#111"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; (e.currentTarget as HTMLAnchorElement).style.color = "#111"; }}>
            Custom Poster
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 56, flexWrap: "wrap", borderTop: "1px solid #f0f0f0", paddingTop: 32, animation: "fadeUp 0.5s ease 0.7s both" }}>
          {[["10,000+","Happy Customers"],["1,981+","Poster Designs"],["4.8","Average Rating"],["₹79","Starting Price"]].map(([v,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: FE, fontSize: 26, fontWeight: 900, color: "#111", lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: F, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Customer Review Photo Carousel (like posterized.in) ── */}
      <div style={{ overflow: "hidden", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0", background: "#f9f9f9", padding: "4px 0" }}>
        <div ref={trackRef} className="marquee-track" style={{ display: "flex", gap: 4, width: "max-content" }}>
          {doubled.map((src, i) => (
            <div key={i} style={{ flexShrink: 0, width: 220, height: 220, overflow: "hidden" }}>
              <img src={src} alt="Customer poster review" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </section>
  );
}
