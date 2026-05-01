"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { products } from "@/data";
import { useCart } from "@/context/CartContext";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCart();

  const p = products.find(x => x.id === Number(id));
  const [selectedSize, setSelectedSize]     = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [activeImg, setActiveImg]           = useState(0);
  const [added, setAdded]                   = useState(false);

  if (!p) return (
    <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <Navbar />
      <div style={{ fontFamily: FE, fontSize: 32, fontWeight: 400, color: "#111", paddingTop: 64 }}>Product not found</div>
      <Link href="/collection" style={{ fontFamily: F, fontSize: 13, color: "#e8a000", textDecoration: "underline" }}>← Back to collection</Link>
    </div>
  );

  const discount = Math.round((1 - p.price / p.original) * 100);
  const imgs = [p.img, p.img2];

  const handleAddToCart = () => {
    addItem({
      id: p.id, title: p.title, sub: p.sub, img: p.img,
      price: p.price, original: p.original,
      size: p.sizes[selectedSize],
      finish: p.finishes[selectedFinish],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem({
      id: p.id, title: p.title, sub: p.sub, img: p.img,
      price: p.price, original: p.original,
      size: p.sizes[selectedSize],
      finish: p.finishes[selectedFinish],
    });
    router.push("/checkout");
  };

  const related = products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 56 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: "1px solid var(--c-border)", padding: "16px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/collection" style={{ color: "#aaa", textDecoration: "none" }}>Collection</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--c-text)" }}>{p.title}</span>
          </div>
        </div>

        {/* Product Layout */}
        <div className="product-detail-layout" style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Images */}
          <div>
            <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "var(--c-bg-soft)", marginBottom: 12 }}>
              <img src={imgs[activeImg]} alt={p.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }} />
              {p.badge && (
                <span style={{ position: "absolute", top: 16, left: 16, background: p.badge === "Best Seller" ? "#e8a000" : p.badge === "Hot" ? "#dc2626" : p.badge === "Sale" ? "#dc2626" : "#111", color: p.badge === "Best Seller" ? "#000" : "#fff", fontFamily: F, fontSize: 10, fontWeight: 500, padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {p.badge}
                </span>
              )}
              {discount > 0 && (
                <span style={{ position: "absolute", top: 16, right: 16, background: "#111", color: "#fff", fontFamily: F, fontSize: 10, fontWeight: 500, padding: "4px 10px" }}>
                  {discount}% OFF
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {imgs.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  style={{ width: 72, height: 72, overflow: "hidden", border: `2px solid ${activeImg === i ? "var(--c-text)" : "var(--c-border)"}`, background: "none", padding: 0, cursor: "pointer", transition: "border-color 0.2s" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 500, color: "#999", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>{p.sub}</div>
            <h1 style={{ fontFamily: FO, fontSize: "clamp(20px,2.6vw,36px)", fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.01em", marginBottom: 14, lineHeight: 1.15 }}>
              {p.title}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ color: "#e8a000", fontSize: 13, letterSpacing: 2 }}>★★★★★</div>
              <span style={{ fontFamily: FO, fontSize: 12, fontWeight: 500, color: "#aaa" }}>4.9 (2,400+ reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--c-border)" }}>
              <span style={{ fontFamily: FO, fontSize: 40, fontWeight: 500, color: "var(--c-text)" }}>₹{p.price}</span>
              <span style={{ fontFamily: FO, fontSize: 20, fontWeight: 400, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>
              <span style={{ fontFamily: FO, fontSize: 13, fontWeight: 700, color: "#dc2626", background: "rgba(220,38,38,0.06)", padding: "4px 12px", borderRadius: 4 }}>{discount}% OFF</span>
            </div>

            {/* Size Selector */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: 10 }}>
                Size: <span style={{ color: "var(--c-text)", fontWeight: 700 }}>{p.sizes[selectedSize]}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.sizes.map((s, i) => (
                  <button key={s} onClick={() => setSelectedSize(i)}
                    style={{ padding: "10px 22px", border: `1.5px solid ${selectedSize === i ? "var(--c-text)" : "#e0e0e0"}`, background: selectedSize === i ? "var(--c-btn-bg)" : "var(--c-bg)", color: selectedSize === i ? "var(--c-btn-text)" : "#555", fontFamily: FO, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", marginBottom: 10 }}>
                Finish: <span style={{ color: "var(--c-text)", fontWeight: 700 }}>{p.finishes[selectedFinish]}</span>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.finishes.map((f, i) => (
                  <button key={f} onClick={() => setSelectedFinish(i)}
                    style={{ padding: "10px 22px", border: `1.5px solid ${selectedFinish === i ? "var(--c-text)" : "#e0e0e0"}`, background: selectedFinish === i ? "var(--c-btn-bg)" : "var(--c-bg)", color: selectedFinish === i ? "var(--c-btn-text)" : "#555", fontFamily: FO, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <ClickSpark sparkColor="#fff" sparkCount={10} sparkRadius={28}>
                <button onClick={handleAddToCart}
                  style={{ width: "100%", padding: "16px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
              </ClickSpark>
              <ClickSpark sparkColor="#111" sparkCount={10} sparkRadius={28}>
                <button onClick={handleBuyNow}
                  style={{ width: "100%", padding: "16px 0", background: "#e8a000", color: "#000", fontFamily: FO, fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 4px 16px rgba(232,160,0,0.2)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#d09800")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#e8a000")}>
                  Buy Now — ₹{p.price}
                </button>
              </ClickSpark>
            </div>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[["Free delivery", "On prepaid orders"], ["Ships in 24hrs", "Mon–Sat"], ["7-day returns", "No questions asked"], ["Secure payment", "Razorpay secured"]].map(([title, sub]) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", border: "1px solid var(--c-border)", background: "var(--c-bg-card)" }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "var(--c-text)" }}>{title}</div>
                    <div style={{ fontFamily: F, fontSize: 10, color: "#aaa" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ paddingTop: 20, borderTop: "1px solid var(--c-border)" }}>
              <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 10 }}>Product Details</div>
              <p style={{ fontFamily: F, fontSize: 13, color: "#555", lineHeight: 1.8 }}>{p.description}</p>
              <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                {["200GSM premium art paper", "Vivid HD print, scratch-resistant", "Ready to hang (tape included)", "Pan-India shipping in 5–7 days"].map(f => (
                  <div key={f} style={{ fontFamily: F, fontSize: 12, color: "#555", display: "flex", gap: 8 }}>
                    <span style={{ color: "#16a34a" }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ borderTop: "1px solid var(--c-border)", padding: "64px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
              <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>You Might Also Like</div>
              <h2 style={{ fontFamily: FE, fontSize: "clamp(22px,3vw,36px)", fontWeight: 400, color: "#111", textTransform: "uppercase", letterSpacing: "-0.03em", marginBottom: 32 }}>Related <span style={{ color: "#e8a000" }}>Products</span></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 24 }}>
                {related.map(r => (
                  <Link key={r.id} href={`/product/${r.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "#f7f7f7", marginBottom: 10, position: "relative" }}>
                      <img src={r.img} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    </div>
                    <div style={{ fontFamily: FE, fontSize: 12, fontWeight: 500, color: "#111", textTransform: "uppercase", marginBottom: 2 }}>{r.title}</div>
                    <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginBottom: 4 }}>{r.sub}</div>
                    <div style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: "#111" }}>From ₹{r.price}</div>
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
        @media (max-width: 768px) {
          .product-detail-layout { grid-template-columns: 1fr !important; padding: 24px 16px !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
