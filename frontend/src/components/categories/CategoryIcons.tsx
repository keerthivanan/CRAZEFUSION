"use client";
import Link from "next/link";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const cats = [
  { label: "Custom Poster",    href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_1.webp?v=1752915982" },
  { label: "Superhero Collections", href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_11.webp?v=1752915992" },
  { label: "Car Collections",       href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_10.webp?v=1752915998" },
  { label: "Movie Collections",     href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_3.webp?v=1752916291" },
  { label: "TV-Series Collections", href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_2.webp?v=1752916304" },
  { label: "Music Collections",     href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_12.webp?v=1752916383" },
  { label: "Video Game Collections", href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_4.webp?v=1752916390" },
  { label: "Motivate Collections",   href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_5.webp?v=1752916394" },
  { label: "Cricket Collections",    href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_9.webp?v=1752916404" },
  { label: "Football Collections",   href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_7.webp?v=1752916412" },
  { label: "F1 Collections",         href: "/collection", img: "https://www.posterized.in/cdn/shop/files/ROUND_ICON_8.webp?v=1752916418" },
  { label: "Explore More !",         href: "/collection", img: "https://www.posterized.in/cdn/shop/files/Explore.png?v=1726206041" },
];

export default function CategoryIcons() {
  return (
    <section style={{ padding: "28px 0 24px", background: "var(--c-bg)" }}>
      <div className="cat-icons-row" style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}>
        {cats.map(cat => (
          <Link key={cat.label} href={cat.href} style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #eee",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "all 0.25s ease",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
                el.style.borderColor = "#111";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                el.style.borderColor = "#eee";
              }}>
              <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)",
              fontSize: 10,
              fontWeight: 600,
              color: "#222",
              textAlign: "center",
              lineHeight: 1.25,
              maxWidth: 72,
            }}>
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
