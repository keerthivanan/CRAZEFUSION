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

const espn    = (abbr: string) => `https://a.espncdn.com/i/teamlogos/nba/500/${abbr}.png`;
const KEY     = process.env.NEXT_PUBLIC_LOGODEV_KEY ?? "pk_X0d9dkoXSXC1bEBCAvNs-g";
const logoUrl = (domain: string) => `https://img.logo.dev/${domain}?token=${KEY}&size=160&format=png`;

const nbaTeams = [
  { name: "LA Lakers",             short: "LAL", src: espn("lal"), color: "#552583" },
  { name: "Golden State Warriors", short: "GSW", src: espn("gs"),  color: "#1d428a" },
  { name: "Chicago Bulls",         short: "CHI", src: espn("chi"), color: "#ce1141" },
  { name: "Miami Heat",            short: "MIA", src: espn("mia"), color: "#98002e" },
  { name: "Boston Celtics",        short: "BOS", src: espn("bos"), color: "#007a33" },
  { name: "Brooklyn Nets",         short: "BKN", src: espn("bkn"), color: "#000000" },
  { name: "Toronto Raptors",       short: "TOR", src: espn("tor"), color: "#ce1141" },
  { name: "Dallas Mavericks",      short: "DAL", src: espn("dal"), color: "#00538c" },
];

const internationalTeams = [
  { name: "USA",       short: "USA", src: logoUrl("usab.com"),          color: "#002868" },
  { name: "Spain",     short: "ESP", src: logoUrl("feb.es"),            color: "#c60b1e" },
  { name: "France",    short: "FRA", src: logoUrl("ffbb.com"),          color: "#003189" },
  { name: "Australia", short: "AUS", src: logoUrl("basketball.com.au"), color: "#003f87" },
  { name: "Argentina", short: "ARG", src: logoUrl("cabb.com.ar"),       color: "#74acdf" },
  { name: "Serbia",    short: "SRB", src: logoUrl("kss.rs"),            color: "#c6363c" },
  { name: "Greece",    short: "GRE", src: logoUrl("esake.gr"),          color: "#0d5eaf" },
  { name: "Nigeria",   short: "NGR", src: logoUrl("nbbf.com.ng"),       color: "#008751" },
];

const allBasketballTeams = [...nbaTeams, ...internationalTeams];
type AnyTeam = { name: string; short: string; src: string; color: string };

