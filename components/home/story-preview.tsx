"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import * as anime from "animejs";

export function StoryPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        duration: 0.7,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    });

    // Image: smooth fade-in with subtle zoom
    timeline.add(
      containerRef.current.querySelectorAll("img"),
      { opacity: [0, 1], scale: [0.95, 1], translateY: [10, 0] }
    );

    // Text elements fade in with gentle staggered delay
    timeline.add(
      containerRef.current.querySelectorAll(
        "h2.text-3xl.leading-tight.font-semibold, div.h-px.w-16.bg-champagne, p.mt-5.max-w-prose.leading-relaxed.text-muted-foreground",
      ),
      { opacity: [0, 1], translateY: [20, 0] }
    );

    // CTA button with slight later delay
    timeline.add(
      containerRef.current.querySelectorAll("Button.asChild.variant.outline.size.lg"),
      { opacity: [0, 1], translateY: [20, 0] }
    );
  }, []);

  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div ref={containerRef}>
          <Photo src="/images/hero/kitchen.jpg" alt="Food being prepared in the Lolarshons Gourmet kitchen" aspect="aspect-[4/3]" className="shadow-md" />
        </div>
        <div>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">A Passion for Great Food</h2>
          <div className="mt-4 h-px w-16 bg-champagne" aria-hidden />
          <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
            Lolarshons Gourmet is built on a simple idea: food made with care brings people together. From a quiet dinner to a large celebration, every dish is prepared with fresh ingredients, good technique and attention to the small details that make a meal feel special.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-7">
            <Link href="/our-story">Read Our Story</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}