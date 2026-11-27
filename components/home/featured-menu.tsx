"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Photo } from "@/components/shared/photo";
import * as anime from "animejs";

const featuredImages = [
  {
    src: "/images/menu/singapore-noodles.jpg",
    alt: "Singapore noodles from Lolar Shon's Gourmet",
    href: "/menu/food?category=pastas-noodles-dishes#menu-Singapore%20Noodles",
    caption: "Singapore Noodles",
  },
  {
    src: "/images/menu/martell.webp",
    alt: "Martell at Lolar Shon's Gourmet",
    href: "/menu/mixology?category=mixology-cocktails",
    caption: "Cocktails and Martell",
  },
  {
    src: "/images/menu/isiewu.webp",
    alt: "Isiewu (Goat Head) from Lolar Shon's Gourmet",
    href: "/menu/food?category=africana#menu-isiewu",
    caption: "Isiewu (Goat Head)",
  },
  {
    src: "/images/menu/freshly-palm-wine.jpeg",
    alt: "Fresh palm wine available at Lolar Shon's Gourmet",
    href: "/menu/mixology?category=mixology-spirits#menu-palm-wine",
    caption: "FRESH...No sweeteners or Preservatives!",
  },
];

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
          <SectionHeading title="Featured from the Menu" description="A taste of what we prepare." />
          <Button asChild variant="outline">
            <Link href="/menu/food">View full menu</Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {featuredImages.map((image) => (
            <li key={image.src}>
              <figure>
                <Link href={image.href} aria-label={`View ${image.alt} in the menu`} className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <Photo
                    src={image.src}
                    alt={image.alt}
                    aspect="aspect-[4/3]"
                    className="shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={90}
                  />
                </Link>
                {"caption" in image && image.caption && (
                  <figcaption className="mt-5 text-center text-lg font-semibold tracking-wide text-brand sm:text-xl">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
