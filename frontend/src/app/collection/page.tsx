"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { products, categories } from "@/data";
import { useCart } from "@/context/CartContext";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ClickSpark from "@/components/reactbits/ClickSpark";
import SlashHeading from "@/components/ui/SlashHeading";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-poppins-var,'Poppins',sans-serif)";
const F  = "var(--font-poppins-var,'Poppins',sans-serif)";

function ProductCard({ p }: { p: typeof products[0] }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  const handleQuickAdd = () => {
    addItem({ id: p.id, title: p.title, sub: p.sub, img: p.img, price: p.price, original: p.original, size: p.sizes[0], finish: p.finishes[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", borderRadius: 0, transition: "all 0.3s ease" }}>
        <img src={hovered ? p.img2 : p.img} alt={p.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "all 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        {p.badge && (
          <span style={{ position: "absolute", bottom: 10, left: 10, background: "#111", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 13px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {p.badge}
          </span>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
            <button onClick={handleQuickAdd}
              style={{ width: "100%", padding: "13px 0", background: added ? "#16a34a" : "rgba(17,17,17,0.92)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.2s", borderRadius: 50 }}>
              {added ? "✓ Added!" : "Quick Add"}
            </button>
          </ClickSpark>
        </div>
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "#1a6fa8", marginBottom: 4, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, textAlign: "center" }}>{p.title}</div>
        <div style={{ fontFamily: FO, fontSize: 11, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 500, color: "var(--c-text)" }}>From ₹{p.price}</span>
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
      <div style={{ paddingTop: 108 }}>

        {/* Breadcrumb + Header */}
        <div style={{ background: "var(--c-bg)", padding: "20px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "var(--c-text)" }}>Collections</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <SlashHeading
                  text={activeCategory === "All" ? "Collections" : activeCategory}
                  subtitle={activeCategory === "All" ? "Your Style, Your Collection • Find The Perfect Poster Sets!" : undefined}
                  size="clamp(32px,4.5vw,56px)"
                  align="left"
                  as="h1"
                />
                <p style={{ fontFamily: F, fontSize: 13, color: "#aaa", marginTop: 10 }}>{sorted.length} products</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setFiltersOpen(!filtersOpen)}
                  style={{ padding: "8px 16px", border: "1px solid var(--c-border)", background: filtersOpen ? "var(--c-btn-bg)" : "transparent", color: filtersOpen ? "var(--c-btn-text)" : "var(--c-text)", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", borderRadius: 50 }}>
                  Filters {filtersOpen ? "↑" : "↓"}
                </button>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: "8px 16px", border: "1px solid var(--c-border)", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: F, fontSize: 11, fontWeight: 600, cursor: "pointer", outline: "none", borderRadius: 50 }}>
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
        <div style={{ padding: "16px 32px", overflowX: "auto", background: "var(--c-bg-card)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ flexShrink: 0, padding: "7px 18px", border: `1px solid ${activeCategory === cat ? "var(--c-btn-bg)" : "var(--c-border)"}`, background: activeCategory === cat ? "var(--c-btn-bg)" : "transparent", color: activeCategory === cat ? "var(--c-btn-text)" : "var(--c-text-muted)", fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <div style={{ background: "var(--c-bg-soft)", padding: "24px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 12 }}>Size</div>
                {["A4 (21×30cm)", "A3 (30×42cm)", "A2 (42×60cm)", "12×18 inch", "18×24 inch"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "var(--c-text)", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 12 }}>Pieces</div>
                {["Single Poster", "3-Piece Set", "4-Piece Set", "8-Panel Set"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "var(--c-text)", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 12 }}>Finish</div>
                {["Matte", "Glossy", "Framed", "Canvas"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" style={{ accentColor: "var(--c-text)", width: 14, height: 14 }} />
                    <span style={{ fontFamily: F, fontSize: 12, color: "#555" }}>{opt}</span>
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 12 }}>Price Range</div>
                {["Under ₹299", "₹299–₹399", "₹399–₹499", "₹499+"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={priceFilter.includes(opt)} onChange={() => togglePrice(opt)} style={{ accentColor: "var(--c-text)", width: 14, height: 14 }} />
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
                <span style={{ fontFamily: FE, fontSize: 14, fontWeight: 400, color: "#e8a000" }}>{b}</span>
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
              <h2 style={{ fontFamily: FE, fontSize: 24, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase" }}>No products found</h2>
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
