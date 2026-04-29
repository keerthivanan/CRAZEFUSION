"use client";
import Link from "next/link";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function CustomBanner() {
  return (
    <section style={{ padding: "80px 32px", background: "#f7f7f7", borderTop: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ background: "#111", padding: "64px 56px", display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8a000", marginBottom: 16 }}>
              Personalized just for you
            </div>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: 16 }}>
              Make Your Own<br /><span style={{ color: "#e8a000" }}>Custom Poster</span>
            </h2>
            <p style={{ fontFamily: F, fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
              Upload any photo. Choose your layout — single, 3-piece, 4-piece grid or 8-panel split. Printed on premium 200GSM paper and delivered in 5–7 days.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/custom-builder"
                style={{ padding: "13px 32px", background: "#fff", color: "#111", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#e8a000"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; }}>
                Start Creating →
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Single","3-Piece","4-Grid","8-Panel"].map((layout, i) => (
              <div key={layout} style={{ background: i === 0 ? "#fff" : "#1a1a1a", padding: "16px 20px", textAlign: "center", border: i === 0 ? "none" : "1px solid #2a2a2a", minWidth: 90 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>🖼️</div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: i === 0 ? "#111" : "#666" }}>{layout}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
