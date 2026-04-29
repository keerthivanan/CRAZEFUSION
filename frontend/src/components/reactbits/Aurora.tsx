"use client";
import { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export default function Aurora({ colorStops = ['#1a0800', '#FFD700', '#1a0800'], amplitude = 1.0, blend = 0.5, speed = 1.0 }: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      t += 0.005 * speed;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        colorStops.forEach((color, idx) => gradient.addColorStop(idx / (colorStops.length - 1), color));

        const waveH = h * 0.3 * amplitude;
        const yBase = h * 0.5 + Math.sin(t + i * 2) * waveH;

        ctx.save();
        ctx.globalAlpha = blend * 0.4;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 10) {
          const y = yBase + Math.sin(x * 0.005 + t + i) * waveH * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, amplitude, blend, speed]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
