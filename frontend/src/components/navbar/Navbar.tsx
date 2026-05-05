"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const NAV_LINKS = [
  { label: "Collection", href: "/collection" },
  { label: "Cars",        href: "/collection?cat=Cars" },
  { label: "Movies",      href: "/collection?cat=Movies" },
  { label: "Coffee",      href: "/collection?cat=Coffee+Shop" },
];

const IconBag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

export default function Navbar() {
  const { count } = useCart();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  const navBg    = theme === "dark" ? "#111111" : "#ffffff";
  const iconClr  = theme === "dark" ? "#ffffff" : "#111111";
  const borderClr = theme === "dark" ? "#2a2a2a" : "#e5e5e5";

  return (
    <>
      <div className="nav-wrapper" style={{
        position: "fixed", top: 44, left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 24px)", maxWidth: 1100,
        zIndex: 1000,
      }}>
        <nav style={{
          height: 60, borderRadius: 14, overflow: "hidden",
          background: navBg,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          border: `1px solid ${borderClr}`,
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 60,
            display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 16px",
          }}>

            {/* LEFT — nav links */}
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map(link => {
                const active = pathname === link.href || (link.href === "/collection" && pathname.startsWith("/collection"));
                return (
                  <Link key={link.label} href={link.href} style={{
                    fontFamily: FO, fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    textDecoration: "none",
                    color: active ? iconClr : (theme === "dark" ? "#888" : "#999"),
                    padding: "6px 10px", borderRadius: 8,
                    transition: "color 0.15s, background 0.15s",
                    whiteSpace: "nowrap",
                    background: active ? (theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)") : "transparent",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = iconClr}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = active ? iconClr : (theme === "dark" ? "#888" : "#999")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CENTER — logo */}
            <Link href="/" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textDecoration: "none" }}>
              <img src="/logo.png" alt="Logo" className="nav-logo-desktop" style={{ height: 52, width: "auto", objectFit: "contain", display: "block", filter: theme === "dark" ? "invert(1)" : "none", transition: "filter 0.2s" }} />
              <img src="/cf_mobile.png" alt="Logo" className="nav-logo-mobile" style={{ height: 36, width: "auto", objectFit: "contain", display: "none", filter: theme === "dark" ? "invert(1)" : "none", transition: "filter 0.2s" }} />
            </Link>

            {/* RIGHT — theme + cart + login */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button onClick={toggle} aria-label="Toggle theme" className="nav-theme-btn"
                style={{ background: "none", border: `1px solid ${borderClr}`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: iconClr, transition: "border-color 0.2s" }}>
                {theme === "light" ? <IconMoon /> : <IconSun />}
              </button>

              <Link href="/cart" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, color: iconClr }}>
                <IconBag />
                {count > 0 && (
                  <span style={{ position: "absolute", top: 3, right: 3, background: "#e8a000", color: "#000", borderRadius: "50%", width: 14, height: 14, fontSize: 7, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                    {count}
                  </span>
                )}
              </Link>

              <Link href="/auth/login" className="nav-login-desktop"
                style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", padding: "8px 14px", borderRadius: 50, background: "#111", color: "#fff", whiteSpace: "nowrap" }}
              >
                Login
              </Link>

              <Link href="/auth/profile" className="nav-user-mobile"
                style={{ display: "none", alignItems: "center", justifyContent: "center", width: 34, height: 34, color: iconClr, textDecoration: "none" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-wrapper       { top: 42px !important; width: calc(100% - 16px) !important; }
          .nav-links         { display: none !important; }
          .nav-logo-desktop  { display: none !important; }
          .nav-logo-mobile   { display: block !important; }
          .nav-theme-btn     { display: none !important; }
          .nav-login-desktop { display: none !important; }
          .nav-user-mobile   { display: flex !important; }
        }
        @media (max-width: 900px) and (min-width: 769px) {
          .nav-links a:nth-child(n+3) { display: none; }
        }
      `}</style>
    </>
  );
}
