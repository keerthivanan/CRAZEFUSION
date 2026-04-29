"use client";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

interface Props {
  label?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
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
        <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, color: "#111", textTransform: "uppercase", margin: 0 }}>
          {title}{highlight && <> <span style={{ color: "#e8a000" }}>{highlight}</span></>}
        </h2>
        {subtitle && (
          <p style={{ fontFamily: F, fontSize: 13, color: "#999", marginTop: 6 }}>{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link href={viewAllHref}
          style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", textDecoration: "none", borderBottom: "1.5px solid #111", paddingBottom: 1, whiteSpace: "nowrap", transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          View All →
        </Link>
      )}
    </AnimatedContent>
  );
}
