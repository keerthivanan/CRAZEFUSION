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
const FE = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-poppins-var,'Poppins',sans-serif)";

const KEY = process.env.NEXT_PUBLIC_LOGODEV_KEY ?? "pk_X0d9dkoXSXC1bEBCAvNs-g";
const logo = (domain: string) => `https://img.logo.dev/${domain}?token=${KEY}&size=160&format=png`;
const flag = (iso: string)    => `https://flagcdn.com/w160/${iso}.png`;

const clubTeams = [
  { name: "Real Madrid",       short: "RMA", src: logo("realmadrid.com"),    color: "#00529f" },
  { name: "FC Barcelona",      short: "FCB", src: logo("fcbarcelona.com"),   color: "#a50044" },
  { name: "Manchester City",   short: "MCI", src: logo("mancity.com"),       color: "#6cabdd" },
  { name: "Liverpool FC",      short: "LIV", src: logo("liverpoolfc.com"),   color: "#c8102e" },
  { name: "PSG",               short: "PSG", src: logo("psg.fr"),            color: "#004170" },
  { name: "Arsenal",           short: "ARS", src: logo("arsenal.com"),       color: "#ef0107" },
  { name: "Manchester United", short: "MUN", src: logo("manutd.com"),        color: "#da291c" },
  { name: "Chelsea FC",        short: "CHE", src: logo("chelseafc.com"),     color: "#034694" },
  { name: "Bayern Munich",     short: "BAY", src: logo("fcbayern.com"),      color: "#dc052d" },
  { name: "Juventus",          short: "JUV", src: logo("juventus.com"),      color: "#1a1a1a" },
  { name: "AC Milan",          short: "MIL", src: logo("acmilan.com"),       color: "#fb090b" },
  { name: "Atletico Madrid",   short: "ATM", src: logo("atleticodemadrid.com"), color: "#cb3524" },
];

const internationalTeams = [
  { name: "Brazil",      short: "BRA", src: flag("br"), color: "#009c3b" },
  { name: "Argentina",   short: "ARG", src: flag("ar"), color: "#74acdf" },
  { name: "France",      short: "FRA", src: flag("fr"), color: "#003189" },
  { name: "Germany",     short: "GER", src: flag("de"), color: "#1a1a1a" },
  { name: "Spain",       short: "ESP", src: flag("es"), color: "#aa151b" },
  { name: "England",     short: "ENG", src: flag("gb-eng"), color: "#13297b" },
  { name: "Portugal",    short: "POR", src: flag("pt"), color: "#006600" },
  { name: "Italy",       short: "ITA", src: flag("it"), color: "#003399" },
  { name: "Netherlands", short: "NED", src: flag("nl"), color: "#ff6900" },
  { name: "Belgium",     short: "BEL", src: flag("be"), color: "#ed2939" },
  { name: "Croatia",     short: "CRO", src: flag("hr"), color: "#cc0000" },
  { name: "Japan",       short: "JPN", src: flag("jp"), color: "#bc002d" },
  { name: "South Korea", short: "KOR", src: flag("kr"), color: "#003478" },
  { name: "Morocco",     short: "MAR", src: flag("ma"), color: "#006233" },
  { name: "Senegal",     short: "SEN", src: flag("sn"), color: "#00853f" },
  { name: "USA",         short: "USA", src: flag("us"), color: "#002868" },
  { name: "Mexico",      short: "MEX", src: flag("mx"), color: "#006847" },
  { name: "Colombia",    short: "COL", src: flag("co"), color: "#fcd116" },
  { name: "Uruguay",     short: "URU", src: flag("uy"), color: "#5aaae7" },
  { name: "Ghana",       short: "GHA", src: flag("gh"), color: "#006b3f" },
];

type AnyTeam = { name: string; short: string; src: string; color: string };

