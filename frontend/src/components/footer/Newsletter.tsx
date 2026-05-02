"use client";
import { useState } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone]   = useState(false);

  return (
    <section style={{ background: "var(--c-bg-soft)", padding: "88px 32px" }} className="newsletter-section">
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          border: "1px solid var(--c-border)",
          borderRadius: 50, padding: "6px 16px 6px 10px",
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e8a000" }} />
          <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#e8a000" }}>
            Join 10,000+ Customers
          </span>
        </div>

        <h2 style={{
          fontFamily: FO,
          fontSize: "clamp(28px,4.5vw,52px)",
          fontWeight: 700, letterSpacing: "-0.03em",
          color: "var(--c-text)", textTransform: "uppercase",
          margin: "0 0 16px", lineHeight: 0.95,
        }}>
          Get <span style={{ color: "#e8a000" }}>10% Off</span><br />Your First Order
        </h2>

        <p style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text-muted)", margin: "0 0 40px", lineHeight: 1.8 }}>
          New arrivals, exclusive deals, and wall inspiration — straight to your inbox. No spam, unsubscribe anytime.
        </p>

        {done ? (
          <div style={{
            fontFamily: FO, fontSize: 13, color: "#16a34a",
            padding: "18px 28px",
            border: "1px solid rgba(22,163,74,0.3)",
            borderRadius: 12,
            background: "rgba(22,163,74,0.05)",
          }}>
            You&apos;re in! Your 10% discount code is on its way.
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); if (email) setDone(true); }}
            className="newsletter-form"
            style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto" }}
          >
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, padding: "16px 20px",
                background: "var(--c-bg)",
                border: "1px solid var(--c-border)",
                borderRight: "none",
                color: "var(--c-text)", fontFamily: FO, fontSize: 13,
                outline: "none",
                transition: "border-color 0.2s",
                borderRadius: "50px 0 0 50px",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#e8a000")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")}
            />
            <ClickSpark sparkColor="#e8a000" sparkCount={8} sparkRadius={20}>
              <button type="submit" style={{
                padding: "16px 28px",
                background: "#e8a000", color: "#000",
                fontFamily: FO, fontSize: 11, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                border: "none", cursor: "pointer",
                whiteSpace: "nowrap",
                borderRadius: "0 50px 50px 0",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Subscribe
              </button>
            </ClickSpark>
          </form>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .newsletter-form { flex-direction: column !important; }
          .newsletter-form input {
            border-right: 1px solid var(--c-border) !important;
            border-bottom: none !important;
            border-radius: 50px 50px 0 0 !important;
            width: 100% !important;
          }
          .newsletter-form button {
            width: 100% !important;
            text-align: center !important;
            border-radius: 0 0 50px 50px !important;
          }
        }
      `}</style>
    </section>
  );
}
