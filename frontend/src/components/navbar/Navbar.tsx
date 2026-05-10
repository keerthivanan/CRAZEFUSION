"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

// ── Mega Menu Data ─────────────────────────────────────────────────────────────

const SHOP_COLS = [
  {
    heading: "Poster Shop",
    items: [
      { label: "All Posters",   href: "/collection",               sub: "618+ designs" },
      { label: "Movies",        href: "/collection?cat=Movies",     sub: "Marvel, DC, classics" },
      { label: "Cars",          href: "/collection?cat=Cars",       sub: "Ferrari, Porsche, BMW" },
      { label: "Music",         href: "/collection?cat=Music",      sub: "Concerts, vinyl, artists" },
      { label: "Coffee Shop",   href: "/collection?cat=Coffee+Shop",sub: "Latte art, espresso" },
    ],
  },
  {
    heading: "Top Picks",
    items: [
      { label: "Best Selling",  href: "/collection",               sub: "Most popular" },
      { label: "New Arrivals",  href: "/collection",               sub: "Added this week" },
      { label: "Dark Academia", href: "/collection?cat=Movies",    sub: "Trending aesthetic" },
      { label: "Minimalist",    href: "/collection",               sub: "Clean & modern" },
    ],
  },
];

const AI_COLS = [
  {
    heading: "Create",
    items: [
      { label: "Generate Poster",   href: "/create",       sub: "Text to poster in seconds" },
      { label: "Edit Any Poster",   href: "/create?mode=edit", sub: "AI-powered editing" },
      { label: "Browse & Publish",  href: "/collection",   sub: "Sell your AI designs" },
    ],
  },
  {
    heading: "Credits",
    items: [
      { label: "Starter — £2.99",   href: "/credits",      sub: "30 credits · 6 generations" },
      { label: "Creator — £7.99",   href: "/credits",      sub: "100 credits · 20 generations" },
      { label: "Pro — £14.99",      href: "/credits",      sub: "250 credits · 50 generations" },
    ],
  },
];

const SELL_COLS = [
  {
    heading: "For Creators",
    items: [
      { label: "Partner Programme",  href: "/partner",           sub: "Earn 30% on every sale" },
      { label: "Register as Artist", href: "/partner/register",  sub: "Free to join" },
      { label: "Artist Dashboard",   href: "/partner/dashboard", sub: "Track your earnings" },
      { label: "How It Works",       href: "/partner",           sub: "Simple 3-step process" },
    ],
  },
];

