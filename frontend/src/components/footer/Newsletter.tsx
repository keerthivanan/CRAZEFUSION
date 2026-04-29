"use client";
import { useState } from "react";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);

  return (
    <section style={{ padding: "72px 32px", background: "#111" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>
          Stay in the loop
        </div>
        <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff", textTransform: "uppercase", marginBottom: 8 }}>
          Get <span style={{ color: "#e8a000" }}>10% Off</span> Your First Order
        </h2>
        <p style={{ fontFamily: F, fontSize: 13, color: "#777", marginBottom: 28 }}>
          New arrivals, exclusive deals, and wall inspiration.
        </p>
        {done ? (
          <div style={{ fontFamily: F, fontSize: 13, color: "#e8a000", padding: 14, border: "1px solid rgba(232,160,0,0.4)" }}>
            ✓ You&apos;re in! Check your email for your discount code.
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }} style={{ display: "flex" }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
              style={{ flex: 1, padding: "13px 18px", background: "#1e1e1e", border: "1px solid #333", borderRight: "none", color: "#fff", fontFamily: F, fontSize: 13, outline: "none" }} />
            <button type="submit"
              style={{ padding: "13px 24px", background: "#fff", color: "#111", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8a000")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
