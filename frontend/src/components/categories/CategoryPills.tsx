"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { label: "Custom Poster", href: "/custom-builder" },
  { label: "Superhero", href: "/collection" },
  { label: "Cars", href: "/collection" },
  { label: "Movies", href: "/collection" },
  { label: "TV Series", href: "/collection" },
  { label: "Music", href: "/collection" },
  { label: "Gaming", href: "/collection" },
  { label: "Motivation", href: "/collection" },
  { label: "Cricket", href: "/collection" },
  { label: "Football", href: "/collection" },
  { label: "F1", href: "/collection" },
  { label: "Explore More", href: "/collection" },
];

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function CategoryPills() {
  const [active, setActive] = useState("Custom Poster");

  return (
    <section style={{ padding: "56px 0 40px", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,34px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 32, textAlign: "center" }}>
          Browse Collections
        </h2>
        <div className="no-scrollbar" style={{ display: "flex", gap: 10, overflowX: "auto", justifyContent: "center", flexWrap: "wrap" }}>
          {categories.map(cat => (
            <Link key={cat.label} href={cat.href}
              onClick={() => setActive(cat.label)}
              style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "12px 20px", background: active === cat.label ? "#111" : "#f7f7f7", border: `1px solid ${active === cat.label ? "#111" : "#e8e8e8"}`, borderRadius: 2, transition: "all 0.2s ease", cursor: "pointer", minWidth: 90, textAlign: "center" }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: active === cat.label ? "#fff" : "#333", whiteSpace: "nowrap" }}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