const NAV_ITEMS = [
  { label: "Shop",       cols: SHOP_COLS, featured: { title: "618+ Designs", sub: "Premium wall art from £11.99", img: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973739/crazefusion/originals/car-posters/2811_Porsche_911_Turbo_Marlboro_Edition_Poster.webp", cta: "Browse All", href: "/collection" } },
  { label: "AI Studio",  cols: AI_COLS,   featured: { title: "Generate in Seconds", sub: "Describe any poster. AI creates it.", img: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973904/crazefusion/originals/movies/3346_Joker_Movie_Poster.webp",   cta: "Try Now",    href: "/create" } },
  { label: "Sell",       cols: SELL_COLS, featured: { title: "Earn £6 Per Sale", sub: "Publish your designs. Earn 30%.", img: "https://res.cloudinary.com/dxosc5jfy/image/upload/q_auto,f_auto/v1777973816/crazefusion/originals/movies/3174_Avengers_Endgame_Poster.webp",  cta: "Join Free",  href: "/partner" } },
];

// ── Icons ──────────────────────────────────────────────────────────────────────

const IconBag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const IconSun = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
  </svg>
);

// ── Mega dropdown panel ────────────────────────────────────────────────────────

function MegaMenu({ item, onClose }: { item: typeof NAV_ITEMS[0]; onClose: () => void }) {
  const { theme } = useTheme();
  const bg     = theme === "dark" ? "rgba(12,12,12,0.98)" : "rgba(255,255,255,0.98)";
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const text   = theme === "dark" ? "#fff"  : "#111";
  const muted  = theme === "dark" ? "#666"  : "#999";
  const hover  = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", background: bg, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: `1px solid ${border}`, borderRadius: 20, padding: 28, display: "flex", gap: 32, minWidth: 680, boxShadow: `0 24px 64px rgba(0,0,0,${theme === "dark" ? "0.6" : "0.15"})`, zIndex: 999, animation: "megaIn 0.2s ease" }}>

      {/* Columns */}
      <div style={{ display: "flex", gap: 32, flex: 1 }}>
        {item.cols.map(col => (
          <div key={col.heading} style={{ minWidth: 160 }}>
            <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 14 }}>{col.heading}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {col.items.map(link => (
                <Link key={link.label} href={link.href} onClick={onClose}
                  style={{ display: "block", padding: "8px 10px", borderRadius: 10, textDecoration: "none", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = hover)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: text, marginBottom: 2 }}>{link.label}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: muted }}>{link.sub}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured panel */}
      <div style={{ width: 200, flexShrink: 0 }}>
        <Link href={item.featured.href} onClick={onClose} style={{ textDecoration: "none", display: "block" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 12, aspectRatio: "3/4", background: "#111" }}>
            <img src={item.featured.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", display: "block" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
          </div>
          <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: text, marginBottom: 4 }}>{item.featured.title}</div>
          <div style={{ fontFamily: FO, fontSize: 11, color: muted, marginBottom: 12, lineHeight: 1.5 }}>{item.featured.sub}</div>
          <div style={{ display: "inline-block", padding: "7px 16px", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 50 }}>
            {item.featured.cta}
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { count }    = useCart();
  const { theme, toggle } = useTheme();
  const pathname     = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navBg    = theme === "dark" ? "rgba(10,10,10,0.88)"  : "rgba(255,255,255,0.88)";
  const iconClr  = theme === "dark" ? "#ffffff" : "#111111";
  const borderClr = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const mutedClr  = theme === "dark" ? "#777" : "#999";

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  // Close on route change
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className="nav-wrapper" style={{ position: "fixed", top: 44, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 24px)", maxWidth: 1200, zIndex: 1000 }}>
        <nav style={{ height: 60, borderRadius: 16, background: navBg, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: `1px solid ${borderClr}`, boxShadow: `0 8px 48px rgba(0,0,0,${theme === "dark" ? "0.5" : "0.1"})`, position: "relative", overflow: "visible" }}>
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", flexShrink: 0, marginRight: 8 }}>
              <img src="/logo.png" alt="Logo" className="nav-logo" style={{ height: 48, width: "auto", objectFit: "contain", display: "block", filter: theme === "dark" ? "invert(1)" : "none", transition: "filter 0.2s" }} />
            </Link>

            {/* Mega nav links — desktop only */}
            <div className="nav-mega-links" style={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
              {NAV_ITEMS.map(item => {
                const isActive = open === item.label;
                return (
                  <div key={item.label} style={{ position: "relative" }}
                    onMouseEnter={() => handleEnter(item.label)}
                    onMouseLeave={handleLeave}>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", background: isActive ? (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent", border: "none", cursor: "pointer", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: isActive ? iconClr : mutedClr, borderRadius: 10, transition: "all 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = iconClr)}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = mutedClr; }}>
                      {item.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transition: "transform 0.2s", transform: isActive ? "rotate(180deg)" : "rotate(0)" }}>
                        <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isActive && (
                      <div onMouseEnter={() => handleEnter(item.label)} onMouseLeave={handleLeave}>
                        <MegaMenu item={item} onClose={() => setOpen(null)} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Direct AI Studio link */}
              <Link href="/create" style={{ padding: "7px 12px", fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", color: "#e8a000", background: "rgba(232,160,0,0.08)", border: "1px solid rgba(232,160,0,0.2)", borderRadius: 10, whiteSpace: "nowrap", transition: "all 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(232,160,0,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(232,160,0,0.08)")}>
                AI Studio
              </Link>
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Theme toggle */}
              <button className="nav-theme-btn" onClick={toggle} style={{ width: 32, height: 32, background: "transparent", border: `1px solid ${borderClr}`, borderRadius: 8, cursor: "pointer", color: iconClr, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                {theme === "dark" ? <IconSun /> : <IconMoon />}
              </button>

              {/* Cart */}
              <Link href="/cart" style={{ position: "relative", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: iconClr, textDecoration: "none", border: `1px solid ${borderClr}`, borderRadius: 8, transition: "all 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <IconBag />
                {count > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#e8a000", color: "#000", borderRadius: "50%", width: 16, height: 16, fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {count}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <Link href="/partner" className="nav-cta" style={{ fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", padding: "8px 16px", borderRadius: 50, background: iconClr, color: theme === "dark" ? "#000" : "#fff", whiteSpace: "nowrap", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Sell Art
              </Link>

              {/* Hamburger — mobile */}
              <button className="nav-hamburger" onClick={() => setMobileOpen(v => !v)}
                style={{ width: 32, height: 32, background: "transparent", border: `1px solid ${borderClr}`, borderRadius: 8, cursor: "pointer", color: iconClr, display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <span style={{ width: 16, height: 1.5, background: "currentColor", display: "block", transition: "all 0.2s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
                <span style={{ width: 16, height: 1.5, background: "currentColor", display: "block", transition: "all 0.2s", opacity: mobileOpen ? 0 : 1 }} />
                <span style={{ width: 16, height: 1.5, background: "currentColor", display: "block", transition: "all 0.2s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile Full-Screen Menu ── */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#080808", zIndex: 2000, overflowY: "auto", paddingTop: 110 }}>
          <div style={{ padding: "0 24px 80px" }}>

            {/* Search-style prompt */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", marginBottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <Link href="/collection" onClick={() => setMobileOpen(false)} style={{ fontFamily: FO, fontSize: 14, color: "#555", textDecoration: "none", flex: 1 }}>
                Search 609+ posters...
              </Link>
            </div>

            {/* Main nav sections */}
            {NAV_ITEMS.map(item => (
              <div key={item.label} style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>{item.label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {item.cols.flatMap(col => col.items).map(link => (
                    <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", textDecoration: "none" }}>
                      <div>
                        <div style={{ fontFamily: FO, fontSize: 15, fontWeight: 600, color: "#fff" }}>{link.label}</div>
                        <div style={{ fontFamily: FO, fontSize: 12, color: "#555", marginTop: 2 }}>{link.sub}</div>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <Link href="/create" onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "16px 0", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, textAlign: "center", boxShadow: "0 0 32px rgba(232,160,0,0.25)" }}>
                Open AI Studio
              </Link>
              <Link href="/collection" onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "15px 0", background: "transparent", color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 50, textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
                Browse Posters
              </Link>
            </div>

            {/* Bottom info */}
            <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[["609+", "Designs"], ["Free", "UK Delivery"], ["48hr", "Printing"], ["30%", "Creator Cut"]].map(([val, label]) => (
                <div key={label} style={{ flex: "1 1 40%" }}>
                  <div style={{ fontFamily: FO, fontSize: 20, fontWeight: 800, color: "#fff" }}>{val}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: "#555", letterSpacing: "0.06em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 860px) {
          .nav-mega-links { display: none !important; }
          .nav-hamburger  { display: flex !important; }
          .nav-cta        { display: none !important; }
          .nav-theme-btn  { display: none !important; }
          .nav-wrapper    { top: 42px !important; width: calc(100% - 16px) !important; }
        }
        @media (max-width: 480px) {
          .nav-logo { height: 38px !important; }
        }
      `}</style>
    </>
  );
}
