import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
// Lazy — only initialised when env vars are present (not needed for static-file mode)
export const supabase = url && key ? createClient(url, key) : null as any;

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

// Products loaded from static JSON — no DB round-trip, CDN-cached
import carsData       from '../../public/data/cars.json';
import moviesData     from '../../public/data/movies.json';
import coffeeData     from '../../public/data/coffee.json';
import allData        from '../../public/data/all.json';

const STATIC: Record<string, Product[]> = {
  Cars:          carsData   as Product[],
  Movies:        moviesData as Product[],
  'Coffee Shop': coffeeData as Product[],
  All:           allData    as Product[],
};

export async function fetchProducts(category: string, limit?: number): Promise<Product[]> {
  const data = STATIC[category] ?? STATIC['All'].filter(p => p.category === category);
  return limit ? data.slice(0, limit) : data;
}

export async function fetchProduct(id: number): Promise<Product | null> {
  return STATIC['All'].find(p => p.id === id) ?? null;
}

export async function fetchRelated(category: string, excludeId: number, limit = 4): Promise<Product[]> {
  return (STATIC[category] ?? STATIC['All'])
    .filter(p => p.id !== excludeId)
    .slice(0, limit);
}
