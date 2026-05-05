"use client";

const text = "Free UK Delivery Over £30 &nbsp;·&nbsp; BUY 4 GET 3 FREE &nbsp;·&nbsp; BUY 5 GET 5 FREE &nbsp;·&nbsp; 600+ Designs &nbsp;·&nbsp; Printed & Shipped in 48hrs &nbsp;·&nbsp; From £9.99 &nbsp;·&nbsp;";

export default function Ticker() {
  return (
    <div className="ticker-strip" style={{ background: "#111", padding: "9px 0", overflow: "hidden" }}>
      <div className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} dangerouslySetInnerHTML={{ __html: text }}
            style={{ fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", whiteSpace: "nowrap", paddingRight: 32 }} />
        ))}
      </div>
    </div>
  );
}
