"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FH = "var(--font-epilogue-var,'Epilogue',sans-serif)";

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
            <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 14 }}>{col.heading}</div>
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
          <div style={{ display: "inline-block", padding: "7px 16px", background: text, color: theme === "dark" ? "#000" : "#fff", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 50 }}>
            {item.featured.cta}
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── Mobile nav row item ────────────────────────────────────────────────────────

function SideNavItem({ href, icon, label, sub, onClose, theme, badge }: {
  href: string; icon: React.ReactNode; label: string; sub?: string;
  onClose: () => void; theme: string; badge?: number;
}) {
  const isDark = theme === "dark";
  return (
    <Link href={href} onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 20px", textDecoration: "none", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, transition: "background 0.15s", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <span style={{ color: isDark ? "#999" : "#888", display: "flex", flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FO, fontSize: 15, fontWeight: 600, color: isDark ? "#f0f0f0" : "#111", letterSpacing: "-0.01em" }}>{label}</div>
        {sub && <div style={{ fontFamily: FO, fontSize: 11, color: isDark ? "#555" : "#aaa", marginTop: 1 }}>{sub}</div>}
      </div>
      {badge != null && badge > 0 && (
        <span style={{ background: isDark ? "#fff" : "#111", color: isDark ? "#000" : "#fff", borderRadius: 20, minWidth: 20, height: 20, padding: "0 6px", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FO }}>{badge}</span>
      )}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#333" : "#ccc"} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
    </Link>
  );
}

// ── Nav icons ──────────────────────────────────────────────────────────────────

const IcoGrid   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const IcoSpark  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IcoTag    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>;
const IcoHeart  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
const IcoBag    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const IcoUser   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IcoInfo   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

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
      <div className="nav-wrapper" style={{ position: "fixed", top: 48, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 24px)", maxWidth: 1200, zIndex: 1000 }}>
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
                    <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", background: isActive ? (theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent", border: "none", cursor: "pointer", fontFamily: FH, fontSize: 13, fontWeight: 600, letterSpacing: "0.01em", color: isActive ? iconClr : mutedClr, borderRadius: 10, transition: "all 0.15s" }}
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

              {/* Direct AI Studio link — glowing pill */}
              <Link href="/create" className="ai-studio-btn" style={{ padding: "7px 16px", fontFamily: FH, fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", textDecoration: "none", color: iconClr, background: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", border: `1px solid ${borderClr}`, borderRadius: 10, whiteSpace: "nowrap", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 5 }}>
                ✦ AI Studio
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
                  <span style={{ position: "absolute", top: -4, right: -4, background: iconClr, color: theme === "dark" ? "#000" : "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {count}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <Link href="/partner" className="nav-cta" style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", padding: "8px 20px", borderRadius: 50, background: iconClr, color: theme === "dark" ? "#000" : "#fff", whiteSpace: "nowrap", transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
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

      {/* ── Mobile Sidebar ── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "min(360px, 100vw)",
        background: theme === "dark" ? "#0a0a0a" : "#ffffff",
        zIndex: 2000,
        boxShadow: "-24px 0 80px rgba(0,0,0,0.35)",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>

        {/* ── Header: logo pill + close ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", flexShrink: 0 }}>
          <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", borderRadius: 50, padding: "8px 20px 8px 14px", gap: 10, textDecoration: "none" }}>
            <img src="/logo.png" alt="CrazeFusion" style={{ height: 28, objectFit: "contain", filter: theme === "dark" ? "invert(1)" : "none" }} />
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ width: 36, height: 36, background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)", border: "none", borderRadius: 50, cursor: "pointer", color: iconClr, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* ── Guest profile card ── */}
        <div style={{ margin: "4px 16px 12px", background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 42, height: 42, borderRadius: 50, background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: theme === "dark" ? "#888" : "#aaa", flexShrink: 0 }}>
            <IcoUser />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FH, fontSize: 14, fontWeight: 700, color: iconClr, letterSpacing: "-0.01em" }}>Welcome back</div>
            <div style={{ fontFamily: FO, fontSize: 11, color: theme === "dark" ? "#555" : "#aaa", marginTop: 1 }}>Sign in to your account</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, color: iconClr, textDecoration: "none", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", padding: "5px 12px", borderRadius: 50, whiteSpace: "nowrap" }}>Log in</Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)} style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, color: theme === "dark" ? "#000" : "#fff", textDecoration: "none", background: iconClr, padding: "5px 12px", borderRadius: 50, whiteSpace: "nowrap" }}>Sign up</Link>
          </div>
        </div>

        {/* ── Nav rows ── */}
        <div style={{ flex: 1 }}>
          <SideNavItem href="/collection"   icon={<IcoGrid />}  label="All Posters"       sub="618+ designs"            onClose={() => setMobileOpen(false)} theme={theme} />
          <SideNavItem href="/collection?cat=Movies" icon={<IcoHeart />} label="Movies & TV"  sub="Marvel, DC, classics"  onClose={() => setMobileOpen(false)} theme={theme} />
          <SideNavItem href="/collection?cat=Cars"   icon={<IcoTag />}   label="Cars"          sub="Ferrari, Porsche, BMW"  onClose={() => setMobileOpen(false)} theme={theme} />
          <SideNavItem href="/create"       icon={<IcoSpark />} label="AI Studio"        sub="Generate posters in seconds" onClose={() => setMobileOpen(false)} theme={theme} />
          <SideNavItem href="/partner"      icon={<IcoInfo />}  label="Sell Your Art"    sub="Earn 30% per sale"       onClose={() => setMobileOpen(false)} theme={theme} />
          <SideNavItem href="/cart"         icon={<IcoBag />}   label="My Cart"          sub={count > 0 ? `${count} item${count > 1 ? "s" : ""} in bag` : "Your shopping bag"} onClose={() => setMobileOpen(false)} theme={theme} badge={count} />
        </div>

        {/* ── Bottom CTAs ── */}
        <div style={{ padding: "16px 16px 40px", display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <Link href="/collection" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 0", background: iconClr, color: theme === "dark" ? "#000" : "#fff", fontFamily: FO, fontSize: 14, fontWeight: 800, letterSpacing: "0.02em", textDecoration: "none", borderRadius: 50 }}>
            Browse Collection →
          </Link>
          <button onClick={() => { toggle(); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 0", background: "transparent", border: `1.5px solid ${borderClr}`, borderRadius: 50, cursor: "pointer", color: iconClr, fontFamily: FO, fontSize: 13, fontWeight: 600 }}>
            {theme === "dark" ? <IconSun /> : <IconMoon />}
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1999, backdropFilter: "blur(4px)" }} />
      )}

      <style>{`
        @keyframes megaIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .ai-studio-btn:hover { opacity: 0.8; transform: translateY(-1px); }
        @media (max-width: 860px) {
          .nav-mega-links { display: none !important; }
          .nav-hamburger  { display: flex !important; }
          .nav-cta        { display: none !important; }
          .nav-theme-btn  { display: none !important; }
          .nav-wrapper    { top: 48px !important; width: calc(100% - 16px) !important; }
        }
        @media (max-width: 480px) {
          .nav-logo { height: 38px !important; }
        }
      `}</style>
    </>
  );
}
