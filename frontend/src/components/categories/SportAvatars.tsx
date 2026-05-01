"use client";
import { useState } from "react";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

// ── Player face with fallback to jersey number ──────────────────────
function Face({ src, name, number, accent, hero }: {
  src: string; name: string; number: string; accent: string; hero?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const size = hero ? 28 : 21;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%", overflow: "hidden",
        border: `${hero ? 2 : 1.4}px solid ${hero ? accent : accent + "99"}`,
        background: accent + "25", flexShrink: 0,
        boxShadow: hero ? `0 0 8px ${accent}66` : "none",
      }}>
        {failed ? (
          <div style={{
            width: "100%", height: "100%", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: accent, fontSize: hero ? 11 : 8, fontWeight: 900, fontFamily: FO }}>
              {number}
            </span>
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
        color: "rgba(255,255,255,0.82)", fontSize: hero ? 5.2 : 4.6,
        fontFamily: FO, textTransform: "uppercase", letterSpacing: 0.4,
        lineHeight: 1, whiteSpace: "nowrap",
      }}>{name}</span>
    </div>
  );
}

// ── Shared badge wrapper ─────────────────────────────────────────────
function Badge({ bg, accent, title, players }: {
  bg: string; accent: string; title: string;
  players: { src: string; name: string; number: string; hero?: boolean }[];
}) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "space-between",
      padding: "8px 3px 6px",
    }}>
      {/* Title */}
      <span style={{
        fontFamily: FO, fontSize: 5.5, color: accent,
        textTransform: "uppercase", letterSpacing: 1.8,
        fontWeight: 700, opacity: 0.95, whiteSpace: "nowrap",
      }}>{title}</span>

      {/* Separator */}
      <div style={{ width: "78%", height: 0.6, background: accent, opacity: 0.35 }} />

      {/* Faces */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 5 }}>
        {players.map(p => (
          <Face key={p.name} {...p} accent={accent} />
        ))}
      </div>

      {/* Separator */}
      <div style={{ width: "78%", height: 0.6, background: accent, opacity: 0.35 }} />

      {/* Stars */}
      <span style={{ color: accent, fontSize: 7.5, opacity: 0.92, letterSpacing: 4 }}>★★★</span>
    </div>
  );
}

// ── CRICKET LEGENDS ─────────────────────────────────────────────────
export function CricketAvatar() {
  return (
    <Badge
      bg="radial-gradient(circle at 45% 35%, #1a3a6b, #050d1c)"
      accent="#e8a000"
      title="CRICKET LEGENDS"
      players={[
        {
          src: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/240200/240254.png",
          name: "DHONI", number: "7",
        },
        {
          src: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/303600/303697.png",
          name: "VIRAT", number: "18", hero: true,
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
    <Badge
      bg="radial-gradient(circle at 45% 35%, #3d1a6e, #0e0520)"
      accent="#e8a000"
      title="NBA LEGENDS"
      players={[
        {
          src: "https://a.espncdn.com/i/headshots/nba/players/full/1035.png",
          name: "JORDAN", number: "23",
        },
        {
          src: "https://a.espncdn.com/i/headshots/nba/players/full/110.png",
          name: "KOBE", number: "24", hero: true,
        },
        {
          src: "https://a.espncdn.com/i/headshots/nba/players/full/1966.png",
          name: "LEBRON", number: "6",
        },
      ]}
    />
  );
}

// ── FOOTBALL LEGENDS ─────────────────────────────────────────────────
export function FootballAvatar() {
  return (
    <Badge
      bg="radial-gradient(circle at 45% 35%, #0d3b20, #030c07)"
      accent="#e8a000"
      title="FOOTBALL LEGENDS"
      players={[
        {
          src: "https://a.espncdn.com/i/headshots/soccer/players/full/45843.png",
          name: "MESSI", number: "10",
        },
        {
          src: "https://a.espncdn.com/i/headshots/soccer/players/full/22774.png",
          name: "RONALDO", number: "7", hero: true,
        },
        {
          src: "https://a.espncdn.com/i/headshots/soccer/players/full/231388.png",
          name: "MBAPPÉ", number: "10",
        },
      ]}
    />
  );
}
