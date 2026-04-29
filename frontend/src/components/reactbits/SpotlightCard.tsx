"use client";
import React, { useRef } from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', spotlightColor = 'rgba(255, 215, 0, 0.12)', style, onMouseEnter, onMouseLeave }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}
      style={{
        position: 'relative', overflow: 'hidden',
        '--mouse-x': '50%', '--mouse-y': '50%', '--spotlight-color': spotlightColor,
        ...style
      } as React.CSSProperties}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)', opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 1 }}
        className="spotlight-inner" />
      <style>{`.spotlight-inner { opacity: 0; } *:hover > .spotlight-inner { opacity: 0.8; }`}</style>
      {children}
    </div>
  );
};

export default SpotlightCard;
