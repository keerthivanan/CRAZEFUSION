"use client";
import { useEffect, useRef } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

const FO = "var(--font-poppins-var,'Poppins',sans-serif)";
const FE = "var(--font-poppins-var,'Poppins',sans-serif)";

/* ── canvas fire particle system ───────────────────────────── */
function FireCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; maxLife: number; hue: number };
    const pool: P[] = [];

    const spawn = () => {
      pool.push({
        x:       Math.random() * canvas.width,
        y:       canvas.height,
        vx:      (Math.random() - 0.5) * 1.8,
        vy:      -(Math.random() * 2.5 + 1.8),
        r:       Math.random() * 5 + 2,
        life:    0,
        maxLife: Math.random() * 50 + 35,
        hue:     Math.random() * 40,          // 0=red, 40=orange-yellow
      });
    };

    let id: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 5; i++) spawn();

      for (let i = pool.length - 1; i >= 0; i--) {
        const p = pool[i];
        p.x  += p.vx + Math.sin(p.life * 0.18) * 0.6;
        p.y  += p.vy;
        p.vy += 0.04;                          // slight gravity
        p.r  *= 0.985;
        p.life++;

        if (p.life >= p.maxLife || p.r < 0.5) { pool.splice(i, 1); continue; }

        const a = 1 - p.life / p.maxLife;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.5);
        const h = p.hue + (p.life / p.maxLife) * 30;   // shifts toward yellow
        grd.addColorStop(0, `hsla(${h},100%,70%,${a})`);
        grd.addColorStop(0.5, `hsla(${h + 10},100%,55%,${a * 0.7})`);
        grd.addColorStop(1, `hsla(${h + 20},100%,40%,0)`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      id = requestAnimationFrame(tick);
    };

    tick();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        bottom: "88%",
        left: "-5%",
        width: "110%",
        height: 110,
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}

/* ── component ─────────────────────────────────────────────── */
interface FireHeadingProps {
  text: string;
  subtitle?: string;
  size?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export default function FireHeading({
  text,
  subtitle,
  size = "clamp(36px,6vw,82px)",
  align = "center",
  as: Tag = "h2",
}: FireHeadingProps) {
  const center = align === "center";

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: center ? "center" : "flex-start",
      gap: 14,
    }}>
      <ClickSpark sparkColor="#ff8c00" sparkCount={14} sparkRadius={36}>
        <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }}>

          {/* Rising fire particles */}
          <FireCanvas />

          {/* Blurred halo layer — pure orange glow */}
          <Tag aria-hidden style={{
            position: "absolute", inset: 0, margin: 0,
            fontFamily: FE, fontSize: size, fontWeight: 900,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            color: "#ff5500",
            filter: "blur(18px)",
            opacity: 0.65,
            zIndex: 0,
            pointerEvents: "none",
            animation: "fh-halo 0.9s ease-in-out infinite alternate",
          }}>
            {text}
          </Tag>

          {/* Main text — fire gradient fill */}
          <Tag style={{
            position: "relative", margin: 0, zIndex: 1,
            fontFamily: FE, fontSize: size, fontWeight: 900,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            lineHeight: 1,
            background: "linear-gradient(to top, #ff1a00 0%, #ff6600 28%, #ffaa00 56%, #ffe566 78%, #fff9e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "100% 200%",
            animation: "fh-shift 1.4s ease-in-out infinite alternate",
          }}>
            {text}
          </Tag>

        </div>
      </ClickSpark>

      {subtitle && (
        <p style={{
          fontFamily: FO, fontSize: 10, fontWeight: 600,
          color: "#999", letterSpacing: "0.32em",
          textTransform: "uppercase", margin: 0,
          textAlign: align,
        }}>
          {subtitle}
        </p>
      )}

      <style>{`
        @keyframes fh-shift {
          0%   { background-position: 0% 100%; }
          100% { background-position: 0% 20%; }
        }
        @keyframes fh-halo {
          0%   { opacity: 0.45; filter: blur(14px); }
          100% { opacity: 0.80; filter: blur(22px); }
        }
      `}</style>
    </div>
  );
}
