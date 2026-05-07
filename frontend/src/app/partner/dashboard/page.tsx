"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Partner, PartnerDesign, PartnerSale, getCurrentPartner, logoutPartner, getPartnerDesigns, getPartnerSales, submitDesign } from "@/lib/supabase";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const CATS = ["Cars", "Movies", "Coffee Shop"];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px",
  border: "1px solid var(--c-border)", background: "var(--c-bg)",
  fontFamily: FO, fontSize: 13, color: "var(--c-text)",
  outline: "none", boxSizing: "border-box", borderRadius: 4,
};

const STATUS_COLOUR: Record<string, string> = {
  pending:  "#e8a000",
  approved: "#16a34a",
  rejected: "#dc2626",
  removed:  "#dc2626",
  paid:     "#16a34a",
};

export default function PartnerDashboard() {
  const router = useRouter();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [designs, setDesigns] = useState<PartnerDesign[]>([]);
  const [sales,   setSales]   = useState<PartnerSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState<"designs" | "upload" | "earnings">("designs");

  const [form, setForm]           = useState({ title: "", category: "Cars", image_url: "", price: 11.99 });
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [uploadOk,  setUploadOk]  = useState(false);

  useEffect(() => {
    getCurrentPartner().then(p => {
      if (!p) { router.push("/partner/login"); return; }
      setPartner(p);
      setLoading(false);
      getPartnerDesigns(p.id).then(setDesigns);
      getPartnerSales(p.id).then(setSales);
    });
  }, [router]);

  const logout = async () => {
    await logoutPartner();
    router.push("/partner/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "partner_designs");
    data.append("cloud_name", "dxosc5jfy");
    const res  = await fetch("https://api.cloudinary.com/v1_1/dxosc5jfy/image/upload", { method: "POST", body: data });
    const json = await res.json();
    if (json.secure_url) setForm(f => ({ ...f, image_url: json.secure_url }));
    else setUploadErr("Image upload failed. Please try again.");
  };

  const submitForm = async () => {
    if (!form.title || !form.image_url) { setUploadErr("Please fill title and upload an image."); return; }
    if (!partner) return;
    setUploading(true); setUploadErr("");
    const { error } = await submitDesign(partner.id, form);
    setUploading(false);
    if (error) { setUploadErr(error); return; }
    setUploadOk(true);
    setForm({ title: "", category: "Cars", image_url: "", price: 11.99 });
    getPartnerDesigns(partner.id).then(setDesigns);
    setTimeout(() => setUploadOk(false), 3000);
  };

  const totalEarned  = sales.reduce((s, x) => s + Number(x.partner_cut), 0);
  const totalPaid    = sales.filter(s => s.paid_out).reduce((s, x) => s + Number(x.partner_cut), 0);
  const totalPending = totalEarned - totalPaid;

  const statusBadge = (s: string) => (
    <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: STATUS_COLOUR[s] ?? "#aaa", background: `${STATUS_COLOUR[s] ?? "#aaa"}18`, padding: "3px 10px", borderRadius: 50 }}>{s}</span>
  );

  if (loading) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: FO, fontSize: 13, color: "#aaa" }}>Loading...</div>
    </div>
  );

  if (!partner) return null;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>

      {/* Top bar */}
      <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{partner.name}</span>
            <span style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginLeft: 10 }}>Partner Dashboard</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {statusBadge(partner.status)}
            <button onClick={logout} style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#aaa", background: "none", border: "none", cursor: "pointer" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px" }}>

        {partner.status === "pending" && (
          <div style={{ padding: "16px 20px", background: "rgba(232,160,0,0.08)", border: "1px solid rgba(232,160,0,0.3)", borderRadius: 4, marginBottom: 32, fontFamily: FO, fontSize: 13, color: "#e8a000" }}>
            ⏳ Your application is under review. We&apos;ll approve it within 24 hours. You must submit your first design within 3 days of approval.
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }} className="dash-stats">
          {[
            ["Total Designs", designs.length],
            ["Live in Store", designs.filter(d => d.status === "approved").length],
            ["Total Sales",   sales.length],
            ["Earnings",      `£${totalEarned.toFixed(2)}`],
          ].map(([label, val]) => (
            <div key={label as string} style={{ padding: "24px 20px", border: "1px solid var(--c-border)", background: "var(--c-bg-soft)", borderRadius: 4 }}>
              <div style={{ fontFamily: FO, fontSize: 24, fontWeight: 700, color: "var(--c-text)" }}>{val}</div>
              <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--c-border)", marginBottom: 32 }}>
          {(["designs", "upload", "earnings"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 24px", background: "none", border: "none", borderBottom: tab === t ? "2px solid var(--c-text)" : "2px solid transparent", color: tab === t ? "var(--c-text)" : "#aaa", cursor: "pointer" }}>
              {t === "designs" ? "My Designs" : t === "upload" ? "Upload New" : "Earnings"}
            </button>
          ))}
        </div>

        {/* Designs */}
        {tab === "designs" && (
          designs.length === 0
            ? <div style={{ textAlign: "center", padding: "64px 32px", color: "#aaa", fontFamily: FO, fontSize: 13 }}>
                No designs yet.{" "}
                <button onClick={() => setTab("upload")} style={{ color: "#e8a000", background: "none", border: "none", cursor: "pointer", fontFamily: FO, fontSize: 13, textDecoration: "underline" }}>Upload your first design →</button>
              </div>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="designs-grid">
                {designs.map(d => (
                  <div key={d.id} style={{ border: "1px solid var(--c-border)", background: "var(--c-bg-soft)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ aspectRatio: "3/4", background: "var(--c-bg)", overflow: "hidden" }}>
                      <img src={d.image_url} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "16px" }}>
                      <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>{d.title}</div>
                      <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginBottom: 10 }}>{d.category}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {statusBadge(d.status)}
                        <span style={{ fontFamily: FO, fontSize: 12, color: "#16a34a", fontWeight: 700 }}>£{Number(d.price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        )}

        {/* Upload */}
        {tab === "upload" && (
          <div style={{ maxWidth: 520 }}>
            {partner.status !== "approved"
              ? <div style={{ padding: "20px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4, fontFamily: FO, fontSize: 13, color: "#dc2626" }}>
                  You can only upload designs once your application is approved.
                </div>
              : <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Design Title *</label>
                    <input type="text" placeholder="e.g. Ferrari F40 Vintage Poster" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Category *</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-muted)", marginBottom: 6 }}>Upload Artwork *</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text)" }} />
                    <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", marginTop: 4 }}>Minimum 2000×2800px. JPG or PNG.</div>
                    {form.image_url && (
                      <div style={{ marginTop: 12, width: 120, aspectRatio: "3/4", overflow: "hidden", borderRadius: 4, border: "1px solid var(--c-border)" }}>
                        <img src={form.image_url} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                  </div>

                  {uploadErr && <div style={{ fontFamily: FO, fontSize: 12, color: "#dc2626", padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 4 }}>{uploadErr}</div>}
                  {uploadOk  && <div style={{ fontFamily: FO, fontSize: 12, color: "#16a34a", padding: "10px 14px", background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 4 }}>Design submitted! We&apos;ll review it within 24 hours.</div>}

                  <button onClick={submitForm} disabled={uploading}
                    style={{ padding: "14px 0", background: "#111", color: "#fff", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
                    {uploading ? "Submitting..." : "Submit for Review"}
                  </button>
                </div>
            }
          </div>
        )}

        {/* Earnings */}
        {tab === "earnings" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }} className="earn-stats">
              {[["Total Earned", `£${totalEarned.toFixed(2)}`], ["Paid Out", `£${totalPaid.toFixed(2)}`], ["Pending Payout", `£${totalPending.toFixed(2)}`]].map(([label, val]) => (
                <div key={label} style={{ padding: "24px 20px", border: "1px solid var(--c-border)", background: "var(--c-bg-soft)", borderRadius: 4, textAlign: "center" }}>
                  <div style={{ fontFamily: FO, fontSize: 28, fontWeight: 700, color: label === "Pending Payout" ? "#e8a000" : "var(--c-text)" }}>{val}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
            {sales.length === 0
              ? <div style={{ textAlign: "center", padding: "40px", color: "#aaa", fontFamily: FO, fontSize: 13 }}>No sales yet. Keep creating!</div>
              : <div style={{ border: "1px solid var(--c-border)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 80px", padding: "12px 16px", background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)" }}>
                    {["Design", "Date", "Your Cut", "Status"].map(h => (
                      <div key={h} style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>{h}</div>
                    ))}
                  </div>
                  {sales.map(s => (
                    <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 80px", padding: "14px 16px", borderBottom: "1px solid var(--c-border)" }}>
                      <div style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text)" }}>{s.design_title ?? "—"}</div>
                      <div style={{ fontFamily: FO, fontSize: 12, color: "#aaa" }}>{new Date(s.created_at).toLocaleDateString("en-GB")}</div>
                      <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "#16a34a" }}>£{Number(s.partner_cut).toFixed(2)}</div>
                      <div>{statusBadge(s.paid_out ? "paid" : "pending")}</div>
                    </div>
                  ))}
                </div>
            }
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .designs-grid { grid-template-columns: 1fr 1fr !important; }
          .earn-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
