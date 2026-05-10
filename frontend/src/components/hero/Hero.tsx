"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const Grainient = dynamic(() => import("@/components/reactbits/Grainient"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

const STATS = [
  { val: "609+", label: "Designs" },
  { val: "10K+", label: "Customers" },
  { val: "48hr", label: "Delivery" },
  { val: "4.8★", label: "Rating" },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>

      {/* ── Grainient background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#e8a000"
          color2="#0a0600"
          color3="#1a0d00"
          timeSpeed={0.8}
          colorBalance={0.1}
          warpStrength={1.2}
          warpFrequency={4}
          warpSpeed={1.2}
          warpAmplitude={60}
          blendAngle={15}
          blendSoftness={0.08}
          rotationAmount={400}
          noiseScale={1.2}
          grainAmount={0.06}
          grainScale={1.8}
          grainAnimated={false}
          contrast={1.8}
          gamma={1.0}
          saturation={0.9}
          zoom={0.85}
        />
      </div>

      {/* ── Dark overlay for text readability ── */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)", zIndex: 1, pointerEvents: "none" }} />

      {/* ── Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, padding: "clamp(100px,14vh,160px) 24px clamp(60px,8vh,100px)", textAlign: "center" }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(232,160,0,0.4)", backdropFilter: "blur(12px)", borderRadius: 50, padding: "7px 18px", marginBottom: 36, opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.1s", animation: mounted ? "fadeUp 0.6s ease 0.1s both" : "none" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8a000", display: "inline-block", boxShadow: "0 0 8px #e8a000" }} />
          <span style={{ fontFamily: FB, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8a000" }}>AI Studio Now Live</span>
          <Link href="/create" style={{ fontFamily: FB, fontSize: 10, color: "rgba(232,160,0,0.7)", textDecoration: "none", fontWeight: 600, letterSpacing: "0.08em" }}>Try it →</Link>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: FH, fontSize: "clamp(52px,9vw,130px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", color: "#fff", textTransform: "uppercase", margin: "0 0 24px", maxWidth: 900, opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.2s", animation: mounted ? "slideUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" : "none" }}>
          Your Walls{" "}
          <span style={{ background: "linear-gradient(135deg,#e8a000 0%,#ffdf80 50%,#e8a000 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Deserve
          </span>
          {" "}The Best
        </h1>

        {/* Subtext */}
        <p style={{ fontFamily: FB, fontSize: "clamp(14px,1.8vw,18px)", color: "rgba(255,255,255,0.65)", maxWidth: 520, lineHeight: 1.75, margin: "0 0 44px", opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.3s", animation: mounted ? "fadeUp 0.7s ease 0.4s both" : "none" }}>
          Premium wall art for every space. 609+ curated designs — Cars, Movies, Coffee & more. Printed &amp; shipped in 48 hours across the UK.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 64, opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.4s", animation: mounted ? "fadeUp 0.7s ease 0.55s both" : "none" }}>
          <ClickSpark sparkColor="#e8a000" sparkCount={12} sparkRadius={28}>
            <Link href="/collection"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", background: "#e8a000", color: "#000", fontFamily: FB, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 40px rgba(232,160,0,0.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(232,160,0,0.6)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(232,160,0,0.4)"; }}>
              Shop Now
            </Link>
          </ClickSpark>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <Link href="/create"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "rgba(255,255,255,0.1)", color: "#fff", fontFamily: FB, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}>
              AI Studio
            </Link>
          </ClickSpark>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.5s", animation: mounted ? "fadeUp 0.7s ease 0.7s both" : "none" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "0 clamp(20px,4vw,44px)", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: FH, fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: FB, fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom marquee strip ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", padding: "14px 0", position: "relative", zIndex: 2, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}>
        <div style={{ display: "flex", gap: 0, width: "max-content", animation: "marquee 28s linear infinite" }}>
          {[...Array(4)].map((_, r) => (
            <div key={r} style={{ display: "flex" }}>
              {["PREMIUM QUALITY", "FREE UK DELIVERY", "609+ DESIGNS", "48HR PRINTING", "AI STUDIO LIVE", "PRINT ON DEMAND"].map((t, i) => (
                <span key={i} style={{ fontFamily: FB, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(255,255,255,0.22)" : "#e8a000", padding: "0 28px", whiteSpace: "nowrap" }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
        @media (max-width: 600px) {
          .hero-stats { gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}
