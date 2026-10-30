"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { MenuCard } from "@/components/menu/menu-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedItems } from "@/data/menu";
import * as anime from "animejs";

export function FeaturedMenu() {
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

    // Headline fades in
    timeline.add(
      containerRef.current.querySelectorAll("h2.text-3xl.leading-tight.font-semibold"),
      { opacity: [0, 1], translateX: [-20, 0] }
    );

    // Outline button slides in
    timeline.add(
      containerRef.current.querySelectorAll("button.outline.rounded-md.py-2.px-4"),
      { opacity: [0, 1], translateX: [20, 0] }
    );

    // Menu cards: scale up from 0.95 with sequential delay
    timeline.add(
      containerRef.current.querySelectorAll("li"),
      { opacity: [0, 1], translateY: [30, 0], scale: [0.95, 1] }
    );
  }, []);

  return (
    <Section className="bg-secondary/40">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="Featured from the Menu" description="A taste of what we prepare. Prices shown are illustrative until confirmed." />
          <Button asChild variant="outline">
            <Link href="/menu/food">View full menu</Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getFeaturedItems().map((item, i) => (
            <li key={item.id} className="opacity-0 transform scale-95">
              <MenuCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}