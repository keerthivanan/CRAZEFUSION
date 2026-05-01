"use client";
import Link from "next/link";
import Aurora from "@/components/reactbits/Aurora";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import StarBorder from "@/components/reactbits/StarBorder";
import Magnet from "@/components/reactbits/Magnet";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function CollectionBanner() {
  return (
    <section style={{ position: "relative", padding: "96px 32px", background: "#0d0d0d", overflow: "hidden", textAlign: "center" }}>

      {/* Aurora */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none" }}>
        <Aurora colorStops={["#e8a000", "#0d0d0d", "#e8a000"]} speed={0.7} amplitude={1.0} />
      </div>

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #e8a000, transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #e8a000, transparent)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <AnimatedContent distance={30} duration={0.7}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8a000", marginBottom: 20 }}>
            Premium Collection
          </div>

          <h2 style={{ fontFamily: FE, fontSize: "clamp(40px,7vw,88px)", fontWeight: 400, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.9, margin: "0 0 16px" }}>
            Transform<br />
            <span style={{ color: "#e8a000" }}>Your Wall</span>
          </h2>

          <p style={{ fontFamily: F, fontSize: 15, color: "#555", marginBottom: 40, lineHeight: 1.8, maxWidth: 480, margin: "20px auto 40px" }}>
            1,981+ premium designs. Cars, Anime, Movies, Sports, Custom & more.
            Free shipping on all prepaid orders.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnet padding={20} magnetStrength={3}>
              <ClickSpark sparkColor="#e8a000" sparkCount={12} sparkRadius={28}>
                <StarBorder color="#e8a000" speed="4s" as="div" style={{ borderRadius: 0 }}>
                  <Link href="/collection" style={{
                    display: "block", padding: "16px 52px",
                    background: "#e8a000", color: "#000",
                    fontFamily: FO, fontSize: 12, fontWeight: 400,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    textDecoration: "none",
                  }}>
                    Shop All Posters
                  </Link>
                </StarBorder>
              </ClickSpark>
            </Magnet>

            <Magnet padding={16} magnetStrength={2}>
              <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
                <Link href="/custom-builder" style={{
                  display: "block", padding: "17px 52px",
                  background: "transparent", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: FO, fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none", transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e8a000"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)"}>
                  Custom Poster
                </Link>
              </ClickSpark>
            </Magnet>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
