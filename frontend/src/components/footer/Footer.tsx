"use client";
import Link from "next/link";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

const links = {
  Shop:        [["All Posters","/collection"],["Cars & Bikes","/collection"],["Anime","/collection"],["Movies","/collection"],["Custom Poster","/custom-builder"]],
  Collections: [["Split Posters","/collection"],["Collage Kits","/collection"],["Retro Prints","/collection"],["Stickers","/collection"],["Bulk Orders","/collection"]],
  Help:        [["Track Order","/tracking"],["FAQs","/collection"],["Returns & Refunds","/collection"],["Shipping Policy","/collection"],["Contact Us","/collection"]],
};

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e", padding: "56px 32px 28px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14 }}>
              POSTER<span style={{ color: "#e8a000" }}>KING</span>
            </div>
            <p style={{ fontFamily: F, fontSize: 13, color: "#666", lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              India&apos;s #1 premium poster store. 1,981+ designs. Free shipping on prepaid orders. 5–7 day delivery.
            </p>
            <div style={{ fontFamily: F, fontSize: 12, color: "#444" }}>support@posterking.in</div>
          </div>

          {(Object.entries(links) as [string, string[][]][]).map(([cat, items]) => (
            <div key={cat}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 18 }}>{cat}</div>
              {items.map(([label, href]) => (
                <Link key={label} href={href}
                  style={{ display: "block", fontFamily: F, fontSize: 13, color: "#666", textDecoration: "none", marginBottom: 8, transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: "#1a1a1a", marginBottom: 20 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: F, fontSize: 11, color: "#444", letterSpacing: "0.04em" }}>
            © 2026 PosterKing · All artwork is fan art, not official merchandise.
          </div>
          <div style={{ fontFamily: F, fontSize: 11, color: "#444" }}>Secured by Razorpay · UPI · Cards · COD</div>
        </div>
      </div>
    </footer>
  );
}
