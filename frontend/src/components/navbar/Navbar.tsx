"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const nav = [
  { label: "Shop Posters", href: "/collection", children: [
    { label: "All Posters",          href: "/collection" },
    { label: "Cars & Bikes",         href: "/collection?cat=Cars+%26+Bikes" },
    { label: "Anime",                href: "/collection?cat=Anime" },
    { label: "Sports",               href: "/collection?cat=Sports" },
    { label: "Pop Culture",          href: "/collection?cat=Movies" },
    { label: "Make Your Own Poster", href: "/custom-builder" },
  ]},
  { label: "Multi Posters", href: "/collection", children: [
    { label: "9-Piece Epic Splits",  href: "/collection?cat=Split+Posters" },
    { label: "8-Panel Wall Sets",    href: "/collection?cat=Split+Posters" },
    { label: "50-Piece Collage Kit", href: "/collection?cat=Collage+Kits" },
    { label: "3-Piece Sets",         href: "/collection?cat=Split+Posters" },
    { label: "Best Selling",         href: "/collection" },
  ]},
  { label: "Retro Prints",   href: "/custom-builder" },
  { label: "Custom Posters", href: "/custom-builder" },
  { label: "Stickers",       href: "/collection?cat=Stickers" },
  { label: "Reviews",        href: "/reviews" },
];

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const IconSearch = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBag = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconUser = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconMoon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const IconSun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [openMenu, setOpenMenu]       = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openSub, setOpenSub]         = useState<string | null>(null);
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const iconBtn: React.CSSProperties = {
    background: "none", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--c-nav-link)", padding: 6, borderRadius: 8,
    transition: "color 0.15s, background 0.15s",
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--c-bg)",
        borderBottom: `1px solid ${scrolled ? "var(--c-border)" : "var(--c-border)"}`,
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          padding: "0 32px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/logo.png" alt="PosterKing" className="pk-logo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center" }} className="pk-desktop-nav">
            {nav.map(item => (
              <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link href={item.href} style={{
                  fontFamily: FO, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  color: "var(--c-nav-link)", textDecoration: "none",
                  padding: "8px 12px",
                  display: "flex", alignItems: "center", gap: 3,
                  whiteSpace: "nowrap", transition: "color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--c-nav-link)")}
                >
                  {item.label}
                  {item.children && (
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none" style={{ opacity: 0.4, marginTop: 1 }}>
                      <path d="M1 1l2.5 2.5L6 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openMenu === item.label && (
                  <div style={{
                    position: "absolute", top: "100%", left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--c-bg)",
                    border: "1px solid var(--c-border)",
                    minWidth: 220,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                    zIndex: 200,
                    paddingTop: 4, paddingBottom: 4,
                  }}>
                    <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 10, height: 5, overflow: "hidden" }}>
                      <div style={{ width: 10, height: 10, background: "var(--c-bg)", border: "1px solid var(--c-border)", transform: "rotate(45deg) translate(2px,2px)" }} />
                    </div>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href} style={{
                        display: "block", padding: "9px 18px",
                        fontFamily: F, fontSize: 12, fontWeight: 500,
                        color: "var(--c-text-muted)", textDecoration: "none",
                        transition: "all 0.12s",
                        borderBottom: "1px solid var(--c-border)",
                      }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--c-bg-soft)"; el.style.color = "var(--c-text)"; el.style.paddingLeft = "22px"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = ""; el.style.color = "var(--c-text-muted)"; el.style.paddingLeft = "18px"; }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="pk-desktop-actions" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <Link href="/collection" style={{
              fontFamily: F, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "var(--c-nav-link)", textDecoration: "none", transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-nav-link)")}
            >Search</Link>

            <Link href="/cart" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--c-nav-link)", transition: "color 0.15s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--c-text)")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--c-nav-link)")}
              >Cart</span>
              {count > 0 && (
                <span style={{ background: "#e8a000", color: "#000", borderRadius: "50%", width: 16, height: 16, fontSize: 8, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, lineHeight: 1 }}>
                  {count}
                </span>
              )}
            </Link>

            <button onClick={toggle} aria-label="Toggle theme"
              style={{ background: "none", border: "1px solid var(--c-border)", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", color: "var(--c-text)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--c-border)"; }}
            >
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>

            <Link href="/auth/login" style={{
              fontFamily: FO, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--c-btn-text)", background: "var(--c-btn-bg)",
              textDecoration: "none", padding: "9px 20px",
              transition: "opacity 0.2s", lineHeight: 1,
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >Login</Link>
          </div>

          {/* Mobile Actions — Search + Hamburger only */}
          <div className="pk-mobile-actions" style={{ display: "none", alignItems: "center", gap: 4 }}>

            {/* Search icon */}
            <Link href="/collection" style={{ ...iconBtn, textDecoration: "none" }}>
              <IconSearch />
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
              style={{ ...iconBtn, flexDirection: "column", gap: 4, padding: "6px 4px" }}>
              <span style={{ display: "block", width: 20, height: 2, background: "var(--c-text)", borderRadius: 2, transition: "all 0.25s", transform: mobileOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
              <span style={{ display: "block", width: 20, height: 2, background: "var(--c-text)", borderRadius: 2, transition: "all 0.25s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 20, height: 2, background: "var(--c-text)", borderRadius: 2, transition: "all 0.25s", transform: mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div onClick={() => setMobileOpen(false)} style={{
        position: "fixed", inset: 0, zIndex: 98,
        background: "rgba(0,0,0,0.45)",
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? "auto" : "none",
        transition: "opacity 0.3s",
      }} />

      {/* Mobile Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "80vw", maxWidth: 320,
        background: "var(--c-bg)", zIndex: 99,
        overflowY: "auto",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
      }}>

        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--c-border)", flexShrink: 0 }}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="PosterKing" className="pk-logo" style={{ height: 36, objectFit: "contain" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Theme toggle inside drawer */}
            <button onClick={toggle} aria-label="Toggle theme" style={{ background: "none", border: "1px solid var(--c-border)", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-text)", flexShrink: 0 }}>
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--c-text)", display: "flex", padding: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
          {nav.map(item => (
            <div key={item.label}>
              <div
                onClick={() => {
                  if (item.children) {
                    setOpenSub(openSub === item.label ? null : item.label);
                  } else {
                    setMobileOpen(false);
                  }
                }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", cursor: "pointer", borderBottom: "1px solid var(--c-border)" }}
              >
                {item.children ? (
                  <span style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--c-text)" }}>
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} onClick={() => setMobileOpen(false)} style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--c-text)", textDecoration: "none", flex: 1 }}>
                    {item.label}
                  </Link>
                )}
                {item.children && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: "var(--c-text-muted)", transition: "transform 0.2s", transform: openSub === item.label ? "rotate(180deg)" : "none", flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                )}
              </div>

              {/* Submenu */}
              {item.children && openSub === item.label && (
                <div style={{ background: "var(--c-bg-soft)" }}>
                  {item.children.map(child => (
                    <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)} style={{
                      display: "block", padding: "11px 20px 11px 32px",
                      fontFamily: F, fontSize: 12, fontWeight: 500,
                      color: "var(--c-text-muted)", textDecoration: "none",
                      borderBottom: "1px solid var(--c-border)",
                    }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawer bottom CTAs */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--c-border)", display: "flex", gap: 10, flexShrink: 0 }}>
          <Link href="/cart" onClick={() => setMobileOpen(false)} style={{
            flex: 1, padding: "13px 0", textAlign: "center",
            border: "1.5px solid var(--c-text)", color: "var(--c-text)",
            fontFamily: FO, fontSize: 11, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <IconBag />
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
          <Link href="/auth/login" onClick={() => setMobileOpen(false)} style={{
            flex: 1, padding: "13px 0", textAlign: "center",
            background: "var(--c-btn-bg)", color: "var(--c-btn-text)",
            fontFamily: FO, fontSize: 11, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <IconUser />
            Login
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .pk-desktop-nav     { display: none !important; }
          .pk-desktop-actions { display: none !important; }
          .pk-mobile-actions  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
