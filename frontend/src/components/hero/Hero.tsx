"use client";
import Link from "next/link";
import ClickSpark from "@/components/reactbits/ClickSpark";

const heroImages = [
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777808011/crazefusion/mockups/mockup_thala.jpg", label: "Best Seller" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777808027/crazefusion/mockups/mockup_virat_rcb.jpg", label: "New" },
  { src: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777808020/crazefusion/mockups/mockup_thomas_shelby.jpg", label: "Trending" },
];

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function Hero() {
  return (
    <section style={{ background: "var(--c-bg)", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "calc(100vh - 108px)",
        alignItems: "center",
        padding: "40px 40px 40px",
        gap: 56,
      }} className="hero-grid">

        {/* LEFT */}
        <div>
          {/* Headline */}
          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FO,
              fontSize: "clamp(46px,6.5vw,96px)",
              fontWeight: 700, lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--c-text)", textTransform: "uppercase",
              margin: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}>
              Your Walls
            </h1>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FO,
              fontSize: "clamp(46px,6.5vw,96px)",
              fontWeight: 700, lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "#e8a000", textTransform: "uppercase",
              margin: "8px 0",
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            }}>
              Deserve
            </h1>
          </div>

          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontFamily: FO,
              fontSize: "clamp(46px,6.5vw,96px)",
              fontWeight: 700, lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--c-text)", textTransform: "uppercase",
              margin: 0,
              animation: "slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            }}>
              The Best
            </h1>
          </div>

          <p style={{
            fontFamily: FO, fontSize: 14, color: "var(--c-text-muted)",
            maxWidth: 400, margin: "28px 0 0", lineHeight: 1.8,
            animation: "fadeUp 0.7s ease 0.5s both",
          }}>
            Premium quality posters for Cricket, Basketball, Football & more.
            Starting from ₹79 — free shipping on prepaid orders.
          </p>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            marginTop: 40,
            animation: "fadeUp 0.7s ease 0.6s both",
          }}>
            <ClickSpark sparkColor="#e8a000" sparkCount={12} sparkRadius={28}>
              <Link href="/collection" style={{
                display: "inline-block", padding: "16px 44px",
                background: "var(--c-text)", color: "var(--c-bg)",
                fontFamily: FO, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                textDecoration: "none", borderRadius: 50,
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
              >
                Shop Collection
              </Link>
            </ClickSpark>

            <Link href="/cricket" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px",
              border: "1px solid var(--c-border)",
              fontFamily: FO, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", color: "var(--c-text-muted)",
              borderRadius: 50, transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--c-text)"; el.style.color = "var(--c-text)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--c-border)"; el.style.color = "var(--c-text-muted)"; }}
            >
              Sports Prints ↗
            </Link>
          </div>

          {/* Social proof row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            marginTop: 36,
            animation: "fadeUp 0.7s ease 0.75s both",
          }}>
            <div style={{ display: "flex" }}>
              {["R","A","K","S"].map((c, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: ["#e8a000","#111","#555","#333"][i],
                  border: "2px solid var(--c-bg)",
                  marginLeft: i === 0 ? 0 : -8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FO, fontSize: 9, fontWeight: 700, color: "#fff",
                }}>
                  {c}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", lineHeight: 1.4 }}>
              <span style={{ color: "var(--c-text)", fontWeight: 700 }}>10,000+</span> happy customers across India
            </div>
          </div>
        </div>

        {/* RIGHT — images */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 10,
          height: "min(600px, 74vh)",
          animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }} className="hero-images">
          {heroImages.map((img, i) => (
            <Link key={i} href="/collection" style={{
              textDecoration: "none", position: "relative",
              overflow: "hidden", display: "block",
              gridRow: i === 0 ? "1 / 3" : "auto",
              borderRadius: 12, background: "var(--c-bg-soft)",
            }}>
              <img src={img.src} alt="CrazeFusion Premium Print"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: "#e8a000", color: "#000",
                fontFamily: FO, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "4px 10px", borderRadius: 50,
              }}>
                {img.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 40px 20px !important;
            min-height: auto !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 768px) {
          .stats-strip {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 0 16px !important;
          }
          .stat-cell:nth-child(2) { border-right: none !important; }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) { border-bottom: 1px solid var(--c-border); }
          .stat-cell { padding: 20px 16px 24px !important; }
        }
      `}</style>
    </section>
  );
}
