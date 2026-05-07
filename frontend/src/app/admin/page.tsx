"use client";
import { useEffect, useState } from "react";
import { Partner, PartnerDesign, adminGetPartners, adminGetDesigns, adminUpdatePartner, adminUpdateDesign, adminRemoveInactivePartners } from "@/lib/supabase";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const ADMIN_PASSWORD = "crazefusion2026";

const STATUS_COLOUR: Record<string, string> = {
  pending:  "#e8a000",
  approved: "#16a34a",
  rejected: "#dc2626",
  removed:  "#888",
  paid:     "#16a34a",
};

export default function AdminPanel() {
  const [authed, setAuthed]       = useState(false);
  const [pw, setPw]               = useState("");
  const [pwErr, setPwErr]         = useState("");

  const [tab, setTab]             = useState<"partners" | "designs">("partners");
  const [partners, setPartners]   = useState<Partner[]>([]);
  const [designs,  setDesigns]    = useState<PartnerDesign[]>([]);
  const [loading,  setLoading]    = useState(false);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); }
    else setPwErr("Wrong password.");
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    Promise.all([adminGetPartners(), adminGetDesigns()]).then(([p, d]) => {
      setPartners(p); setDesigns(d); setLoading(false);
    });
  }, [authed]);

  const updatePartner = async (id: string, status: Partner["status"]) => {
    await adminUpdatePartner(id, status);
    setPartners(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const updateDesign = async (id: string, status: PartnerDesign["status"]) => {
    await adminUpdateDesign(id, status);
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const removeInactive = async () => {
    await adminRemoveInactivePartners();
    const updated = await adminGetPartners();
    setPartners(updated);
  };

  const statusBadge = (s: string) => (
    <span style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: STATUS_COLOUR[s] ?? "#aaa", background: `${STATUS_COLOUR[s] ?? "#aaa"}18`, padding: "3px 10px", borderRadius: 50 }}>{s}</span>
  );

  const btn = (label: string, onClick: () => void, color = "#111") => (
    <button onClick={onClick}
      style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 14px", background: color, color: "#fff", border: "none", cursor: "pointer", borderRadius: 50 }}>
      {label}
    </button>
  );

  if (!authed) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 360, padding: 32 }}>
        <h1 style={{ fontFamily: FO, fontSize: 20, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>Admin Access</h1>
        <input type="password" placeholder="Admin password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width: "100%", padding: "13px 16px", border: "1px solid var(--c-border)", background: "var(--c-bg)", fontFamily: FO, fontSize: 14, color: "var(--c-text)", outline: "none", boxSizing: "border-box", borderRadius: 4, marginBottom: 12 }} />
        {pwErr && <div style={{ fontFamily: FO, fontSize: 12, color: "#dc2626", marginBottom: 12 }}>{pwErr}</div>}
        <button onClick={login}
          style={{ width: "100%", padding: "14px 0", background: "#111", color: "#fff", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
          Enter Admin
        </button>
      </div>
    </div>
  );

  const pendingPartners = partners.filter(p => p.status === "pending").length;
  const pendingDesigns  = designs.filter(d => d.status === "pending").length;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>

      {/* Top bar */}
      <div style={{ background: "#111", padding: "0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</div>
          <div style={{ display: "flex", gap: 24 }}>
            {pendingPartners > 0 && <span style={{ fontFamily: FO, fontSize: 11, color: "#e8a000" }}>⚠ {pendingPartners} partner{pendingPartners > 1 ? "s" : ""} pending</span>}
            {pendingDesigns  > 0 && <span style={{ fontFamily: FO, fontSize: 11, color: "#e8a000" }}>⚠ {pendingDesigns} design{pendingDesigns > 1 ? "s" : ""} pending</span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 40 }}>
          {[
            ["Total Partners", partners.length],
            ["Approved",       partners.filter(p => p.status === "approved").length],
            ["Total Designs",  designs.length],
            ["Live Designs",   designs.filter(d => d.status === "approved").length],
          ].map(([label, val]) => (
            <div key={label as string} style={{ padding: "24px 20px", border: "1px solid var(--c-border)", background: "var(--c-bg-soft)", borderRadius: 4, textAlign: "center" }}>
              <div style={{ fontFamily: FO, fontSize: 28, fontWeight: 700, color: "var(--c-text)" }}>{val}</div>
              <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          <button onClick={removeInactive}
            style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", cursor: "pointer", borderRadius: 50 }}>
            Remove Inactive Partners (3-day rule)
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--c-border)", marginBottom: 32 }}>
          {(["partners", "designs"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 28px", background: "none", border: "none", borderBottom: tab === t ? "2px solid var(--c-text)" : "2px solid transparent", color: tab === t ? "var(--c-text)" : "#aaa", cursor: "pointer" }}>
              {t === "partners" ? `Partners ${pendingPartners > 0 ? `(${pendingPartners} pending)` : ""}` : `Designs ${pendingDesigns > 0 ? `(${pendingDesigns} pending)` : ""}`}
            </button>
          ))}
        </div>

        {loading && <div style={{ fontFamily: FO, fontSize: 13, color: "#aaa", textAlign: "center", padding: 40 }}>Loading...</div>}

        {/* Partners tab */}
        {!loading && tab === "partners" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--c-border)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 120px 130px 160px", padding: "12px 20px", background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)" }}>
              {["Name / Email", "Applied", "Designs", "Status", "Actions"].map(h => (
                <div key={h} style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa" }}>{h}</div>
              ))}
            </div>
            {partners.length === 0 && <div style={{ padding: "32px 20px", fontFamily: FO, fontSize: 13, color: "#aaa", textAlign: "center" }}>No partners yet.</div>}
            {partners.map(p => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 180px 120px 130px 160px", padding: "16px 20px", borderBottom: "1px solid var(--c-border)", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)" }}>{p.name}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa" }}>{p.email}</div>
                </div>
                <div style={{ fontFamily: FO, fontSize: 12, color: "#aaa" }}>{new Date(p.created_at).toLocaleDateString("en-GB")}</div>
                <div style={{ fontFamily: FO, fontSize: 13, color: "var(--c-text)" }}>{designs.filter(d => d.partner_id === p.id).length}</div>
                <div>{statusBadge(p.status)}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.status === "pending"  && <>{btn("Approve", () => updatePartner(p.id, "approved"), "#16a34a")}{btn("Reject", () => updatePartner(p.id, "rejected"), "#dc2626")}</>}
                  {p.status === "approved" && btn("Remove", () => updatePartner(p.id, "removed"), "#dc2626")}
                  {(p.status === "rejected" || p.status === "removed") && btn("Re-approve", () => updatePartner(p.id, "approved"), "#16a34a")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Designs tab */}
        {!loading && tab === "designs" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="admin-designs-grid">
            {designs.length === 0 && <div style={{ gridColumn: "1/-1", fontFamily: FO, fontSize: 13, color: "#aaa", textAlign: "center", padding: 40 }}>No designs submitted yet.</div>}
            {designs.map(d => (
              <div key={d.id} style={{ border: "1px solid var(--c-border)", background: "var(--c-bg-soft)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ aspectRatio: "3/4", background: "var(--c-bg)", overflow: "hidden" }}>
                  <img src={d.image_url} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>{d.title}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginBottom: 4 }}>{d.category}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginBottom: 12 }}>by {d.partner_name}</div>
                  <div style={{ marginBottom: 12 }}>{statusBadge(d.status)}</div>
                  {d.status === "pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      {btn("Approve", () => updateDesign(d.id, "approved"), "#16a34a")}
                      {btn("Reject",  () => updateDesign(d.id, "rejected"), "#dc2626")}
                    </div>
                  )}
                  {d.status === "approved" && btn("Reject", () => updateDesign(d.id, "rejected"), "#dc2626")}
                  {d.status === "rejected" && btn("Approve", () => updateDesign(d.id, "approved"), "#16a34a")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-designs-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .admin-designs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
