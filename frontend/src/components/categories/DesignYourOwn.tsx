"use client";
import Link from "next/link";
import TiltedCard from "@/components/reactbits/TiltedCard";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import BlurText from "@/components/reactbits/BlurText";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const options = [
  { label: "Single Poster",    sub: "1 Piece · Any Size",     href: "/custom-builder", img: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop&q=80" },
  { label: "3 Piece Split",    sub: "3 Panels · Wall Set",    href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/NEWDWALL8SPILT_jpg.jpg?v=1769703364&width=600" },
  { label: "4 Piece Grid",     sub: "2×2 Grid · Square Set",  href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/NEWbWALL8SPILT_jpg.jpg?v=1769701721&width=600" },
  { label: "Retro Prints",     sub: "Custom · Vintage Style",  href: "/custom-builder", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80" },
  { label: "Pocket Photos",    sub: "Mini Set · Gift Ready",   href: "/custom-builder", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop&q=80" },
  { label: "Photobooth Strip", sub: "Strip · Fun Prints",      href: "/custom-builder", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&q=80" },
];

export default function DesignYourOwn() {
  return (
    <section style={{ padding: "56px 0", background: "var(--c-bg-soft)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>

        <AnimatedContent distance={20} duration={0.55}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#aaa", marginBottom: 10 }}>
              Make It Yours
            </div>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.25em" }}>
              <BlurText text="Design Your" delay={60} animateBy="words" direction="bottom" />
              <span style={{ color: "#e8a000" }}>
                <BlurText text="Own" delay={200} animateBy="words" direction="bottom" />
              </span>
            </h2>
          </div>
        </AnimatedContent>

        <div className="design-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {options.map((opt, i) => (
            <AnimatedContent key={opt.label} distance={20} delay={i * 0.07} duration={0.5} threshold={0.05}>
              <Link href={opt.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ borderRadius: 8, overflow: "hidden", background: "var(--c-bg)", border: "1px solid #efefef", transition: "all 0.25s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e8a000"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(232,160,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "#efefef"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>

                  <TiltedCard
                    imageSrc={opt.img}
                    altText={opt.label}
                    containerHeight="200px"
                    containerWidth="100%"
                    imageHeight="200px"
                    imageWidth="100%"
                    scaleOnHover={1.08}
                    rotateAmplitude={8}
                    borderRadius="0px"
                    displayOverlayContent
                    overlayContent={
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />
                    }
                  />

                  <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                        {opt.label}
                      </div>
                      <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginTop: 3, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {opt.sub}
                      </div>
                    </div>
                    <div style={{ width: 36, height: 36, background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#e8a000"}
                      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#111"}>
                      <span style={{ color: "#fff", fontSize: 16, lineHeight: 1 }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
