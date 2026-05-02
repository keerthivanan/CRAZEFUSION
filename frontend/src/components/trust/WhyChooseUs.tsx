"use client";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const features = [
  {
    num: "01",
    title: "Quality Guaranteed",
    desc: "Every poster is printed on premium materials with HD precision. We stand behind every order.",
  },
  {
    num: "02",
    title: "Custom Creations",
    desc: "Upload your own image or design and we'll turn it into a stunning wall piece.",
  },
  {
    num: "03",
    title: "Exclusive Offers",
    desc: "Buy 4 Get 3 Free. Buy 5 Get 5 Free. Always-on deals that make great prints affordable.",
  },
  {
    num: "04",
    title: "Free Shipping",
    desc: "Zero delivery fees on all prepaid orders. Delivered across India in 5–7 days.",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "80px 0" }} className="why-section">
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }} className="why-inner">

        {/* Header */}
        <AnimatedContent distance={20} duration={0.5}>
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap",
            gap: 24, marginBottom: 56,
          }}>
            <div>
              <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>
                Why Choose Us
              </div>
              <h2 style={{ fontFamily: FO, fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--c-text)", margin: 0, textTransform: "uppercase", lineHeight: 0.95 }}>
                We&apos;re Built<br />Different
              </h2>
            </div>
            <p style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text-muted)", maxWidth: 320, lineHeight: 1.7, margin: 0 }}>
              India&apos;s most obsessed poster brand — driven by quality, priced for everyone.
            </p>
          </div>
        </AnimatedContent>

        {/* Cards */}
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--c-border)" }}>
          {features.map(({ num, title, desc }, i) => (
            <AnimatedContent key={title} distance={16} delay={i * 0.1} duration={0.5} threshold={0.05}>
              <div
                className="why-card"
                style={{
                  background: "var(--c-bg-soft)",
                  padding: "36px 28px",
                  display: "flex", flexDirection: "column",
                  gap: 0, height: "100%",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--c-bg-card)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--c-bg-soft)"}
              >
                <div style={{ fontFamily: FO, fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--c-border)", lineHeight: 1, marginBottom: 28 }}>
                  {num}
                </div>
                <div style={{ width: 28, height: 2, background: "#e8a000", marginBottom: 20 }} />
                <div style={{ fontFamily: FO, fontSize: 15, fontWeight: 700, color: "var(--c-text)", letterSpacing: "-0.01em", marginBottom: 14 }}>
                  {title}
                </div>
                <p style={{ fontFamily: FO, fontSize: 12, color: "var(--c-text-muted)", lineHeight: 1.75, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* CTA */}
        <AnimatedContent distance={16} duration={0.5} delay={0.45}>
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <Link href="/collection" style={{
              display: "inline-block", padding: "15px 52px",
              background: "var(--c-text)", color: "var(--c-bg)",
              fontFamily: FO, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              textDecoration: "none", borderRadius: 50,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
            >
              Shop All Posters
            </Link>
          </div>
        </AnimatedContent>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .why-card { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
}
