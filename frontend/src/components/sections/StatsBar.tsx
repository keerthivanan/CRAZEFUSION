"use client";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const stats = [
  { display: "10K+",  label: "Happy Customers", sub: "Across the UK" },
  { display: "600+",  label: "Poster Designs",   sub: "& counting" },
  { display: "4.9★",  label: "Average Rating",   sub: "Verified reviews" },
  { display: "£9.99", label: "Starting Price",   sub: "Free delivery £30+" },
];

export default function StatsBar() {
  return (
    <section style={{ background: "#080808", padding: "0" }}>
      <div className="stats-grid-wrap" style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stats-cell"
            style={{
              padding: "40px 28px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
              display: "flex", flexDirection: "column",
              alignItems: "center", textAlign: "center",
              gap: 4,
            }}
          >
            <div style={{
              fontFamily: FO,
              fontSize: "clamp(32px, 3.5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}>
              {s.display}
            </div>
            <div style={{
              fontFamily: FO, fontSize: 10, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#e8a000", marginTop: 8,
            }}>
              {s.label}
            </div>
            <div style={{
              fontFamily: FO, fontSize: 11, fontWeight: 400,
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.02em",
            }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid-wrap {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-cell:nth-child(2) { border-right: none !important; }
          .stats-cell:nth-child(1),
          .stats-cell:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .stats-cell { padding: 28px 16px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid-wrap {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
