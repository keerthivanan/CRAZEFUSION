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
    <section style={{ background: "var(--c-bg-soft)", padding: "80px 0 96px", position: "relative", overflow: "hidden", borderTop: "1px solid var(--c-border)" }}>

      {/* Gradient fade to next section */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, var(--c-bg))", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 64 }} className="ai-banner-grid">
          <div>
            <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 20 }}>
              AI Studio
            </div>
            <h2 style={{ fontFamily: FO, fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--c-text)", textTransform: "uppercase", margin: "0 0 20px", lineHeight: 1 }}>
              Every Poster.<br />
              <span>Your Way.</span>
            </h2>
            <p style={{ fontFamily: FO, fontSize: 14, color: "var(--c-text-muted)", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 400 }}>
              Buy credits. Edit any of our 609 posters with AI — change the style, add your name, transform the colours. Then order it printed and shipped to your door.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/create" style={{ display: "inline-block", padding: "14px 32px", background: "var(--c-btn-bg)", color: "var(--c-btn-text)", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; }}>
                Try AI Studio
              </Link>
              <Link href="/credits" style={{ display: "inline-block", padding: "14px 28px", background: "transparent", color: "var(--c-text-muted)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, border: "1px solid var(--c-border)", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = ""; (e.currentTarget as HTMLAnchorElement).style.borderColor = ""; }}>
                View Credits
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--c-border)", borderRadius: 20, overflow: "hidden", border: "1px solid var(--c-card-border)" }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ padding: "32px 28px", background: "var(--c-bg-card)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--c-bg-soft)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "var(--c-bg-card)"}>
                <div style={{ fontFamily: FO, fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--c-text-dim)", lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <div style={{ width: 24, height: 2, background: "var(--c-text)", marginBottom: 14 }} />
                <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "var(--c-text)", letterSpacing: "0.01em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Credit packs strip */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ name: "Starter", price: "£2.99", credits: "30 credits" }, { name: "Creator", price: "£7.99", credits: "100 credits" }, { name: "Pro", price: "£14.99", credits: "250 credits" }].map((p, i) => (
            <Link key={i} href="/credits" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", background: i === 1 ? "var(--c-bg-card)" : "var(--c-bg)", border: `1px solid ${i === 1 ? "var(--c-card-border)" : "var(--c-border)"}`, borderRadius: 12, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-bg-soft)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = i === 1 ? "var(--c-bg-card)" : "var(--c-bg)"}>
              <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{p.price}</span>
              <span style={{ width: 1, height: 14, background: "var(--c-border)" }} />
              <span style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", letterSpacing: "0.06em" }}>{p.credits}</span>
              <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, color: "var(--c-text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.name}</span>
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
