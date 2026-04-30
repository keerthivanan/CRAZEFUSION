"use client";
import { useState } from "react";
import Link from "next/link";
import TiltedCard from "@/components/reactbits/TiltedCard";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CountUp from "@/components/reactbits/CountUp";
import { products } from "@/data";

const F  = "var(--font-space-var,'Space Grotesk',sans-serif)";
const FE = "var(--font-epilogue-var,'Epilogue',sans-serif)";

export default function ProductCard({ p }: { p: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const discount = Math.round((1 - p.price / p.original) * 100);

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
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {p.badge && (
                  <span style={{ padding: "3px 8px", fontSize: 9, fontFamily: F, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: p.badge === "Best Seller" ? "#e8a000" : p.badge === "Hot" ? "#dc2626" : "#111", color: "#fff", width: "fit-content" }}>
                    {p.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span style={{ padding: "3px 8px", fontSize: 9, fontFamily: F, fontWeight: 800, background: "#dc2626", color: "#fff", width: "fit-content" }}>
                    -{discount}% OFF
                  </span>
                )}
              </div>
              <div style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "all 0.25s ease" }}>
                <ClickSpark sparkColor="#111" sparkCount={6} sparkRadius={18}>
                  <button onClick={e => { e.preventDefault(); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                    style={{ width: "100%", padding: "9px 0", background: added ? "#16a34a" : "#111", color: "#fff", fontFamily: F, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
                    {added ? "✓ Added!" : "+ Quick Add"}
                  </button>
                </ClickSpark>
              </div>
            </div>
          }
        />
        <div style={{ position: "absolute", inset: 0, border: `1px solid ${hovered ? "#ccc" : "#e8e8e8"}`, pointerEvents: "none", transition: "border-color 0.25s" }} />
      </div>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FE, fontSize: 13, fontWeight: 800, color: "#111", textTransform: "uppercase", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
            <div style={{ fontFamily: F, fontSize: 11, color: "#999" }}>{p.sub}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 10 }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 800, color: "#111" }}>₹<CountUp to={p.price} from={0} duration={1} /></div>
            {p.price < p.original && <div style={{ fontFamily: F, fontSize: 11, color: "#bbb", textDecoration: "line-through" }}>₹{p.original}</div>}
          </div>
        </div>
      </Link>
    </div>
  );
}
