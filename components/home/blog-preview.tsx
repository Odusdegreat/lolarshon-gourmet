import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/shared/container";
import { BlogCard } from "@/components/shared/blog-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog";

export function BlogPreview() {
  return (
    <Section className="bg-secondary/40">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title="From the Blog" description="Ideas for planning events, gifting and feeding your team well." />
          <Button asChild variant="outline">
            <Link href="/blog">All articles</Link>
          </Button>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 0.09}>
                <BlogCard post={post} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
