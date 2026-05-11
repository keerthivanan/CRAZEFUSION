"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);
  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(src => new Promise<void>(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => resolve();
    }))
  );
};

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
}

interface GridItem extends MasonryItem {
  x: number; y: number; w: number; h: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }
    switch (direction) {
      case 'top':    return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left':   return { x: -200, y: item.y };
      case 'right':  return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
      default:       return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const gap = 12;
    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const h = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += h + gap;
      return { ...child, x, y, w: columnWidth, h };
    });
  }, [columns, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 0;
    return Math.max(...grid.map(i => i.y + i.h)) + 12;
  }, [grid]);

  const hasMounted = useRef(false);
  const hasAnimated = useRef(false);

  // Set initial hidden state as soon as grid is ready (before visible)
  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;
    if (hasMounted.current) {
      // reflow only — reposition without animation
      grid.forEach(item => {
        gsap.set(`[data-key="${item.id}"]`, { x: item.x, y: item.y, width: item.w, height: item.h, overwrite: 'auto' });
      });
      return;
    }
    // Prime items off-screen so they're invisible before the observer fires
    grid.forEach(item => {
      const start = getInitialPosition(item);
      gsap.set(`[data-key="${item.id}"]`, {
        x: start.x, y: start.y, width: item.w, height: item.h,
        opacity: 0, ...(blurToFocus && { filter: 'blur(10px)' })
      });
    });
    hasMounted.current = true;
  }, [grid, imagesReady]);

  // Fire entrance animation when section scrolls into view
  useEffect(() => {
    if (!imagesReady || !grid.length || !containerRef.current) return;
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      hasAnimated.current = true;
      observer.disconnect();
      grid.forEach((item, index) => {
        const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
        gsap.to(`[data-key="${item.id}"]`, {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger,
        });
      });
    }, { threshold: 0.05 });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [grid, imagesReady, stagger, blurToFocus]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: totalHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.3)]"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[10px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
