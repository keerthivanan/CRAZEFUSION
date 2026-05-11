"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
  </svg>
);

const IconGrid = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const IconSparkle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const TABS = [
  { href: "/",           label: "Home",   Icon: IconHome },
  { href: "/collection", label: "Shop",   Icon: IconGrid },
  { href: "/create",     label: "AI",     Icon: IconSparkle, gold: true },
  { href: "/cart",       label: "Cart",   Icon: IconBag,  isCart: true },
  { href: "/partner",    label: "Sell",   Icon: IconUser },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="mobile-bottom-nav" style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      zIndex: 999,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {/* Glassmorphism pill */}
      <div style={{ margin: "0 12px 12px", background: "rgba(10,10,10,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "stretch", height: 60, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
        {TABS.map(({ href, label, Icon, gold, isCart }) => {
          const active  = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 3,
              textDecoration: "none",
              color: active ? "#fff" : "#555",
              position: "relative",
              transition: "color 0.15s",
              background: "transparent",
            }}>
              {/* Active indicator */}
              {active && !gold && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: "#fff", borderRadius: "0 0 2px 2px" }} />
              )}
              {/* Gold glow for AI tab */}
              {gold && (
                <div style={{ position: "absolute", inset: 0, background: "transparent", pointerEvents: "none" }} />
              )}
              <div style={{ position: "relative" }}>
                <Icon />
                {isCart && count > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#fff", color: "#000", borderRadius: "50%", width: 16, height: 16, fontSize: 8, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FO, lineHeight: 1 }}>
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: FO, fontSize: 9, fontWeight: active || gold ? 700 : 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .mobile-bottom-nav { display: none; }
        @media (max-width: 860px) {
          .mobile-bottom-nav { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
