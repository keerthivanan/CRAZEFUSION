"use client";

const reviews = [
  { name: "Arjun K.", city: "Mumbai", text: "Absolutely stunning quality! My room looks like a magazine shoot.", stars: 5, product: "BMW M4 Poster" },
  { name: "Priya S.", city: "Delhi", text: "The 9-piece split poster is incredible. Everyone who visits asks about it.", stars: 5, product: "Naruto Split" },
  { name: "Rahul M.", city: "Bangalore", text: "Ordered the 50-piece collage kit. Best purchase of my life honestly.", stars: 5, product: "Anime Collage" },
  { name: "Sneha R.", city: "Chennai", text: "Custom portrait of my pet dog came out perfectly. So emotional", stars: 5, product: "Custom Print" },
  { name: "Vikram T.", city: "Hyderabad", text: "Delivery super fast, packaging excellent. 10/10 recommend.", stars: 5, product: "F1 Collection" },
  { name: "Ananya P.", city: "Pune", text: "Print quality is insane for this price. Way better than expected.", stars: 5, product: "Music Poster" },
  { name: "Karthik V.", city: "Kolkata", text: "My gaming setup looks legendary now. Worth every rupee!", stars: 5, product: "Gaming Poster" },
  { name: "Divya N.", city: "Ahmedabad", text: "Bought as a gift. My boyfriend cried happy tears. Thank you!", stars: 5, product: "Ronaldo Poster" },
];

const doubled = [...reviews, ...reviews];
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function ReviewsMarquee() {
  return (
    <section style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid #f0f0f0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Customer Reviews</div>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#111", textTransform: "uppercase", margin: 0 }}>
              10,000+ Happy <span style={{ color: "#e8a000" }}>Walls</span>
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: FE, fontSize: 40, fontWeight: 900, color: "#111", lineHeight: 1 }}>4.8</span>
            <div>
              <div style={{ color: "#e8a000", fontSize: 16, letterSpacing: 2 }}>★★★★★</div>
              <div style={{ fontFamily: F, fontSize: 10, color: "#bbb", letterSpacing: "0.12em", textTransform: "uppercase" }}>2,400+ Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
          {doubled.map((r, i) => (
            <div key={i} style={{ flexShrink: 0, width: 280, background: "#f7f7f7", border: "1px solid #eee", padding: "22px", transition: "border-color 0.25s" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#ccc"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "#eee"}>
              <div style={{ color: "#e8a000", fontSize: 12, marginBottom: 10, letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontFamily: F, fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: "#111" }}>{r.name}</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "#bbb" }}>{r.city}</div>
                </div>
                <div style={{ fontFamily: F, fontSize: 9, color: "#999", background: "#eee", padding: "3px 7px" }}>{r.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
