"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { menuItems } from "@/data/menu";
import { addEntry, clearEntries, getServerSnapshot, getSnapshot, removeEntry, setEntryQuantity, subscribe } from "@/lib/cart-store";
import type { CartLine, MenuItem } from "@/types";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: MenuItem, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const itemById = new Map(menuItems.map((i) => [i.id, i]));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  const lines = useMemo<CartLine[]>(
    () =>
      entries.flatMap((e) => {
        const item = itemById.get(e.id);
        return item && item.orderable ? [{ item, quantity: e.quantity }] : [];
      }),
    [entries],
  );

  const add = useCallback((item: MenuItem, quantity = 1) => addEntry(item.id, quantity), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((s, l) => s + l.item.price * l.quantity, 0),
      open,
      setOpen,
      add,
      setQuantity: setEntryQuantity,
      remove: removeEntry,
      clear: clearEntries,
    }),
    [lines, open, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
