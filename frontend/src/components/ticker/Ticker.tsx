"use client";

const text = "Free Delivery for Prepaid Orders &nbsp;·&nbsp; BUY 4 GET 3 FREE &nbsp;·&nbsp; BUY 5 GET 5 FREE &nbsp;·&nbsp; 1,981+ Designs &nbsp;·&nbsp; 5–7 Day Delivery &nbsp;·&nbsp; Starting ₹79 &nbsp;·&nbsp;";

export default function Ticker() {
  return (
    <div className="ticker-strip" style={{ background: "#111", padding: "9px 0", overflow: "hidden" }}>
      <div className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} dangerouslySetInnerHTML={{ __html: text }}
            style={{ fontFamily: "var(--font-space-var,'Space Grotesk',sans-serif)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", whiteSpace: "nowrap", paddingRight: 32 }} />
        ))}
      </div>
    </div>
  );
}
