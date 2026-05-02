"use client";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const sports = [
  {
    label: "Cricket",
    href: "/cricket",
    img: "/cricket_1.png",
    fallbackBg: "#0d1f0d",
    tag: "IPL & International",
    count: "50+ Teams",
  },
  {
    label: "Basketball",
    href: "/basketball",
    img: "/basketball_1.png",
    fallbackBg: "#1B1722",
    tag: "NBA & Global",
    count: "30+ Teams",
  },
  {
    label: "Football",
    href: "/football",
    img: "/football_1.png",
    fallbackBg: "#2F293A",
    tag: "Club & International",
    count: "40+ Teams",
  },
];

export default function CategoryIcons() {
  return (
    <section style={{ background: "var(--c-bg)", padding: "0 0 0 0" }}>

      {/* Section Label */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 40px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 6 }}>
              Shop by Sport
            </div>
            <h2 style={{ fontFamily: FO, fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--c-text)", margin: 0, textTransform: "uppercase" }}>
              Your Favourite Sport
            </h2>
          </div>
          <Link href="/collection" style={{
            fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--c-text-muted)",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text-muted)"}
          >
            View All ↗
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="sport-cards-grid" style={{
        maxWidth: 1400, margin: "0 auto",
        padding: "0 40px 56px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}>
        {sports.map((sport) => (
          <Link
            key={sport.href}
            href={sport.href}
            className="sport-card"
            style={{
              position: "relative", overflow: "hidden",
              borderRadius: 14, display: "block",
              height: 280, textDecoration: "none",
              background: sport.fallbackBg,
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-4px)";
              const img = el.querySelector(".sport-card-img") as HTMLImageElement | null;
              if (img) img.style.transform = "scale(1.08)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(0)";
              const img = el.querySelector(".sport-card-img") as HTMLImageElement | null;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {/* Background image */}
            <img
              src={sport.img}
              alt={sport.label}
              className="sport-card-img"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center",
                transition: "transform 0.5s ease",
              }}
            />

            {/* Gradient overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.08) 100%)",
            }} />

            {/* Top tag */}
            <div style={{
              position: "absolute", top: 14, left: 14,
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 50,
              padding: "4px 12px",
              fontFamily: FO, fontSize: 9, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
            }}>
              {sport.tag}
            </div>

            {/* Bottom content */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "20px 20px 22px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            }}>
              <div>
                <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8a000", marginBottom: 4 }}>
                  {sport.count}
                </div>
                <div style={{ fontFamily: FO, fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>
                  {sport.label}
                </div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "#e8a000",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sport-cards-grid {
            grid-template-columns: 1fr !important;
            padding: 0 16px 40px !important;
            gap: 10px !important;
          }
          .sport-card { height: 200px !important; }
          .sport-cards-grid + div,
          .sport-cards-grid ~ * { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 960px) and (min-width: 769px) {
          .sport-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .sport-card { height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
