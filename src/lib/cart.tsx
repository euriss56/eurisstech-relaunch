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

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.slug === "string" &&
        PRODUCTS.some((product) => product.slug === item.slug) &&
        Number.isInteger(item.qty) &&
        item.qty > 0 &&
        item.qty <= 99,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // The cart remains usable for the current session if storage is unavailable.
    }
  }, [items, hydrated]);

  const add = (slug: string) => {
    if (!PRODUCTS.some((product) => product.slug === slug)) return;
    setItems((cur) => {
      const ex = cur.find((i) => i.slug === slug);
      if (ex) return cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(i.qty + 1, 99) } : i));
      return [...cur, { slug, qty: 1 }];
    });
  };
  const remove = (slug: string) => setItems((cur) => cur.filter((i) => i.slug !== slug));
  const setQty = (slug: string, qty: number) =>
    setItems((cur) =>
      qty <= 0
        ? cur.filter((i) => i.slug !== slug)
        : cur.map((i) => (i.slug === slug ? { ...i, qty: Math.min(Math.floor(qty), 99) } : i)),
    );
  const clear = () => setItems([]);

  const value = useMemo<CartCtx>(() => {
    const enriched = items
      .map((i) => ({ product: PRODUCTS.find((p) => p.slug === i.slug), qty: i.qty }))
      .filter((x): x is { product: Product; qty: number } => !!x.product);
    const count = enriched.reduce((a, b) => a + b.qty, 0);
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
