"use client";
import Link from "next/link";
const F  = "var(--font-poppins-var,'Poppins',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

const links = {
  Shop: [
    ["All Posters",    "/collection"],
    ["Cars",           "/collection?cat=Cars"],
    ["Movies",         "/collection?cat=Movies"],
    ["Coffee Shop",    "/collection?cat=Coffee+Shop"],
    ["New Arrivals",   "/collection"],
  ],
  Info: [
    ["Free UK Delivery",   "/collection"],
    ["Printed in 48hrs",   "/collection"],
    ["30-Day Returns",     "/collection"],
    ["Bulk Orders",        "/collection"],
    ["Gift Wrapping",      "/collection"],
  ],
  Help: [
    ["Returns & Refunds",  "/collection"],
    ["Shipping Policy",    "/collection"],
    ["FAQs",               "/collection"],
    ["Contact Us",         "/collection"],
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#000000", color: "#ffffff", borderTop: "1px solid #1a1a1a" }}>

      {/* Main footer content */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 64, marginBottom: 64 }} className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand-col">
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
              <img src="/logo.png" alt="POSTERKING" style={{ height: 60, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", transition: "transform 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            </Link>
            <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e8a000", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 16, height: 2, background: "#e8a000" }} />
              Premium Quality Prints
            </div>
            <p style={{ fontFamily: F, fontSize: 14, color: "#888", lineHeight: 1.8, maxWidth: 300, marginBottom: 32 }}>
              The UK&apos;s destination for premium poster wall art. Over 600+ curated designs. Printed &amp; shipped in 48 hours.
            </p>

            {/* Contact */}
            <div className="footer-contact" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              <a href="mailto:support@yourstore.co.uk" style={{ fontFamily: F, fontSize: 13, color: "#aaa", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e8a000")}
                onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>
                support@yourstore.co.uk
              </a>
              <a href="https://wa.me/447700900000" target="_blank" rel="noreferrer"
                style={{ fontFamily: F, fontSize: 13, color: "#aaa", textDecoration: "none", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = "#34c759")}
                onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>
                WhatsApp Support
              </a>
            </div>

            {/* Social */}
            <div className="footer-socials" style={{ display: "flex", gap: 12 }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/crazefusion/" target="_blank" rel="noreferrer" aria-label="Instagram"
                style={{ width: 42, height: 42, border: "1px solid #1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#e1306c"; el.style.color = "#e1306c"; el.style.background = "#1a0008"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#1a1a1a"; el.style.color = "#666"; el.style.background = "transparent"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"
                style={{ width: 42, height: 42, border: "1px solid #1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#ff0000"; el.style.color = "#ff0000"; el.style.background = "#1a0000"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#1a1a1a"; el.style.color = "#666"; el.style.background = "transparent"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
                style={{ width: 42, height: 42, border: "1px solid #1a1a1a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", textDecoration: "none", transition: "all 0.3s ease" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#fff"; el.style.color = "#fff"; el.style.background = "#111"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "#1a1a1a"; el.style.color = "#666"; el.style.background = "transparent"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(links) as [string, string[][]][]).map(([cat, items]) => (
            <div key={cat} className="footer-links-col">
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

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: F, fontSize: 12, color: "#555", letterSpacing: "0.02em" }}>
            © 2026 All artwork is fan art, not official merchandise.
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
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 32px 20px !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-brand-col p { max-width: 100% !important; }
          .footer-brand-col .footer-contact { align-items: center; }
          .footer-brand-col .footer-socials { justify-content: center; }
          .footer-links-col { text-align: left; }
          .footer-payment { gap: 8px !important; }
          .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 12px !important; }
          .footer-bottom-links { gap: 16px !important; flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 16px !important;
          }
          .footer-brand-col { grid-column: 1 / -1; }
          footer { padding-left: 20px !important; padding-right: 20px !important; }
          footer > div { padding: 48px 20px 32px !important; }
        }
      `}</style>
    </footer>
  );
}
