"use client";
import Link from "next/link";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const KEY = process.env.NEXT_PUBLIC_LOGODEV_KEY ?? "pk_X0d9dkoXSXC1bEBCAvNs-g";

const logo = (domain: string) =>
  `https://img.logo.dev/${domain}?token=${KEY}&size=160&format=png`;

const cats = [
  { label: "Cricket",    href: "/cricket",    domain: "icc-cricket.com"   },
  { label: "Basketball", href: "/collection", domain: "nba.com"           },
  { label: "Football",   href: "/collection", domain: "fifa.com"          },
];

export default function CategoryIcons() {
  return (
    <section style={{ padding: "32px 0 28px", background: "var(--c-bg)" }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 64,
      }}>
        {cats.map(({ label, href, domain }) => (
          <Link key={label} href={href} style={{
            textDecoration: "none", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 84, height: 84, borderRadius: "50%",
              overflow: "hidden", flexShrink: 0,
              border: "2px solid var(--c-border)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 24px rgba(232,160,0,0.3)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#e8a000";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--c-border)";
              }}>
              <img
                src={logo(domain)}
                alt={label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <span style={{
              fontFamily: FO, fontSize: 11, fontWeight: 600,
              color: "var(--c-text)", textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
