"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menusOpen, setMenusOpen] = useState(false);
  const row = "flex min-h-12 w-full cursor-pointer items-center justify-between rounded-md px-3 text-base font-medium transition-colors hover:bg-secondary";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open navigation menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription>Site navigation</SheetDescription>
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
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <SheetClose asChild>
                            <Link href={child.href} className={cn(row, "text-[15px] font-normal", pathname === child.href && "text-brand")}>
                              {child.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
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
