"use client";
import React, { useState, useRef } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  colors?: string[];
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  glowColor?: string;
  glowOpacity?: number;
  glowBlur?: number;
  animated?: boolean;
  animationDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  backgroundColor = '#120F17',
  borderRadius = 16,
  borderWidth = 1.5,
  glowColor = '192 132 252',
  glowOpacity = 0.45,
  glowBlur = 24,
  animated = false,
  animationDuration = 3,
  className = '',
  style = {},
}) => {
  const [hovered, setHovered] = useState(false);
  const [angle, setAngle] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const startAnim = (ts: number) => {
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    setAngle((elapsed / (animationDuration * 1000)) * 360);
    rafRef.current = requestAnimationFrame(startAnim);
  };

  const handleEnter = () => {
    setHovered(true);
    if (animated) {
      startRef.current = 0;
      rafRef.current = requestAnimationFrame(startAnim);
    }
  };

  const handleLeave = () => {
    setHovered(false);
    if (animated) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  const gradientColors = [...colors, colors[0]].join(', ');
  const conicGrad = `conic-gradient(from ${animated ? angle : 0}deg, ${gradientColors})`;
  const meshBorder = hovered
    ? conicGrad
    : `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        borderRadius,
        padding: borderWidth,
        background: meshBorder,
        boxShadow: hovered
          ? `0 0 ${glowBlur}px rgba(${glowColor}, ${glowOpacity}), 0 0 ${glowBlur * 2}px rgba(${glowColor}, ${glowOpacity * 0.4})`
          : 'none',
        transition: animated ? 'box-shadow 0.3s ease' : 'all 0.35s ease',
        cursor: 'default',
        ...style,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        style={{
          borderRadius: Math.max(0, borderRadius - borderWidth),
          background: backgroundColor,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
