"use client";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";
import StarBorder from "@/components/reactbits/StarBorder";

const heroImages = [
  { src: "https://www.posterized.in/cdn/shop/files/NEWDWALL8SPILT_jpg.jpg?v=1769703364&width=533", label: "Best Seller" },
  { src: "https://www.posterized.in/cdn/shop/files/NEWbWALL8SPILT_jpg.jpg?v=1769701721&width=533", label: "New" },
  { src: "https://www.posterized.in/cdn/shop/files/blackpanther1_22c3b291-1166-4186-8189-936711466fec.jpg?v=1777101350&width=533", label: "Trending" },
];

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

export default function Hero() {
  return (
    <section style={{ background: "var(--c-bg)" }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "calc(100vh - 56px)",
        alignItems: "center",
        padding: "64px 40px",
        gap: 60,
      }} className="hero-grid">

        {/* LEFT */}
        <div>
          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FE,
              fontSize: "clamp(48px,6.5vw,100px)",
              fontWeight: 400, lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--c-text)", textTransform: "uppercase",
              margin: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}>
              Your Walls
            </h1>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FE,
              fontSize: "clamp(48px,6.5vw,100px)",
              fontWeight: 400, lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "#e8a000", textTransform: "uppercase",
              margin: "6px 0",
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            }}>
              Deserve
            </h1>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FE,
              fontSize: "clamp(48px,6.5vw,100px)",
              fontWeight: 400, lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "var(--c-text)", textTransform: "uppercase",
              margin: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            }}>
              The Best
            </h1>
          </div>

          <p style={{
            fontFamily: F, fontSize: 15, color: "#777",
            maxWidth: 420, margin: "28px 0 0", lineHeight: 1.75,
            animation: "fadeUp 0.7s ease 0.5s both",
          }}>
            Premium quality posters for Cars, Anime, Sports & more. Starting from ₹79. Free shipping on prepaid orders.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 40, animation: "fadeUp 0.7s ease 0.6s both" }}>
            <ClickSpark sparkColor="#e8a000" sparkCount={12} sparkRadius={28}>
              <StarBorder color="#e8a000" speed="3.5s" as="div" style={{ borderRadius: 0 }}>
                <Link href="/collection" style={{
                  display: "block", padding: "16px 44px",
                  background: "var(--c-btn-bg)", color: "var(--c-btn-text)",
                  fontFamily: FO, fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  textDecoration: "none",
                }}>
                  Shop Collection
                </Link>
              </StarBorder>
            </ClickSpark>

            <ClickSpark sparkColor="var(--c-outline-col)" sparkCount={8} sparkRadius={22}>
              <Link href="/custom-builder" style={{
                display: "block", padding: "16px 44px",
                background: "transparent", color: "var(--c-outline-col)",
                border: "1.5px solid var(--c-outline-col)",
                fontFamily: FO, fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", transition: "all 0.25s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-btn-bg)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-btn-text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-outline-col)"; }}>
                Custom Order
              </Link>
            </ClickSpark>
          </div>

        </div>

        {/* RIGHT — images */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 10,
          height: "min(580px, 72vh)",
          animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }}>
          {heroImages.map((img, i) => (
            <Link key={i} href="/collection" style={{
              textDecoration: "none", position: "relative",
              overflow: "hidden", display: "block",
              gridRow: i === 0 ? "1 / 3" : "auto",
              borderRadius: 4, background: "var(--c-bg-soft)",
            }}>
              <img src={img.src} alt="PosterKing Premium Print"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", top: 10, left: 10, background: "#e8a000", color: "#000", fontFamily: F, fontSize: 9, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px" }}>
                {img.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 40px 24px !important; min-height: auto !important; }
        }
      `}</style>
    </section>
  );
}
