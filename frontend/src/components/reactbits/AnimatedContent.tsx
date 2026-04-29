"use client";
import { useEffect, useRef } from 'react';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export default function AnimatedContent({
  children, className = '', style,
  distance = 40, direction = 'vertical',
  delay = 0, duration = 0.7, threshold = 0.1
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'X' : 'Y';
    el.style.opacity = '0';
    el.style.transform = `translate${axis}(${distance}px)`;
    el.style.transition = `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translate(0, 0)';
        observer.unobserve(el);
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [distance, direction, delay, duration, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
