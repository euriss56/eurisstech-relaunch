import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export interface CartItem { slug: string; qty: number; }

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  enriched: { product: Product; qty: number }[];
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "fmt_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (slug: string) =>
    setItems((cur) => {
      const ex = cur.find((i) => i.slug === slug);
      return ex ? cur.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i)) : [...cur, { slug, qty: 1 }];
    });
  const remove = (slug: string) => setItems((cur) => cur.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.slug !== slug) : cur.map((i) => (i.slug === slug ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(() => {
    const enriched = items
      .map((i) => ({ product: PRODUCTS.find((p) => p.slug === i.slug)!, qty: i.qty }))
      .filter((x) => x.product);
    const count = items.reduce((a, b) => a + b.qty, 0);
    const total = enriched.reduce((a, b) => a + b.product.priceFrom * b.qty, 0);
    return { items, count, total, add, remove, setQty, clear, enriched };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
