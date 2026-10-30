"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog";
import * as anime from "animejs";

export function BlogPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.createTimeline({
      defaults: {
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        duration: 0.7,
      },
    });

    // Staggered blog card entrance with image fade-in
    timeline.add(
      containerRef.current.querySelectorAll(
        "li > article.flex.h.flex-col.overflow-hidden.rounded-xl.border.bg-card.shadow-sm",
      ),
      { opacity: [0, 1], translateY: [30, 0], scale: [0.95, 1] }
    );
  }, []);

  return (
    <Section className="bg-secondary/40">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="From the Blog" description="Ideas for planning events, gifting and feeding your team well." />
          <Button asChild variant="outline">
            <Link href="/blog">All articles</Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}