"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/footer/Newsletter";

const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";
const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";

const layouts = [
  { id: "single",  label: "Single Poster",    pieces: "1 Piece"  },
  { id: "3piece",  label: "3 Piece Split",     pieces: "3 Pieces" },
  { id: "4piece",  label: "4 Piece 2×2 Grid",  pieces: "4 Pieces" },
  { id: "retro",   label: "Retro Photo Prints", pieces: "Custom"   },
  { id: "pocket",  label: "Pocket Photos",      pieces: "Set"      },
  { id: "strip",   label: "Photobooth Strip",   pieces: "Strip"    },
];

const sizes = ["A4 (21×30 cm)", "A3 (30×42 cm)", "A2 (42×60 cm)", "13×19 inch"];
const finishes = ["Matte", "Glossy", "Framed", "Canvas Print"];

export default function CustomBuilderPage() {
  const [selectedLayout, setSelectedLayout] = useState("single");
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(URL.createObjectURL(file));
  };

  const layout = layouts.find(l => l.id === selectedLayout)!;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        {/* Header */}
        <div style={{ background: "var(--c-bg-soft)", borderBottom: "1px solid var(--c-border)", padding: "48px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8a000", marginBottom: 12 }}>Design Your Own</div>
          <h1 style={{ fontFamily: FE, fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.04em", marginBottom: 12 }}>Custom Poster Builder</h1>
          <p style={{ fontFamily: F, fontSize: 15, color: "#888", maxWidth: 480, margin: "0 auto" }}>Upload your photo, choose your layout and size. We print and ship within 24 hours.</p>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>

          {/* Step 1: Choose Layout */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, background: "#111", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FE, fontSize: 14, fontWeight: 900, flexShrink: 0 }}>1</div>
              <h2 style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>Choose Your Layout</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {layouts.map(l => (
                <button key={l.id} onClick={() => setSelectedLayout(l.id)}
                  style={{ border: `2px solid ${selectedLayout === l.id ? "#111" : "#e0e0e0"}`, background: selectedLayout === l.id ? "#fafafa" : "#fff", cursor: "pointer", overflow: "hidden", transition: "all 0.15s", padding: 0 }}>
                  <div style={{ padding: "18px 16px", background: "#f5f5f5", display: "flex", gap: 4, alignItems: "center", justifyContent: "center", minHeight: 64 }}>
                    {l.id === "single"  && <div style={{ width: 40, height: 52, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />}
                    {l.id === "3piece"  && [1,2,3].map(i => <div key={i} style={{ width: 18, height: 52, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />)}
                    {l.id === "4piece"  && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>{[1,2,3,4].map(i => <div key={i} style={{ width: 22, height: 26, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />)}</div>}
                    {l.id === "retro"   && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>{[1,2,3,4,5,6].map(i => <div key={i} style={{ width: 16, height: 20, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />)}</div>}
                    {l.id === "pocket"  && [1,2,3,4].map(i => <div key={i} style={{ width: 14, height: 20, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />)}
                    {l.id === "strip"   && <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{[1,2,3,4].map(i => <div key={i} style={{ width: 28, height: 12, background: selectedLayout === l.id ? "#111" : "#ccc", borderRadius: 1 }} />)}</div>}
                  </div>
                  <div style={{ padding: "10px 12px", textAlign: "left" }}>
                    <div style={{ fontFamily: FE, fontSize: 12, fontWeight: 800, color: selectedLayout === l.id ? "#111" : "#555", textTransform: "uppercase", marginBottom: 2 }}>{l.label}</div>
                    <div style={{ fontFamily: F, fontSize: 10, color: "#aaa", letterSpacing: "0.05em" }}>{l.pieces}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Upload Photo */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, background: "#111", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FE, fontSize: 14, fontWeight: 900, flexShrink: 0 }}>2</div>
              <h2 style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>Upload Your Photo</h2>
            </div>
            <label
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const file = e.dataTransfer.files[0]; if (file) setUploadedFile(URL.createObjectURL(file)); }}
              style={{ display: "block", border: `2px dashed ${dragging ? "#111" : uploadedFile ? "#16a34a" : "#d0d0d0"}`, background: dragging ? "#f9f9f9" : uploadedFile ? "rgba(22,163,74,0.04)" : "#fff", padding: "48px 24px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              {uploadedFile ? (
                <div>
                  <div style={{ width: 120, height: 120, margin: "0 auto 16px", overflow: "hidden", border: "3px solid #16a34a" }}>
                    <img src={uploadedFile} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ fontFamily: FE, fontSize: 16, fontWeight: 800, color: "#16a34a", marginBottom: 8 }}>✓ Photo Uploaded!</div>
                  <div style={{ fontFamily: F, fontSize: 12, color: "#aaa" }}>Click to change photo</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontFamily: FE, fontSize: 18, fontWeight: 800, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 8 }}>Drag & Drop your photo here</div>
                  <div style={{ fontFamily: F, fontSize: 13, color: "#aaa", marginBottom: 16 }}>or click to browse files</div>
                  <div style={{ display: "inline-block", padding: "10px 24px", background: "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Choose File</div>
                  <div style={{ fontFamily: F, fontSize: 11, color: "#ccc", marginTop: 16 }}>Supports JPG, PNG, HEIC · Max 50MB · Min 2000px recommended</div>
                </div>
              )}
            </label>
          </div>

          {/* Step 3: Size & Finish */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, background: "#111", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FE, fontSize: 14, fontWeight: 900, flexShrink: 0 }}>3</div>
              <h2 style={{ fontFamily: FE, fontSize: 22, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>Size & Finish</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Select Size</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sizes.map((s, i) => (
                    <button key={s} onClick={() => setSelectedSize(i)}
                      style={{ padding: "12px 16px", border: `1.5px solid ${selectedSize === i ? "#111" : "#e0e0e0"}`, background: selectedSize === i ? "#111" : "#fff", color: selectedSize === i ? "#fff" : "#555", fontFamily: F, fontSize: 13, fontWeight: 700, textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: F, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Paper Finish</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {finishes.map((f, i) => (
                    <button key={f} onClick={() => setSelectedFinish(i)}
                      style={{ padding: "12px 16px", border: `1.5px solid ${selectedFinish === i ? "#111" : "#e0e0e0"}`, background: selectedFinish === i ? "#111" : "#fff", color: selectedFinish === i ? "#fff" : "#555", fontFamily: F, fontSize: 13, fontWeight: 700, textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary + CTA */}
          <div style={{ background: "var(--c-bg-soft)", border: "1px solid var(--c-border)", padding: 32 }}>
            <h3 style={{ fontFamily: FE, fontSize: 20, fontWeight: 900, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 20 }}>Your Custom Poster</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[["Layout", layout.label], ["Size", sizes[selectedSize]], ["Finish", finishes[selectedFinish]], ["Delivery", "5–7 Business Days"]].map(([label, val]) => (
                <div key={label as string}>
                  <div style={{ fontFamily: F, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: 4 }}>{label as string}</div>
                  <div style={{ fontFamily: FE, fontSize: 16, fontWeight: 800, color: "var(--c-text)" }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginBottom: 2 }}>Starting from</div>
                <div style={{ fontFamily: FE, fontSize: 28, fontWeight: 900, color: "var(--c-text)" }}>₹149</div>
              </div>
              <Link href="/cart"
                style={{ flex: 1, minWidth: 200, padding: "16px 32px", background: "#111", color: "#fff", fontFamily: F, fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", textAlign: "center", display: "block", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "#333"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "#111"}>
                Add to Cart — ₹149+
              </Link>
              <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", maxWidth: 200 }}>Exact price depends on size. Free shipping on prepaid.</div>
            </div>
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
