"use client";

import { useSearchParams } from "next/navigation";
import { MenuCard } from "@/components/menu/menu-card";
import { cn } from "@/lib/utils";
import type { MenuSectionConfig } from "@/data/menu";
import type { MenuItem } from "@/types";

export function MenuBrowser({ section, items }: { section: MenuSectionConfig; items: MenuItem[] }) {
  const params = useSearchParams();
  const requested = params.get("category");
  const active = section.categories.some((c) => c.id === requested) ? (requested as string) : "all";

  const selectCategory = (id: string) => {
    const search = new URLSearchParams(params.toString());
    if (id === "all") {
      search.delete("category");
    } else {
      search.set("category", id);
    }
    const query = search.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  };

  const visible = active === "all" ? items : items.filter((i) => i.category === active);
  const showFilters = section.categories.length > 1;

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter by category" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ id: "all", label: "All" }, ...section.categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => selectCategory(c.id)}
              className={cn(
                "min-h-11 shrink-0 cursor-pointer rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]",
                active === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">Nothing in this category yet. Please check back soon or ask us on WhatsApp.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
