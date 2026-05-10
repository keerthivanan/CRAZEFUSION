"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import BorderGlow from "@/components/reactbits/BorderGlow";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const CLOUD  = "dxosc5jfy";
const PRESET = "partner_designs";

const STYLES = [
  "Dark & Moody", "Minimalist", "Neon Glow", "Vintage Film",
  "Cinematic", "Watercolour", "Abstract", "Luxury Gold",
];

const EXAMPLES = [
  "Ferrari F40 in rain, neon reflections, cinematic dark",
  "Dark academia library at midnight, warm candlelight",
  "Tokyo street food alley, steam rising, golden hour",
  "Minimal black and white mountain landscape",
  "Astronaut floating above neon city",
  "Vintage coffee shop Paris 1960s",
];

// Sample images shown in empty state
const SAMPLE_IMGS = [
  "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp",
  "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp",
  "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp",
];

type Partner   = { id: string; email: string };
type PubStep   = "idle" | "auth" | "details" | "uploading" | "done";
type AuthMode  = "register" | "login";

export default function CreatePage() {
  const { addItem }  = useCart();

  // Generation
  const [mode, setMode]         = useState<"generate"|"edit">("generate");
  const [prompt, setPrompt]     = useState("");
  const [style, setStyle]       = useState<string|null>(null);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<string|null>(null);
  const [error, setError]       = useState("");
  const [added, setAdded]       = useState(false);
  const [uploadedImg, setUpImg] = useState<string|null>(null);
  const [uploadName, setUpName] = useState("");
  const fileRef                 = useRef<HTMLInputElement>(null);

  // Publish
  const [partner, setPartner]         = useState<Partner|null>(null);
  const [pubStep, setPubStep]         = useState<PubStep>("idle");
  const [pubTitle, setPubTitle]       = useState("");
  const [pubErr, setPubErr]           = useState("");
  const [sales, setSales]             = useState(10);

  // Auth
  const [authMode, setAuthMode]       = useState<AuthMode>("register");
  const [aName, setAName]             = useState("");
  const [aEmail, setAEmail]           = useState("");
  const [aPass, setAPass]             = useState("");
  const [aPayout, setAPayout]         = useState("");
  const [aLoading, setALoading]       = useState(false);
  const [aErr, setAErr]               = useState("");

  const [credits, setCredits] = useState<number | string>("—");

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setPartner({ id: user.id, email: user.email ?? "" });
        // Fetch real credit balance
        fetch(`/api/credits/balance?userId=${user.id}`)
          .then(r => r.json())
          .then(d => setCredits(d.balance ?? 0))
          .catch(() => setCredits("—"));
      }
    })();
  }, []);

  const fullPrompt = style ? `${prompt}. Style: ${style}` : prompt;

  const handleGenerate = async () => {
    if (!prompt.trim()) { setError("Describe your poster first."); return; }
    if (mode === "edit" && !uploadedImg) { setError("Upload a poster to edit first."); return; }
    setError(""); setLoading(true); setResult(null); setPubStep("idle");
    try {
      const res  = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt, imageUrl: uploadedImg, mode, userId: partner?.id }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        // If insufficient credits, show the credits page link
        if (data.insufficientCredits) setError(data.error + " — Buy more credits below.");
      } else {
        setResult(data.image);
        // Refresh credit balance after successful generation
        if (partner?.id) {
          fetch(`/api/credits/balance?userId=${partner.id}`)
            .then(r => r.json())
            .then(d => setCredits(d.balance ?? 0))
            .catch(() => {});
        }
      }
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUpName(file.name);
    const r = new FileReader();
    r.onload = ev => setUpImg(ev.target?.result as string);
    r.readAsDataURL(file);
  };

  const handleAddToCart = () => {
    if (!result) return;
    // Use "ai" prefix flagged type so checkout handles it separately (no product_id lookup)
    addItem({ id: "ai", title: prompt.slice(0, 50) || "AI Generated Poster", sub: "AI Studio", img: result, price: 19.99, original: 19.99, size: "A4 (21×30cm)", finish: "Matte" });
    setAdded(true); setTimeout(() => setAdded(false), 2000);
  };

  const handleAuth = async () => {
    setAErr(""); setALoading(true);
    if (authMode === "register") {
      if (!aName.trim() || !aEmail.trim() || aPass.length < 8) { setAErr("Name, email and password (min 8 chars) required."); setALoading(false); return; }
      const { data, error } = await supabase.auth.signUp({ email: aEmail, password: aPass, options: { data: { name: aName, payout_email: aPayout || aEmail } } });
      if (error) { setAErr(error.message); setALoading(false); return; }
      if (data.user) {
        await supabase.from("partners").insert({ id: data.user.id, email: aEmail, name: aName, password_hash: "supabase_auth", payout_email: aPayout || aEmail });
        setPartner({ id: data.user.id, email: aEmail }); setPubStep("details");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email: aEmail, password: aPass });
      if (error) { setAErr("Invalid email or password."); setALoading(false); return; }
      if (data.user) { setPartner({ id: data.user.id, email: aEmail }); setPubStep("details"); }
    }
    setALoading(false);
  };

  const handlePublish = async () => {
    if (!result || !pubTitle.trim()) { setPubErr("Give your poster a title."); return; }
    if (!partner) { setPubStep("auth"); return; }
    setPubStep("uploading"); setPubErr("");
    try {
      const blob = await fetch(result).then(r => r.blob());
      const fd   = new FormData();
      fd.append("file", blob); fd.append("upload_preset", PRESET); fd.append("cloud_name", CLOUD);
      const cd   = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd }).then(r => r.json());
      if (!cd.secure_url) throw new Error("Image upload failed");
      const { error: dbErr } = await supabase.from("partner_designs").insert({ partner_id: partner.id, title: pubTitle.trim(), description: prompt, img: cd.secure_url, price: 19.99, sales: 0, earnings: 0 });
      if (dbErr) throw new Error(dbErr.message);
      setPubStep("done");
    } catch (e: any) { setPubErr(e.message ?? "Publish failed."); setPubStep("details"); }
  };

  const iF = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "#7c3aed");
  const iB = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");
  const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontFamily: FO, fontSize: 13, color: "#fff", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" };

  const earnings = (sales * 19.99 * 0.3).toFixed(0);

  return (
    <>
      <Navbar />
      <div style={{ background: "#080808", minHeight: "100vh", fontFamily: FO }}>

        {/* ── HERO STRIP ── */}
        <div style={{ background: "linear-gradient(to right, rgba(124,58,237,0.06), transparent, rgba(99,102,241,0.04))", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingTop: 92 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 0" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 12 }}>AI Poster Studio</div>
                <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                  Generate. Sell. Earn.
                </h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "12px 0 0", maxWidth: 480, lineHeight: 1.7 }}>
                  Describe any poster. AI generates it in seconds. Publish it to the shop and earn 30% every time someone buys it.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                {partner && <span style={{ fontSize: 11, color: "#555" }}>{partner.email}</span>}
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 50, padding: "8px 16px" }}>
                  <span style={{ fontSize: 10, color: "#7c3aed", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Credits</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#7c3aed" }}>{credits}</span>
                </div>
                <Link href="/credits" style={{ padding: "9px 20px", background: "rgba(255,255,255,0.06)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
                  Buy Credits
                </Link>
              </div>
            </div>

            {/* Earnings teaser strip */}
            <div style={{ display: "flex", gap: 24, paddingBottom: 32, flexWrap: "wrap" }}>
              {[["£6.00", "per sale you make"], ["30%", "commission rate"], ["Free", "to publish"], ["Auto", "prints & ships"]].map(([val, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: val === "Free" || val === "Auto" ? "#fff" : "#7c3aed" }}>{val}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="create-grid">

          {/* LEFT — Controls */}
          <div>

            {/* Mode tabs */}
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4, marginBottom: 28, width: "fit-content" }}>
              {[{ id: "generate", label: "Generate New" }, { id: "edit", label: "Edit a Poster" }].map(m => (
                <button key={m.id} onClick={() => { setMode(m.id as "generate"|"edit"); setResult(null); setError(""); setPubStep("idle"); }}
                  style={{ padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", transition: "all 0.2s", background: mode === m.id ? "#fff" : "transparent", color: mode === m.id ? "#000" : "#666" }}>
                  {m.label}
                </button>
              ))}
            </div>

            {/* Upload (edit mode) */}
            {mode === "edit" && (
              <div style={{ marginBottom: 20 }}>
                <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px", cursor: "pointer", textAlign: "center", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}>
                  {uploadedImg
                    ? <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={uploadedImg} alt="" style={{ width: 56, height: 75, objectFit: "cover", borderRadius: 6 }} />
                        <div style={{ textAlign: "left" }}><div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{uploadName}</div><div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Click to change</div></div>
                      </div>
                    : <><div style={{ fontSize: 12, fontWeight: 700, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase" }}>Upload Poster to Edit</div><div style={{ fontSize: 11, color: "#333", marginTop: 4 }}>JPG, PNG, WEBP — max 10MB</div></>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
              </div>
            )}

            {/* Prompt box */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", marginBottom: 4, transition: "border-color 0.2s" }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
              onBlurCapture={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}>
              <textarea value={prompt} onChange={e => { setPrompt(e.target.value); setError(""); }}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                placeholder={mode === "generate" ? "Describe your poster... e.g. Ferrari F40 in neon rain, dark cinematic mood" : "How should this poster be edited?"}
                style={{ width: "100%", minHeight: 130, background: "transparent", border: "none", outline: "none", resize: "none", fontFamily: FO, fontSize: 14, color: "#fff", padding: "22px 22px 10px", boxSizing: "border-box", lineHeight: 1.75 }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px 16px" }}>
                <span style={{ fontSize: 11, color: "#333", letterSpacing: "0.04em" }}>5 credits per generation</span>
                <button onClick={handleGenerate} disabled={loading || !prompt.trim()}
                  style={{ padding: "11px 28px", background: loading ? "#1a1a1a" : "#7c3aed", color: loading ? "#555" : "#000", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 50, cursor: loading || !prompt.trim() ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8, boxShadow: loading || !prompt.trim() ? "none" : "0 0 20px rgba(124,58,237,0.3)" }}>
                  {loading ? <><span style={{ width: 13, height: 13, border: "2px solid #555", borderTopColor: "#7c3aed", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />Generating...</> : mode === "generate" ? "Generate" : "Edit Poster"}
                </button>
              </div>
            </div>

            {error && <div style={{ fontSize: 12, color: "#f87171", margin: "10px 0", padding: "10px 14px", background: "rgba(248,113,113,0.07)", borderRadius: 10, border: "1px solid rgba(248,113,113,0.15)" }}>{error}</div>}

            {/* Style chips */}
            <div style={{ marginTop: 24, marginBottom: 28 }}>
              <div style={{ fontSize: 10, color: "#444", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Quick Style</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STYLES.map(s => (
                  <button key={s} onClick={() => setStyle(style === s ? null : s)}
                    style={{ padding: "7px 14px", borderRadius: 50, border: `1px solid ${style === s ? "#7c3aed" : "rgba(255,255,255,0.08)"}`, background: style === s ? "rgba(124,58,237,0.1)" : "transparent", color: style === s ? "#7c3aed" : "#666", fontFamily: FO, fontSize: 11, fontWeight: style === s ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Example prompts */}
            <div>
              <div style={{ fontSize: 10, color: "#444", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Tap to Try</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {EXAMPLES.map(ex => (
                  <button key={ex} onClick={() => setPrompt(ex)}
                    style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)", color: "#666", fontFamily: FO, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)"; e.currentTarget.style.color = "#bbb"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#666"; }}>
                    "{ex}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Preview + Actions */}
          <div style={{ position: "sticky", top: 100 }}>

            {/* Preview panel */}
            <div style={{ borderRadius: 24, overflow: "hidden", marginBottom: 16, aspectRatio: "3/4", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

              {loading && (
                <div style={{ position: "absolute", inset: 0, background: "#080808", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                  <div style={{ position: "relative", width: 80, height: 80, marginBottom: 24 }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(124,58,237,0.1)", animation: "ripple 1.5s ease-out infinite" }} />
                    <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "2px solid rgba(124,58,237,0.15)", animation: "ripple 1.5s ease-out 0.5s infinite" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 36, height: 36, border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 600, marginBottom: 6 }}>Generating your poster</div>
                  <div style={{ fontSize: 11, color: "#333", letterSpacing: "0.06em" }}>Takes 10 — 20 seconds</div>
                </div>
              )}

              {result && !loading && (
                <img src={result} alt="Generated poster" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeIn 0.5s ease" }} />
              )}

              {!result && !loading && (
                <>
                  {/* Show sample posters in a 3-way grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: "100%", width: "100%", filter: "brightness(0.35)" }}>
                    {SAMPLE_IMGS.map((src, i) => (
                      <img key={i} src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ))}
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Your Poster Appears Here</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>Describe it on the left</div>
                  </div>
                </>
              )}
            </div>

            {/* ── IDLE ACTIONS ── */}
            {result && pubStep === "idle" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={handleAddToCart}
                  style={{ width: "100%", padding: "16px 0", background: added ? "#16a34a" : "#7c3aed", color: "#000", fontFamily: FO, fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 50, cursor: "pointer", transition: "all 0.2s", boxShadow: added ? "none" : "0 0 28px rgba(124,58,237,0.25)" }}>
                  {added ? "Added to Cart" : "Buy This Poster — £19.99"}
                </button>
                <button onClick={() => partner ? setPubStep("details") : setPubStep("auth")}
                  style={{ width: "100%", padding: "15px 0", background: "transparent", color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.color = "#7c3aed"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#fff"; }}>
                  Publish to Shop — Earn 30%
                </button>
                <button onClick={handleGenerate}
                  style={{ width: "100%", padding: "12px 0", background: "transparent", color: "#444", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 50, cursor: "pointer", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#777")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                  Regenerate (5 credits)
                </button>
              </div>
            )}

            {/* ── AUTH STEP ── */}
            {pubStep === "auth" && (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                  {authMode === "register" ? "Create a free account" : "Log in to publish"}
                </div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 20, lineHeight: 1.6 }}>
                  Earn £6.00 every time your poster sells. Only takes 30 seconds.
                </div>
                <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, marginBottom: 16 }}>
                  {(["register", "login"] as const).map(m => (
                    <button key={m} onClick={() => { setAuthMode(m); setAErr(""); }}
                      style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: FO, fontSize: 12, fontWeight: 700, transition: "all 0.2s", background: authMode === m ? "#fff" : "transparent", color: authMode === m ? "#000" : "#555" }}>
                      {m === "register" ? "New Account" : "Login"}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {authMode === "register" && (
                    <>
                      <input placeholder="Your name" value={aName} onChange={e => setAName(e.target.value)} style={inp} onFocus={iF} onBlur={iB} />
                      <input placeholder="Payout email (where to send earnings)" value={aPayout} onChange={e => setAPayout(e.target.value)} style={inp} onFocus={iF} onBlur={iB} />
                    </>
                  )}
                  <input type="email" placeholder="Email address" value={aEmail} onChange={e => setAEmail(e.target.value)} style={inp} onFocus={iF} onBlur={iB} />
                  <input type="password" placeholder="Password (min 8 chars)" value={aPass} onChange={e => setAPass(e.target.value)} style={inp} onFocus={iF} onBlur={iB} />
                </div>
                {aErr && <div style={{ fontSize: 11, color: "#f87171", marginTop: 10 }}>{aErr}</div>}
                <button onClick={handleAuth} disabled={aLoading}
                  style={{ width: "100%", padding: "14px 0", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 50, cursor: "pointer", marginTop: 14, opacity: aLoading ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  {aLoading ? "Please wait..." : authMode === "register" ? "Create Account" : "Log In"}
                </button>
                <button onClick={() => setPubStep("idle")} style={{ width: "100%", padding: "9px 0", background: "transparent", color: "#444", fontFamily: FO, fontSize: 11, border: "none", cursor: "pointer", marginTop: 6, letterSpacing: "0.06em" }}>
                  Cancel
                </button>
              </div>
            )}

            {/* ── PUBLISH DETAILS ── */}
            {pubStep === "details" && (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Name your poster</div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 20 }}>This is what customers see in the shop</div>
                <input placeholder="e.g. Neon Ferrari in the Rain" value={pubTitle} onChange={e => setPubTitle(e.target.value)} style={{ ...inp, marginBottom: 16 }} onFocus={iF} onBlur={iB}
                  onKeyDown={e => { if (e.key === "Enter") handlePublish(); }} />

                {/* Earnings calculator */}
                <BorderGlow backgroundColor="#0a0814" borderRadius={14} colors={["#c084fc", "#f472b6", "#38bdf8"]} glowColor="270 70 70" glowIntensity={1} glowRadius={32} edgeSensitivity={25} coneSpread={30} animated={false} className="mb-4">
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 12 }}>Earnings Calculator</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: "#555" }}>If {sales} people buy this:</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#16a34a" }}>£{earnings}</span>
                    </div>
                    <input type="range" min={1} max={100} value={sales} onChange={e => setSales(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "#7c3aed" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                      <span style={{ fontSize: 10, color: "#333" }}>Sale price: £19.99</span>
                      <span style={{ fontSize: 10, color: "#333" }}>Your cut: 30% = £6.00</span>
                    </div>
                  </div>
                </BorderGlow>

                {pubErr && <div style={{ fontSize: 11, color: "#f87171", marginBottom: 10 }}>{pubErr}</div>}

                <button onClick={handlePublish}
                  style={{ width: "100%", padding: "15px 0", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRadius: 50, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 0 24px rgba(124,58,237,0.25)" }}>
                  Publish to Shop
                </button>
                <button onClick={() => setPubStep("idle")} style={{ width: "100%", padding: "9px 0", background: "transparent", color: "#444", fontFamily: FO, fontSize: 11, border: "none", cursor: "pointer", marginTop: 6, letterSpacing: "0.06em" }}>
                  Cancel
                </button>
              </div>
            )}

            {/* ── UPLOADING ── */}
            {pubStep === "uploading" && (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, textAlign: "center" }}>
                <div style={{ width: 40, height: 40, border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
                <div style={{ fontSize: 13, color: "#aaa", fontWeight: 600 }}>Publishing your poster...</div>
                <div style={{ fontSize: 11, color: "#333", marginTop: 6 }}>Uploading to the shop</div>
              </div>
            )}

            {/* ── DONE ── */}
            {pubStep === "done" && (
              <div style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.08), rgba(22,163,74,0.04))", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                <div style={{ width: 52, height: 52, background: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22, color: "#fff", fontWeight: 800 }}>✓</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Live in the Shop</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
                  Your poster is live. You earn <strong style={{ color: "#16a34a" }}>£6.00</strong> every time someone buys it — automatically.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link href="/collection" style={{ display: "block", padding: "13px 0", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50 }}>
                    View in Shop
                  </Link>
                  <button onClick={() => { setResult(null); setPrompt(""); setPubStep("idle"); setPubTitle(""); }}
                    style={{ padding: "12px 0", background: "transparent", color: "#555", fontFamily: FO, fontSize: 11, fontWeight: 700, border: "1px solid rgba(255,255,255,0.06)", borderRadius: 50, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Create Another
                  </button>
                </div>
              </div>
            )}

            {/* Info card — only before first generation */}
            {!result && !loading && (
              <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { title: "Generate", body: "Describe any poster. AI creates it.", icon: "✦" },
                  { title: "Buy", body: "Order it printed. Delivered in 2–4 days.", icon: "◈" },
                  { title: "Publish", body: "List it in the shop for free.", icon: "◉" },
                  { title: "Earn", body: "Get £6 every time it sells.", icon: "⬡" },
                ].map(c => (
                  <BorderGlow
                    key={c.title}
                    backgroundColor="#0d0d10"
                    borderRadius={14}
                    colors={["#c084fc", "#f472b6", "#38bdf8"]}
                    glowColor="270 70 70"
                    glowIntensity={1}
                    glowRadius={32}
                    edgeSensitivity={25}
                    coneSpread={30}
                    animated={false}
                  >
                    <div style={{ padding: "16px 14px" }}>
                      <div style={{ fontSize: 16, marginBottom: 6, opacity: 0.7 }}>{c.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>{c.body}</div>
                    </div>
                  </BorderGlow>
                ))}
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes spin    { to { transform: rotate(360deg); } }
          @keyframes fadeIn  { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
          @keyframes ripple  { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @media (max-width: 860px) {
            .create-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}
