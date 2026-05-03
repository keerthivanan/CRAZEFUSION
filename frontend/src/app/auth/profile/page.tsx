"use client";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { useTheme } from "@/context/ThemeContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const menuSections = [
  {
    title: "Orders",
    items: [
      { label: "My Orders", sub: "Track and manage your purchases", href: "/collection" },
      { label: "Wishlist", sub: "Products you have saved", href: "/collection" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Delivery Addresses", sub: "Add or edit shipping addresses", href: "/auth/profile" },
      { label: "Coupons & Offers", sub: "View available discount codes", href: "/auth/profile" },
      { label: "Reviews & Ratings", sub: "Your submitted reviews", href: "/reviews" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help & Support", sub: "FAQs and contact options", href: "/auth/profile" },
    ],
  },
];

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--c-text-muted)", flexShrink: 0 }}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ProfilePage() {
  const { theme, toggle } = useTheme();

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 108, maxWidth: 720, margin: "0 auto", padding: "108px 32px 80px" }}>

        {/* Account header */}
        <div style={{ paddingBottom: 32, marginBottom: 32, borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: 10 }}>
            Account
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: FO, fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Guest User
              </div>
              <Link href="/auth/login" style={{ fontFamily: FO, fontSize: 12, color: "#e8a000", textDecoration: "none", fontWeight: 600, display: "inline-block", marginTop: 8, letterSpacing: "0.04em" }}>
                Sign in to your account →
              </Link>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Link href="/auth/login" style={{
                padding: "12px 28px", background: "var(--c-text)", color: "var(--c-bg)",
                fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", textDecoration: "none", borderRadius: 50,
                transition: "opacity 0.2s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
              >
                Sign In
              </Link>
              <Link href="/auth/signup" style={{
                padding: "12px 28px", border: "1px solid var(--c-border)",
                fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none", color: "var(--c-text-muted)",
                borderRadius: 50, transition: "border-color 0.2s, color 0.2s", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--c-text)"; el.style.color = "var(--c-text)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--c-border)"; el.style.color = "var(--c-text-muted)"; }}
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Menu sections */}
        {menuSections.map(section => (
          <div key={section.title} style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
              {section.title}
            </div>
            <div style={{ border: "1px solid var(--c-border)" }}>
              {section.items.map((item, i) => (
                <Link key={item.label} href={item.href} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 20px",
                  textDecoration: "none",
                  borderTop: i === 0 ? "none" : "1px solid var(--c-border)",
                  transition: "background 0.15s",
                  background: "transparent",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-bg-soft)"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "transparent"}
                >
                  <div>
                    <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "var(--c-text)", letterSpacing: "0.01em" }}>{item.label}</div>
                    <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", marginTop: 3 }}>{item.sub}</div>
                  </div>
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Appearance */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: FO, fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#888", marginBottom: 12 }}>
            Appearance
          </div>
          <div style={{ border: "1px solid var(--c-border)", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ color: "var(--c-text-muted)" }}>
                {theme === "dark" ? <IconMoon /> : <IconSun />}
              </div>
              <div>
                <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "var(--c-text)" }}>
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </div>
                <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", marginTop: 3 }}>
                  Switch site appearance
                </div>
              </div>
            </div>
            <button
              onClick={toggle}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: theme === "dark" ? "#e8a000" : "var(--c-border)",
                border: "none", cursor: "pointer", position: "relative", transition: "background 0.25s", flexShrink: 0,
              }}
            >
              <div style={{
                position: "absolute", top: 3,
                left: theme === "dark" ? 25 : 3,
                width: 20, height: 20, borderRadius: "50%",
                background: "#fff", transition: "left 0.25s",
                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
              }} />
            </button>
          </div>
        </div>

        <div style={{ fontFamily: FO, fontSize: 10, color: "var(--c-text-muted)", letterSpacing: "0.08em", textAlign: "center" }}>
          CRAZEFUSION — Premium Poster Prints
        </div>
      </main>
    </div>
  );
}
