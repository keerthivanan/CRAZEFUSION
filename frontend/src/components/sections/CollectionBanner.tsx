"use client";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Magnet from "@/components/reactbits/Magnet";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FE = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-poppins-var,'Poppins',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function CollectionBanner() {
  return (
    <section style={{ position: "relative", padding: "96px 32px", background: "var(--c-bg-soft)", overflow: "hidden", textAlign: "center", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}>

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--c-border), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--c-border), transparent)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <AnimatedContent distance={30} duration={0.7}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 20 }}>
            Premium Collection
          </div>

          <h2 style={{ fontFamily: FE, fontSize: "clamp(40px,7vw,88px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.9, margin: "0 0 16px" }}>
            Transform<br />
            <span>Your Wall</span>
          </h2>

          <p style={{ fontFamily: F, fontSize: 15, color: "var(--c-text-muted)", marginBottom: 40, lineHeight: 1.8, maxWidth: 480, margin: "20px auto 40px" }}>
            600+ premium designs. Cars, Movies, Coffee Shop & more.
            Free UK delivery on orders over £30.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnet padding={20} magnetStrength={3}>
              <ClickSpark sparkColor="var(--c-text)" sparkCount={12} sparkRadius={28}>
                <Link href="/collection" style={{
                  display: "block", padding: "16px 52px",
                  background: "var(--c-btn-bg)", color: "var(--c-btn-text)",
                  fontFamily: FO, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 50,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}>
                  Shop All Posters
                </Link>
              </ClickSpark>
            </Magnet>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
