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
            <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 14 }}>{col.heading}</div>
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
          <div style={{ display: "inline-block", padding: "7px 16px", background: "#7c3aed", color: "#000", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 50 }}>
            {item.featured.cta}
          </div>
        </Link>
      </div>
    </div>
  );
}

// ── Mobile Accordion Section ───────────────────────────────────────────────────

function MobileAccordion({ item, onClose, theme }: { item: typeof NAV_ITEMS[0]; onClose: () => void; theme: string }) {
  const [expanded, setExpanded] = useState(false);
  const isDark = theme === "dark";
  const textCol = isDark ? "#f0f0f0" : "#111";
  const mutedCol = isDark ? "#555" : "#aaa";
  const borderCol = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const hoverBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const activeBg = isDark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.06)";

  return (
    <div style={{ borderBottom: `1px solid ${borderCol}` }}>
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontFamily: FH, fontSize: 15, fontWeight: 700, color: textCol, letterSpacing: "-0.01em" }}>{item.label}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#555" : "#bbb"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: "transform 0.25s", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {expanded && (
        <div style={{ paddingBottom: 8 }}>
          {item.cols.map(col => (
            <div key={col.heading} style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7c3aed", padding: "4px 20px 8px" }}>{col.heading}</div>
              {col.items.map(link => (
                <Link key={link.label} href={link.href} onClick={onClose}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", textDecoration: "none", borderRadius: 0, transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = hoverBg}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div>
                    <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: textCol, marginBottom: 1 }}>{link.label}</div>
                    <div style={{ fontFamily: FO, fontSize: 11, color: mutedCol }}>{link.sub}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#333" : "#ddd"} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Icons (auth) ───────────────────────────────────────────────────────────────

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconUserPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

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
      <div className="nav-wrapper" style={{ position: "fixed", top: 12, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 24px)", maxWidth: 1200, zIndex: 1000 }}>
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
              <Link href="/create" className="ai-studio-btn" style={{ padding: "7px 16px", fontFamily: FH, fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", textDecoration: "none", color: "#c084fc", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(192,132,252,0.4)", borderRadius: 10, whiteSpace: "nowrap", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 5 }}>
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
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#7c3aed", color: "#000", borderRadius: "50%", width: 16, height: 16, fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {count}
                  </span>
                )}
              </Link>

              {/* CTA */}
              <Link href="/partner" className="nav-cta" style={{ fontFamily: FH, fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", padding: "8px 20px", borderRadius: 50, background: "#7c3aed", color: "#000", whiteSpace: "nowrap", transition: "all 0.2s", boxShadow: "0 0 20px rgba(124,58,237,0.25)" }}
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

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 16px", borderBottom: `1px solid ${borderClr}`, flexShrink: 0 }}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="CrazeFusion" style={{ height: 34, objectFit: "contain", filter: theme === "dark" ? "invert(1)" : "none" }} />
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ width: 34, height: 34, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: 10, cursor: "pointer", color: iconClr, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* ── Auth Buttons ── */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${borderClr}`, display: "flex", gap: 10, flexShrink: 0 }}>
          <Link href="/login" onClick={() => setMobileOpen(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", background: "transparent", border: `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`, borderRadius: 12, color: iconClr, fontFamily: FO, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}>
            <IconUser /> Log In
          </Link>
          <Link href="/signup" onClick={() => setMobileOpen(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "12px 0", background: "#7c3aed", border: "1.5px solid #7c3aed", borderRadius: 12, color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.02em" }}>
            <IconUserPlus /> Sign Up
          </Link>
        </div>

        {/* ── AI Studio spotlight ── */}
        <div style={{ margin: "12px 20px", flexShrink: 0 }}>
          <Link href="/create" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 14, textDecoration: "none" }}>
            <div>
              <div style={{ fontFamily: FH, fontSize: 14, fontWeight: 800, color: "#c084fc", letterSpacing: "-0.01em" }}>✦ AI Studio</div>
              <div style={{ fontFamily: FO, fontSize: 11, color: theme === "dark" ? "#888" : "#999", marginTop: 2 }}>Generate posters in seconds</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
        </div>

        {/* ── Accordion nav sections ── */}
        <div style={{ flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <MobileAccordion key={item.label} item={item} onClose={() => setMobileOpen(false)} theme={theme} />
          ))}

          {/* Direct quick links */}
          <div style={{ padding: "8px 0", borderBottom: `1px solid ${borderClr}` }}>
            {[
              { label: "Browse Collection", sub: "618+ wall art designs", href: "/collection" },
              { label: "Sell Your Art",     sub: "Earn 30% per sale",      href: "/partner" },
              { label: "My Cart",           sub: count > 0 ? `${count} item${count > 1 ? "s" : ""} in bag` : "Your shopping bag", href: "/cart" },
            ].map(link => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", textDecoration: "none", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div>
                  <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: iconClr, marginBottom: 1 }}>{link.label}</div>
                  <div style={{ fontFamily: FO, fontSize: 11, color: theme === "dark" ? "#555" : "#aaa" }}>{link.sub}</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme === "dark" ? "#333" : "#ddd"} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom bar: theme + cart count ── */}
        <div style={{ padding: "16px 20px 36px", borderTop: `1px solid ${borderClr}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
          <button onClick={toggle} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 0", background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${borderClr}`, borderRadius: 12, cursor: "pointer", color: iconClr, fontFamily: FO, fontSize: 13, fontWeight: 600 }}>
            {theme === "dark" ? <IconSun /> : <IconMoon />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link href="/cart" onClick={() => setMobileOpen(false)} style={{ position: "relative", width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", color: iconClr, textDecoration: "none", background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${borderClr}`, borderRadius: 12, flexShrink: 0 }}>
            <IconBag />
            {count > 0 && <span style={{ position: "absolute", top: -5, right: -5, background: "#7c3aed", color: "#fff", borderRadius: "50%", width: 17, height: 17, fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{count}</span>}
          </Link>
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
        @keyframes aiGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(192,132,252,0.5), 0 0 20px rgba(192,132,252,0.25); border-color: rgba(192,132,252,0.5); }
          50%       { box-shadow: 0 0 16px rgba(244,114,182,0.6), 0 0 36px rgba(192,132,252,0.35), 0 0 48px rgba(56,189,248,0.15); border-color: rgba(244,114,182,0.6); }
        }
        .ai-studio-btn { animation: aiGlow 2.4s ease-in-out infinite; }
        .ai-studio-btn:hover { background: rgba(124,58,237,0.2) !important; transform: translateY(-1px); }
        @media (max-width: 860px) {
          .nav-mega-links { display: none !important; }
          .nav-hamburger  { display: flex !important; }
          .nav-cta        { display: none !important; }
          .nav-theme-btn  { display: none !important; }
          .nav-wrapper    { top: 12px !important; width: calc(100% - 16px) !important; }
        }
        @media (max-width: 480px) {
          .nav-logo { height: 38px !important; }
        }
      `}</style>
    </>
  );
}
