"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Martini, CupSoda, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

const linkClass = "relative cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-ring";
const menuPageIcons: Record<string, LucideIcon> = {
  "/menu/food": UtensilsCrossed,
  "/menu/beverages": CupSoda,
  "/menu/mixology": Martini,
};

export function DesktopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!menuOpen) return;

    function handleOutsidePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [menuOpen]);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
      {primaryNav.map((item) => {
        if (item.children) {
          const active = pathname.startsWith("/menu");
          return (
            <div
              key={item.label}
              ref={menuRef}
              className="relative"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setMenuOpen(true);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse" && !menuRef.current?.contains(document.activeElement)) {
                  setMenuOpen(false);
                }
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setMenuOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="desktop-menu-options"
                onClick={() => setMenuOpen(true)}
                className={cn(linkClass, "inline-flex items-center gap-1 outline-none", active && "text-brand")}
              >
                {item.label}
                <ChevronDown aria-hidden className="size-3.5" />
                {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-champagne" />}
              </button>
              <div
                id="desktop-menu-options"
                role="group"
                aria-label="Menu pages"
                hidden={!menuOpen}
                className="absolute left-0 top-full z-50 w-72 pt-1"
              >
                <div className="min-w-56 overflow-hidden rounded-lg border bg-popover p-1.5 text-popover-foreground shadow-lg">
                  {item.children.map((child) => {
                    const Icon = menuPageIcons[child.href];
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm outline-none select-none hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground"
                      >
                        {Icon && <Icon aria-hidden className="size-4 shrink-0 text-brand" />}
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium">{child.label}</span>
                          <span className="text-xs text-muted-foreground">{child.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn(linkClass, active && "text-brand")}>
            {item.label}
            {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-champagne" />}
          </Link>
        );
      })}
    </nav>
  );
}
