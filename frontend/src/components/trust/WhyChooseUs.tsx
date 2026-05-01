"use client";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SlashHeading from "@/components/ui/SlashHeading";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const MedalIcon = () => (
  <svg width="58" height="62" viewBox="0 0 24 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="7"/>
    <circle cx="12" cy="9" r="4.5"/>
    <path d="M9.5 9l2 2 3.5-3.5"/>
    <path d="M7.5 15.5L5 23l3.5-1.5L10 24"/>
    <path d="M16.5 15.5L19 23l-3.5-1.5L14 24"/>
  </svg>
);

const CustomIcon = () => (
  <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="15" height="12" rx="2"/>
    <circle cx="6.5" cy="7" r="1.5"/>
    <path d="M2 12l4-4 3.5 3.5 2.5-2.5L17 12"/>
    <circle cx="20" cy="19" r="3.5"/>
    <line x1="20" y1="17" x2="20" y2="21"/>
    <line x1="18" y1="19" x2="22" y2="19"/>
  </svg>
);

const ExclusiveIcon = () => (
  <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeDasharray="3.5 2.2"/>
    <circle cx="12" cy="12" r="6.5"/>
    <path d="M9.5 14.5l5-5"/>
    <circle cx="9.5" cy="9.5" r="0.75" fill="currentColor" stroke="none"/>
    <circle cx="14.5" cy="14.5" r="0.75" fill="currentColor" stroke="none"/>
  </svg>
);

const StarIcon = () => (
  <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const features = [
  {
    Icon: MedalIcon,
    title: "Quality Guaranteed",
    desc: "Quality is our top priority. Each poster is meticulously crafted using premium materials.",
  },
  {
    Icon: CustomIcon,
    title: "Custom Creations",
    desc: "Upload your own images or designs and create personalised posters that reflect your personality.",
  },
  {
    Icon: ExclusiveIcon,
    title: "Exclusive Offers",
    desc: "We're constantly rolling out exciting offers to help you save big on your favourite designs.",
  },
  {
    Icon: StarIcon,
    title: "Free Shipping",
    desc: "Enjoy free delivery on prepaid orders — no shipping fees mean more savings for you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "72px 0 64px", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>

        <AnimatedContent distance={24} duration={0.55}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SlashHeading
              text="Why Choose Us?"
              size="clamp(30px,4vw,56px)"
              align="center"
              as="h2"
            />
          </div>
        </AnimatedContent>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <AnimatedContent key={title} distance={20} delay={i * 0.1} duration={0.5} threshold={0.05}>
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", textAlign: "center", gap: 18,
              }}>
                <div style={{ color: "var(--c-text)", lineHeight: 0 }}>
                  <Icon />
                </div>
                <div style={{
                  fontFamily: FO, fontSize: 14, fontWeight: 700,
                  color: "var(--c-text)", letterSpacing: "0.01em",
                }}>
                  {title}
                </div>
                <p style={{
                  fontFamily: F, fontSize: 13,
                  color: "#777", lineHeight: 1.7, margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent distance={16} duration={0.5} delay={0.5}>
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <Link href="/collection" style={{
              display: "inline-block", padding: "14px 52px",
              background: "var(--c-btn-bg)", color: "var(--c-btn-text)",
              fontFamily: FO, fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none", transition: "opacity 0.2s, box-shadow 0.2s",
              borderRadius: 50,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px rgba(160,160,160,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}>
              Shop All Posters
            </Link>
          </div>
        </AnimatedContent>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
