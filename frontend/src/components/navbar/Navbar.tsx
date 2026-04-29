"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

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
    { label: "9-Piece Epic Splits",   href: "/collection?cat=Split+Posters" },
    { label: "8-Panel Wall Sets",     href: "/collection?cat=Split+Posters" },
    { label: "50-Piece Collage Kit",  href: "/collection?cat=Collage+Kits" },
    { label: "3-Piece Sets",          href: "/collection?cat=Split+Posters" },
    { label: "Best Selling",          href: "/collection" },
  ]},
  { label: "Retro Prints",    href: "/custom-builder" },
  { label: "Custom Posters",  href: "/custom-builder" },
  { label: "Stickers",        href: "/collection?cat=Stickers" },
  { label: "Reviews",         href: "/reviews" },
];

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: "1px solid #e8e8e8", boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.3s" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "#111", letterSpacing: "-0.03em" }}>
              POSTER<span style={{ color: "#e8a000" }}>KING</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }} className="desktop-nav">
            {nav.map(item => (
              <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}>
                <Link href={item.href}
                  style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#444", textDecoration: "none", padding: "8px 10px", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#000")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
                  {item.label}
                  {item.children && <span style={{ fontSize: 7, opacity: 0.5 }}>▼</span>}
                </Link>

                {item.children && openMenu === item.label && (
                  <div style={{ position: "absolute", top: "calc(100% + 1px)", left: 0, background: "#fff", border: "1px solid #e8e8e8", minWidth: 220, boxShadow: "0 8px 32px rgba(0,0,0,0.1)", zIndex: 200 }}>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href}
                        style={{ display: "block", padding: "10px 18px", fontFamily: F, fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", color: "#555", textDecoration: "none", borderBottom: "1px solid #f5f5f5", transition: "all 0.15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#f7f7f7"; (e.currentTarget as HTMLAnchorElement).style.color = "#000"; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "22px"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; (e.currentTarget as HTMLAnchorElement).style.color = "#555"; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "18px"; }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <Link href="/collection" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#666", transition: "color 0.15s", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#000")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
              Search
            </Link>
            <Link href="/cart" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#111" }}>Cart</span>
              {count > 0 && (
                <span style={{ background: "#e8a000", color: "#000", borderRadius: "50%", width: 18, height: 18, fontSize: 9, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F }}>
                  {count}
                </span>
              )}
            </Link>
            <Link href="/login"
              style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff", background: "#111", textDecoration: "none", padding: "8px 18px", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#333"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#111"; }}>
              Login
            </Link>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#111", padding: 4 }}
              className="hamburger-btn">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, background: "#fff", zIndex: 99, overflowY: "auto", borderTop: "1px solid #f0f0f0" }}>
          <div style={{ padding: "24px" }}>
            {nav.map(item => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "block", fontFamily: F, fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#111", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                  {item.label}
                </Link>
                {item.children && (
                  <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                        style={{ display: "block", fontFamily: F, fontSize: 12, color: "#666", textDecoration: "none", padding: "8px 0" }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <Link href="/cart" onClick={() => setMobileOpen(false)}
                style={{ flex: 1, padding: "13px 0", border: "1px solid #111", color: "#111", fontFamily: F, fontSize: 12, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                Cart {count > 0 ? `(${count})` : ""}
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)}
                style={{ flex: 1, padding: "13px 0", background: "#111", color: "#fff", fontFamily: F, fontSize: 12, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
