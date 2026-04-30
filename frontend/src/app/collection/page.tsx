"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { products, categories } from "@/data";
import { useCart } from "@/context/CartContext";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const discount = p.original > p.price ? Math.round((1 - p.price / p.original) * 100) : 0;
  const badgeColor = p.badge === "Sale" ? "#dc2626" : p.badge === "Best Seller" ? "#e8a000" : p.badge === "Hot" ? "#dc2626" : "#111";
  const badgeText  = p.badge === "Best Seller" ? "#000" : "#fff";

  const handleQuickAdd = () => {
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", border: `1px solid ${hovered ? "#ccc" : "#f0f0f0"}`, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "all 0.5s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }} />
        {p.badge && (
          <span style={{ position: "absolute", top: 10, left: 10, background: badgeColor, color: badgeText, fontFamily: FO, fontSize: 9, fontWeight: 900, padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}>
            {p.badge}
          </span>
        )}
        {discount > 0 && (
          <span style={{ position: "absolute", top: 10, right: 10, background: "var(--c-bg)", color: "#dc2626", fontFamily: FO, fontSize: 10, fontWeight: 900, padding: "4px 8px", border: "1.5px solid #dc2626", boxShadow: "0 4px 10px rgba(220,38,38,0.1)" }}>
            -{discount}%
          </span>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 10, right: 10, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={handleQuickAdd}
              style={{ width: "100%", padding: "12px 0", background: added ? "#16a34a" : "rgba(17, 17, 17, 0.9)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s" }}>
              {added ? "✓ Added!" : "Quick Add"}
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 700, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 6, lineHeight: 1.3, letterSpacing: "0.02em", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{p.title}</div>
        <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 800, color: "var(--c-text)" }}>₹{p.price}</span>
          {p.original > p.price && <span style={{ fontFamily: FO, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]       = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);

  const filtered = products.filter(p => {
    if (activeCategory !== "All" && p.cat !== activeCategory) return false;
    if (priceFilter.length > 0) {
      const inPrice = priceFilter.some(f => {
        if (f === "Under ₹299") return p.price < 299;
        if (f === "₹299–₹399") return p.price >= 299 && p.price <= 399;
        if (f === "₹399–₹499") return p.price >= 399 && p.price <= 499;
        if (f === "₹499+") return p.price > 499;
        return true;
      });
      if (!inPrice) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  const togglePrice = (val: string) => {
    setPriceFilter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 56 }}>

        {/* Breadcrumb + Header */}
        <div style={{ borderBottom: "1px solid #f0f0f0", background: "var(--c-bg)", padding: "20px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "#111" }}>Collections</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 style={{ fontFamily: FE, fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#111", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>
                  {activeCategory === "All" ? "All Posters" : activeCategory}
                </h1>
                <p style={{ fontFamily: F, fontSize: 13, color: "#aaa", marginTop: 4 }}>{sorted.length} products</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setFiltersOpen(!filtersOpen)}
                  style={{ padding: "8px 16px", border: "1px solid #e0e0e0", background: filtersOpen ? "#111" : "#fff", color: filtersOpen ? "#fff" : "#111", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                  Filters {filtersOpen ? "↑" : "↓"}
                </button>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: "8px 16px", border: "1px solid #e0e0e0", background: "var(--c-bg)", color: "#111", fontFamily: F, fontSize: 11, fontWeight: 600, cursor: "pointer", outline: "none" }}>
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ borderBottom: "1px solid #f0f0f0", padding: "16px 32px", overflowX: "auto", background: "var(--c-bg-card)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ flexShrink: 0, padding: "7px 18px", border: `1px solid ${activeCategory === cat ? "#111" : "#e0e0e0"}`, background: activeCategory === cat ? "#111" : "#fff", color: activeCategory === cat ? "#fff" : "#666", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "24px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111", marginBottom: 12 }}>Size</div>
                {["A4 (21×30cm)", "A3 (30×42cm)", "A2 (42×60cm)", "12×18 inch", "18×24 inch"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "#111", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111", marginBottom: 12 }}>Pieces</div>
                {["Single Poster", "3-Piece Set", "4-Piece Set", "8-Panel Set"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "#111", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111", marginBottom: 12 }}>Finish</div>
                {["Matte", "Glossy", "Framed", "Canvas"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "#111", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111", marginBottom: 12 }}>Price Range</div>
                {["Under ₹299", "₹299–₹399", "₹399–₹499", "₹499+"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={priceFilter.includes(opt)} onChange={() => togglePrice(opt)} style={{ accentColor: "#111", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
          {/* Offer Banner */}
          <div style={{ background: "#111", color: "#fff", padding: "14px 24px", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[["BUY 4", "GET 3 FREE"], ["BUY 5", "GET 5 FREE"], ["BUY 6", "GET 12 FREE"]].map(([b, g]) => (
              <div key={b} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontFamily: FE, fontSize: 14, fontWeight: 900, color: "#e8a000" }}>{b}</span>
                <span style={{ fontFamily: F, fontSize: 11, color: "#aaa", letterSpacing: "0.1em" }}>{g}</span>
              </div>
            ))}
            <span style={{ fontFamily: F, fontSize: 11, color: "#888", letterSpacing: "0.1em" }}>· FREE DELIVERY ON PREPAID ·</span>
          </div>

          {sorted.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {sorted.map((p, i) => (
                <AnimatedContent key={p.id} distance={20} delay={i * 0.04} duration={0.5} threshold={0.05}>
                  <ProductCard p={p} />
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <h2 style={{ fontFamily: FE, fontSize: 24, fontWeight: 900, color: "#111", textTransform: "uppercase" }}>No products found</h2>
              <p style={{ fontFamily: F, fontSize: 14, color: "#aaa", marginTop: 8 }}>Try a different category or remove filters.</p>
            </div>
          )}
        </div>
      </div>
      <Newsletter />
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          /* Collection grid: 2-col on mobile */
          .collection-page { padding: 24px 12px !important; }
        }
      `}</style>
    </div>
  );
}
