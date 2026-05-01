"use client";
import { useState } from "react";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

function Face({ src, name, number, accent, size = 22 }: {
  src: string; name: string; number: string; accent: string; size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const isHero = size >= 32;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%", overflow: "hidden",
        border: `${isHero ? 2 : 1.4}px solid ${isHero ? accent : accent + "88"}`,
        background: accent + "20",
        boxShadow: isHero ? `0 0 12px ${accent}88, 0 0 4px ${accent}55` : "none",
        flexShrink: 0,
      }}>
        {failed ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: accent, fontSize: isHero ? 13 : 8, fontWeight: 900, fontFamily: FO }}>{number}</span>
          </div>
        ) : (
          <img
            src={src} alt={name}
            onError={() => setFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        )}
      </div>
      <span style={{
        color: isHero ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        fontSize: isHero ? 5.5 : 4.2,
        fontFamily: FO, textTransform: "uppercase", letterSpacing: 0.5,
        lineHeight: 1, whiteSpace: "nowrap", fontWeight: isHero ? 700 : 400,
      }}>{name}</span>
    </div>
  );
}

function Badge({ bg, accent, title, players }: {
  bg: string; accent: string; title: string;
  players: { src: string; name: string; number: string }[];
}) {
  const [left, center, right] = players;
  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      padding: "8px 0 5px",
    }}>
      {/* Title */}
      <span style={{
        fontFamily: FO, fontSize: 5.5, color: accent,
        textTransform: "uppercase", letterSpacing: 1.6,
        fontWeight: 700, whiteSpace: "nowrap", opacity: 0.95,
      }}>{title}</span>

      {/* Cinematic trio — center hero big and front, sides small and behind */}
      <div style={{ position: "relative", width: "76%", height: 56, flexShrink: 0 }}>
        {/* Left — smaller, behind */}
        <div style={{ position: "absolute", left: 0, bottom: 0, zIndex: 1, opacity: 0.78 }}>
          <Face src={left.src} name={left.name} number={left.number} accent={accent} size={21} />
        </div>
        {/* Center hero — large, front */}
        <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", zIndex: 3 }}>
          <Face src={center.src} name={center.name} number={center.number} accent={accent} size={35} />
        </div>
        {/* Right — smaller, behind */}
        <div style={{ position: "absolute", right: 0, bottom: 0, zIndex: 1, opacity: 0.78 }}>
          <Face src={right.src} name={right.name} number={right.number} accent={accent} size={21} />
        </div>
      </div>

      {/* Stars */}
      <span style={{ color: accent, fontSize: 7.5, opacity: 0.9, letterSpacing: 4 }}>★★★</span>
    </div>
  );
}

// ── CRICKET LEGENDS ─────────────────────────────────────────────────
export function CricketAvatar() {
  return (
    <Badge
      bg="radial-gradient(circle at 50% 40%, #1e3f70, #04091a)"
      accent="#e8a000"
      title="CRICKET LEGENDS"
      players={[
        {
          src: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/240200/240254.png",
          name: "DHONI", number: "7",
        },
        {
          src: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/303600/303697.png",
          name: "VIRAT", number: "18",
        },
        {
          src: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/285600/285630.png",
          name: "ROHIT", number: "45",
        },
      ]}
    />
  );
}

// ── NBA LEGENDS ──────────────────────────────────────────────────────
export function BasketballAvatar() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
      <img
        src="/categories/basketball_legends.png"
        alt="NBA Legends"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
      />
    </div>
  );
}

// ── FOOTBALL LEGENDS ─────────────────────────────────────────────────
export function FootballAvatar() {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
      <img
        src="/categories/football_legends.png"
        alt="Football Legends"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
      />
    </div>
  );
}
