"use client";
import { useState } from "react";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function LoginPage() {
  const [phone, setPhone]     = useState("");
  const [otp, setOtp]         = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    border: "1px solid var(--c-border)", background: "var(--c-bg)",
    fontFamily: F, fontSize: 14, color: "var(--c-text)",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Top logo */}
      <div style={{
        padding: "24px 32px",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: "1px solid var(--c-border)",
      }}>
        <Link href="/" style={{ display: "block", lineHeight: 0 }}>
          <img
            src="/logo.png"
            alt="CrazeFusion"
            className="pk-logo"
            style={{ height: 44, width: "auto", objectFit: "contain", display: "block" }}
          />
        </Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h1 style={{ fontFamily: FO, fontSize: 22, fontWeight: 500, color: "var(--c-text)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "-0.01em" }}>Welcome Back</h1>
            <p style={{ fontFamily: F, fontSize: 13, color: "#aaa", margin: 0 }}>Sign in to continue shopping</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>
                Phone Number
              </label>
              <div style={{ display: "flex" }}>
                <div style={{ padding: "13px 14px", border: "1px solid var(--c-border)", borderRight: "none", background: "var(--c-bg-soft)", fontFamily: F, fontSize: 14, color: "var(--c-text-muted)", flexShrink: 0 }}>+91</div>
                <input type="tel" placeholder="10-digit mobile" value={phone}
                  onChange={e => setPhone(e.target.value)} maxLength={10}
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")} />
              </div>
            </div>

            {!otpSent ? (
              <button onClick={handleSendOtp}
                style={{ width: "100%", padding: "15px 0", background: phone.length >= 10 ? "var(--c-btn-bg)" : "var(--c-bg-soft)", color: phone.length >= 10 ? "var(--c-btn-text)" : "var(--c-text-muted)", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: phone.length >= 10 ? "pointer" : "not-allowed", transition: "background 0.2s", borderRadius: 50 }}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            ) : (
              <>
                <div>
                  <label style={{ display: "block", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Enter OTP</label>
                  <input type="text" placeholder="6-digit OTP" value={otp}
                    onChange={e => setOtp(e.target.value)} maxLength={6}
                    style={{ ...inputStyle, textAlign: "center", fontSize: 20, letterSpacing: "0.3em", fontWeight: 700 }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#111")}
                    onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")} />
                  <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginTop: 6 }}>
                    Sent to +91 {phone}.{" "}
                    <button onClick={() => setOtpSent(false)} style={{ background: "none", border: "none", fontFamily: F, fontSize: 11, color: "var(--c-text)", cursor: "pointer", textDecoration: "underline" }}>Change?</button>
                  </div>
                </div>
                <Link href="/" style={{ display: "block", padding: "15px 0", background: otp.length === 6 ? "#111" : "#e0e0e0", color: otp.length === 6 ? "#fff" : "#aaa", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", pointerEvents: otp.length === 6 ? "auto" : "none" }}>
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
            <span style={{ fontFamily: F, fontSize: 11, color: "#ccc" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "var(--c-border)" }} />
          </div>

          <Link href="/collection" style={{ display: "block", padding: "13px 0", background: "var(--c-bg)", color: "var(--c-text-muted)", border: "1px solid var(--c-border)", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", transition: "all 0.2s", borderRadius: 50 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#111"; (e.currentTarget as HTMLAnchorElement).style.color = "#111"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--c-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "#555"; }}>
            Continue as Guest
          </Link>

          <p style={{ fontFamily: F, fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 20 }}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" style={{ color: "var(--c-text)", fontWeight: 700, textDecoration: "underline" }}>Sign Up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
