"use client";
import { useState } from "react";
import Link from "next/link";
import { registerPartner } from "@/lib/supabase";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px",
  border: "1px solid var(--c-border)", background: "var(--c-bg)",
  fontFamily: FO, fontSize: 14, color: "var(--c-text)",
  outline: "none", boxSizing: "border-box", borderRadius: 4,
};

const TERMS = [
  "I own 100% of all artwork I submit. I will not upload copyrighted or trademarked material.",
  "I understand my account will be removed if I do not submit at least one design within 3 days of approval.",
  "I accept that CrazeFusion reserves the right to reject any design without explanation.",
  "I will earn 30% of the sale price (£11.99) for each order of my approved designs.",
  "Payouts are processed monthly to the payout email I provide.",
  "CrazeFusion handles all printing, packing, and shipping — I have no involvement in fulfilment.",
];

export default function PartnerRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "", bio: "", payout_email: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.payout_email) { setErr("Please fill all fields."); return; }
    if (form.password.length < 8) { setErr("Password must be at least 8 characters."); return; }
    if (!agreed) { setErr("You must agree to the terms and conditions."); return; }
    setLoading(true); setErr("");
    const { error } = await registerPartner(form);
    setLoading(false);
    if (error) { setErr(error); return; }
    setDone(true);
  };

  if (done) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 32 }}>
      <div style={{ width: 56, height: 56, background: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff" }}>✓</div>
      <h2 style={{ fontFamily: FO, fontSize: 24, fontWeight: 700, color: "var(--c-text)", textAlign: "center", margin: 0 }}>Application Submitted!</h2>
      <p style={{ fontFamily: FO, fontSize: 13, color: "#aaa", textAlign: "center", maxWidth: 400, lineHeight: 1.7 }}>
        We&apos;ll review your application and get back to you within 24 hours. Once approved, you&apos;ll have 3 days to submit your first design.
      </p>
      <Link href="/" style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, color: "#e8a000", textDecoration: "underline" }}>Back to store</Link>
    </div>
  );

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: 34 }}>
      <div style={{ padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link href="/partner" style={{ fontFamily: FO, fontSize: 12, color: "#aaa", textDecoration: "none" }}>← Back to Partner Info</Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "0 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h1 style={{ fontFamily: FO, fontSize: 22, fontWeight: 700, color: "var(--c-text)", margin: "0 0 8px", textTransform: "uppercase" }}>Partner Application</h1>
            <p style={{ fontFamily: FO, fontSize: 13, color: "#aaa", margin: 0 }}>Apply to sell your art on our store</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Full Name *</label>
              <input type="text" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} style={inputStyle} />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Email Address *</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Password *</label>
              <input type="password" placeholder="Min 8 characters" value={form.password} onChange={e => set("password", e.target.value)} style={inputStyle} />
            </div>

            {/* Bio */}
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Short Bio</label>
              <textarea placeholder="Tell us about yourself and your art style..." value={form.bio} onChange={e => set("bio", e.target.value)}
                style={{ ...inputStyle, height: 90, resize: "vertical" as const }} />
            </div>

            {/* Payout email */}
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Payout Email (PayPal/Bank) *</label>
              <input type="email" placeholder="Where to send your earnings" value={form.payout_email} onChange={e => set("payout_email", e.target.value)} style={inputStyle} />
              <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", marginTop: 4 }}>We send your 30% earnings here monthly</div>
            </div>

            {/* T&C */}
            <div style={{ border: "1px solid var(--c-border)", borderRadius: 4, padding: "20px", background: "var(--c-bg-soft)" }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 16 }}>Terms & Conditions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {TERMS.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 10 }}>
                    <span style={{ color: "#e8a000", flexShrink: 0, fontWeight: 700, fontSize: 12 }}>→</span>
                    <span style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: FO, fontSize: 12, color: "var(--c-text)", fontWeight: 600 }}>I have read and agree to all terms and conditions above</span>
              </label>
            </div>

            {err && <div style={{ fontFamily: FO, fontSize: 12, color: "#dc2626", padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4 }}>{err}</div>}

            <button onClick={submit} disabled={loading}
              style={{ width: "100%", padding: "16px 0", background: agreed ? "#111" : "#e0e0e0", color: agreed ? "#fff" : "#aaa", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: agreed ? "pointer" : "not-allowed", borderRadius: 50 }}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <p style={{ fontFamily: FO, fontSize: 12, color: "#bbb", textAlign: "center", margin: 0 }}>
              Already a partner?{" "}
              <Link href="/partner/login" style={{ color: "var(--c-text)", fontWeight: 700, textDecoration: "underline" }}>Login here</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
