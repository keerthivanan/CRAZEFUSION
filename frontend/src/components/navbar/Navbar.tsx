"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { gsap } from "gsap";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const navCards = [
  {
    label: "Cricket",
    href: "/cricket",
    bgColor: "#0d1f0d",
    textColor: "#fff",
    links: [
      { label: "All Cricket",           href: "/cricket" },
      { label: "Chennai Super Kings",   href: "/cricket?team=CSK" },
      { label: "Mumbai Indians",        href: "/cricket?team=MI" },
      { label: "Royal Challengers",     href: "/cricket?team=RCB" },
      { label: "Kolkata Knight Riders", href: "/cricket?team=KKR" },
      { label: "Sunrisers Hyderabad",   href: "/cricket?team=SRH" },
    ],
  },
  {
    label: "Basketball",
    href: "/basketball",
    bgColor: "#1B1722",
    textColor: "#fff",
    links: [
      { label: "All Basketball",        href: "/basketball" },
      { label: "LA Lakers",             href: "/basketball?team=LAL" },
      { label: "Golden State Warriors", href: "/basketball?team=GSW" },
      { label: "Chicago Bulls",         href: "/basketball?team=CHI" },
      { label: "Miami Heat",            href: "/basketball?team=MIA" },
      { label: "Boston Celtics",        href: "/basketball?team=BOS" },
    ],
  },
  {
    label: "Football",
    href: "/football",
    bgColor: "#2F293A",
    textColor: "#fff",
    links: [
      { label: "All Football",    href: "/football" },
      { label: "Real Madrid",     href: "/football?team=RMA" },
      { label: "FC Barcelona",    href: "/football?team=FCB" },
      { label: "Manchester City", href: "/football?team=MCI" },
      { label: "Liverpool FC",    href: "/football?team=LIV" },
      { label: "Arsenal",         href: "/football?team=ARS" },
    ],
  },
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
  const [isOpen, setIsOpen] = useState(false);
  const navRef   = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef    = useRef<gsap.core.Timeline | null>(null);
  const { count } = useCart();
  const { theme, toggle } = useTheme();

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  const calcHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 280;
    if (isMobile()) {
      const contentEl = navEl.querySelector(".cn-content") as HTMLElement;
      if (contentEl) {
        const saved = {
          v: contentEl.style.visibility,
          p: contentEl.style.pointerEvents,
          pos: contentEl.style.position,
          h: contentEl.style.height,
        };
        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        contentEl.offsetHeight;
        const total = 60 + contentEl.scrollHeight + 16;
        Object.assign(contentEl.style, { visibility: saved.v, pointerEvents: saved.p, position: saved.pos, height: saved.h });
        return total;
      }
    }
    return 280;
  };

  const buildTl = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(navEl,  { height: 60, overflow: "hidden" });
    gsap.set(cards,  { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calcHeight, duration: 0.42, ease: "circ.out" });
    tl.to(cards, { y: 0, opacity: 1, duration: 0.38, ease: "circ.out", stagger: 0.08 }, "-=0.12");
    return tl;
  };

  useLayoutEffect(() => {
    tlRef.current = buildTl();
    return () => { tlRef.current?.kill(); tlRef.current = null; };
  }, []);

  useLayoutEffect(() => {
    const onResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const newTl = buildTl();
      if (!newTl) return;
      if (isOpen) { newTl.progress(1); }
      tlRef.current = newTl;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  const navBg   = theme === "dark" ? "#111111" : "#ffffff";
  const iconClr = theme === "dark" ? "#ffffff" : "#111111";
  const borderClr = theme === "dark" ? "#2a2a2a" : "#e5e5e5";
  const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

  return (
    <>
      {/* Floating wrapper */}
      <div className="nav-wrapper" style={{
        position: "fixed", top: 58, left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 24px)", maxWidth: 920,
        zIndex: 1000,
      }}>
        <nav
          ref={navRef}
          style={{
            height: 60, borderRadius: 14, overflow: "hidden",
            background: navBg,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            position: "relative", willChange: "height",
            border: `1px solid ${borderClr}`,
          }}
        >
          {/* ── Top bar ── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 60,
            display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 10px", zIndex: 2,
          }}>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5, color: iconClr, flexShrink: 0 }}
            >
              <span style={{ display: "block", width: 26, height: 2, background: "currentColor", borderRadius: 2, transition: "transform 0.28s ease", transformOrigin: "50% 50%", transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: 26, height: 2, background: "currentColor", borderRadius: 2, transition: "opacity 0.2s", opacity: isOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 26, height: 2, background: "currentColor", borderRadius: 2, transition: "transform 0.28s ease", transformOrigin: "50% 50%", transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>

            {/* Logo — centered */}
            <Link href="/" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textDecoration: "none", flexShrink: 0 }}>
              <img src="/logo.png" alt="CrazeFusion" className="nav-logo" style={{ height: 52, width: "auto", objectFit: "contain", display: "block", filter: theme === "dark" ? "invert(1)" : "none", transition: "filter 0.2s" }} />
            </Link>

            {/* Right: theme + cart + login */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <button onClick={toggle} aria-label="Toggle theme"
                style={{ background: "none", border: `1px solid ${borderClr}`, borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: iconClr, flexShrink: 0, transition: "border-color 0.2s" }}>
                {theme === "light" ? <IconMoon /> : <IconSun />}
              </button>

              <Link href="/cart" style={{ position: "relative", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, color: iconClr, flexShrink: 0 }}>
                <IconBag />
                {count > 0 && (
                  <span style={{ position: "absolute", top: 3, right: 3, background: "#e8a000", color: "#000", borderRadius: "50%", width: 14, height: 14, fontSize: 7, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                    {count}
                  </span>
                )}
              </Link>

              <Link href="/auth/login"
                style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", padding: "8px 14px", borderRadius: 50, background: "#111", color: "#fff", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Login
              </Link>
            </div>
          </div>

          {/* ── Cards ── */}
          <div
            className="cn-content"
            style={{
              position: "absolute", left: 0, right: 0, top: 60, bottom: 0,
              padding: 8,
              display: "flex", gap: 8,
              flexDirection: "column",
              visibility: isOpen ? "visible" : "hidden",
              pointerEvents: isOpen ? "auto" : "none",
            }}
            aria-hidden={!isOpen}
          >
            {navCards.map((card, idx) => (
              <div
                key={card.label}
                ref={el => { cardsRef.current[idx] = el; }}
                style={{
                  background: card.bgColor, color: card.textColor,
                  borderRadius: 10, padding: "12px 16px",
                  display: "flex", flexDirection: "column", gap: 6,
                  flex: "1 1 auto", minHeight: 60,
                }}
              >
                <Link href={card.href} style={{ fontFamily: FO, fontSize: 18, fontWeight: 400, color: "#fff", textDecoration: "none", letterSpacing: "-0.3px" }}>
                  {card.label}
                </Link>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", marginTop: "auto" }}>
                  {card.links.map(link => (
                    <Link key={link.label} href={link.href}
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "none", color: "rgba(255,255,255,0.75)", fontFamily: FO, fontSize: 12, fontWeight: 400, padding: "3px 0", transition: "color 0.18s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
                    >
                      <GoArrowUpRight size={12} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Click-outside overlay */}
        {isOpen && (
          <div
            onClick={toggleMenu}
            style={{ position: "fixed", inset: 0, zIndex: -1 }}
            aria-hidden="true"
          />
        )}
      </div>

      <style>{`
        @media (min-width: 769px) {
          .cn-content { flex-direction: row !important; }
        }
        @media (max-width: 768px) {
          .nav-wrapper { top: 42px !important; width: calc(100% - 16px) !important; }
          .nav-logo    { height: 38px !important; }
        }
      `}</style>
    </>
  );
}
