import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/shared/blog-card";
import { Container, Section } from "@/components/shared/container";
import { Photo } from "@/components/shared/photo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { DraftPreviewBanner } from "@/components/shared/draft-preview-banner";
import { PortableBlogBody } from "@/components/shared/portable-blog-body";
import { getBlogPost, getRelatedBlogPosts, isDraftPreviewEnabled } from "@/sanity/lib/blog";
import { formatDate } from "@/lib/format";
import { buildMetadata, OG_IMAGE } from "@/lib/seo";
import type { BlogPost } from "@/types";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  let post: BlogPost | null;
  try {
    post = await getBlogPost(slug, await isDraftPreviewEnabled());
  } catch (error) {
    console.error(`Could not load blog article metadata for "${slug}".`, error);
    return {};
  }
  if (!post) return {};
  const metadata = buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
  });
  const image = post.openGraphImage ?? (post.image === "/images/logo.png" ? absoluteUrl(OG_IMAGE) : post.image);
  const absoluteImage = image.startsWith("http") ? image : absoluteUrl(image);
  metadata.openGraph = {
    ...metadata.openGraph,
    siteName: siteConfig.name,
    type: "article",
    publishedTime: post.date,
    images: [{ url: absoluteImage, alt: post.title }],
  };
  metadata.twitter = { ...metadata.twitter, images: [absoluteImage] };
  return metadata;
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const preview = await isDraftPreviewEnabled();
  let post;
  let related: BlogPost[] = [];
  try {
    post = await getBlogPost(slug, preview);
    if (post) related = await getRelatedBlogPosts(post.slug, preview);
  } catch (error) {
    console.error(`Could not load blog article "${slug}" from Sanity.`, error);
    return (
      <Container className="max-w-3xl py-14">
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          This article is temporarily unavailable. Please try again later.
        </p>
      </Container>
    );
  }
  if (!post) notFound();

  return (
    <>
      {preview && <DraftPreviewBanner />}
      <article>
        <header className="border-b border-champagne/30 bg-panel text-panel-foreground">
          <Container className="max-w-3xl py-14 sm:py-20">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-champagne hover:underline">
              <ArrowLeft aria-hidden className="size-4" /> All articles
            </Link>
            <h1 className="text-3xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-panel-foreground/75">
              {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              {post.author && <> · By {post.author.name}</>}
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-10 sm:py-14">
          <Photo src={post.image} alt={post.title} aspect="aspect-[16/9]" priority sizes="(min-width: 768px) 768px, 100vw" />
          <div className="mt-10 space-y-5 text-[17px] leading-8">
            <PortableBlogBody body={post.body} />
          </div>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Have a question or an event in mind? Message us.</p>
            <WhatsAppButton variant="outline" label="Ask on WhatsApp" message={`Hello Lolarshons Gourmet, I read "${post.title}" and have a question.`} />
          </div>
        </Container>
      </article>
      {related.length > 0 && (
        <Section className="bg-secondary/40 py-14">
          <Container>
            <h2 className="mb-8 text-2xl font-semibold">Keep reading</h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
