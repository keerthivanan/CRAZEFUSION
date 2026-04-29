"use client";
import { useState } from "react";
import Link from "next/link";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1200);
  };

  const inputStyle = (val: string) => ({
    width: "100%",
    padding: "13px 16px",
    border: `1px solid ${val ? "#111" : "#e0e0e0"}`,
    background: "#fff",
    fontFamily: F,
    fontSize: 14,
    color: "#111",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box" as const,
  });

  return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Minimal Nav */}
      <header style={{ borderBottom: "1px solid #f0f0f0", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", textDecoration: "none" }}>
          POSTER<span style={{ color: "#e8a000" }}>KING</span>
        </Link>
        <Link href="/collection" style={{ fontFamily: F, fontSize: 11, color: "#888", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Browse Collection →
        </Link>
      </header>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: FE, fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", marginBottom: 8 }}>
              POSTER<span style={{ color: "#e8a000" }}>KING</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 13, color: "#aaa" }}>
              {tab === "login" ? "Welcome back! Sign in to continue." : "Create your account to start shopping."}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", marginBottom: 32, border: "1px solid #f0f0f0", overflow: "hidden" }}>
            {(["login", "signup"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ flex: 1, padding: "12px 0", background: tab === t ? "#111" : "#fff", color: tab === t ? "#fff" : "#aaa", fontFamily: F, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s" }}>
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tab === "signup" && (
              <div>
                <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 6 }}>Full Name</label>
                <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={inputStyle(name)} />
              </div>
            )}

            {tab === "signup" && (
              <div>
                <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 6 }}>Email (optional)</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle(email)} />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 6 }}>
                Phone Number
              </label>
              <div style={{ display: "flex", gap: 0 }}>
                <div style={{ padding: "13px 14px", border: "1px solid #e0e0e0", borderRight: "none", background: "#f9f9f9", fontFamily: F, fontSize: 14, color: "#555", flexShrink: 0 }}>+91</div>
                <input type="tel" placeholder="10-digit mobile number" value={phone} onChange={e => setPhone(e.target.value)} maxLength={10}
                  style={{ ...inputStyle(phone), flex: 1 }} />
              </div>
            </div>

            {!otpSent ? (
              <button onClick={handleSendOtp}
                style={{ width: "100%", padding: "15px 0", background: phone.length >= 10 ? "#111" : "#e0e0e0", color: phone.length >= 10 ? "#fff" : "#aaa", fontFamily: F, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: phone.length >= 10 ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
                {loading ? "Sending OTP..." : "Send OTP →"}
              </button>
            ) : (
              <>
                <div>
                  <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: 6 }}>Enter OTP</label>
                  <input type="text" placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6}
                    style={{ ...inputStyle(otp), textAlign: "center", fontSize: 22, fontFamily: FE, letterSpacing: "0.3em", fontWeight: 900 }} />
                  <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginTop: 8 }}>
                    OTP sent to +91 {phone}.&nbsp;
                    <button onClick={() => setOtpSent(false)} style={{ background: "none", border: "none", fontFamily: F, fontSize: 11, color: "#111", cursor: "pointer", textDecoration: "underline" }}>Change?</button>
                  </div>
                </div>
                <Link href="/"
                  style={{ display: "block", width: "100%", padding: "15px 0", background: otp.length === 6 ? "#111" : "#e0e0e0", color: otp.length === 6 ? "#fff" : "#aaa", fontFamily: F, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", cursor: otp.length === 6 ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
                  {tab === "login" ? "Sign In ✓" : "Create Account ✓"}
                </Link>
              </>
            )}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
            <span style={{ fontFamily: F, fontSize: 11, color: "#ccc", letterSpacing: "0.05em" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
          </div>

          {/* Guest */}
          <Link href="/collection"
            style={{ display: "block", width: "100%", padding: "13px 0", background: "#fff", color: "#555", border: "1px solid #e0e0e0", fontFamily: F, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", transition: "all 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#111"; (e.currentTarget as HTMLAnchorElement).style.color = "#111"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e0e0e0"; (e.currentTarget as HTMLAnchorElement).style.color = "#555"; }}>
            Continue as Guest
          </Link>

          {/* Terms */}
          <p style={{ fontFamily: F, fontSize: 11, color: "#ccc", textAlign: "center", marginTop: 20, lineHeight: 1.6 }}>
            By continuing, you agree to our{" "}
            <Link href="/collection" style={{ color: "#aaa", textDecoration: "underline" }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/collection" style={{ color: "#aaa", textDecoration: "underline" }}>Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Trust Footer */}
      <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 32px", display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
        {["Secured by Razorpay", "4.9 Rating", "Free Delivery on Prepaid", "7-Day Returns"].map(t => (
          <span key={t} style={{ fontFamily: F, fontSize: 11, color: "#aaa" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
