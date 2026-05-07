"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { fetchProduct, fetchRelated, Product } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";


const FINISHES = ["Matte", "Satin Gloss"];

export default function ProductPage() {
  const { id } = useParams();
  const router  = useRouter();
  const { addItem } = useCart();

  const [p, setP]                           = useState<Product | null>(null);
  const [loading, setLoading]               = useState(true);
  const [related, setRelated]               = useState<Product[]>([]);

  const [selectedFinish, setSelectedFinish] = useState(0);
  const [activeImg, setActiveImg]           = useState(0);
  const [added, setAdded]                   = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const product = await fetchProduct(Number(id));
      if (product) {
        setP(product);
        const rel = await fetchRelated(product.category, Number(id), 5);
        setRelated(rel);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const imgs = p ? [p.img2, p.img] : [];
  const price    = p ? Number(p.price) : 0;
  const original = p ? Number(p.original_price) : 0;
  const discount = original > price ? Math.round((1 - price / original) * 100) : 0;

  const addToCart = () => {
    if (!p) return;
    addItem({ id: p.id, title: p.name, sub: p.sub, img: p.img, price, original, size: "A4 (21×30cm)", finish: FINISHES[selectedFinish] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const buyNow = () => { addToCart(); router.push("/checkout"); };

  if (loading) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 160, maxWidth: 1400, margin: "0 auto", padding: "160px 32px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div style={{ aspectRatio: "3/4", background: "var(--c-bg-soft)", borderRadius: 2, animation: "pulse 1.5s infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 40 }}>
          {[300, 200, 100, 150, 100].map((w, i) => (
            <div key={i} style={{ height: 20, width: w, background: "var(--c-bg-soft)", borderRadius: 4, animation: "pulse 1.5s infinite" }} />
          ))}
        </div>
      </div>
    </div>
  );

  if (!p) return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <Navbar />
      <div style={{ fontFamily: FO, fontSize: 32, fontWeight: 400, color: "var(--c-text)", paddingTop: 64 }}>Product not found</div>
      <Link href="/collection" style={{ fontFamily: FO, fontSize: 13, color: "#e8a000", textDecoration: "underline" }}>← Back to collection</Link>
    </div>
  );

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 108 }}>

        {/* Breadcrumb */}
        <div style={{ padding: "16px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", fontFamily: FO, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/collection" style={{ color: "#aaa", textDecoration: "none" }}>Collection</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--c-text)" }}>{p.name}</span>
          </div>
        </div>

        {/* Layout */}
        <div className="product-detail-layout" style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Images */}
          <div>
            <div style={{ position: "relative", background: "var(--c-bg-soft)", marginBottom: 12 }}>
              <img src={imgs[activeImg]} alt={p.name}
                style={{ width: "100%", height: "auto", display: "block", transition: "opacity 0.3s" }} />
              {p.badge && (
                <span style={{ position: "absolute", top: 16, left: 16, background: "#111", color: "#fff", fontFamily: FO, fontSize: 10, fontWeight: 700, padding: "4px 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {p.badge}
                </span>
              )}
              {discount > 0 && (
                <span style={{ position: "absolute", top: 16, right: 16, background: "#dc2626", color: "#fff", fontFamily: FO, fontSize: 10, fontWeight: 700, padding: "4px 10px" }}>
                  {discount}% OFF
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {imgs.map((src, i) => (
                <button key={i} onMouseEnter={() => setActiveImg(i)} onClick={() => setActiveImg(i)}
                  style={{ width: 72, height: 72, overflow: "hidden", border: `2px solid ${activeImg === i ? "var(--c-text)" : "var(--c-border)"}`, background: "none", padding: 0, cursor: "pointer", borderRadius: 6 }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 500, color: "#999", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>{p.category}</div>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(20px,2.6vw,36px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: 14, lineHeight: 1.15 }}>
              {p.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ color: "#e8a000", fontSize: 13, letterSpacing: 2 }}>★★★★★</div>
              <span style={{ fontFamily: FO, fontSize: 12, color: "#aaa" }}>4.9 (2,400+ reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--c-border)" }}>
              <span style={{ fontFamily: FO, fontSize: 40, fontWeight: 600, color: "var(--c-text)" }}>£{price.toFixed(2)}</span>
              {original > price && <span style={{ fontFamily: FO, fontSize: 20, color: "#bbb", textDecoration: "line-through" }}>£{original.toFixed(2)}</span>}
              {discount > 0 && <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "#dc2626", background: "rgba(220,38,38,0.06)", padding: "4px 12px", borderRadius: 4 }}>{discount}% OFF</span>}
            </div>

            {/* Size — A4 only */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#777" }}>
                Size: <span style={{ color: "var(--c-text)", fontWeight: 700 }}>A4 (21×30cm)</span>
              </div>
            </div>

            {/* Finish */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: 10 }}>
                Finish: <span style={{ color: "var(--c-text)", fontWeight: 700 }}>{FINISHES[selectedFinish]}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {FINISHES.map((f, i) => (
                  <button key={f} onClick={() => setSelectedFinish(i)}
                    style={{ padding: "10px 22px", border: `1.5px solid ${selectedFinish === i ? "var(--c-text)" : "#e0e0e0"}`, background: selectedFinish === i ? "var(--c-btn-bg)" : "var(--c-bg)", color: selectedFinish === i ? "var(--c-btn-text)" : "#555", fontFamily: FO, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", borderRadius: 50 }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <ClickSpark sparkColor="#fff" sparkCount={10} sparkRadius={28}>
                <button onClick={addToCart}
                  style={{ width: "100%", padding: "16px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.3s", borderRadius: 50 }}>
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </ClickSpark>
              <ClickSpark sparkColor="#111" sparkCount={10} sparkRadius={28}>
                <button onClick={buyNow}
                  style={{ width: "100%", padding: "16px 0", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 50 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#d09800")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#e8a000")}>
                  Buy Now — £{price.toFixed(2)}
                </button>
              </ClickSpark>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[["Free UK delivery", "Orders over £30"], ["Printed & shipped in 48hrs", "Mon–Fri"], ["30-day returns", "No questions asked"], ["Secure payment", "Stripe protected"]].map(([t, s]) => (
                <div key={t} style={{ padding: "12px 14px", border: "1px solid var(--c-border)", background: "var(--c-bg-card)" }}>
                  <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, color: "var(--c-text)" }}>{t}</div>
                  <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa" }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Details */}
            <div style={{ paddingTop: 20, borderTop: "1px solid var(--c-border)" }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 10 }}>Product Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["Premium 200gsm art paper", "Vivid HD print, fade-resistant inks", "Ready to frame — standard sizes", "Printed on demand, shipped from UK"].map(f => (
                  <div key={f} style={{ fontFamily: FO, fontSize: 12, color: "#555", display: "flex", gap: 8 }}>
                    <span style={{ color: "#16a34a" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ borderTop: "1px solid var(--c-border)", padding: "64px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>You Might Also Like</div>
              <h2 style={{ fontFamily: FO, fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 32 }}>Related <span style={{ color: "#e8a000" }}>Posters</span></h2>
              <div className="related-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
                {related.map(r => (
                  <Link key={r.id} href={`/product/${r.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "var(--c-bg-soft)", marginBottom: 10 }}
                      onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; img.src = r.img2; img.style.transform = "scale(1.05)"; }}
                      onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; img.src = r.img; img.style.transform = "scale(1)"; }}>
                      <img src={r.img} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }} />
                    </div>
                    <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 500, color: "var(--c-text)", marginBottom: 2, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{r.name}</div>
                    <div style={{ fontFamily: FO, fontSize: 13, fontWeight: 600, color: "var(--c-text)", marginTop: 4 }}>£{Number(r.price).toFixed(2)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Newsletter />
      <Footer />
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 768px) {
          .product-detail-layout { grid-template-columns: 1fr !important; padding: 24px 16px !important; gap: 32px !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 1100px) and (min-width: 769px) {
          .related-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
