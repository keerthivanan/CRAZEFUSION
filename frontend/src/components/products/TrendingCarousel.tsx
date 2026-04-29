"use client";
import { useRef, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { products } from "@/data";

const trending = products.slice(4); // use products 5–12 as trending

export default function TrendingCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    setTimeout(() => {
      if (!ref.current) return;
      setCanLeft(ref.current.scrollLeft > 0);
      setCanRight(ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth - 10);
    }, 300);
  };

  return (
    <section className="py-24 bg-[#0e0e0e]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader label="Flying off the shelves" title="Trending" highlight="Now" />
          <div className="flex gap-2">
            {["←", "→"].map((dir, i) => (
              <button key={dir} onClick={() => scroll(i === 0 ? "left" : "right")}
                className="w-11 h-11 border border-[rgba(255,215,0,0.3)] bg-transparent text-[#FFD700] text-lg cursor-pointer transition-all duration-200 hover:bg-[#FFD700] hover:text-black"
                style={{ opacity: (i === 0 ? canLeft : canRight) ? 1 : 0.3 }}>
                {dir}
              </button>
            ))}
          </div>
        </div>
        <div ref={ref} className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
          {trending.map(p => (
            <div key={p.id} className="flex-shrink-0 w-[240px]">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
