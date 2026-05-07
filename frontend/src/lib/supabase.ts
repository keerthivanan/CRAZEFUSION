import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
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

import carsData   from '../../public/data/cars.json';
import moviesData from '../../public/data/movies.json';
import coffeeData from '../../public/data/coffee.json';
import allData    from '../../public/data/all.json';

const STATIC: Record<string, Product[]> = {
  Cars:          carsData   as Product[],
  Movies:        moviesData as Product[],
  'Coffee Shop': coffeeData as Product[],
  All:           allData    as Product[],
};

// Map an approved partner design row → Product shape
function designToProduct(d: PartnerDesign): Product {
  return {
    id:             d.product_id!,
    name:           d.title,
    category:       d.category,
    sub:            'Wall Poster · A4 · Artist',
    price:          Number(d.price),
    original_price: Number(d.price),
    badge:          'Artist',
    img:            d.image_url,
    img2:           d.image_url,
  };
}

async function fetchApprovedDesigns(): Promise<PartnerDesign[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('partner_designs')
    .select('*')
    .eq('status', 'approved');
  return (data ?? []) as PartnerDesign[];
}

export async function fetchProducts(category: string, limit?: number): Promise<Product[]> {
  const staticData = STATIC[category] ?? STATIC['All'].filter(p => p.category === category);
  const designs    = await fetchApprovedDesigns();
  const designData = designs
    .filter(d => category === 'All' || d.category === category)
    .map(designToProduct);
  const combined = [...staticData, ...designData];
  return limit ? combined.slice(0, limit) : combined;
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const fromStatic = STATIC['All'].find(p => p.id === id) ?? null;
  if (fromStatic) return fromStatic;
  // Check partner designs (ids start at 10000)
  if (id >= 10000 && supabase) {
    const { data } = await supabase
      .from('partner_designs')
      .select('*')
      .eq('product_id', id)
      .eq('status', 'approved')
      .single();
    if (data) return designToProduct(data as PartnerDesign);
  }
  return null;
}

export async function fetchRelated(category: string, excludeId: number, limit = 4): Promise<Product[]> {
  const all = await fetchProducts(category);
  return all.filter(p => p.id !== excludeId).slice(0, limit);
}

// ── Partner types ─────────────────────────────────────────────────────────────

export interface Partner {
  id: string;
  name: string;
  email: string;
  bio: string;
  payout_email: string;
  status: 'pending' | 'approved' | 'rejected' | 'removed';
  created_at: string;
  last_submitted_at: string | null;
}

export interface PartnerDesign {
  id: string;
  partner_id: string;
  partner_name?: string;
  product_id?: number;
  title: string;
  category: string;
  image_url: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface PartnerSale {
  id: string;
  partner_id: string;
  design_id: string;
  design_title?: string;
  order_amount: number;
  partner_cut: number;
  paid_out: boolean;
  created_at: string;
}

// ── Partner auth (Supabase Auth) ──────────────────────────────────────────────

export async function registerPartner(data: {
  name: string; email: string; password: string; bio: string; payout_email: string;
}) {
  const { name, email, password, bio, payout_email } = data;
  const { data: authData, error: authErr } = await supabase.auth.signUp({ email, password });
  if (authErr) return { error: authErr.message };
  const uid = authData.user?.id;
  if (!uid) return { error: 'Signup failed. Try again.' };
  const { error } = await supabase.from('partners').insert({ id: uid, name, email, bio, payout_email, status: 'pending' });
  return { error: error?.message ?? null };
}

export async function loginPartner(email: string, password: string): Promise<{ partner: Partner | null; error: string | null }> {
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password });
  if (authErr || !authData.user) return { partner: null, error: 'Invalid email or password' };
  const { data, error } = await supabase.from('partners').select('*').eq('id', authData.user.id).single();
  if (error || !data) return { partner: null, error: 'Partner profile not found' };
  return { partner: data as Partner, error: null };
}

export async function getCurrentPartner(): Promise<Partner | null> {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('partners').select('*').eq('id', user.id).single();
  return (data as Partner) ?? null;
}

export async function logoutPartner() {
  await supabase.auth.signOut();
}

// ── Partner dashboard helpers ─────────────────────────────────────────────────

export async function getPartnerDesigns(partnerId: string): Promise<PartnerDesign[]> {
  const { data } = await supabase.from('partner_designs').select('*').eq('partner_id', partnerId).order('created_at', { ascending: false });
  return (data ?? []) as PartnerDesign[];
}

export async function getPartnerSales(partnerId: string): Promise<PartnerSale[]> {
  const { data } = await supabase.from('partner_sales').select('*, partner_designs(title)').eq('partner_id', partnerId).order('created_at', { ascending: false });
  return (data ?? []).map((s: any) => ({ ...s, design_title: s.partner_designs?.title })) as PartnerSale[];
}

export async function submitDesign(partnerId: string, design: { title: string; category: string; image_url: string; price: number }) {
  const { error } = await supabase.from('partner_designs').insert({ partner_id: partnerId, ...design, status: 'pending' });
  if (!error) await supabase.from('partners').update({ last_submitted_at: new Date().toISOString() }).eq('id', partnerId);
  return { error: error?.message ?? null };
}

// ── Admin helpers ─────────────────────────────────────────────────────────────

export async function adminGetPartners(): Promise<Partner[]> {
  const { data } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
  return (data ?? []) as Partner[];
}

export async function adminGetDesigns(): Promise<PartnerDesign[]> {
  const { data } = await supabase.from('partner_designs').select('*, partners(name)').order('created_at', { ascending: false });
  return (data ?? []).map((d: any) => ({ ...d, partner_name: d.partners?.name })) as PartnerDesign[];
}

export async function adminUpdatePartner(id: string, status: Partner['status']) {
  await supabase.from('partners').update({ status }).eq('id', id);
}

export async function adminUpdateDesign(id: string, status: PartnerDesign['status']) {
  await supabase.from('partner_designs').update({ status }).eq('id', id);
}

export async function adminRemoveInactivePartners() {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const { data: partners } = await supabase
    .from('partners')
    .select('id, last_submitted_at')
    .eq('status', 'approved');
  const toRemove = (partners ?? []).filter((p: any) =>
    !p.last_submitted_at || new Date(p.last_submitted_at) < new Date(threeDaysAgo)
  ).map((p: any) => p.id);
  if (toRemove.length > 0) {
    await supabase.from('partners').update({ status: 'removed' }).in('id', toRemove);
  }
  return toRemove.length;
}
