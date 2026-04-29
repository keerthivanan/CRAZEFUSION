"use client";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const reviewPhotos = [
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_6.webp?v=1755674100",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_2.webp?v=1755674100",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_3.webp?v=1755674102",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_4.webp?v=1755674101",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_5.webp?v=1755674104",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_1.webp?v=1755674103",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_7.webp?v=1755674103",
  "https://cdn.shopify.com/s/files/1/0758/7246/9288/files/20-08-2025_review_Carosaul_9.webp?v=1755674102",
];

const doubled = [...reviewPhotos, ...reviewPhotos];

const reviews = [
  { name: "Arjun K.", city: "Mumbai", text: "Absolutely stunning quality! My room looks like a magazine shoot. The panels align perfectly and the print quality is unreal.", stars: 5, product: "BMW M4 Poster", date: "Mar 2025" },
  { name: "Priya S.", city: "Delhi", text: "The 9-piece split poster is incredible. Everyone who visits asks about it. I've recommended PosterKing to all my friends!", stars: 5, product: "Naruto 9-Piece Split", date: "Feb 2025" },
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
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 64 }}>

        {/* Hero */}
        <div style={{ background: "#f9f9f9", borderBottom: "1px solid #f0f0f0", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Customer Love</div>
          <h1 style={{ fontFamily: FE, fontSize: "clamp(32px,5vw,72px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.04em", marginBottom: 12 }}>
            10,000+ Happy <span style={{ color: "#e8a000" }}>Walls</span>
          </h1>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", maxWidth: 440, margin: "0 auto 36px" }}>
            Real customers, real walls, real smiles. See what India is saying about PosterKing.
          </p>
          {/* Rating Summary */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ fontFamily: FE, fontSize: 56, fontWeight: 900, color: "#111", lineHeight: 1 }}>4.9</div>
            <div>
              <div style={{ color: "#e8a000", fontSize: 24, letterSpacing: 4, marginBottom: 4 }}>★★★★★</div>
              <div style={{ fontFamily: F, fontSize: 12, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>2,400+ Reviews</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: "#111", padding: "32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: FE, fontSize: 32, fontWeight: 900, color: "#e8a000", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontFamily: F, fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Marquee Row 1 (left to right) */}
        <div style={{ overflow: "hidden", borderBottom: "1px solid #f0f0f0", padding: "4px 0" }}>
          <div className="marquee-track" style={{ display: "flex", gap: 4, width: "max-content" }}>
            {doubled.map((src, i) => (
              <div key={i} style={{ flexShrink: 0, width: 200, height: 200, overflow: "hidden" }}>
                <img src={src} alt="Customer wall review" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                  onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
        </div>

        {/* Written Reviews Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 32px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>What They Say</div>
              <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>Verified Reviews</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["All", "5★", "4★", "Cars", "Anime", "Custom"].map(f => (
                <button key={f}
                  style={{ padding: "7px 14px", border: "1px solid #e0e0e0", background: "#fff", color: "#555", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#555"; }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {reviews.map((r, i) => (
              <div key={i}
                style={{ padding: 24, background: "#fff", border: "1px solid #f0f0f0", transition: "all 0.25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.borderColor = "#ddd"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "#f0f0f0"; }}>
                <div style={{ color: "#e8a000", fontSize: 13, marginBottom: 12, letterSpacing: 2 }}>{"★".repeat(r.stars)}</div>
                <p style={{ fontFamily: F, fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 16 }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#111" }}>{r.name}</div>
                    <div style={{ fontFamily: F, fontSize: 11, color: "#aaa" }}>{r.city} · {r.date}</div>
                  </div>
                  <div style={{ fontFamily: F, fontSize: 10, color: "#999", background: "#f5f5f5", padding: "4px 8px", textAlign: "right" }}>{r.product}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#111", padding: "64px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Join Them</div>
          <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,4vw,48px)", fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "-0.03em", marginBottom: 20 }}>Your Wall is Waiting</h2>
          <p style={{ fontFamily: F, fontSize: 14, color: "#666", marginBottom: 32 }}>Premium posters starting ₹79. Free shipping on prepaid orders.</p>
          <a href="/collection"
            style={{ display: "inline-block", padding: "16px 48px", background: "#e8a000", color: "#000", fontFamily: F, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
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
