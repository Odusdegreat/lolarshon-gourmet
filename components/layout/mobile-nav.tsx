"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, CupSoda, Martini, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const menuPageIcons: Record<string, LucideIcon> = {
  "/menu/food": UtensilsCrossed,
  "/menu/beverages": CupSoda,
  "/menu/mixology": Martini,
};

function AnimatedMenuIcon({ open }: { open: boolean }) {
  const lineClass = "absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition duration-300 ease-in-out motion-reduce:transition-none";

  return (
    <span aria-hidden className="relative block size-6">
      <span className={cn(lineClass, open ? "translate-y-0 rotate-45" : "-translate-y-[6px]")} />
      <span className={cn(lineClass, open ? "scale-x-0 opacity-0" : "-translate-y-1/2")} />
      <span className={cn(lineClass, open ? "translate-y-0 -rotate-45" : "translate-y-[6px]")} />
    </span>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menusOpen, setMenusOpen] = useState(false);
  const row = "flex min-h-12 w-full cursor-pointer items-center justify-between rounded-md px-3 text-base font-medium transition-colors hover:bg-secondary";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
          <AnimatedMenuIcon open={open} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" closeIcon={<AnimatedMenuIcon open={open} />} className="overflow-y-auto">
        <SheetHeader className="items-center border-b pb-4 pr-5">
          <Logo />
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SheetDescription className="sr-only">Browse the Lolarshons Gourmet website</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-3 pb-6">
          {primaryNav.map((item) => {
            if (item.children) {
              return (
                <div key={item.label}>
                  <button type="button" className={row} aria-expanded={menusOpen} aria-controls="mobile-menus" onClick={() => setMenusOpen((v) => !v)}>
                    {item.label}
                    <ChevronDown aria-hidden className={cn("size-4 transition-transform", menusOpen && "rotate-180")} />
                  </button>
                  {menusOpen && (
                    <ul id="mobile-menus" className="mt-1 ml-3 flex flex-col border-l border-champagne/60 pl-2">
                      {item.children.map((child) => {
                        const Icon = menuPageIcons[child.href];
                        return (
                          <li key={child.href}>
                            <SheetClose asChild>
                              <Link href={child.href} className={cn(row, "text-[15px] font-normal", pathname === child.href && "text-brand")}>
                                <span className="flex items-center gap-3">
                                  {Icon && <Icon aria-hidden className="size-4 text-brand" />}
                                  {child.label}
                                </span>
                              </Link>
                            </SheetClose>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            }
            return (
              <SheetClose asChild key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn(row, (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) && "text-brand")}>
                  {item.label}
                </Link>
              </SheetClose>
            );
          })}
          <SheetClose asChild>
            <Button asChild size="lg" className="mt-4">
              <Link href="/menu/food">Order Now</Link>
            </Button>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
