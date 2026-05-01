"use client";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const features = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: "Premium Quality",
    desc: "HD printing on 200GSM art paper. Vivid colours that last for years without fading.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Custom Creations",
    desc: "Upload any photo. Single, 3-piece, 4-piece, 8-panel layouts — all made for you.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
    title: "Fast Delivery",
    desc: "Shipped within 24 hours. Delivered in 5–7 business days anywhere in India.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>,
    title: "Free Shipping",
    desc: "Zero delivery charges on all prepaid orders. No minimum order value required.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    title: "Secure Payments",
    desc: "Razorpay secured checkout. UPI, cards, netbanking, EMI and COD all accepted.",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>,
    title: "Easy Returns",
    desc: "7-day hassle-free returns. If you're not happy, we'll make it right. No questions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "48px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>

        <AnimatedContent distance={24} duration={0.55}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>
              Why thousands love us
            </div>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.03em", color: "var(--c-text)", textTransform: "uppercase", margin: 0 }}>
              The PosterKing <span style={{ color: "#e8a000" }}>Difference</span>
            </h2>
          </div>
        </AnimatedContent>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {features.map((f, i) => (
            <AnimatedContent key={f.title} distance={20} delay={i * 0.08} duration={0.5} threshold={0.05}>
              <SpotlightCard
                spotlightColor="rgba(160,160,160,0.12)"
                style={{
                  background: "var(--c-bg-card)",
                  border: "1px solid var(--c-card-border)",
                  borderRadius: 10,
                  padding: "20px 22px",
                  height: "100%",
                  cursor: "default",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#888888";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(160,160,160,0.18)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#efefef";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 40, height: 40, background: "#111", borderRadius: 10,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14, color: "#e8a000", flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: 6 }}>
                  {f.title}
                </div>
                <p style={{ fontFamily: F, fontSize: 12, color: "#777", lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent distance={16} duration={0.5} delay={0.5}>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/collection" style={{
              display: "inline-block", padding: "14px 52px",
              background: "#111", color: "#fff",
              fontFamily: F, fontSize: 12, fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#333"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#111"}>
              Shop All Posters
            </Link>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}
