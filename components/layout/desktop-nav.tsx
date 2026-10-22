"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { primaryNav } from "@/data/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const linkClass = "relative cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-ring";

export function DesktopNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
      {primaryNav.map((item) => {
        if (item.children) {
          const active = pathname.startsWith("/menu");
          return (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger className={cn(linkClass, "inline-flex items-center gap-1 outline-none", active && "text-brand")}>
                {item.label}
                <ChevronDown aria-hidden className="size-3.5" />
                {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-champagne" />}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72">
                {item.children.map((child) => (
                  <DropdownMenuItem key={child.href} asChild className="flex-col items-start gap-0.5">
                    <Link href={child.href}>
                      <span className="font-medium">{child.label}</span>
                      <span className="text-xs text-muted-foreground">{child.description}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
