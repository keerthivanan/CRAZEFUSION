"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";
import { fetchProducts as fetchProductsData, Product } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ClickSpark from "@/components/reactbits/ClickSpark";
import SlashHeading from "@/components/ui/SlashHeading";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const LOGO_KEY = "pk_X0d9dkoXSXC1bEBCAvNs-g";

const CATEGORIES = ["All", "Cars", "Movies", "Coffee Shop"];

// ── Car Brand Data ─────────────────────────────────────────────────────────────
const CAR_BRANDS = [
  { name: "Porsche",      domain: "porsche.com" },
  { name: "Ferrari",      domain: "ferrari.com" },
  { name: "Lamborghini",  domain: "lamborghini.com" },
  { name: "McLaren",      domain: "mclaren.com" },
  { name: "Bugatti",      domain: "bugatti.com" },
  { name: "Koenigsegg",   domain: "koenigsegg.com" },
  { name: "Aston Martin", domain: "astonmartin.com" },
  { name: "Pagani",       domain: "pagani.com" },
  { name: "Dodge",        domain: "dodge.com" },
  { name: "Chevrolet",    domain: "chevrolet.com" },
  { name: "Ford",         domain: "ford.com" },
  { name: "Nissan",       domain: "nissan.com" },
  { name: "Acura",        domain: "acura.com" },
  { name: "Lotus",        domain: "lotuscars.com" },
  { name: "Audi",         domain: "audi.com" },
  { name: "Mercedes",     domain: "mercedes-benz.com" },
  { name: "Tesla",        domain: "tesla.com" },
  { name: "Toyota",       domain: "toyota.com" },
  { name: "Mazda",        domain: "mazda.com" },
];

// ── Movie Franchise Data ───────────────────────────────────────────────────────
const MOVIE_FRANCHISES = [
  { name: "Marvel",          keywords: ["Spider-Man","Avengers","Iron Man","Thor","Black Panther","Ant-Man","Captain America","Guardians","Doctor Strange","Black Widow","Captain Marvel","Eternals","Shang-Chi","Deadpool","Venom","Groot","Wolverine","X-Men","Daredevil","Wanda","Hawkeye","Moon Knight"] },
  { name: "DC",              keywords: ["Batman","Joker","Aquaman","Wonder Woman","Suicide Squad","Birds of Prey","Flash","Superman","Shazam","Harley Quinn","Black Adam","Blue Beetle"] },
  { name: "John Wick",       keywords: ["John Wick"] },
  { name: "Action",          keywords: ["Fast","Furious","Mission Impossible","James Bond","Expendables","Die Hard","Terminator","Taken","Bourne","Rambo","Commando","Predator","Total Recall"] },
  { name: "Sci-Fi",          keywords: ["Star Wars","Interstellar","Avatar","Arrival","Alien","Matrix","Dune","Inception","Blade Runner","Prometheus","Gravity","Tenet","Mad Max","2001","Oblivion"] },
  { name: "Horror",          keywords: ["Scream","Halloween","Friday","Nightmare","Conjuring","Annabelle","Insidious","Saw","Sinister","It Chapter","Get Out","Us ","Hereditary"] },
  { name: "Drama & Classic", keywords: ["Shawshank","Godfather","Forrest","Schindler","Rocky","Million Dollar","Good Will","Wolf of Wall Street","La La Land","Fight Club","Pulp Fiction","Goodfellas","Scarface","American Hustle","Begin Again"] },
];

// ── Coffee Type Data ───────────────────────────────────────────────────────────
const COFFEE_TYPES = [
  { name: "Espresso",    keywords: ["Espresso","Affogato","Americano","Lungo","Cortado","Cortadito","Antoccino","Ristretto","Doppio"] },
  { name: "Latte",       keywords: ["Latte","Flat White","Flat Black","Caffe Misto","Breve","Marocchino"] },
  { name: "Matcha",      keywords: ["Matcha"] },
  { name: "Cappuccino",  keywords: ["Cappuccino","Macchiato"] },
  { name: "Mocha",       keywords: ["Mocha","Mochaccino"] },
  { name: "Iced & Cold", keywords: ["Iced","Cold Brew","Frappe","Frappuccino","Vietnamese"] },
];

