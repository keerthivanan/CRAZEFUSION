"use client";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import BlurText from "@/components/reactbits/BlurText";
import Magnet from "@/components/reactbits/Magnet";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

interface Props {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: React.ReactNode;
  viewAllHref?: string;
  center?: boolean;
}

export default function SectionHeader({ label, title, highlight, subtitle, viewAllHref, center }: Props) {
  return (
    <AnimatedContent distance={24} duration={0.55}
      style={{ display: "flex", alignItems: "flex-end", justifyContent: center ? "center" : "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12, textAlign: center ? "center" : "left", flexDirection: center ? "column" : "row" }}>
      <div>
        {label && (
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>
            {label}
          </div>
        )}
        <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--c-text)", textTransform: "uppercase", margin: 0, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25em" }}>
          <BlurText text={title} delay={80} animateBy="words" direction="bottom" />
          {highlight && (
            <span style={{ color: "#e8a000" }}>
              <BlurText text={highlight} delay={200} animateBy="words" direction="bottom" />
            </span>
          )}
        </h2>
        {subtitle && (
          <p style={{ fontFamily: F, fontSize: 13, color: "#999", marginTop: 6 }}>{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Magnet padding={16} magnetStrength={2}>
          <Link href={viewAllHref}
            style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-btn-text)", background: "var(--c-btn-bg)", textDecoration: "none", padding: "8px 20px", borderRadius: 24, whiteSpace: "nowrap", transition: "opacity 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}>
            View All →
          </Link>
        </Magnet>
      )}
    </AnimatedContent>
  );
}