function TeamCircle({ team, isActive, onClick }: { team: AnyTeam; isActive: boolean; onClick: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <button onClick={onClick} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}>
      <div style={{
        width: 76, height: 76, borderRadius: "50%", overflow: "hidden", background: "#fff",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        boxShadow: isActive ? `0 0 0 2px var(--c-bg), 0 0 0 5px ${team.color}, 0 6px 24px ${team.color}33` : "0 0 0 1.5px rgba(0,0,0,0.1)",
        transform: isActive ? "translateY(-4px) scale(1.07)" : "translateY(0) scale(1)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
        onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 2px var(--c-bg), 0 0 0 4px ${team.color}99`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.04)"; } }}
        onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1.5px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)"; } }}
      >
        {failed ? (
          <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 800, color: team.color }}>{team.short}</span>
        ) : (
          <img src={team.src} alt={team.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={() => setFailed(true)} />
        )}
      </div>
      <span style={{ fontFamily: FO, fontSize: 9, fontWeight: isActive ? 700 : 600, color: isActive ? team.color : "var(--c-text-muted)", letterSpacing: "0.07em", textTransform: "uppercase", transition: "color 0.2s", textAlign: "center", maxWidth: 72, lineHeight: 1.2 }}>
        {team.short}
      </span>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: isActive ? team.color : "transparent", transition: "background 0.2s" }} />
    </button>
  );
}

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", borderRadius: 0, transition: "all 0.3s ease" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "all 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        {p.badge && <span style={{ position: "absolute", bottom: 10, left: 10, background: "#111", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 13px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.07em" }}>{p.badge}</span>}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s ease" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={() => { addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] }); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
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
        </div>
      </Link>
    </div>
  );
}

const sections = [
  {
    key: "nba",
    label: "NBA Franchises",
    sub: "Top NBA clubs",
    logo: logoUrl("nba.com"),
    teams: nbaTeams,
    count: nbaTeams.length,
  },
  {
    key: "international",
    label: "International",
    sub: "National teams",
    logo: logoUrl("fiba.basketball"),
    teams: internationalTeams,
    count: internationalTeams.length,
  },
];

export default function BasketballPage() {
  const [activeSection, setActiveSection] = useState<"nba" | "international" | null>(null);
  const [activeTeam, setActiveTeam]       = useState<string | null>(null);

  const handleSectionClick = (key: "nba" | "international") => {
    if (activeSection === key) { setActiveSection(null); setActiveTeam(null); return; }
    setActiveSection(key);
    setActiveTeam(null);
  };

  const currentTeams = activeSection === "nba" ? nbaTeams : internationalTeams;
  const basketballProducts = products.filter(p => p.cat === "Basketball");
  const displayProducts = activeTeam
    ? basketballProducts.filter(p => (p as any).team === activeTeam)
    : basketballProducts;
  const activeTeamObj = activeTeam ? allBasketballTeams.find(t => t.short === activeTeam) ?? null : null;

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 108 }}>

        {/* Breadcrumb */}
        <div style={{ background: "var(--c-bg)", padding: "16px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--c-text)" }}>Basketball</span>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ background: "var(--c-bg)", padding: "40px 32px 28px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <SlashHeading text="Basketball Posters" subtitle="Select a league to browse teams" size="clamp(20px,2.2vw,32px)" align="left" as="h1" />
          </div>
        </div>

        {/* Two section cards */}
        <div style={{ background: "var(--c-bg-soft)", padding: "28px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
              {sections.map(sec => {
                const isActive = activeSection === sec.key;
                return (
                  <button
                    key={sec.key}
                    onClick={() => handleSectionClick(sec.key as "nba" | "international")}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "18px 20px",
                      border: `2px solid ${isActive ? "var(--c-text)" : "var(--c-border)"}`,
                      background: isActive ? "var(--c-bg-card)" : "var(--c-bg)",
                      borderRadius: 0, cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = "#888"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", background: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #eee" }}>
                      <img src={sec.logo} alt={sec.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{sec.label}</div>
                      <div style={{ fontFamily: F, fontSize: 11, color: "var(--c-text-muted)", marginTop: 3 }}>{sec.count} teams</div>
                    </div>
                    <div style={{ marginLeft: "auto", fontFamily: FO, fontSize: 16, color: isActive ? "var(--c-text)" : "var(--c-text-muted)", transition: "transform 0.2s", transform: isActive ? "rotate(90deg)" : "rotate(0deg)" }}>›</div>
                  </button>
                );
              })}
            </div>

            {/* Team circles — shown only after selecting a section */}
            {activeSection && (
              <AnimatedContent distance={16} duration={0.35}>
                <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--c-border)" }}>
                  <div style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
                    {activeSection === "nba" ? "NBA Franchises" : "National Teams"}
                  </div>
                  <div className="no-scrollbar" style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "flex-start" }}>
                    {currentTeams.map(team => (
                      <TeamCircle key={team.short} team={team}
                        isActive={activeTeam === team.short}
                        onClick={() => setActiveTeam(activeTeam === team.short ? null : team.short)} />
                    ))}
                  </div>
                </div>
              </AnimatedContent>
            )}
          </div>
        </div>

        {/* Active team banner */}
        {activeTeamObj && (
          <div style={{ background: activeTeamObj.color + "18", padding: "14px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#fff", border: `2px solid ${activeTeamObj.color}44`, flexShrink: 0 }}>
                <img src={activeTeamObj.src} alt={activeTeamObj.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div>
                <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: activeTeamObj.color }}>{activeTeamObj.name}</span>
                <span style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginLeft: 8 }}>Basketball · {activeTeamObj.short}</span>
              </div>
              <button onClick={() => setActiveTeam(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 20, lineHeight: 1, padding: "2px 6px" }}>×</button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <h2 style={{ fontFamily: FE, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, color: "var(--c-text)", margin: 0, textTransform: "uppercase" }}>
              {activeTeam ? `${activeTeamObj?.name} Posters` : "All Basketball Posters"}
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
              <button onClick={() => setActiveTeam(null)} style={{ marginTop: 20, padding: "10px 28px", background: "var(--c-btn-bg)", color: "var(--c-btn-text)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}>
                View All Basketball Posters
              </button>
            </div>
          )}
        </div>

      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}
