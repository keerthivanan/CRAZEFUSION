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

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [openMenu, setOpenMenu]     = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--c-bg)",
        borderBottom: `1px solid ${scrolled ? "#e0e0e0" : "#ebebeb"}`,
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.07)" : "none",
        transition: "box-shadow 0.3s, border-color 0.3s",
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
                    border: "1px solid #ebebeb",
                    minWidth: 220,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                    zIndex: 200,
                    paddingTop: 4, paddingBottom: 4,
                  }}>
                    <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 10, height: 5, overflow: "hidden" }}>
                      <div style={{ width: 10, height: 10, background: "var(--c-bg)", border: "1px solid #ebebeb", transform: "rotate(45deg) translate(2px,2px)" }} />
                    </div>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href} style={{
                        display: "block", padding: "9px 18px",
                        fontFamily: F, fontSize: 12, fontWeight: 500,
                        color: "#555", textDecoration: "none",
                        transition: "all 0.12s",
                        borderBottom: "1px solid #f5f5f5",
                      }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "#fafafa";
                          el.style.color = "#111";
                          el.style.paddingLeft = "22px";
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLAnchorElement;
                          el.style.background = "";
                          el.style.color = "#555";
                          el.style.paddingLeft = "18px";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <Link href="/collection" style={{
              fontFamily: F, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: "var(--c-nav-link)", textDecoration: "none", transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--c-nav-link)")}
            >
              Search
            </Link>

            <Link href="/cart" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--c-nav-link)", transition: "color 0.15s" }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = "var(--c-text)")}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = "var(--c-nav-link)")}
              >Cart</span>
              {count > 0 && (
                <span style={{
                  background: "#e8a000", color: "#000",
                  borderRadius: "50%", width: 16, height: 16,
                  fontSize: 8, fontWeight: 900,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: F, lineHeight: 1,
                }}>
                  {count}
                </span>
              )}
            </Link>

            {/* Theme toggle */}
            <button onClick={toggle} aria-label="Toggle theme"
              style={{ background: "none", border: "1px solid #e0e0e0", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#111"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0"; }}
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </button>

            <Link href="/auth/login" style={{
              fontFamily: FO, fontSize: 11, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#fff", background: "#111",
              textDecoration: "none", padding: "9px 20px",
              transition: "background 0.2s", lineHeight: 1,
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#333")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = "#111")}
            >
              Login
            </Link>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="pk-hamburger"
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "4px 2px", flexDirection: "column", gap: 5 }}
              aria-label="Menu"
            >
              <span style={{ display: "block", width: 22, height: 2, background: "var(--c-text)", transition: "all 0.2s", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--c-text)", transition: "all 0.2s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: "var(--c-text)", transition: "all 0.2s", transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div style={{
        position: "fixed", top: 56, left: 0, right: 0, bottom: 0,
        background: "var(--c-bg)", zIndex: 99,
        overflowY: "auto",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        borderTop: "1px solid #f0f0f0",
      }}>
        <div style={{ padding: "24px 24px 40px" }}>
          {nav.map(item => (
            <div key={item.label}>
              <Link href={item.href} onClick={() => setMobileOpen(false)} style={{
                display: "block",
                fontFamily: FO, fontSize: 13, fontWeight: 700,
                letterSpacing: "0.07em", textTransform: "uppercase",
                color: "var(--c-text)", textDecoration: "none",
                padding: "13px 0", borderBottom: "1px solid var(--c-border)",
              }}>
                {item.label}
              </Link>
              {item.children && (
                <div style={{ paddingLeft: 12, paddingBottom: 4, background: "var(--c-bg-card)" }}>
                  {item.children.map(child => (
                    <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)} style={{
                      display: "block", fontFamily: F, fontSize: 12, color: "#777",
                      textDecoration: "none", padding: "9px 8px",
                      borderBottom: "1px solid #f5f5f5",
                    }}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
            <Link href="/cart" onClick={() => setMobileOpen(false)} style={{
              flex: 1, padding: "14px 0",
              border: "1.5px solid var(--c-text)", color: "var(--c-text)",
              fontFamily: FO, fontSize: 11, fontWeight: 700,
              textAlign: "center", textDecoration: "none",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Cart{count > 0 ? ` (${count})` : ""}
            </Link>
            <Link href="/auth/login" onClick={() => setMobileOpen(false)} style={{
              flex: 1, padding: "14px 0",
              background: "#111", color: "#fff",
              fontFamily: FO, fontSize: 11, fontWeight: 700,
              textAlign: "center", textDecoration: "none",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              Login
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .pk-desktop-nav { display: none !important; }
          .pk-hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
