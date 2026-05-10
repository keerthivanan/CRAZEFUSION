"use client";

const items = [
  { text: "Free UK Delivery Over £30", gold: false },
  { text: "·", gold: true },
  { text: "Buy 4 Get 3 Free", gold: true },
  { text: "·", gold: true },
  { text: "609+ Designs", gold: false },
  { text: "·", gold: true },
  { text: "Printed in 48hrs", gold: false },
  { text: "·", gold: true },
  { text: "AI Studio Now Live", gold: true },
  { text: "·", gold: true },
  { text: "30-Day Returns", gold: false },
  { text: "·", gold: true },
  { text: "10,000+ Happy Customers", gold: false },
  { text: "·", gold: true },
];

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function AnnouncementBar() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 36, zIndex: 1001,
      background: "#0a0a0a",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <div className="announce-track" style={{ display: "flex", alignItems: "center", width: "max-content" }}>
        {[...Array(4)].map((_, rep) => (
          <div key={rep} style={{ display: "flex", alignItems: "center" }}>
            {items.map((item, i) => (
              <span key={i} style={{
                fontFamily: FO,
                fontSize: 10, fontWeight: item.gold ? 700 : 500,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: item.gold ? "#7c3aed" : "rgba(255,255,255,0.45)",
                whiteSpace: "nowrap",
                padding: "0 10px",
              }}>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes announce {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .announce-track { animation: announce 36s linear infinite; }
        .announce-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
