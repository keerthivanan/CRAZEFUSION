"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CartItem = {
  id: string | number;
  title: string;
  sub: string;
  img: string;
  price: number;
  original: number;
  size: string;
  finish: string;
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string | number, size: string, finish: string) => void;
  updateQty: (id: string | number, size: string, finish: string, delta: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pk_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("pk_cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const exists = prev.find(
        i => i.id === item.id && i.size === item.size && i.finish === item.finish
      );
      if (exists) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size && i.finish === item.finish
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string | number, size: string, finish: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size && i.finish === finish)));
  }, []);

  const updateQty = useCallback((id: string | number, size: string, finish: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i =>
          i.id === id && i.size === size && i.finish === finish
            ? { ...i, qty: Math.max(0, i.qty + delta) }
            : i
        )
        .filter(i => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
