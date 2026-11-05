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
  featuredImage: SanityImageSource | null;
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
  body: PortableTextBlock[];
};

const postProjection = groq`{
  "_id": _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  "author": author->{name, biography, "profileImage": profileImage},
  "categories": categories[]->{_id, name, "slug": slug.current},
  tags,
  seo,
  publishedAt,
  featured,
  body
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
  const wordCount = toPlainText(body).trim().split(/\s+/).filter(Boolean).length;

  return {
    id: document._id,
    slug: document.slug,
    title: document.title || "Untitled draft",
    excerpt: document.excerpt ?? "",
    date: document.publishedAt ?? document._updatedAt,
    category: document.categories?.[0]?.name ?? "Article",
    categories: document.categories ?? [],
    tags: document.tags ?? [],
    image: sanityImageUrl(document.featuredImage) ?? "/images/logo.png",
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
  return (await getBlogPosts(preview)).filter((post) => post.slug !== slug).slice(0, 2);
}

export async function isDraftPreviewEnabled(): Promise<boolean> {
  return (await draftMode()).isEnabled;
}
