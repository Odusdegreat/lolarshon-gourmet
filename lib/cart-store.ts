/**
 * Tiny client-side cart store backed by localStorage, consumed with useSyncExternalStore
 * so server HTML and first client render always match (empty cart), then hydrate safely.
 * Only item ids and quantities are persisted; prices always come from the current menu data.
 */
export type CartEntry = { id: string; quantity: number };

const KEY = "lolarshons-cart-v1";
export const MAX_QUANTITY = 50;

const EMPTY: CartEntry[] = [];
let entries: CartEntry[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(parsed)) {
      entries = parsed
        .filter((e): e is CartEntry => typeof e?.id === "string" && Number.isFinite(e?.quantity))
        .map((e) => ({ id: e.id, quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.floor(e.quantity))) }));
    }
  } catch {
    entries = EMPTY;
  }
}

function commit(next: CartEntry[]) {
  entries = next.length ? next : EMPTY;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable (private mode / quota): cart still works for this session */
  }
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const getSnapshot = () => entries;
export const getServerSnapshot = () => EMPTY;

export function addEntry(id: string, quantity = 1) {
  load();
  const existing = entries.find((e) => e.id === id);
  const next = existing
    ? entries.map((e) => (e.id === id ? { ...e, quantity: Math.min(MAX_QUANTITY, e.quantity + quantity) } : e))
    : [...entries, { id, quantity: Math.min(MAX_QUANTITY, quantity) }];
  commit(next);
}

export function setEntryQuantity(id: string, quantity: number) {
  load();
  if (quantity <= 0) return commit(entries.filter((e) => e.id !== id));
  commit(entries.map((e) => (e.id === id ? { ...e, quantity: Math.min(MAX_QUANTITY, quantity) } : e)));
}

export function removeEntry(id: string) {
  load();
  commit(entries.filter((e) => e.id !== id));
}

export function clearEntries() {
  commit([]);
}
