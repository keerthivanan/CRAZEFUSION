"use client";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const menuItems = [
  { icon: "📦", label: "My Orders",     href: "/collection",   sub: "Track & view your orders" },
  { icon: "❤️", label: "Wishlist",       href: "/collection",   sub: "Saved items" },
  { icon: "📍", label: "Addresses",      href: "/auth/profile", sub: "Manage delivery addresses" },
  { icon: "🎫", label: "Coupons",        href: "/auth/profile", sub: "View available offers" },
  { icon: "⭐", label: "Reviews",        href: "/reviews",      sub: "Your product reviews" },
  { icon: "❓", label: "Help & Support", href: "/auth/profile", sub: "FAQs and contact us" },
];

export default function ProfilePage() {
  const { theme, toggle } = useTheme();

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: 34 }}>

      {/* Top logo */}
      <div style={{ padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link href="/" style={{ display: "block", lineHeight: 0 }}>
          <img src="/logo.png" alt="CrazeFusion" className="pk-logo"
            style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }} />
        </Link>
      </div>

      <div style={{ flex: 1, maxWidth: 480, width: "100%", margin: "0 auto", padding: "8px 24px 48px" }}>

        {/* Avatar + Name */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "#e8a000",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 32,
          }}>
            👤
          </div>
          <div style={{ fontFamily: FO, fontSize: 18, fontWeight: 700, color: "var(--c-text)", marginBottom: 4 }}>
            Guest User
          </div>
          <Link href="/auth/login" style={{
            fontFamily: FO, fontSize: 12, color: "#e8a000",
            textDecoration: "none", fontWeight: 600,
          }}>
            Sign in to your account →
          </Link>
        </div>

        {/* Theme Toggle Card */}
        <div style={{
          background: "var(--c-bg-soft)",
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 12,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: theme === "dark" ? "#1a1a2e" : "#fff7e6",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#e8a000",
            }}>
              {theme === "dark" ? <IconMoon /> : <IconSun />}
            </div>
            <div>
              <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: "var(--c-text)" }}>
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </div>
              <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", marginTop: 2 }}>
                Switch appearance
              </div>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            onClick={toggle}
            style={{
              width: 52, height: 28,
              borderRadius: 14,
              background: theme === "dark" ? "#e8a000" : "var(--c-border)",
              border: "none", cursor: "pointer",
              position: "relative",
              transition: "background 0.25s",
              flexShrink: 0,
            }}
          >
            <div style={{
              position: "absolute",
              top: 3,
              left: theme === "dark" ? 27 : 3,
              width: 22, height: 22,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.25s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }} />
          </button>
        </div>

        {/* Menu Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "16px 20px",
              background: "var(--c-bg-soft)",
              borderRadius: 12,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-bg-card)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-bg-soft)"}
            >
              <span style={{ fontSize: 20, width: 36, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: "var(--c-text)" }}>{item.label}</div>
                <div style={{ fontFamily: FO, fontSize: 11, color: "var(--c-text-muted)", marginTop: 2 }}>{item.sub}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Sign in CTA */}
        <div style={{ marginTop: 24 }}>
          <Link href="/auth/login" style={{
            display: "block", padding: "15px 0", textAlign: "center",
            background: "var(--c-text)", color: "var(--c-bg)",
            fontFamily: FO, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", borderRadius: 50,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = "1"}
          >
            Sign In
          </Link>
          <Link href="/auth/signup" style={{
            display: "block", padding: "14px 0", textAlign: "center", marginTop: 8,
            border: "1px solid var(--c-border)",
            fontFamily: FO, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", color: "var(--c-text-muted)", borderRadius: 50,
          }}>
            Create Account
          </Link>
        </div>

        {/* App version */}
        <div style={{ textAlign: "center", marginTop: 32, fontFamily: FO, fontSize: 10, color: "var(--c-text-muted)", letterSpacing: "0.1em" }}>
          CRAZEFUSION · v1.0
        </div>
      </div>
    </div>
  );
}
