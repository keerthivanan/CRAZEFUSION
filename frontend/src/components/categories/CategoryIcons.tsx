"use client";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const cats = [
  { label: "Cricket",    href: "/collection" },
  { label: "Basketball", href: "/collection" },
  { label: "Football",   href: "/collection" },
];

export default function CategoryIcons() {
  return (
    <section style={{ padding: "0", background: "var(--c-bg)", borderBottom: "1px solid var(--c-border)" }}>
      <div className="no-scrollbar" style={{
        display: "flex",
        overflowX: "auto",
        gap: 0,
      }}>
        {cats.map((cat, i) => (
          <Link key={cat.label} href={cat.href} style={{
            textDecoration: "none",
            flexShrink: 0,
            padding: "14px 22px",
            fontFamily: FO,
            fontSize: 11,
            fontWeight: 500,
            color: "var(--c-text-muted)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            borderRight: i < cats.length - 1 ? "1px solid var(--c-border)" : "none",
            transition: "color 0.15s, background 0.15s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text)";
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--c-bg-soft)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--c-text-muted)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}>
            {cat.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
