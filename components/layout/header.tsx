"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CartButton } from "@/components/cart/cart-button";
import { cn } from "@/lib/utils";
import * as anime from "animejs";
import { useRef } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        ease: "easeOutQuad",
        duration: 500,
      },
    });

    timeline.add(
      headerRef.current,
      { opacity: [0, 1], translateY: [-10, 0] },
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-[background-color,box-shadow,border_color] duration-300",
        scrolled ? "border-border bg-background/92 shadow-sm backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <a href="#main" className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-2 focus:left-2">
        Skip to content
      </a>
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-[padding] duration-300 lg:px-8", scrolled ? "py-1.5" : "py-3")}>
        <div className="flex items-center gap-1">
          <MobileNav />
          <Logo priority />
        </div>
        <DesktopNav />
        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <CartButton />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/menu/food">Order Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}