"use client";
import React from 'react';

interface StarBorderProps {
  children: React.ReactNode;
  color?: string;
  speed?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
}

export default function StarBorder({
  children, color = '#FFD700', speed = '6s',
  className = '', style, as: Tag = 'button', href, onClick
}: StarBorderProps) {
  const El = Tag as React.ElementType;
  return (
    <El href={href} onClick={onClick}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '1px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 4, ...style }}
      className={className}>
      {/* Animated star border */}
      <span style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit', padding: 1,
        background: `conic-gradient(from var(--angle), transparent 80%, ${color} 90%, transparent 100%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude',
        animation: `starSpin ${speed} linear infinite`,
      }} />
      {/* Inner content */}
      <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        {children}
      </span>
      <style>{`
        @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes starSpin { to { --angle: 360deg; } }
      `}</style>
    </El>
  );
}
