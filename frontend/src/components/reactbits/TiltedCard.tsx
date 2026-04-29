"use client";
import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const springValues: SpringOptions = { damping: 30, stiffness: 100, mass: 2 };

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  borderRadius?: string;
}

export default function TiltedCard({
  imageSrc, altText = '', captionText = '',
  containerHeight = '300px', containerWidth = '100%',
  imageHeight = '300px', imageWidth = '100%',
  scaleOnHover = 1.06, rotateAmplitude = 10,
  showTooltip = false, overlayContent = null,
  displayOverlayContent = false, borderRadius = '8px'
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() { scale.set(scaleOnHover); opacity.set(1); }
  function handleMouseLeave() {
    opacity.set(0); scale.set(1);
    rotateX.set(0); rotateY.set(0); rotateFigcaption.set(0);
  }

  return (
    <figure ref={ref} style={{ position: 'relative', height: containerHeight, width: containerWidth, perspective: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 0 }}
      onMouseMove={handleMouse} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <motion.div style={{ width: imageWidth, height: imageHeight, rotateX, rotateY, scale, position: 'relative', transformStyle: 'preserve-3d' }}>
        <img src={imageSrc} alt={altText} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius, willChange: 'transform' }} />
        {displayOverlayContent && overlayContent && (
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2, transform: 'translateZ(30px)' }}>{overlayContent}</div>
        )}
      </motion.div>
      {showTooltip && captionText && (
        <motion.figcaption style={{ x, y, opacity, rotate: rotateFigcaption, pointerEvents: 'none', position: 'absolute', left: 0, top: 0, borderRadius: 4, background: '#fff', padding: '4px 10px', fontSize: 10, color: '#2d2d2d', zIndex: 3 }}>
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
