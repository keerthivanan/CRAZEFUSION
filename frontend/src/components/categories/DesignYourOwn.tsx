"use client";
import Link from "next/link";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const options = [
  { label: "Customize Your Wall", href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/custom_36a826e7-a7e6-4025-9e24-1cddaa3eb898.webp?v=1767176286&width=600" },
  { label: "3 Piece Split",       href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/FINAL.png?v=1767068039&width=600" },
  { label: "4 Piece 2×2 Grid",    href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/Custom_2X2_bc646270-f489-424f-9268-137650d0ebb4.jpg?v=1771995000&width=600" },
  { label: "Custom Retro Prints", href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/a6_0378f882-0c62-4116-83b8-90619198b73f.webp?v=1767173575&width=600" },
  { label: "Pocket Photos",       href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/mini.webp?v=1756821198&width=600" },
  { label: "Photobooth Strip",    href: "/custom-builder", img: "https://www.posterized.in/cdn/shop/files/strip_6a6180c0-06d1-4cb5-9d97-4e427f308d75.webp?v=1756821798&width=600" },
];

export default function DesignYourOwn() {
  return (
    <section style={{ padding: "40px 0", background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header image — exact like posterized */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src="https://www.posterized.in/cdn/shop/t/109/assets/Design%20Your%20Own.webp?v=34483322346460063121771843129"
            alt="Design Your Own" style={{ maxWidth: 300, height: "auto" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {options.map(opt => (
            <Link key={opt.label} href={opt.href} style={{ textDecoration: "none", display: "block", overflow: "hidden", position: "relative" }}>
              <div style={{ overflow: "hidden", aspectRatio: "16/9" }}>
                <img src={opt.img} alt={opt.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                  onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"}
                  onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
