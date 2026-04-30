"use client";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import BlurText from "@/components/reactbits/BlurText";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const reviews = [
  { name: "Arjun K.",  city: "Mumbai",    text: "Absolutely stunning quality! My room looks like a magazine shoot.",      stars: 5, product: "BMW M4 Poster" },
  { name: "Priya S.",  city: "Delhi",     text: "The 9-piece split poster is incredible. Everyone who visits asks about it.", stars: 5, product: "Naruto Split" },
  { name: "Rahul M.",  city: "Bangalore", text: "Ordered the 50-piece collage kit. Best purchase of my life honestly.",    stars: 5, product: "Anime Collage" },
  { name: "Sneha R.",  city: "Chennai",   text: "Custom portrait of my pet dog came out perfectly. So emotional.",         stars: 5, product: "Custom Print" },
  { name: "Vikram T.", city: "Hyderabad", text: "Delivery super fast, packaging excellent. 10/10 recommend.",             stars: 5, product: "F1 Collection" },
  { name: "Ananya P.", city: "Pune",      text: "Print quality is insane for this price. Way better than expected.",       stars: 5, product: "Music Poster" },
  { name: "Karthik V.",city: "Kolkata",   text: "My gaming setup looks legendary now. Worth every rupee!",                stars: 5, product: "Gaming Poster" },
  { name: "Divya N.",  city: "Ahmedabad", text: "Bought as a gift. My boyfriend cried happy tears. Thank you!",           stars: 5, product: "Ronaldo Poster" },
];

const doubled = [...reviews, ...reviews];
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function ReviewsMarquee() {
  return (
    <section style={{ padding: "80px 0", background: "var(--c-bg)", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px 48px" }}>
        <AnimatedContent distance={24} duration={0.55}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Customer Reviews</div>
              <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--c-text)", textTransform: "uppercase", margin: 0, display: "flex", flexWrap: "wrap", gap: "0.25em" }}>
                <BlurText text="10,000+ Happy" delay={60} animateBy="words" direction="bottom" />
                <span style={{ color: "#e8a000" }}>
                  <BlurText text="Walls" delay={200} animateBy="words" direction="bottom" />
                </span>
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontFamily: FE, fontSize: 48, fontWeight: 900, color: "var(--c-text)", lineHeight: 1 }}>4.8</div>
              <div>
                <div style={{ color: "#e8a000", fontSize: 18, letterSpacing: 3 }}>★★★★★</div>
                <div style={{ fontFamily: F, fontSize: 10, color: "#bbb", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>2,400+ Reviews</div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* Marquee */}
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
          {doubled.map((r, i) => (
            <SpotlightCard
              key={i}
              spotlightColor="rgba(232,160,0,0.1)"
              style={{
                flexShrink: 0,
                width: 300,
                background: "var(--c-bg-card)",
                border: "1px solid #efefef",
                borderRadius: 14,
                padding: 24,
                cursor: "default",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#e8a000";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,160,0,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#efefef";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Stars */}
              <div style={{ color: "#e8a000", fontSize: 13, marginBottom: 12, letterSpacing: 3 }}>★★★★★</div>

              {/* Review text */}
              <p style={{ fontFamily: F, fontSize: 13, color: "#444", lineHeight: 1.7, marginBottom: 20, minHeight: 60 }}>
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: "#f0f0f0", marginBottom: 16 }} />

              {/* Name + Product */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 800, color: "var(--c-text)", letterSpacing: "0.02em" }}>{r.name}</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "#bbb", marginTop: 2 }}>{r.city}</div>
                </div>
                <div style={{ fontFamily: F, fontSize: 9, color: "#e8a000", background: "rgba(232,160,0,0.08)", border: "1px solid rgba(232,160,0,0.2)", padding: "3px 9px", borderRadius: 20, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 700 }}>
                  {r.product}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
