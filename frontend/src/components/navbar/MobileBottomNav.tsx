"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const IconGrid = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconBag = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const tabs = [
  { href: "/",           label: "Home",       icon: IconHome },
  { href: "/collection", label: "Shop",       icon: IconGrid },
  { href: "/cart",       label: "Cart",       icon: IconBag  },
  { href: "/auth/login", label: "Account",    icon: IconUser },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="mobile-bottom-nav" style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: 64,
      background: "var(--c-bg)",
      borderTop: "1px solid var(--c-border)",
      display: "flex", alignItems: "stretch",
      zIndex: 999,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        const isCart = href === "/cart";
        return (
          <Link key={href} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
            textDecoration: "none",
            color: active ? "var(--c-text)" : "var(--c-text-muted)",
            transition: "color 0.15s",
            position: "relative",
          }}>
            <div style={{ position: "relative" }}>
              <Icon />
              {isCart && count > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -6,
                  background: "#e8a000", color: "#000",
                  borderRadius: "50%", width: 16, height: 16,
                  fontSize: 8, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FO, lineHeight: 1,
                }}>
                  {count}
                </span>
              )}
            </div>
            <span style={{
              fontFamily: FO, fontSize: 9, fontWeight: active ? 700 : 500,
              letterSpacing: "0.05em", textTransform: "uppercase",
            }}>
              {label}
            </span>
            {active && (
              <div style={{
                position: "absolute", top: 0, left: "50%",
                transform: "translateX(-50%)",
                width: 28, height: 2,
                background: "var(--c-text)",
                borderRadius: "0 0 2px 2px",
              }} />
            )}
          </Link>
        );
      })}

      <style>{`
        .mobile-bottom-nav { display: none; }
        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
