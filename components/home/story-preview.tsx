import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { Reveal } from "@/components/shared/reveal";

export function StoryPreview() {
  return (
    <Section>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Photo src="/images/hero/kitchen.jpg" alt="Food being prepared in the Lolarshons Gourmet kitchen" aspect="aspect-[4/3]" className="shadow-md" sizes="(min-width: 1024px) 50vw, 100vw" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl leading-tight font-semibold sm:text-4xl">A Passion for Great Food</h2>
          <div className="mt-4 h-px w-16 bg-champagne" aria-hidden />
          <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
            Lolarshons Gourmet is built on a simple idea: food made with care brings people together. From a quiet dinner to a large celebration, every dish is prepared with fresh ingredients, good technique and attention to the small details that make a meal feel special.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-7">
            <Link href="/our-story">Read Our Story</Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
