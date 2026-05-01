"use client";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

interface FireHeadingProps {
  text: string;
  subtitle?: string;
  /** zero-based character indices to place flames above */
  flameAt?: number[];
  size?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export default function FireHeading({
  text,
  subtitle,
  flameAt = [],
  size = "clamp(32px,5vw,64px)",
  align = "center",
  as: Tag = "h2",
}: FireHeadingProps) {
  const chars = text.split("");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
      gap: 10,
    }}>
      <Tag style={{
        fontFamily: FE,
        fontSize: size,
        fontWeight: 900,
        letterSpacing: "-0.04em",
        textTransform: "uppercase",
        color: "var(--c-text)",
        margin: 0,
        lineHeight: 1,
        display: "flex",
        flexWrap: "nowrap",
      }}>
        {chars.map((char, i) => (
          <span key={i} style={{ position: "relative", display: "inline-block" }}>
            {char === " " ? " " : char}

            {flameAt.includes(i) && (
              <>
                {/* outer flame — taller, more transparent */}
                <span className="fire-flame-outer" style={{
                  position: "absolute",
                  bottom: "90%",
                  left: "50%",
                  width: 6,
                  height: 20,
                  background: "linear-gradient(to top, #f59e0b 0%, #fde68a 45%, transparent 100%)",
                  borderRadius: "50% 50% 25% 25% / 70% 70% 30% 30%",
                  zIndex: 2,
                  display: "block",
                  pointerEvents: "none",
                  transformOrigin: "bottom center",
                }} />
                {/* inner flame — shorter, brighter */}
                <span className="fire-flame-inner" style={{
                  position: "absolute",
                  bottom: "88%",
                  left: "50%",
                  width: 4,
                  height: 11,
                  background: "linear-gradient(to top, #fff7 0%, #fef08a 40%, transparent 100%)",
                  borderRadius: "50% 50% 20% 20% / 60% 60% 40% 40%",
                  zIndex: 3,
                  display: "block",
                  pointerEvents: "none",
                  transformOrigin: "bottom center",
                }} />
              </>
            )}
          </span>
        ))}
      </Tag>

      {subtitle && (
        <p style={{
          fontFamily: FO,
          fontSize: 10,
          fontWeight: 500,
          color: "#888",
          letterSpacing: "0.30em",
          textTransform: "uppercase",
          margin: 0,
          textAlign: align,
        }}>
          {subtitle}
        </p>
      )}

      <style>{`
        .fire-flame-outer {
          transform: translateX(-50%) scaleY(1) rotate(0deg);
          animation: fire-outer 0.5s ease-in-out infinite alternate;
        }
        .fire-flame-inner {
          transform: translateX(-50%) scaleY(1) rotate(0deg);
          animation: fire-inner 0.35s ease-in-out infinite alternate;
        }

        @keyframes fire-outer {
          0%   { transform: translateX(-50%) scaleY(1)    scaleX(1)    rotate(-4deg); opacity: 0.80; }
          40%  { transform: translateX(-50%) scaleY(1.30) scaleX(0.75) rotate(2deg);  opacity: 1;    }
          100% { transform: translateX(-50%) scaleY(0.85) scaleX(1.10) rotate(3deg);  opacity: 0.70; }
        }
        @keyframes fire-inner {
          0%   { transform: translateX(-50%) scaleY(1)    rotate(3deg);  opacity: 0.90; }
          50%  { transform: translateX(-50%) scaleY(1.35) rotate(-2deg); opacity: 1;    }
          100% { transform: translateX(-50%) scaleY(0.80) rotate(4deg);  opacity: 0.75; }
        }
      `}</style>
    </div>
  );
}
