"use client";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

/* ─── Category data ─────────────────────────────────────────────── */
const cats = [
  {
    label: ["Cricket", "Collections"],
    href: "/cricket",
    img: "/categories/cricket_legends.png",
    bg: "#1a4a2e",
  },
  {
    label: ["Basketball", "Collections"],
    href: "/basketball",
    img: "/categories/basketball_legends.png",
    bg: "#1a2e4a",
  },
  {
    label: ["Football", "Collections"],
    href: "/football",
    img: "/categories/football_legends.png",
    bg: "#2e1a4a",
  },
  {
    label: ["Custom", "Poster"],
    href: "/custom-builder",
    img: null,
    bg: "linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)",
    icon: "✦",
    iconSub: "Design",
  },
  {
    label: ["All", "Collections"],
    href: "/collection",
    img: null,
    bg: "linear-gradient(135deg, #111 0%, #444 100%)",
    icon: "⊞",
    iconSub: "Browse",
  },
];

type Cat = typeof cats[0];

function CatCircle({ cat }: { cat: Cat }) {
  return (
    <Link
      href={cat.href}
      style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
    >
      <div
        className="cat-circle"
        style={{
          width: 96, height: 96, borderRadius: "50%", overflow: "hidden",
          border: "2px solid var(--c-border)",
          background: cat.img ? "var(--c-bg-soft)" : cat.bg,
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, position: "relative",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(-6px)";
          el.style.boxShadow = "0 12px 28px rgba(160,160,160,0.30)";
          el.style.borderColor = "#888888";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "none";
          el.style.borderColor = "var(--c-border)";
        }}
      >
        {cat.img ? (
          <img
            src={cat.img}
            alt={cat.label.join(" ")}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 26, color: "#fff", lineHeight: 1 }}>{(cat as any).icon}</span>
            <span style={{ fontFamily: FO, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {(cat as any).iconSub}
            </span>
          </div>
        )}
      </div>

      {/* Label — Title Case, regular weight, 2 lines */}
      <div style={{ textAlign: "center", lineHeight: 1.5 }}>
        {cat.label.map((line, i) => (
          <div key={i} style={{
            fontFamily: FO,
            fontSize: 12,
            fontWeight: i === 0 ? 500 : 400,
            color: "var(--c-text)",
            letterSpacing: 0,
          }}>
            {line}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function CategoryIcons() {
  return (
    <section style={{ padding: "36px 0 32px", background: "var(--c-bg)" }}>
      <div
        className="cat-icons-row"
        style={{
          maxWidth: 1400, margin: "0 auto", padding: "0 32px",
          display: "flex", alignItems: "flex-start",
          justifyContent: "center", gap: 52, flexWrap: "wrap",
        }}
      >
        {cats.map(cat => (
          <CatCircle key={cat.href} cat={cat} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cat-icons-row { gap: 24px !important; padding: 0 16px !important; }
          .cat-circle    { width: 72px !important; height: 72px !important; }
        }
        @media (max-width: 480px) {
          .cat-icons-row { gap: 14px !important; }
          .cat-circle    { width: 60px !important; height: 60px !important; }
        }
      `}</style>
    </section>
  );
}
