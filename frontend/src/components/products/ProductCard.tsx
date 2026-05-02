"use client";
import { useState } from "react";
import Link from "next/link";
import TiltedCard from "@/components/reactbits/TiltedCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CountUp from "@/components/reactbits/CountUp";
import { products } from "@/data";

const F  = "var(--font-poppins-var,'Poppins',sans-serif)";
const FO = "var(--font-poppins-var,'Poppins',sans-serif)";

export default function ProductCard({ p }: { p: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position: "relative", aspectRatio: "3/4", marginBottom: 12, background: "#f7f7f7", overflow: "hidden" }}>
        <TiltedCard
          imageSrc={p.img} altText={p.title}
          containerHeight="100%" containerWidth="100%"
          imageHeight="100%" imageWidth="100%"
          scaleOnHover={1.05} rotateAmplitude={6} borderRadius="0px"
          displayOverlayContent
          overlayContent={
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 10 }}>
              {p.badge && (
                <span style={{ padding: "5px 12px", fontSize: 9, fontFamily: FO, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: "#000", color: "#fff", borderRadius: 20, width: "fit-content" }}>
                  {p.badge}
                </span>
              )}
              <div style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.25s ease" }}>
                <ClickSpark sparkColor="#fff" sparkCount={6} sparkRadius={18}>
                  <button onClick={e => { e.preventDefault(); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                    style={{ width: "100%", padding: "10px 0", background: added ? "#16a34a" : "rgba(17,17,17,0.9)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: FO, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: 8 }}>
                    {added ? "✓ Added!" : "Quick Add"}
                  </button>
                </ClickSpark>
              </div>
            </div>
          }
        />
        <div style={{ position: "absolute", inset: 0, border: `1px solid ${hovered ? "#888888" : "#e8e8e8"}`, boxShadow: hovered ? "0 0 14px rgba(160,160,160,0.22)" : "none", pointerEvents: "none", transition: "border-color 0.25s, box-shadow 0.25s" }} />
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: FO, fontSize: 12, fontWeight: 400, color: "var(--c-text)", textTransform: "uppercase", marginBottom: 4, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, textAlign: "center" }}>{p.title}</div>
        <div style={{ fontFamily: F, fontSize: 11, color: "#aaa", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center" }}>{p.sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ fontFamily: FO, fontSize: 14, fontWeight: 500, color: "var(--c-text)" }}>From ₹<CountUp to={p.price} from={0} duration={1} /></span>
          {p.price < p.original && <span style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</span>}
        </div>
      </Link>
    </div>
  );
}
