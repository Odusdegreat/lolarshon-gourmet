"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/shared/photo";
import * as anime from "animejs";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        duration: 0.8,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    });

    // Image: subtle gentle zoom (opacity stays at 1)
    timeline.add(
      heroRef.current.querySelectorAll("div.absolute.inset-0"),
      { scale: [0.95, 1], translateY: [10, 0] }
    );

    // Staggered text entrance: brand label, headline, description, CTA
    timeline.add(
      heroRef.current.querySelectorAll(
        "p.text-brand, h1.text-4xl, p.text-muted-foreground, div.mt-8.flex.flex-col.gap-3.sm\\:flex-row",
      ),
      { opacity: [0, 1], translateY: [20, 0] },
      0.15
    );

    return () => {
      timeline.reverse();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-sm font-medium tracking-wide text-brand">
            Premium Cuisine · Catering · Events
          </p>
          <h1 className="text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl">
            More Than Food, It&rsquo;s an Experience
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            From signature dishes and celebration cakes to full-service catering and gourmet hampers, Lolarshons Gourmet brings carefully prepared food to your table, your event and your door.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/menu/food">Explore Our Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Image section removed - text-focused hero layout */}
        </div>
      </div>
    </section>
  );
}