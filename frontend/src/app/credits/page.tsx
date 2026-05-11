"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { supabase } from "@/lib/supabase";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const PACKS = [
  { id: "starter", name: "Starter", price: 2.99,  credits: 30,  edits: 6,  color: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.1)", accentColor: "#fff",    tag: null },
  { id: "creator", name: "Creator", price: 7.99,  credits: 100, edits: 20, color: "linear-gradient(135deg,#1a1200,#2a1e00)", border: "#7c3aed", accentColor: "#7c3aed", tag: "Most Popular" },
  { id: "pro",     name: "Pro",     price: 14.99, credits: 250, edits: 50, color: "linear-gradient(135deg,#0a0a1a,#111128)", border: "#6366f1", accentColor: "#818cf8", tag: "Best Value" },
];

const WHAT = [
  { action: "Generate poster from prompt", credits: 5 },
  { action: "Edit existing poster with AI", credits: 5 },
  { action: "Change style / colour",        credits: 3 },
  { action: "Add text / name / date",       credits: 2 },
  { action: "Enhance & upscale",            credits: 2 },
];

export default function CreditsPage() {
  const [userId,    setUserId]    = useState<string | null>(null);
  const [balance,   setBalance]   = useState<number | null>(null);
  const [buying,    setBuying]    = useState<string | null>(null);
  const [success,   setSuccess]   = useState<string | null>(null);
  const [err,       setErr]       = useState("");

  // Load Razorpay script + check auth
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);

    (async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const r = await fetch(`/api/credits/balance?userId=${user.id}`);
      const d = await r.json();
      setBalance(d.balance ?? 0);
    })();

    return () => { document.body.removeChild(s); };
  }, []);

  const handleBuy = async (pack: typeof PACKS[0]) => {
    setErr(""); setBuying(pack.id);

    if (!userId) { setErr("Please log in first to buy credits."); setBuying(null); return; }

    try {
      const res  = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack: pack.id, userId }),
      });
      const data = await res.json();

      if (data.error) { setErr(data.error); setBuying(null); return; }

      // Dev mode — credits added directly
      if (data.mock) {
        setBalance(b => (b ?? 0) + data.credits);
        setSuccess(`${data.credits} credits added to your account!`);
        setBuying(null); return;
      }

      // Open Razorpay widget
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) { setErr("Payment loading. Please try again."); setBuying(null); return; }

      const rzp = new Razorpay({
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      data.amount,
        currency:    data.currency,
        order_id:    data.razorpayOrderId,
        name:        "CrazeFusion AI Credits",
        description: `${pack.credits} Credits — ${pack.name} Pack`,
        theme:       { color: "#7c3aed" },
        handler: async (response: any) => {
          const verRes  = await fetch("/api/credits/purchase", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, pack: pack.id, userId }),
          });
          const verData = await verRes.json();
          if (verData.success) {
            setBalance(b => (b ?? 0) + pack.credits);
            setSuccess(`${pack.credits} credits added to your account!`);
          } else {
            setErr("Payment received but credits failed to add. Contact support.");
          }
          setBuying(null);
        },
        modal: { ondismiss: () => setBuying(null) },
      });
      rzp.open();
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong.");
      setBuying(null);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--c-bg)", minHeight: "100vh", paddingTop: 100, fontFamily: FO }}>

        {/* Header */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 50, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7c3aed" }}>AI Credits</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Power Your<br /><span style={{ color: "#7c3aed" }}>Creativity</span>
          </h1>
          <p style={{ fontSize: 15, color: "#666", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.7 }}>
            Buy credits once. Use them to generate and edit posters with AI. No subscription. No expiry.
          </p>

          {/* Balance badge */}
          {balance !== null && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 50, padding: "8px 20px" }}>
              <span style={{ fontSize: 13, color: "#888" }}>Your balance:</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#7c3aed" }}>{balance} credits</span>
            </div>
          )}
        </div>

        {/* Success message */}
        {success && (
          <div style={{ maxWidth: 480, margin: "0 auto 32px", padding: "16px 24px", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>{success}</div>
            <Link href="/create" style={{ fontSize: 12, color: "#7c3aed", textDecoration: "none", display: "block", marginTop: 8 }}>Go to AI Studio</Link>
          </div>
        )}

        {/* Error */}
        {err && (
          <div style={{ maxWidth: 480, margin: "0 auto 24px", padding: "12px 20px", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, textAlign: "center", fontSize: 13, color: "#f87171" }}>
            {err}
          </div>
        )}

        {/* Packs */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {PACKS.map((p, i) => (
            <div key={p.name} style={{ background: p.color, border: `1px solid ${p.border}`, borderRadius: 20, padding: 32, position: "relative", overflow: "hidden", transition: "transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>

              {p.tag && (
                <div style={{ position: "absolute", top: 16, right: 16, background: i === 1 ? "#7c3aed" : "#6366f1", color: i === 1 ? "#000" : "#fff", fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 50 }}>
                  {p.tag}
                </div>
              )}

              <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{p.name}</div>

              <div style={{ fontSize: 52, fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 4 }}>£{p.price}</div>
              <div style={{ fontSize: 12, color: "#555", marginBottom: 28 }}>one-time · no expiry</div>

              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: p.accentColor, lineHeight: 1 }}>{p.credits}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>credits = {p.edits} AI generations</div>
              </div>

              <div style={{ fontSize: 11, color: "#444", marginBottom: 24, letterSpacing: "0.04em" }}>
                £{(p.price / p.edits).toFixed(2)} per generation
              </div>

              <button onClick={() => handleBuy(p)} disabled={buying === p.id}
                style={{ width: "100%", padding: "14px 0", background: buying === p.id ? "#333" : i === 1 ? "#7c3aed" : i === 2 ? "#6366f1" : "rgba(255,255,255,0.08)", color: buying === p.id ? "#666" : i === 1 ? "#000" : "#fff", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 50, cursor: buying === p.id ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { if (buying !== p.id) e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                {buying === p.id ? "Processing..." : `Buy ${p.name} — £${p.price}`}
              </button>
            </div>
          ))}
        </div>

        {/* What credits do */}
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 24, letterSpacing: "-0.02em" }}>
            What You Can Do With Credits
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {WHAT.map(w => (
              <div key={w.action} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13, color: "#aaa" }}>{w.action}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", background: "rgba(124,58,237,0.08)", padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 16 }}>
                  {w.credits} credits
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "0 24px 100px" }}>
          <Link href="/create" style={{ display: "inline-block", padding: "15px 40px", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, boxShadow: "0 0 32px rgba(124,58,237,0.25)", transition: "all 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 48px rgba(124,58,237,0.45)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(124,58,237,0.25)")}>
            Try The AI Studio
          </Link>
        </div>

      </div>
    </>
  );
}
