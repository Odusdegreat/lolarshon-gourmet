"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CakeSlice,
  Beer,
  Carrot,
  Citrus,
  Coffee,
  CupSoda,
  Drumstick,
  GlassWater,
  LayoutGrid,
  Martini,
  Salad,
  Sandwich,
  Soup,
  Star,
  UtensilsCrossed,
  Wine,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { MenuCard } from "@/components/menu/menu-card";
import { cn } from "@/lib/utils";
import { menuItems, menuSections, type MenuSectionConfig } from "@/data/menu";
import type { MenuItem, MenuSection } from "@/types";

const categoryIcons: Record<string, LucideIcon> = {
  all: LayoutGrid,
  appetizer: Sandwich,
  sides: Carrot,
  "salad-dishes": Salad,
  platter: UtensilsCrossed,
  "ls-specials": Star,
  "pastas-noodles-dishes": UtensilsCrossed,
  "rice-meal": Soup,
  grills: Drumstick,
  africana: Soup,
  desserts: CakeSlice,
  beverages: CupSoda,
  "beverage-refreshments": Citrus,
  "beverage-tea-coffee": Coffee,
  "beverage-energy": Zap,
  mixology: Martini,
  "mixology-cocktails": Martini,
  "mixology-mocktails": CupSoda,
  "mixology-beer-cider": Beer,
  "mixology-wine": Wine,
  "mixology-spirits": GlassWater,
};

export function MenuBrowser({ section, items }: { section: MenuSectionConfig; items: MenuItem[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
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

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visible = normalizedQuery
    ? menuItems.filter((item) => {
        const categoryLabel = menuSections[item.section].categories.find((category) => category.id === item.category)?.label ?? "";
        return `${item.name} ${item.description} ${menuSections[item.section].title} ${categoryLabel}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      })
    : items.filter((item) => active === "all" || item.category === active);
  const resultSections = (Object.keys(menuSections) as MenuSection[])
    .map((slug) => ({ section: menuSections[slug], items: visible.filter((item) => item.section === slug) }))
    .filter((group) => group.items.length > 0);
  const showFilters = section.categories.length > 1;

  return (
    <div>
      <div className="relative mb-6 max-w-xl">
        <label htmlFor="menu-search" className="sr-only">
          Search all menus
        </label>
        <input
          id="menu-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search all menus..."
          autoComplete="off"
          className="h-12 w-full appearance-none rounded-lg border bg-background py-3 pr-12 pl-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear menu search"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>

      {normalizedQuery && (
        <p className="mb-5 text-sm text-muted-foreground" aria-live="polite">
          Searching across all menus
        </p>
      )}

      {showFilters && !normalizedQuery && (
        <div role="group" aria-label="Filter by category" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ id: "all", label: "All" }, ...section.categories].map((c) => {
            const Icon = categoryIcons[c.id];
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active === c.id}
                onClick={() => selectCategory(c.id)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]",
                  active === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:bg-secondary",
                )}
              >
                {Icon && (
                  <Icon
                    aria-hidden
                    className={cn(
                      "size-[18px] shrink-0",
                      active === c.id ? "text-primary-foreground" : "text-brand",
                    )}
                  />
                )}
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          {normalizedQuery
            ? `No menu items match “${query.trim()}”. Try another search.`
            : "Nothing in this category yet. Please check back soon or ask us on WhatsApp."}
        </p>
      ) : normalizedQuery ? (
        <div className="space-y-10">
          {resultSections.map(({ section: resultSection, items: resultItems }) => (
            <section key={resultSection.slug} aria-labelledby={`results-${resultSection.slug}`}>
              <h2 id={`results-${resultSection.slug}`} className="mb-5 font-serif text-2xl font-semibold">
                {resultSection.title}
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resultItems.map((item) => (
                  <li key={item.id}>
                    <MenuCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul id="menu-results" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
