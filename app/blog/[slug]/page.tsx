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
import { MarkdownBlogBody } from "@/components/shared/markdown-blog-body";
import { BreadcrumbStructuredData, StructuredData } from "@/components/shared/structured-data";
import { getBlogPost, getRelatedBlogPosts, isDraftPreviewEnabled } from "@/sanity/lib/blog";
import { formatDate } from "@/lib/format";
import { buildMetadata, OG_IMAGE } from "@/lib/seo";
import type { BlogPost } from "@/types";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

function getArticleLinks(post: BlogPost) {
  const topic = `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`.toLocaleLowerCase();
  const links: { href: string; label: string }[] = [];
  if (/food|dish|meal|rice|jollof|recipe|restaurant|menu/.test(topic)) links.push({ href: "/menu/food", label: "Browse the Nigerian and intercontinental food menu" });
  if (/cocktail|mocktail|drink|beverage|wine|bar|mixology/.test(topic)) links.push({ href: "/menu/mixology", label: "Explore cocktails and mocktails" }, { href: "/menu/beverages", label: "Browse other drinks" });
  if (/delivery|takeaway|order/.test(topic)) links.push({ href: "/delivery", label: "Ask about food delivery in Surulere" });
  if (/event|party|birthday|karaoke|paint|gathering|celebrat/.test(topic)) links.push({ href: "/events", label: "See events and entertainment" });
  if (/corporate|office|catering|private dining|meeting/.test(topic)) links.push({ href: "/corporate-meals", label: "Explore corporate meals and private dining enquiries" });
  links.push({ href: "/reservations", label: "Request a restaurant reservation" });
  return links.slice(0, 3);
}

export const instant = false;

function withBrandSuffix(title: string) {
  return title.toLocaleLowerCase().includes(siteConfig.name.toLocaleLowerCase())
    ? title
    : `${title} | ${siteConfig.name}`;
}

function metaDescription(value: string) {
  const description = value.trim();
  if (description.length <= 160) return description;
  return `${description.slice(0, 157).replace(/\s+\S*$/, "").trimEnd()}…`;
}

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
  const title = post.seoTitle?.trim() || post.title;
  const description = metaDescription(post.seoDescription?.trim() || post.excerpt);
  const metadata = buildMetadata({
    title,
    description,
    path: `/blog/${post.slug}`,
  });
  const brandedTitle = withBrandSuffix(title);
  metadata.title = { absolute: brandedTitle };
  metadata.openGraph = { ...metadata.openGraph, title: brandedTitle };
  metadata.twitter = { ...metadata.twitter, title: brandedTitle };
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
  let post: BlogPost | null = null;
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

  const image = post.openGraphImage ?? (post.image === "/images/logo.png" ? absoluteUrl(OG_IMAGE) : post.image);
  const absoluteImage = image.startsWith("http") ? image : absoluteUrl(image);
  const description = post.seoDescription?.trim() || post.excerpt.trim();
  const articleLinks = getArticleLinks(post);

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description,
          image: [absoluteImage],
          datePublished: post.date,
          author: post.author?.name ? { "@type": "Person", name: post.author.name } : undefined,
          publisher: { "@id": `${siteConfig.url}/#organization` },
          articleSection: post.category,
          inLanguage: "en-NG",
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />
      {preview && <DraftPreviewBanner />}
      <article>
        <header className="border-b border-champagne/30 bg-panel text-panel-foreground">
          <Container className="max-w-3xl py-14 sm:py-20">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-champagne hover:underline">
              <ArrowLeft aria-hidden className="size-4" /> Back
            </Link>
            <h1 className="text-3xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-sm text-panel-foreground/75">
              {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              {post.author && <> · By {post.author.name}</>}
            </p>
          </Container>
        </header>
        <Container className="max-w-3xl py-10 sm:py-14">
          <Photo src={post.image} alt={post.imageAlt || post.title} aspect="aspect-[16/9]" priority sizes="(min-width: 768px) 768px, 100vw" />
          <div className="mt-10 space-y-5 text-[17px] leading-8">
            {post.body.length > 0 ? (
              <PortableBlogBody body={post.body} />
            ) : post.bodyMarkdown ? (
              <MarkdownBlogBody markdown={post.bodyMarkdown} />
            ) : null}
          </div>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Have a question or an event in mind? Message us.</p>
            <WhatsAppButton variant="outline" label="Ask on WhatsApp" message={`Hello Lolar Shon's Gourmet, I read "${post.title}" and have a question.`} />
          </div>
          <nav aria-label="Related Lolar Shon's Gourmet pages" className="mt-8 rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold">Explore related pages</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {articleLinks.map((item) => <li key={item.href}><Link className="text-brand underline underline-offset-4" href={item.href}>{item.label}</Link></li>)}
              <li><Link className="text-brand underline underline-offset-4" href="/contact">Find our Surulere location and contact details</Link></li>
            </ul>
          </nav>
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
