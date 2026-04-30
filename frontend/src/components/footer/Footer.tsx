"use client";
import Link from "next/link";
import CountUp from "@/components/reactbits/CountUp";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const links = {
  Shop: [
    ["All Posters",     "/collection"],
    ["Cars & Bikes",    "/collection"],
    ["Anime",           "/collection"],
    ["Movies",          "/collection"],
    ["Gaming",          "/collection"],
    ["Custom Poster",   "/custom-builder"],
  ],
  Collections: [
    ["Split Posters",   "/collection"],
    ["Collage Kits",    "/collection"],
    ["Retro Prints",    "/custom-builder"],
    ["8-Panel Sets",    "/collection"],
    ["Bulk Orders",     "/collection"],
  ],
  Help: [
    ["Track Order",       "/tracking"],
    ["Returns & Refunds", "/collection"],
    ["Shipping Policy",   "/collection"],
    ["FAQs",              "/collection"],
    ["Contact Us",        "/collection"],
  ],
};

const payments = ["UPI", "Razorpay", "Visa", "Mastercard", "Net Banking", "COD"];

export default function Footer() {
  return (
    <footer style={{ background: "#000000", color: "#ffffff", borderTop: "1px solid #1a1a1a" }}>

      {/* Main footer content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 64, marginBottom: 64 }} className="footer-grid">

          {/* Brand column */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
              <img src="/logo.png" alt="POSTERKING" style={{ height: 60, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", transition: "transform 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            </Link>
            <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 16, height: 2, background: "#e8a000" }} />
              Premium Quality Prints
            </div>
            <p style={{ fontFamily: F, fontSize: 14, color: "#888", lineHeight: 1.8, maxWidth: 300, marginBottom: 32 }}>
              India&apos;s #1 destination for premium automotive and anime wall art. Over <CountUp to={2400} from={0} duration={2} />+ curated designs. Pan-India delivery in <CountUp to={5} from={0} />–<CountUp to={7} from={0} /> days.
            </p>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              <a href="mailto:support@posterking.in" style={{ fontFamily: F, fontSize: 13, color: "#aaa", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e8a000")}
                onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>
                support@posterking.in
              </a>
              <a href="https://wa.me/9191709xxxxx" target="_blank" rel="noreferrer"
                style={{ fontFamily: F, fontSize: 13, color: "#aaa", textDecoration: "none", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = "#34c759")}
                onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>
                WhatsApp Support
              </a>
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 12 }}>
              {[["IN", "https://instagram.com/posterking"], ["YT", "https://youtube.com/posterking"], ["TW", "https://twitter.com/posterking"]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ width: 38, height: 38, border: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FO, fontSize: 10, fontWeight: 800, color: "#666", textDecoration: "none", transition: "all 0.3s ease", letterSpacing: "0.05em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#fff"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = "#111"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLAnchorElement).style.color = "#666"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(links) as [string, string[][]][]).map(([cat, items]) => (
            <div key={cat}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 28 }}>
                {cat}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map(([label, href]) => (
                  <Link key={label} href={href}
                    style={{ fontFamily: F, fontSize: 14, color: "#666", textDecoration: "none", transition: "all 0.2s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Payment badges */}
        <div style={{ borderTop: "1px solid #111", borderBottom: "1px solid #111", padding: "24px 0", marginBottom: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginRight: 8 }}>Secure Checkout</span>
          {payments.map(p => (
            <div key={p} style={{ padding: "6px 16px", border: "1px solid #1a1a1a", fontFamily: F, fontSize: 10, fontWeight: 700, color: "#555", letterSpacing: "0.08em", borderRadius: "2px" }}>
              {p}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: F, fontSize: 12, color: "#555", letterSpacing: "0.02em" }}>
            © 2026 PosterKing · All artwork is fan art, not official merchandise.
          </div>
          <div className="footer-bottom-links" style={{ display: "flex", gap: 24 }}>
            {[["Privacy Policy", "/collection"], ["Terms of Service", "/collection"], ["Refund Policy", "/collection"]].map(([label, href]) => (
              <Link key={label} href={href}
                style={{ fontFamily: F, fontSize: 12, color: "#555", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#aaa")}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-grid div { align-items: center; justify-content: center; }
          .footer-grid p { margin-left: auto; margin-right: auto; }
          .footer-grid div[style*="flex"] { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
