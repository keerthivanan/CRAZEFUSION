"use client";

const items = [
  "🔥 BUY 4 GET 3 FREE",
  "⚡ FREE DELIVERY ON PREPAID ORDERS",
  "🏆 10,000+ HAPPY CUSTOMERS",
  "🎁 BUY 5 GET 5 FREE",
  "📦 7-DAY EASY RETURNS",
  "🌟 NEW ARRIVALS EVERY WEEK",
  "🔥 BUY 6 GET 12 FREE",
];

const text = items.join("   ·   ");
const doubled = `${text}   ·   ${text}`;

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function AnnouncementBar() {
  return (
    <div style={{
      background: "#111",
      overflow: "hidden",
      height: 34,
      display: "flex",
      alignItems: "center",
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1001,
    }}>
      <div className="announce-track" style={{
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        willChange: "transform",
      }}>
        <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#e8a000", paddingRight: 40 }}>
          {doubled}
        </span>
        <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#e8a000", paddingRight: 40 }}>
          {doubled}
        </span>
      </div>

      <style>{`
        @keyframes announce {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .announce-track {
          animation: announce 28s linear infinite;
        }
        .announce-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
