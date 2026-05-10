"use client";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const STEPS = [
  { num: "01", label: "Pick any poster" },
  { num: "02", label: "Describe your edit" },
  { num: "03", label: "AI transforms it" },
  { num: "04", label: "Order — we print it" },
];

export default function AIBanner() {
  return (
    <section style={{ background: "#080808", padding: "80px 0 96px", position: "relative", overflow: "hidden" }}>

      {/* Gradient fade to next section */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, var(--c-bg))", pointerEvents: "none" }} />

      {/* Subtle grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 64 }} className="ai-banner-grid">
          <div>
            <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 20 }}>
              AI Studio
            </div>
            <h2 style={{ fontFamily: FO, fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", textTransform: "uppercase", margin: "0 0 20px", lineHeight: 1 }}>
              Every Poster.<br />
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#fff176)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Your Way.
              </span>
            </h2>
            <p style={{ fontFamily: FO, fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 400 }}>
              Buy credits. Edit any of our 609 posters with AI — change the style, add your name, transform the colours. Then order it printed and shipped to your door.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/create" style={{ display: "inline-block", padding: "14px 32px", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 32px rgba(124,58,237,0.25)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}>
                Try AI Studio
              </Link>
              <Link href="/credits" style={{ display: "inline-block", padding: "14px 28px", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; }}>
                View Credits
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", background: "rgba(255,255,255,0.02)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(124,58,237,0.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"}>
                <div style={{ fontFamily: FO, fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "rgba(255,255,255,0.06)", lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <div style={{ width: 24, height: 2, background: "#7c3aed", marginBottom: 14 }} />
                <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.01em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit packs strip */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ name: "Starter", price: "£2.99", credits: "30 credits" }, { name: "Creator", price: "£7.99", credits: "100 credits" }, { name: "Pro", price: "£14.99", credits: "250 credits" }].map((p, i) => (
            <Link key={i} href="/credits" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: i === 1 ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${i === 1 ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.1)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = i === 1 ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)"}>
              <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: i === 1 ? "#7c3aed" : "rgba(255,255,255,0.5)" }}>{p.price}</span>
              <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontFamily: FO, fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>{p.credits}</span>
              <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ai-banner-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