function TeamCircle({
  team, isActive, onClick,
}: { team: AnyTeam; isActive: boolean; onClick: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0, display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8,
        background: "none", border: "none", cursor: "pointer", padding: "4px 2px",
      }}
    >
      <div style={{
        width: 76, height: 76, borderRadius: "50%", overflow: "hidden",
        background: "#fff",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        boxShadow: isActive
          ? `0 0 0 3px ${team.color}, 0 6px 24px ${team.color}55`
          : "0 0 0 1.5px rgba(0,0,0,0.1)",
        transform: isActive ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
        onMouseEnter={e => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 2.5px ${team.color}99, 0 8px 20px ${team.color}33`;
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.04)";
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1.5px rgba(0,0,0,0.1)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
          }
        }}
      >
        {failed ? (
          <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 800, color: team.color }}>{team.short}</span>
        ) : (
          <img src={team.src} alt={team.name}
            style={{ width: "82%", height: "82%", objectFit: "contain", display: "block" }}
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span style={{
        fontFamily: FO, fontSize: 9, fontWeight: isActive ? 700 : 600,
        color: isActive ? team.color : "var(--c-text-muted)",
        letterSpacing: "0.07em", textTransform: "uppercase",
        transition: "color 0.2s", textAlign: "center", maxWidth: 72, lineHeight: 1.2,
      }}>
        {team.short}
      </span>
      <div style={{
        width: 4, height: 4, borderRadius: "50%",
        background: isActive ? team.color : "transparent",
        transition: "background 0.2s",
      }} />
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

export default function FootballPage() {
  const [activeTab, setActiveTab]   = useState<"clubs" | "international">("clubs");
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const currentTeams = activeTab === "clubs" ? clubTeams : internationalTeams;

  const handleTabSwitch = (tab: "clubs" | "international") => {
    setActiveTab(tab);
    setActiveTeam(null);
  };

  const footballProducts = products.filter(p => p.cat === "Football");
  const displayProducts = activeTeam
    ? footballProducts.filter(p => (p as any).team === activeTeam)
    : footballProducts;

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
              <span style={{ color: "var(--c-text)" }}>Football</span>
            </div>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ background: "var(--c-bg)", padding: "40px 32px 28px", borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ marginBottom: 24 }}>
              <SlashHeading
                text="Football Posters"
                subtitle="Shop by Club or International Team"
                size="clamp(32px,4.5vw,58px)"
                align="left"
                as="h1"
              />
            </div>

            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: 8 }}>
              {(["clubs", "international"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabSwitch(tab)}
                  style={{
                    padding: "10px 28px", borderRadius: 50,
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
                  {tab === "clubs" ? "Top Clubs" : "International"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Circles */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "28px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
              {activeTab === "clubs" ? "Top Clubs" : "National Teams"}
            </div>
            <div className="no-scrollbar football-teams" style={{ display: "flex", gap: 18, overflowX: "auto", paddingBottom: 4, justifyContent: "center", flexWrap: "wrap" }}>
              {currentTeams.map(team => (
                <TeamCircle
                  key={team.short}
                  team={team}
                  isActive={activeTeam === team.short}
                  onClick={() => setActiveTeam(activeTeam === team.short ? null : team.short)}
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
                <img src={activeTeamObj.src} alt={activeTeamObj.name}
                  style={{ width: "85%", height: "85%", objectFit: "contain", borderRadius: "50%" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div>
                <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: activeTeamObj.color }}>
                  {activeTeamObj.name}
                </span>
                <span style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginLeft: 8 }}>
                  {activeTab === "clubs" ? "Club" : "International"} · {activeTeamObj.short}
                </span>
              </div>
              <button onClick={() => setActiveTeam(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 20, lineHeight: 1, borderRadius: 4, padding: "2px 6px" }}>×</button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, color: "var(--c-text)", margin: 0, textTransform: "uppercase" }}>
              {activeTeam ? `${activeTeamObj?.name} Posters` : "All Football Posters"}
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
              <div style={{ fontFamily: FE, fontSize: 22, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 8 }}>No posters yet</div>
              <p style={{ fontFamily: F, fontSize: 13, color: "#aaa" }}>We&apos;re adding {activeTeamObj?.name} posters soon.</p>
              <button onClick={() => setActiveTeam(null)}
                style={{ marginTop: 20, padding: "10px 28px", background: "var(--c-btn-bg)", color: "var(--c-btn-text)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
                View All Football Posters
              </button>
            </div>
          )}
        </div>

      </div>
      <Newsletter />
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .football-teams { gap: 14px !important; }
        }
      `}</style>
    </div>
  );
}