// ── Brand matching helpers ─────────────────────────────────────────────────────
function matchesCarBrand(name: string, brand: string): boolean {
  const clean = name.replace(/^\d{4}\s+/, ""); // strip year prefix e.g. "2005 Ford..."
  const lower = clean.toLowerCase();
  const b = brand.toLowerCase();
  return lower === b || lower.startsWith(b + " ");
}

function matchesKeywords(name: string, keywords: string[]): boolean {
  const lower = name.toLowerCase();
  return keywords.some(k => lower.includes(k.toLowerCase()));
}

// ── Product Card ───────────────────────────────────────────────────────────────
function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id: p.id, title: p.name, sub: p.sub, img: p.img, price: Number(p.price), original: Number(p.original_price), size: "A4", finish: "Matte" });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: "pointer" }}>
        <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: 12, background: "var(--c-bg-soft)", borderRadius: 2 }}>
          <img
            src={hovered ? p.img2 : p.img} alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.5s ease", transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
          {p.badge && (
            <span style={{ position: "absolute", bottom: 10, left: 10, background: "#111", color: "#fff", fontFamily: FO, fontSize: 9, fontWeight: 700, padding: "5px 13px", borderRadius: 50, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {p.badge}
            </span>
          )}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
            <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20}>
              <button onClick={handleQuickAdd}
                style={{ width: "100%", padding: "13px 0", background: added ? "#16a34a" : "rgba(17,17,17,0.92)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "background 0.2s", borderRadius: 50 }}>
                {added ? "✓ Added!" : "Quick Add"}
              </button>
            </ClickSpark>
          </div>
        </div>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 500, color: "var(--c-text)", marginBottom: 3, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
          {p.name}
        </div>
        <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {p.sub}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 600, color: "var(--c-text)" }}>£{Number(p.price).toFixed(2)}</span>
          {Number(p.original_price) > Number(p.price) && (
            <span style={{ fontFamily: FO, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>£{Number(p.original_price).toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main Collection Page ───────────────────────────────────────────────────────
export default function CollectionPage() {
  const [products, setProducts]             = useState<Product[]>([]);
  const [loading, setLoading]               = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand]       = useState<string | null>(null);
  const [sortBy, setSortBy]                 = useState("featured");
  const [filtersOpen, setFiltersOpen]       = useState(false);
  const [priceFilter, setPriceFilter]       = useState<string[]>([]);

  // Read ?cat= from URL client-side (avoids useSearchParams Suspense requirement)
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && ["Cars", "Movies", "Coffee Shop"].includes(cat)) setActiveCategory(cat);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProductsData(activeCategory).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [activeCategory]);

  // reset brand filter when category changes
  useEffect(() => { setActiveBrand(null); }, [activeCategory]);

  const filtered = products.filter(p => {
    if (activeBrand) {
      if (activeCategory === "Cars") {
        if (!matchesCarBrand(p.name, activeBrand)) return false;
      } else if (activeCategory === "Movies") {
        const f = MOVIE_FRANCHISES.find(f => f.name === activeBrand);
        if (f && !matchesKeywords(p.name, f.keywords)) return false;
      } else if (activeCategory === "Coffee Shop") {
        const t = COFFEE_TYPES.find(t => t.name === activeBrand);
        if (t && !matchesKeywords(p.name, t.keywords)) return false;
      }
    }
    if (priceFilter.length === 0) return true;
    return priceFilter.some(f => {
      if (f === "Under £9.99")   return p.price < 9.99;
      if (f === "£9.99–£14.99")  return p.price >= 9.99 && p.price <= 14.99;
      if (f === "£14.99–£19.99") return p.price > 14.99 && p.price <= 19.99;
      if (f === "£19.99+")       return p.price > 19.99;
      return true;
    });
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return Number(a.price) - Number(b.price);
    if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
    if (sortBy === "newest")     return Number(b.id) - Number(a.id);
    return 0;
  });

  return (
    <div style={{ background: "var(--c-bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 108 }}>

        {/* Header */}
        <div style={{ background: "var(--c-bg)", padding: "20px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ fontFamily: FO, fontSize: 10, color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              <Link href="/" style={{ color: "#aaa", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 8px" }}>›</span>
              <span style={{ color: "var(--c-text)" }}>Collections</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <SlashHeading
                  text={activeBrand ? activeBrand : (activeCategory === "All" ? "Collections" : activeCategory)}
                  subtitle={activeCategory === "All" ? "Your Style, Your Wall • Find The Perfect Poster" : undefined}
                  size="clamp(32px,4.5vw,56px)"
                  align="left"
                  as="h1"
                />
                <p style={{ fontFamily: FO, fontSize: 13, color: "#aaa", marginTop: 10 }}>
                  {loading ? "Loading…" : `${sorted.length} products`}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setFiltersOpen(!filtersOpen)}
                  style={{ padding: "8px 16px", border: "1px solid var(--c-border)", background: filtersOpen ? "var(--c-btn-bg)" : "transparent", color: filtersOpen ? "var(--c-btn-text)" : "var(--c-text)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", borderRadius: 50 }}>
                  Filters {filtersOpen ? "↑" : "↓"}
                </button>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: "8px 16px", border: "1px solid var(--c-border)", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: FO, fontSize: 11, fontWeight: 600, cursor: "pointer", outline: "none", borderRadius: 50 }}>
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
        <div style={{ padding: "12px 32px", background: "var(--c-bg-card)", borderBottom: "1px solid var(--c-border)" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ flexShrink: 0, padding: "7px 18px", border: `1px solid ${activeCategory === cat ? "var(--c-btn-bg)" : "var(--c-border)"}`, background: activeCategory === cat ? "var(--c-btn-bg)" : "transparent", color: activeCategory === cat ? "var(--c-btn-text)" : "var(--c-text-muted)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap", borderRadius: 50 }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Brand / Franchise Filter Row ──────────────────────────────────────── */}
        {activeCategory === "Cars" && (
          <div style={{ padding: "14px 32px", background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", overflowX: "auto", scrollbarWidth: "none" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 10, alignItems: "center", minWidth: "max-content" }}>
              <button onClick={() => setActiveBrand(null)} style={{
                flexShrink: 0, padding: "8px 18px",
                border: `1.5px solid ${!activeBrand ? "var(--c-text)" : "var(--c-border)"}`,
                background: !activeBrand ? "var(--c-btn-bg)" : "transparent",
                color: !activeBrand ? "var(--c-btn-text)" : "var(--c-text-muted)",
                fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer", borderRadius: 50, transition: "all 0.15s",
              }}>All Brands</button>

              {CAR_BRANDS.map(brand => {
                const active = activeBrand === brand.name;
                return (
                  <button key={brand.name}
                    onClick={() => setActiveBrand(active ? null : brand.name)}
                    style={{
                      flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                      padding: "8px 14px", minWidth: 72,
                      border: `1.5px solid ${active ? "var(--c-text)" : "var(--c-border)"}`,
                      background: active ? "var(--c-bg)" : "transparent",
                      cursor: "pointer", borderRadius: 10, transition: "all 0.15s",
                      boxShadow: active ? "0 0 0 1px var(--c-text)" : "none",
                    }}>
                    <img
                      src={`https://img.logo.dev/${brand.domain}?token=${LOGO_KEY}&size=80&format=png`}
                      alt={brand.name}
                      style={{ width: 36, height: 36, objectFit: "contain" }}
                      onError={e => { (e.currentTarget as HTMLImageElement).closest("button")!.style.display = "none"; }}
                    />
                    <span style={{
                      fontFamily: FO, fontSize: 8, fontWeight: 700,
                      color: active ? "var(--c-text)" : "#888",
                      letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>{brand.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeCategory === "Movies" && (
          <div style={{ padding: "12px 32px", background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", overflowX: "auto", scrollbarWidth: "none" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", minWidth: "max-content" }}>
              <button onClick={() => setActiveBrand(null)} style={{
                flexShrink: 0, padding: "9px 18px",
                border: `1.5px solid ${!activeBrand ? "var(--c-text)" : "var(--c-border)"}`,
                background: !activeBrand ? "var(--c-btn-bg)" : "transparent",
                color: !activeBrand ? "var(--c-btn-text)" : "var(--c-text-muted)",
                fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer", borderRadius: 50, transition: "all 0.15s",
              }}>All</button>
              {MOVIE_FRANCHISES.map(f => {
                const active = activeBrand === f.name;
                return (
                  <button key={f.name} onClick={() => setActiveBrand(active ? null : f.name)}
                    style={{
                      flexShrink: 0, display: "flex", alignItems: "center", gap: 7,
                      padding: "9px 18px",
                      border: `1.5px solid ${active ? "var(--c-text)" : "var(--c-border)"}`,
                      background: active ? "var(--c-btn-bg)" : "transparent",
                      color: active ? "var(--c-btn-text)" : "var(--c-text-muted)",
                      fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
                      textTransform: "uppercase", cursor: "pointer", borderRadius: 50, transition: "all 0.15s",
                    }}>
                    <span>{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeCategory === "Coffee Shop" && (
          <div style={{ padding: "12px 32px", background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", overflowX: "auto", scrollbarWidth: "none" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, alignItems: "center", minWidth: "max-content" }}>
              <button onClick={() => setActiveBrand(null)} style={{
                flexShrink: 0, padding: "9px 18px",
                border: `1.5px solid ${!activeBrand ? "var(--c-text)" : "var(--c-border)"}`,
                background: !activeBrand ? "var(--c-btn-bg)" : "transparent",
                color: !activeBrand ? "var(--c-btn-text)" : "var(--c-text-muted)",
                fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer", borderRadius: 50, transition: "all 0.15s",
              }}>All</button>
              {COFFEE_TYPES.map(t => {
                const active = activeBrand === t.name;
                return (
                  <button key={t.name} onClick={() => setActiveBrand(active ? null : t.name)}
                    style={{
                      flexShrink: 0, display: "flex", alignItems: "center", gap: 7,
                      padding: "9px 18px",
                      border: `1.5px solid ${active ? "var(--c-text)" : "var(--c-border)"}`,
                      background: active ? "var(--c-btn-bg)" : "transparent",
                      color: active ? "var(--c-btn-text)" : "var(--c-text-muted)",
                      fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
                      textTransform: "uppercase", cursor: "pointer", borderRadius: 50, transition: "all 0.15s",
                    }}>
                    <span>{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {filtersOpen && (
          <div style={{ background: "var(--c-bg-soft)", padding: "24px 32px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
              <div>
                <div style={{ fontFamily: FO, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text)", marginBottom: 12 }}>Price Range</div>
                {["Under £9.99", "£9.99–£14.99", "£14.99–£19.99", "£19.99+"].map(opt => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                    <input type="checkbox" checked={priceFilter.includes(opt)} onChange={() => setPriceFilter(prev => prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt])} style={{ accentColor: "var(--c-text)", width: 14, height: 14 }} />
                    <span style={{ fontFamily: FO, fontSize: 12, color: "#555" }}>{opt}</span>
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
                <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 700, color: "#e8a000" }}>{b}</span>
                <span style={{ fontFamily: FO, fontSize: 11, color: "#aaa", letterSpacing: "0.1em" }}>{g}</span>
              </div>
            ))}
            <span style={{ fontFamily: FO, fontSize: 11, color: "#888", letterSpacing: "0.1em" }}>· FREE UK DELIVERY ON ORDERS OVER £30 ·</span>
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}>
                  <div style={{ aspectRatio: "3/4", background: "var(--c-bg-soft)", borderRadius: 2, marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
                  <div style={{ height: 12, background: "var(--c-bg-soft)", borderRadius: 4, marginBottom: 8, width: "80%" }} />
                  <div style={{ height: 10, background: "var(--c-bg-soft)", borderRadius: 4, width: "50%" }} />
                </div>
              ))}
            </div>
          ) : sorted.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {sorted.map((p, i) => (
                <AnimatedContent key={p.id} distance={20} delay={i * 0.03} duration={0.5} threshold={0.05}>
                  <ProductCard p={p} />
                </AnimatedContent>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontFamily: FO, fontSize: 40, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontFamily: FO, fontSize: 24, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase" }}>No posters found</h2>
              <p style={{ fontFamily: FO, fontSize: 14, color: "#aaa", marginTop: 8 }}>Try a different filter or browse all.</p>
              <button onClick={() => { setActiveBrand(null); setPriceFilter([]); }}
                style={{ marginTop: 20, padding: "10px 28px", border: "1px solid var(--c-border)", background: "transparent", color: "var(--c-text)", fontFamily: FO, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 50 }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Newsletter />
      <Footer />

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        ::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .collection-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 24px 12px !important; }
        }
      `}</style>
    </div>
  );
}
