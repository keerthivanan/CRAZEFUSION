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
import SlashHeading from "@/components/ui/SlashHeading";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const KEY = process.env.NEXT_PUBLIC_LOGODEV_KEY ?? "pk_X0d9dkoXSXC1bEBCAvNs-g";
const logoUrl = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${KEY}&size=160&format=png`;

const iplTeams = [
  { name: "Chennai Super Kings",         short: "CSK",  domain: "chennaisuperkings.com", color: "#f9cd1c" },
  { name: "Delhi Capitals",              short: "DC",   domain: "delhicapitals.in",      color: "#0066b2" },
  { name: "Gujarat Titans",              short: "GT",   domain: "gujarattitansipl.com",  color: "#1c2951" },
  { name: "Kolkata Knight Riders",       short: "KKR",  domain: "kkr.in",                color: "#3a225d" },
  { name: "Lucknow Super Giants",        short: "LSG",  domain: "lucknowsupergiants.in", color: "#a72056" },
  { name: "Mumbai Indians",              short: "MI",   domain: "mumbaiindians.com",     color: "#004ba0" },
  { name: "Punjab Kings",                short: "PBKS", domain: "punjabkingsipl.in",     color: "#d71920" },
  { name: "Rajasthan Royals",            short: "RR",   domain: "rajasthanroyals.com",   color: "#2d4e8a" },
  { name: "Royal Challengers Bengaluru", short: "RCB",  domain: "royalchallengers.com",  color: "#c8102e" },
  { name: "Sunrisers Hyderabad",         short: "SRH",  domain: "sunrisershyderabad.in", color: "#f26522" },
];

const internationalTeams = [
  { name: "India",         short: "IND", domain: "bcci.tv",              color: "#003087" },
  { name: "Australia",     short: "AUS", domain: "cricket.com.au",       color: "#f5a623" },
  { name: "England",       short: "ENG", domain: "ecb.co.uk",            color: "#1c3a6b" },
  { name: "Pakistan",      short: "PAK", domain: "pcb.com.pk",           color: "#01411c" },
  { name: "South Africa",  short: "SA",  domain: "cricket.co.za",        color: "#007a4d" },
  { name: "New Zealand",   short: "NZ",  domain: "nzc.nz",               color: "#000000" },
  { name: "West Indies",   short: "WI",  domain: "windiescricket.com",   color: "#7b0000" },
  { name: "Sri Lanka",     short: "SL",  domain: "srilankacricket.lk",   color: "#003f87" },
  { name: "Bangladesh",    short: "BAN", domain: "tigercricket.com.bd",  color: "#006a4e" },
  { name: "Afghanistan",   short: "AFG", domain: "afghancricket.af",     color: "#0032a0" },
];

type AnyTeam = { name: string; short: string; domain: string; color: string };

function TeamCircle({
  team, isActive, onClick,
}: { team: AnyTeam; isActive: boolean; onClick: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 10,
        background: "none", border: "none", cursor: "pointer", padding: 0,
      }}
    >
      <div
        style={{
          width: 76, height: 76, borderRadius: "50%", overflow: "hidden",
          border: isActive ? `3px solid ${team.color}` : "2px solid var(--c-border)",
          background: "#ffffff",
          transition: "all 0.25s ease",
          boxShadow: isActive ? `0 0 20px ${team.color}55` : "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.borderColor = team.color;
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 20px ${team.color}44`;
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }
        }}
      >
        {failed ? (
          <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 800, color: team.color, letterSpacing: "-0.02em" }}>
            {team.short}
          </span>
        ) : (
          <img
            src={logoUrl(team.domain)}
            alt={team.name}
            style={{
              width: "88%", height: "88%",
              objectFit: "contain",
              display: "block",
              borderRadius: "50%",
            }}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span style={{
        fontFamily: FO, fontSize: 9, fontWeight: 700,
        color: isActive ? team.color : "var(--c-text-muted)",
        letterSpacing: "0.06em", textTransform: "uppercase",
        transition: "color 0.2s", textAlign: "center", maxWidth: 72, lineHeight: 1.2,
      }}>
        {team.short}
      </span>
    </button>
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{
        position: "relative", aspectRatio: "3/4", overflow: "hidden",
        marginBottom: 12, background: "var(--c-bg-soft)",
        borderRadius: 0, transition: "all 0.3s ease",
      }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        {p.badge && (
          <span style={{ position: "absolute", bottom: 10, left: 10, background: "#111", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 13px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {p.badge}
          </span>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button
              onClick={() => { addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] }); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
              style={{ width: "100%", padding: "13px 0", background: added ? "#16a34a" : "rgba(17,17,17,0.92)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s", borderRadius: 50 }}>
              {added ? "✓ Added!" : "Quick Add"}
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "#1a6fa8", marginBottom: 4, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, textAlign: "center" }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 500, color: "var(--c-text)" }}>From ₹{p.price}</span>
          {p.original > p.price && <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}

export default function CricketPage() {
  const [activeTab, setActiveTab]   = useState<"ipl" | "international">("ipl");
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const currentTeams = activeTab === "ipl" ? iplTeams : internationalTeams;

  const handleTabSwitch = (tab: "ipl" | "international") => {
    setActiveTab(tab);
    setActiveTeam(null);
  };

  const handleTeamClick = (short: string) => {
    setActiveTeam(activeTeam === short ? null : short);
  };

  const cricketProducts = products.filter(p => p.cat === "Cricket");
  const displayProducts = activeTeam
    ? cricketProducts.filter(p => (p as any).team === activeTeam)
    : cricketProducts;

  const activeTeamObj = activeTeam
    ? currentTeams.find(t => t.short === activeTeam) ?? null
    : null;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 90 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--c-border)", background: "var(--c-bg)", padding: "16px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "var(--c-text)" }}>Cricket</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ background: "var(--c-bg)", padding: "40px 32px 28px", borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <SlashHeading
                text="Cricket Posters"
                subtitle="Shop by IPL Franchise or International Team"
                size="clamp(32px,4.5vw,58px)"
                align="left"
                as="h1"
              />
            </div>

            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: 8 }}>
              {(["ipl", "international"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabSwitch(tab)}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 50,
                    border: `1.5px solid ${activeTab === tab ? "var(--c-btn-bg)" : "var(--c-border)"}`,
                    background: activeTab === tab ? "var(--c-btn-bg)" : "transparent",
                    color: activeTab === tab ? "var(--c-btn-text)" : "var(--c-text-muted)",
                    fontFamily: FO, fontSize: 11, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== tab) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#888888";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 12px rgba(160,160,160,0.2)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== tab) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }
                  }}
                >
                  {tab === "ipl" ? "IPL Franchises" : "International"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Circles */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "28px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
              {activeTab === "ipl" ? "IPL Franchises" : "International Teams"}
            </div>
            <div
              className="no-scrollbar cricket-teams"
              style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 4, justifyContent: "center", flexWrap: "wrap" }}
            >
              {currentTeams.map(team => (
                <TeamCircle
                  key={team.short}
                  team={team}
                  isActive={activeTeam === team.short}
                  onClick={() => handleTeamClick(team.short)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Active team banner */}
        {activeTeamObj && (
          <div style={{ background: activeTeamObj.color + "18", borderBottom: `2px solid ${activeTeamObj.color}33`, padding: "14px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#fff", border: `2px solid ${activeTeamObj.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img
                  src={logoUrl(activeTeamObj.domain)}
                  alt={activeTeamObj.name}
                  style={{ width: "85%", height: "85%", objectFit: "contain", borderRadius: "50%" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div>
                <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: activeTeamObj.color }}>
                  {activeTeamObj.name}
                </span>
                <span style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginLeft: 8 }}>
                  {activeTab === "ipl" ? "IPL" : "International"} · {activeTeamObj.short}
                </span>
              </div>
              <button
                onClick={() => setActiveTeam(null)}
                style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 20, lineHeight: 1, borderRadius: 4, padding: "2px 6px" }}
              >×</button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, color: "var(--c-text)", margin: 0, textTransform: "uppercase" }}>
              {activeTeam ? `${activeTeamObj?.name} Posters` : "All Cricket Posters"}
            </h2>
            <span style={{ fontFamily: F, fontSize: 12, color: "#aaa" }}>{displayProducts.length} products</span>
          </div>
          {displayProducts.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {displayProducts.map((p, i) => (
                <AnimatedContent key={p.id} distance={20} delay={i * 0.04} duration={0.5} threshold={0.05}>
                  <ProductCard p={p} />
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "64px 20px" }}>
              <div style={{ fontFamily: FE, fontSize: 22, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 8 }}>
                No posters yet
              </div>
              <p style={{ fontFamily: F, fontSize: 13, color: "#aaa" }}>
                We&apos;re adding {activeTeamObj?.name} posters soon. Check out all cricket posters for now.
              </p>
              <button
                onClick={() => setActiveTeam(null)}
                style={{ marginTop: 20, padding: "10px 28px", background: "var(--c-btn-bg)", color: "var(--c-btn-text)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}
              >
                View All Cricket Posters
              </button>
            </div>
          )}
        </div>

      </div>
      <Newsletter />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .cricket-teams { gap: 14px !important; }
        }
      `}</style>
    </div>
  );
}
