import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(url, key);

export interface Product {
  id: number;
  name: string;
  category: string;
  sub: string;
  price: number;
  original_price: number;
  badge: string | null;
  img: string;
  img2: string;
}

// Static JSON served from /public/data/ — no DB round-trip, CDN-cached
const FILE_MAP: Record<string, string> = {
  Cars: '/data/cars.json',
  Movies: '/data/movies.json',
  'Coffee Shop': '/data/coffee.json',
};

export async function fetchProducts(category: string, limit?: number): Promise<Product[]> {
  const file = FILE_MAP[category] ?? '/data/all.json';
  try {
    const res = await fetch(file);
    let data: Product[] = await res.json();
    if (!FILE_MAP[category]) data = data.filter(p => p.category === category);
    return limit ? data.slice(0, limit) : data;
  } catch {
    return [];
  }
}

export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch('/data/all.json');
    const data: Product[] = await res.json();
    return data.find(p => p.id === id) ?? null;
  } catch {
    return null;
  }
}

export async function fetchRelated(category: string, excludeId: number, limit = 4): Promise<Product[]> {
  const all = await fetchProducts(category);
  return all.filter(p => p.id !== excludeId).slice(0, limit);
}
