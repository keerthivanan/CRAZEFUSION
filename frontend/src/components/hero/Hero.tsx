"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/reactbits/ClickSpark";

const Grainient = dynamic(() => import("@/components/reactbits/Grainient"), { ssr: false });

const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FB = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#94a3b8" }}>

      {/* Grainient background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#94a3b8" }}>
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

      {/* Content — centered */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: 800, margin: "0 auto" }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.22)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(16px)", borderRadius: 50, padding: "6px 16px", marginBottom: 32, opacity: mounted ? 1 : 0, transition: "opacity 0.5s 0.1s" }}>
          <span style={{ fontFamily: FB, fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>NEW</span>
          <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
          <span style={{ fontFamily: FB, fontSize: 12, color: "rgba(255,255,255,0.85)", letterSpacing: "0.02em" }}>AI Studio Now Live</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: FH, fontSize: "clamp(40px,8vw,90px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 24px", opacity: mounted ? 1 : 0, transition: "opacity 0.6s 0.2s" }}>
          Premium wall art<br />for your space.
        </h1>

        {/* Subtext */}
        <p style={{ fontFamily: FB, fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.8)", maxWidth: 480, lineHeight: 1.75, margin: "0 0 40px", fontWeight: 400, opacity: mounted ? 1 : 0, transition: "opacity 0.6s 0.35s" }}>
          609+ curated designs — Cars, Movies, Coffee & more. Printed &amp; shipped in 48 hours across the UK.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", opacity: mounted ? 1 : 0, transition: "opacity 0.6s 0.5s" }}>
          <ClickSpark sparkColor="#fff" sparkCount={10} sparkRadius={24}>
            <Link href="/collection"
              style={{ display: "inline-flex", alignItems: "center", padding: "14px 36px", background: "#fff", color: "#1a1a1a", fontFamily: FB, fontSize: 14, fontWeight: 700, textDecoration: "none", borderRadius: 50, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              Get started
            </Link>
          </ClickSpark>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <Link href="/create"
              style={{ display: "inline-flex", alignItems: "center", padding: "14px 32px", background: "rgba(255,255,255,0.18)", color: "#fff", fontFamily: FB, fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 50, border: "1px solid rgba(255,255,255,0.35)", backdropFilter: "blur(8px)", transition: "background 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.28)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}>
              Learn more
            </Link>
          </ClickSpark>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
