"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import CountUp from "@/components/reactbits/CountUp";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const reviews = [
  { name: "Arjun K.", city: "Mumbai", text: "Absolutely stunning quality! My room looks like a magazine shoot. The panels align perfectly and the print quality is unreal.", stars: 5, product: "BMW M4 Poster", date: "Mar 2025" },
  { name: "Priya S.", city: "Delhi", text: "The 9-piece split poster is incredible. Everyone who visits asks about it. I've recommended CrazeFusion to all my friends!", stars: 5, product: "Naruto 9-Piece Split", date: "Feb 2025" },
  { name: "Rahul M.", city: "Bangalore", text: "Ordered the 50-piece collage kit. Best purchase of my life honestly. Packaging was perfect, no damage whatsoever.", stars: 5, product: "Anime Collage Kit", date: "Jan 2025" },
  { name: "Sneha R.", city: "Chennai", text: "Custom portrait of my pet dog came out perfectly. So emotional when I saw it. Will definitely order again and again!", stars: 5, product: "Custom Print", date: "Mar 2025" },
  { name: "Vikram T.", city: "Hyderabad", text: "Delivery super fast, packaging excellent. 10/10 recommend. The colors are so vibrant and true to what I saw online.", stars: 5, product: "F1 Collection", date: "Apr 2025" },
  { name: "Ananya P.", city: "Pune", text: "Print quality is insane for this price. Way better than expected. I was skeptical but now I'm a permanent customer!", stars: 5, product: "Music Poster", date: "Feb 2025" },
  { name: "Karthik V.", city: "Kolkata", text: "My gaming setup looks legendary now. Worth every rupee! The Cyberpunk poster is absolutely fire.", stars: 5, product: "Gaming Poster", date: "Jan 2025" },
  { name: "Divya N.", city: "Ahmedabad", text: "Bought as a gift. My boyfriend cried happy tears. The quality, the packaging, everything was premium. Thank you!", stars: 5, product: "Ronaldo Poster", date: "Mar 2025" },
  { name: "Saurabh L.", city: "Jaipur", text: "Ordered the 8-panel defender set. Looks absolutely menacing on my wall. Got so many compliments already.", stars: 5, product: "Defender 8-Panel", date: "Apr 2025" },
  { name: "Meera P.", city: "Lucknow", text: "The retro photo prints of my family are so nostalgic and beautiful. Print resolution is crystal clear.", stars: 5, product: "Retro Photo Prints", date: "Mar 2025" },
  { name: "Aditya S.", city: "Surat", text: "Was worried about the color accuracy but it matched my screen perfectly. Very happy with the purchase!", stars: 5, product: "Spider-Man Set", date: "Feb 2025" },
  { name: "Pooja M.", city: "Chandigarh", text: "Ordered 5 different posters. Every single one is perfect. Super fast delivery and beautiful packaging!", stars: 5, product: "Multiple Products", date: "Jan 2025" },
];

const stats = [
  { val: "10,000+", label: "Happy Customers" },
  { val: "4.9 ★", label: "Average Rating" },
  { val: "2,400+", label: "Verified Reviews" },
  { val: "1,981+", label: "Poster Designs" },
];

export default function ReviewsPage() {
  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Customer Love</div>
          <h1 style={{ fontFamily: FE, fontSize: "clamp(32px,5vw,72px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.04em", marginBottom: 12 }}>
            10,000+ Happy <span style={{ color: "#e8a000" }}>Walls</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", maxWidth: 440, margin: "0 auto 36px" }}>
            Real customers, real walls, real smiles. See what India is saying about CrazeFusion.
          </p>
          {/* Rating Summary */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontFamily: FE, fontSize: 56, fontWeight: 400, color: "var(--c-text)", lineHeight: 1 }}>4.9</div>
            <div>
              <div style={{ color: "#e8a000", fontSize: 24, letterSpacing: 4, marginBottom: 4 }}>★★★★★</div>
              <div style={{ fontFamily: F, fontSize: 12, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>2,400+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: "#111", padding: "40px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {[["10000","+","Happy Customers"],[" 2400","+","Verified Reviews"],["4.9","/5","Average Rating"],["1981","+","Poster Designs"]].map(([val,suf,label],i) => (
              <AnimatedContent key={label} distance={16} delay={i*0.1} duration={0.5}>
                <div style={{ textAlign: "center", padding: "16px", borderRight: i < 3 ? "1px solid #1f1f1f" : "none" }}>
                  <div style={{ fontFamily: FE, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, color: "#e8a000", lineHeight: 1 }}>
                    <CountUp to={Number(val)} from={0} duration={2} delay={i*0.1} />{suf}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>

        {/* Written Reviews Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>What They Say</div>
              <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>Verified Reviews</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "5★", "4★", "Cars", "Anime", "Custom"].map(f => (
                <button key={f}
                  style={{ padding: "7px 14px", border: "1px solid var(--c-border)", background: "var(--c-bg)", color: "#555", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#555"; }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <AnimatedContent key={i} distance={20} delay={i * 0.06} duration={0.5} threshold={0.05}>
                <SpotlightCard spotlightColor="rgba(160,160,160,0.1)"
                  style={{ padding: 24, background: "var(--c-bg-card)", border: "1px solid var(--c-card-border)", borderRadius: 12, cursor: "default", transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#888888"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(160,160,160,0.18)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#efefef"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ color: "#e8a000", fontSize: 13, marginBottom: 12, letterSpacing: 2 }}>{"★".repeat(r.stars)}</div>
                  <p style={{ fontFamily: F, fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                  <div style={{ height: 1, background: "#f0f0f0", marginBottom: 16 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                      <div style={{ fontFamily: FE, fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{r.name}</div>
                      <div style={{ fontFamily: F, fontSize: 11, color: "#aaa" }}>{r.city} · {r.date}</div>
                    </div>
                    <div style={{ fontFamily: F, fontSize: 9, color: "#e8a000", background: "rgba(232,160,0,0.08)", border: "1px solid rgba(232,160,0,0.2)", padding: "3px 8px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase" }}>{r.product}</div>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#111", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Join Them</div>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,4vw,48px)", fontWeight: 400, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.03em", marginBottom: 20 }}>Your Wall is Waiting</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "#666", marginBottom: 32 }}>Premium posters starting ₹79. Free shipping on prepaid orders.</p>
          <a href="/collection"
            style={{ display: "inline-block", padding: "16px 48px", background: "#e8a000", color: "#000", fontFamily: F, fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#d09800"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#e8a000"}>
            Shop Now →
          </a>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
