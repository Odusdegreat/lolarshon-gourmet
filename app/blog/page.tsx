import { BlogCard } from "@/components/shared/blog-card";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Ideas and advice from Lolarshons Gourmet on planning events, gifting hampers and feeding your team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" description="Ideas for planning events, gifting and feeding your team well." />
      <Section className="py-12 sm:py-20">
        <Container>
          {blogPosts.length === 0 ? (
            <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">No articles yet. Please check back soon.</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}
