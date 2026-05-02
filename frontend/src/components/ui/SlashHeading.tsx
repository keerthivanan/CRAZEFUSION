"use client";

const TEAL = "#0dcfcf";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-poppins-var,'Poppins',sans-serif)";

interface SlashHeadingProps {
  text: string;
  subtitle?: string;
  size?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export default function SlashHeading({
  text,
  subtitle,
  size = "clamp(42px,7vw,82px)",
  align = "center",
  as: Tag = "h1",
}: SlashHeadingProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start", gap: 12 }}>
      <div style={{ position: "relative", display: "inline-block" }}>

        {/* Left teal slash — sits over top-left of first letter */}
        <span aria-hidden style={{
          position: "absolute",
          left: 2,
          top: "8%",
          width: 10,
          height: "58%",
          background: TEAL,
          transform: "skewX(-22deg)",
          display: "block",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        <Tag style={{
          fontFamily: FE,
          fontSize: size,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          color: "var(--c-text)",
          margin: 0,
          lineHeight: 1.0,
          position: "relative",
          zIndex: 1,
        }}>
          {text}
        </Tag>

        {/* Right teal slash — sits over bottom-right of last letter */}
        <span aria-hidden style={{
          position: "absolute",
          right: 2,
          bottom: "8%",
          width: 10,
          height: "58%",
          background: TEAL,
          transform: "skewX(-22deg)",
          display: "block",
          zIndex: 2,
          pointerEvents: "none",
        }} />
      </div>

      {subtitle && (
        <p style={{
          fontFamily: FO,
          fontSize: 10,
          fontWeight: 400,
          color: "#888",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin: 0,
          textAlign: align,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
