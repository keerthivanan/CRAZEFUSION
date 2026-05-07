"use client";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const perks = [
  { num: "01", title: "Upload Your Art", desc: "Submit your designs — Cars, Movies, or Coffee Shop. We review and approve within 24 hours." },
  { num: "02", title: "We Print & Ship", desc: "Once approved, your art goes live. When someone buys it, we handle all printing and delivery." },
  { num: "03", title: "Earn 30%", desc: "You earn 30% of every sale. Paid monthly directly to your account. No limits." },
  { num: "04", title: "Track Everything", desc: "Your dashboard shows live sales, earnings, and design statuses in real time." },
];

export default function PartnerLanding() {
  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 108 }}>

        {/* Hero */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
          <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8a000", marginBottom: 16 }}>
            Artist Partner Programme
          </div>
          <h1 style={{ fontFamily: FO, fontSize: "clamp(32px,5vw,72px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95, margin: "0 0 24px" }}>
            Sell Your Art.<br /><span style={{ color: "#e8a000" }}>Earn Real Money.</span>
          </h1>
          <p style={{ fontFamily: FO, fontSize: 15, color: "var(--c-text-muted)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Join our UK poster store as a creative partner. Upload your designs, we print and ship — you earn 30% of every sale.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/partner/register" style={{ display: "inline-block", padding: "16px 48px", background: "#111", color: "#fff", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50 }}>
              Apply Now — It&apos;s Free
            </Link>
            <Link href="/partner/login" style={{ display: "inline-block", padding: "16px 36px", background: "transparent", color: "var(--c-text)", border: "1.5px solid var(--c-border)", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50 }}>
              Partner Login
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)", background: "var(--c-bg-soft)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
            {[["608+", "Products in store"], ["30%", "You earn per sale"], ["48hrs", "We ship every order"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center", padding: "24px 16px" }}>
                <div style={{ fontFamily: FO, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--c-text)", letterSpacing: "-0.03em" }}>{val}</div>
                <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontFamily: FO, fontSize: "clamp(24px,3.5vw,48px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", margin: 0 }}>Simple as That</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--c-border)" }} className="partner-grid">
            {perks.map(({ num, title, desc }) => (
              <div key={num} style={{ background: "var(--c-bg-soft)", padding: "40px 28px" }}>
                <div style={{ fontFamily: FO, fontSize: 48, fontWeight: 700, color: "var(--c-text)", opacity: 0.1, lineHeight: 1, marginBottom: 24 }}>{num}</div>
                <div style={{ width: 28, height: 2, background: "#e8a000", marginBottom: 18 }} />
                <div style={{ fontFamily: FO, fontSize: 15, fontWeight: 700, color: "var(--c-text)", marginBottom: 12 }}>{title}</div>
                <p style={{ fontFamily: FO, fontSize: 12, color: "var(--c-text-muted)", lineHeight: 1.8, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings example */}
        <div style={{ background: "#111", padding: "80px 32px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#e8a000", marginBottom: 16 }}>Earnings Example</div>
            <h2 style={{ fontFamily: FO, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: 40 }}>How Much Could You Earn?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="earn-grid">
              {[["10 sales/mo", "£35.97"], ["50 sales/mo", "£179.85"], ["200 sales/mo", "£719.40"]].map(([sales, earn]) => (
                <div key={sales} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", padding: "32px 20px", borderRadius: 4 }}>
                  <div style={{ fontFamily: FO, fontSize: 13, color: "#888", marginBottom: 12 }}>{sales}</div>
                  <div style={{ fontFamily: FO, fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "#e8a000" }}>{earn}</div>
                  <div style={{ fontFamily: FO, fontSize: 10, color: "#555", marginTop: 8 }}>30% of £11.99/sale</div>
                </div>
              ))}
            </div>
            <Link href="/partner/register" style={{ display: "inline-block", marginTop: 40, padding: "16px 48px", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50 }}>
              Start Earning Today
            </Link>
          </div>
        </div>

        {/* Requirements */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
          <h2 style={{ fontFamily: FO, fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>Requirements</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "You must own 100% of the artwork you submit — no copyrighted material",
              "Minimum image resolution: 2000×2800px (A4 at 240 DPI)",
              "You must submit at least one design within 3 days of approval or your account is removed",
              "Designs must fit one of our categories: Cars, Movies, or Coffee Shop",
              "We reserve the right to reject any design that doesn't meet our quality standards",
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "16px 20px", border: "1px solid var(--c-border)", background: "var(--c-bg-soft)" }}>
                <span style={{ color: "#e8a000", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text-muted)", lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/partner/register" style={{ display: "inline-block", padding: "16px 48px", background: "#111", color: "#fff", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50 }}>
              Apply as a Partner
            </Link>
          </div>
        </div>

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .partner-grid { grid-template-columns: 1fr 1fr !important; }
          .earn-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .partner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
