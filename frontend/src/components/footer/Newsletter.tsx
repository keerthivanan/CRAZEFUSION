"use client";
import { useState } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);

  return (
    <section style={{ padding: "72px 32px", background: "var(--c-bg)" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>

        <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 14 }}>
          Stay in the loop
        </div>

        <h2 style={{ fontFamily: FE, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 900, letterSpacing: "-0.03em", color: "var(--c-text)", textTransform: "uppercase", marginBottom: 10 }}>
          Get <span style={{ color: "#e8a000" }}>10% Off</span> Your First Order
        </h2>

        <p style={{ fontFamily: F, fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.7 }}>
          New arrivals, exclusive deals, and wall inspiration — straight to your inbox.
        </p>

        {done ? (
          <div style={{ fontFamily: F, fontSize: 14, color: "#16a34a", padding: "16px 24px", border: "1px solid rgba(22,163,74,0.3)", borderRadius: 4, background: "rgba(22,163,74,0.04)" }}>
            You&apos;re in! Check your email for your 10% discount code.
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }}
            className="newsletter-form"
            style={{ display: "flex", gap: 0, maxWidth: 460, margin: "0 auto" }}>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ flex: 1, padding: "14px 18px", background: "var(--c-bg)", border: "1.5px solid #e0e0e0", borderRight: "none", color: "#111", fontFamily: F, fontSize: 13, outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => (e.currentTarget.style.borderColor = "#111")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
            />
            <ClickSpark sparkColor="#e8a000" sparkCount={8} sparkRadius={20}>
              <button type="submit" style={{ padding: "14px 24px", background: "#111", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#333")}
                onMouseLeave={e => (e.currentTarget.style.background = "#111")}>
                Subscribe
              </button>
            </ClickSpark>
          </form>
        )}

        <p style={{ fontFamily: F, fontSize: 11, color: "#bbb", marginTop: 14 }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
