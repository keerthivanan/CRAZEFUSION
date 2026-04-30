"use client";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const stats = [
  { display: "10,000+", label: "Happy Customers" },
  { display: "1,981+",  label: "Poster Designs" },
  { display: "4.9/5",   label: "Average Rating" },
  { display: "₹79",     label: "Starting Price" },
];

export default function StatsBar() {
  return (
    <section style={{ padding: "40px 0", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: "center", padding: "16px 20px",
              borderRight: i < 3 ? "1px solid #f0f0f0" : "none",
            }}>
              <div style={{ fontFamily: FE, fontSize: "clamp(26px,3vw,44px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1, marginBottom: 6 }}>
                {s.display}
              </div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
