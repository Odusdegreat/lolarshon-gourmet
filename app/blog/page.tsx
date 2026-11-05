import { BlogCard } from "@/components/shared/blog-card";
import { Container, Section } from "@/components/shared/container";
import { PageHero } from "@/components/shared/page-hero";
import { DraftPreviewBanner } from "@/components/shared/draft-preview-banner";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts, isDraftPreviewEnabled } from "@/sanity/lib/blog";
import type { BlogPost } from "@/types";

export const instant = false;

export const metadata = buildMetadata({
  title: "Blog",
  description: "Ideas and advice from Lolarshons Gourmet on planning events and feeding your team.",
  path: "/blog",
});

export default async function BlogPage() {
  const preview = await isDraftPreviewEnabled();
  let posts: BlogPost[] = [];
  let failed = false;
  try {
    posts = await getBlogPosts(preview);
  } catch (error) {
    console.error("Could not load blog articles from Sanity.", error);
    posts = [];
    failed = true;
  }

  return (
    <>
      {preview && <DraftPreviewBanner />}
      <PageHero title="Blog" description="Ideas for planning events, gifting and feeding your team well." />
      <Section className="py-12 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              {failed ? "Articles are temporarily unavailable. Please try again later." : "No articles yet. Please check back soon."}
            </p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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
