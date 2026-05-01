"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";
import ClickSpark from "@/components/reactbits/ClickSpark";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const KEY = process.env.NEXT_PUBLIC_LOGODEV_KEY ?? "pk_X0d9dkoXSXC1bEBCAvNs-g";
const logo = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${KEY}&size=160&format=png`;

const teams = [
  { name: "Real Madrid",       short: "RMA",  domain: "realmadrid.com",       color: "#00529f" },
  { name: "FC Barcelona",      short: "FCB",  domain: "fcbarcelona.com",       color: "#a50044" },
  { name: "Manchester City",   short: "MCI",  domain: "mancity.com",           color: "#6cabdd" },
  { name: "Liverpool FC",      short: "LIV",  domain: "liverpoolfc.com",       color: "#c8102e" },
  { name: "PSG",               short: "PSG",  domain: "psg.fr",                color: "#004170" },
  { name: "Arsenal",           short: "ARS",  domain: "arsenal.com",           color: "#ef0107" },
  { name: "Manchester United", short: "MUN",  domain: "manutd.com",            color: "#da291c" },
  { name: "Chelsea FC",        short: "CHE",  domain: "chelseafc.com",         color: "#034694" },
];

type Team = typeof teams[0];

function TeamLogo({ team }: { team: Team }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: team.color + "22",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: FO, fontSize: 18, fontWeight: 700, color: team.color }}>
          {team.short}
        </span>
      </div>
    );
  }
  return (
    <img
      src={logo(team.domain)}
      alt={team.name}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      onError={() => setFailed(true)}
    />
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const discount = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0;

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", border: `1px solid ${hovered ? "var(--c-text-muted)" : "var(--c-border)"}`, transition: "all 0.3s ease" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.5s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }} />
        {discount > 0 && (
          <span style={{ position: "absolute", top: 10, left: 10, background: "#dc2626", color: "#fff", fontFamily: F, fontSize: 9, fontWeight: 500, padding: "3px 8px" }}>
            -{discount}%
          </span>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={() => { addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] }); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
              style={{ width: "100%", padding: "12px 0", background: added ? "#16a34a" : "rgba(17,17,17,0.9)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s" }}>
              {added ? "✓ Added!" : "Quick Add"}
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 500, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 5, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 500, color: "var(--c-text)" }}>₹{p.price}</span>
          {p.original > p.price && <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}

export default function FootballPage() {
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const footballProducts = products.filter(p => p.cat === "Football");
  const displayProducts = activeTeam
    ? footballProducts.filter(p => (p as any).team === activeTeam)
    : footballProducts;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 56 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-bg)", padding: "16px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "var(--c-text)" }}>Football</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ background: "var(--c-bg)", padding: "40px 32px 32px", borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h1 style={{ fontFamily: FE, fontSize: "clamp(28px,4vw,52px)", fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
              Football <span style={{ color: "#e8a000" }}>Posters</span>
            </h1>
            <p style={{ fontFamily: F, fontSize: 13, color: "#aaa", margin: 0 }}>Shop by your favourite football club</p>
          </div>
        </div>

        {/* Football Clubs */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "28px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
              Top Clubs
            </div>
            <div className="no-scrollbar" style={{ display: "flex", gap: 20, paddingBottom: 4, justifyContent: "center", flexWrap: "wrap" }}>
              {teams.map(team => (
                <button key={team.short} onClick={() => setActiveTeam(activeTeam === team.short ? null : team.short)}
                  style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", overflow: "hidden",
                    border: activeTeam === team.short ? `2.5px solid ${team.color}` : "2px solid var(--c-border)",
                    background: "var(--c-bg)",
                    transition: "all 0.25s ease",
                    boxShadow: activeTeam === team.short ? `0 0 16px ${team.color}55` : "none",
                  }}
                    onMouseEnter={e => {
                      if (activeTeam !== team.short) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = team.color;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (activeTeam !== team.short) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }
                    }}>
                    <TeamLogo team={team} />
                  </div>
                  <span style={{
                    fontFamily: FO, fontSize: 10, fontWeight: 600,
                    color: activeTeam === team.short ? team.color : "var(--c-text-muted)",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    transition: "color 0.2s",
                  }}>
                    {team.short}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active team banner */}
        {activeTeam && (() => {
          const t = teams.find(t => t.short === activeTeam)!;
          return (
            <div style={{ background: t.color + "18", borderBottom: `2px solid ${t.color}33`, padding: "14px 32px" }}>
              <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
                <img src={logo(t.domain)} alt={t.name} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: "50%" }} />
                <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: t.color }}>
                  {t.name} — {t.short}
                </span>
                <button onClick={() => setActiveTeam(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 18, lineHeight: 1 }}>×</button>
              </div>
            </div>
          );
        })()}

        {/* Products Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, color: "var(--c-text)", margin: 0, textTransform: "uppercase" }}>
              {activeTeam ? `${activeTeam} Posters` : "All Football Posters"}
            </h2>
            <span style={{ fontFamily: F, fontSize: 12, color: "#aaa" }}>{displayProducts.length} products</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {displayProducts.map((p, i) => (
              <AnimatedContent key={p.id} distance={20} delay={i * 0.04} duration={0.5} threshold={0.05}>
                <ProductCard p={p} />
              </AnimatedContent>
            ))}
          </div>
        </div>

      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
