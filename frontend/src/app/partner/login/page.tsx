"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginPartner } from "@/lib/supabase";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 16px",
  border: "1px solid var(--c-border)", background: "var(--c-bg)",
  fontFamily: FO, fontSize: 14, color: "var(--c-text)",
  outline: "none", boxSizing: "border-box", borderRadius: 4,
};

export default function PartnerLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");

  const login = async () => {
    if (!email || !password) { setErr("Please enter email and password."); return; }
    setLoading(true); setErr("");
    const { partner, error } = await loginPartner(email, password);
    setLoading(false);
    if (error || !partner) { setErr(error ?? "Login failed"); return; }
    if (partner.status === "rejected") { setErr("Your application was not approved."); return; }
    if (partner.status === "removed")  { setErr("Your account has been removed due to inactivity."); return; }
    router.push("/partner/dashboard");
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: 34 }}>
      <div style={{ padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link href="/partner" style={{ fontFamily: FO, fontSize: 12, color: "#aaa", textDecoration: "none" }}>← Back to Partner Info</Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h1 style={{ fontFamily: FO, fontSize: 22, fontWeight: 700, color: "var(--c-text)", margin: "0 0 8px", textTransform: "uppercase" }}>Partner Login</h1>
            <p style={{ fontFamily: FO, fontSize: 13, color: "#aaa", margin: 0 }}>Access your partner dashboard</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Email</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && login()} style={inputStyle} />
            </div>

            {err && <div style={{ fontFamily: FO, fontSize: 12, color: "#dc2626", padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4 }}>{err}</div>}

            <button onClick={login} disabled={loading}
              style={{ width: "100%", padding: "15px 0", background: "#111", color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50, marginTop: 4 }}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={{ fontFamily: FO, fontSize: 12, color: "#bbb", textAlign: "center", margin: 0 }}>
              Not a partner yet?{" "}
              <Link href="/partner/register" style={{ color: "var(--c-text)", fontWeight: 700, textDecoration: "underline" }}>Apply here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
