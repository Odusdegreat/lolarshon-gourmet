import "server-only";

import { toPlainText, type PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import type { BlogPost } from "@/types";
import { getDraftClient, sanityClient, sanityImageUrl } from "@/sanity/lib/client";

type SanityBlogPost = {
  _id: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: (SanityImageSource & { alt?: string }) | null;
  bodyMarkdown?: string | null;
  author: {
    name: string;
    biography?: string;
    profileImage?: SanityImageSource | null;
  } | null;
  categories: { _id: string; name: string; slug: string }[];
  tags: string[];
  seo?: {
    title?: string;
    description?: string;
    openGraphImage?: SanityImageSource | null;
  };
  publishedAt?: string;
  featured: boolean;
  body?: PortableTextBlock[] | null;
};

const postProjection = groq`{
  "_id": _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  bodyMarkdown,
  "author": author->{name, biography, "profileImage": profileImage},
  "categories": categories[]->{_id, name, "slug": slug.current},
  tags,
  seo,
  publishedAt,
  featured,
  "body": body[]{
    ...,
    "assetMetadata": asset->metadata{dimensions{width, height}}
  }
}`;

const publishedPostsQuery = groq`*[
  _type == "blogPost" &&
  !(_id in path("drafts.**")) &&
  defined(publishedAt) &&
  publishedAt <= now()
] | order(featured desc, publishedAt desc) ${postProjection}`;

const draftPostsQuery = groq`*[_type == "blogPost"] | order(featured desc, publishedAt desc) ${postProjection}`;

const publishedPostQuery = groq`*[
  _type == "blogPost" &&
  slug.current == $slug &&
  !(_id in path("drafts.**")) &&
  defined(publishedAt) &&
  publishedAt <= now()
][0] ${postProjection}`;

const draftPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] ${postProjection}`;

function mapPost(document: SanityBlogPost): BlogPost {
  const body = document.body ?? [];
  const bodyMarkdown = document.bodyMarkdown?.trim() ?? "";
  const articleText = body.length
    ? toPlainText(body)
    : bodyMarkdown
        .replace(/!??\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[#>*_~`]/g, " ");
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;

  return {
    id: document._id,
    slug: document.slug,
    title: document.title?.trim() || "Untitled draft",
    excerpt: document.excerpt ?? "",
    date: document.publishedAt ?? document._updatedAt,
    category: document.categories?.[0]?.name ?? "Article",
    categories: document.categories ?? [],
    tags: document.tags ?? [],
    image: sanityImageUrl(document.featuredImage) ?? "/images/logo.png",
    imageAlt: document.featuredImage?.alt?.trim() || document.title?.trim() || "Featured article image",
    author: document.author
      ? {
          name: document.author.name,
          biography: document.author.biography,
          image: sanityImageUrl(document.author.profileImage, 400),
        }
      : null,
    seoTitle: document.seo?.title,
    seoDescription: document.seo?.description,
    openGraphImage: sanityImageUrl(document.seo?.openGraphImage, 1200),
    featured: document.featured ?? false,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    body,
    bodyMarkdown: body.length ? undefined : bodyMarkdown || undefined,
  };
}

export async function getBlogPosts(preview = false): Promise<BlogPost[]> {
  const client = preview ? getDraftClient() : sanityClient;
  const documents = await client.fetch<SanityBlogPost[]>(preview ? draftPostsQuery : publishedPostsQuery);
  return documents.map(mapPost);
}

export async function getBlogPost(slug: string, preview = false): Promise<BlogPost | null> {
  const client = preview ? getDraftClient() : sanityClient;
  const document = await client.fetch<SanityBlogPost | null>(
    preview ? draftPostQuery : publishedPostQuery,
    { slug },
  );
  return document ? mapPost(document) : null;
}

export async function getRelatedBlogPosts(slug: string, preview = false): Promise<BlogPost[]> {
  const posts = await getBlogPosts(preview);
  const current = posts.find((post) => post.slug === slug);
  if (!current) return posts.filter((post) => post.slug !== slug).slice(0, 2);

  const currentCategories = new Set(current.categories.map((category) => category.slug));
  const currentTags = new Set(current.tags.map((tag) => tag.trim().toLocaleLowerCase()));
  const stopWords = new Set(["about", "after", "also", "from", "have", "into", "that", "their", "there", "these", "this", "with", "your", "lolar", "shons", "gourmet"]);
  const terms = new Set(
    `${current.title} ${current.excerpt}`
      .toLocaleLowerCase()
      .match(/[a-z0-9]{4,}/g)
      ?.filter((term) => !stopWords.has(term)) ?? [],
  );

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedCategories = post.categories.filter((category) => currentCategories.has(category.slug)).length;
      const sharedTags = post.tags.filter((tag) => currentTags.has(tag.trim().toLocaleLowerCase())).length;
      const text = `${post.title} ${post.excerpt}`.toLocaleLowerCase();
      const sharedTerms = [...terms].filter((term) => text.includes(term)).length;
      return { post, score: sharedCategories * 5 + sharedTags * 3 + sharedTerms };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, 2)
    .map(({ post }) => post);
}

export async function isDraftPreviewEnabled(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}
