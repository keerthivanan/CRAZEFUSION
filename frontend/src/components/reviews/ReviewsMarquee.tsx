"use client";

const reviews = [
  { name: "Arjun K.",   city: "Mumbai",    text: "Absolutely stunning quality! My room looks like a magazine shoot. The panels align perfectly.",  stars: 5, product: "CSK Wall Set" },
  { name: "Priya S.",   city: "Delhi",     text: "The 8-panel split poster is incredible. Everyone who visits asks about it. Already recommended to 10 friends!", stars: 5, product: "RCB Collection" },
  { name: "Rahul M.",   city: "Bangalore", text: "Best purchase of my life honestly. Packaging was perfect, no damage whatsoever. Print is fire.",  stars: 5, product: "Lakers Wall Set" },
  { name: "Sneha R.",   city: "Chennai",   text: "Real Madrid set came out perfectly. The colors are so vibrant. Will definitely order again!",     stars: 5, product: "Real Madrid Set" },
  { name: "Vikram T.",  city: "Hyderabad", text: "Delivery super fast, packaging excellent. 10/10 recommend. Colors are true to what I saw online.", stars: 5, product: "Warriors Set" },
  { name: "Ananya P.",  city: "Pune",      text: "Print quality is insane for this price. Way better than expected. I was skeptical but now I'm a permanent customer!", stars: 5, product: "Barcelona Set" },
  { name: "Karthik V.", city: "Kolkata",   text: "My living room looks legendary now. Worth every rupee! The split poster is absolutely fire.",     stars: 5, product: "GTR Poster" },
  { name: "Divya N.",   city: "Ahmedabad", text: "Bought as a gift. My boyfriend cried happy tears. The quality, the packaging — everything premium!", stars: 5, product: "MI Fan Set" },
];

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div style={{
      flexShrink: 0, width: 320,
      background: "var(--c-bg-soft)",
      border: "1px solid var(--c-card-border)",
      borderRadius: 12,
      padding: "24px 24px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Gold accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "#e8a000", borderRadius: "12px 0 0 12px" }} />

      {/* Stars */}
      <div style={{ color: "#e8a000", fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>

      {/* Quote */}
      <p style={{ fontFamily: FO, fontSize: 13, fontWeight: 400, color: "var(--c-text)", lineHeight: 1.75, margin: "0 0 20px", minHeight: 72, opacity: 0.85 }}>
        &ldquo;{r.text}&rdquo;
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--c-border)", marginBottom: 16 }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "var(--c-text)" }}>{r.name}</div>
          <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", marginTop: 2 }}>{r.city}</div>
        </div>
        <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#e8a000", background: "rgba(232,160,0,0.1)", border: "1px solid rgba(232,160,0,0.25)", padding: "4px 10px", borderRadius: 20 }}>
          {r.product}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsMarquee() {
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews].reverse().concat([...reviews].reverse());

  return (
    <section style={{ padding: "88px 0 80px", background: "var(--c-bg)", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 10 }}>
            Customer Reviews
          </div>
          <h2 style={{ fontFamily: FO, fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--c-text)", textTransform: "uppercase", margin: 0, lineHeight: 1.1 }}>
            10,000+ Happy<br />
            <span style={{ color: "#e8a000" }}>Walls</span>
          </h2>
        </div>

        {/* Rating block */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: FO, fontSize: 64, fontWeight: 800, color: "var(--c-text)", lineHeight: 1 }}>4.8</div>
            <div style={{ color: "#e8a000", fontSize: 20, letterSpacing: 4, marginTop: 4 }}>★★★★★</div>
            <div style={{ fontFamily: FO, fontSize: 10, color: "var(--c-text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 6 }}>2,400+ Reviews</div>
          </div>
          <div style={{ width: 1, height: 80, background: "var(--c-border)" }} />
          <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", maxWidth: 160, lineHeight: 1.6 }}>
            Verified purchases across India
          </div>
        </div>
      </div>

      {/* Row 1 — left */}
      <div style={{ overflow: "hidden", marginBottom: 16 }}>
        <div className="marquee-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
          {row1.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track-rev" style={{ display: "flex", gap: 16, width: "max-content" }}>
          {row2.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track-rev {
          animation: marquee-rev 40s linear infinite;
        }
        .marquee-track-rev:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
