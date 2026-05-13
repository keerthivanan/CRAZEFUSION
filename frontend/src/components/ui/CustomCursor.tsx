"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch devices

    let rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      if (dot.current) { dot.current.style.transform = `translate(${x - 4}px,${y - 4}px)`; }
      rx += (x - 20 - rx) * 0.12;
      ry += (y - 20 - ry) * 0.12;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
    };

    const grow = () => {
      if (ring.current) { ring.current.style.width = "56px"; ring.current.style.height = "56px"; ring.current.style.opacity = "0.6"; }
      if (dot.current) dot.current.style.opacity = "0";
    };
    const shrink = () => {
      if (ring.current) { ring.current.style.width = "36px"; ring.current.style.height = "36px"; ring.current.style.opacity = "1"; }
      if (dot.current) dot.current.style.opacity = "1";
    };

    let raf: number;
    const animate = () => { raf = requestAnimationFrame(animate); };
    animate();

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "var(--c-text)", pointerEvents: "none", zIndex: 99999, transition: "opacity 0.2s", mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid var(--c-text)", pointerEvents: "none", zIndex: 99998, transition: "width 0.3s, height 0.3s, opacity 0.3s", mixBlendMode: "difference" }} />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
