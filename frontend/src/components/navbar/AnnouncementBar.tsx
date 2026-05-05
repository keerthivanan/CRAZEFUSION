"use client";

const text = "Free UK Delivery Over £30  ·  BUY 4 GET 3 FREE  ·  BUY 5 GET 5 FREE  ·  600+ Designs  ·  Printed & Shipped in 48hrs  ·  From £9.99  ·  30-Day Easy Returns  ·  10,000+ Happy Customers  · ";

export default function AnnouncementBar() {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: 34, zIndex: 1001,
      background: "#111",
      overflow: "hidden",
      display: "flex", alignItems: "center",
    }}>
      <div className="announce-track" style={{ display: "flex", width: "max-content" }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)",
            fontSize: 10, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#fff", whiteSpace: "nowrap",
            paddingRight: 32,
          }}>
            {text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes announce {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .announce-track {
          animation: announce 32s linear infinite;
        }
        .announce-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
