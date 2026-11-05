import type { Metadata } from "next";
import { ManualArticleEditor, type ExistingArticle } from "@/components/blog-manager/manual-article-editor";
import { getBlogManagerReadClient } from "@/lib/blog-manager/sanity";
import type { PortableTextBlock } from "@portabletext/editor";

export const metadata: Metadata = { title: "Create Article", robots: { index: false, follow: false } };

type SanityChoice = { _id: string; name: string };
type SanityArticle = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref?: string };
    alt?: string;
    url?: string;
  };
  body?: PortableTextBlock[];
  author?: { _ref?: string };
  categories?: { _ref?: string }[];
  tags?: string[];
  seo?: { title?: string; description?: string };
};

export default async function BlogManagerCreatePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  const safeId = typeof id === "string" && /^[a-zA-Z0-9._-]{1,120}$/.test(id.replace(/^drafts\./, ""))
    ? id.replace(/^drafts\./, "")
    : undefined;
  let categories: SanityChoice[] = [];
  let authors: SanityChoice[] = [];
  let article: ExistingArticle | undefined;
  let unavailable: string | null = null;

  try {
    const client = getBlogManagerReadClient("drafts");
    [categories, authors] = await Promise.all([
      client.fetch<SanityChoice[]>(
        `*[_type == "category" && !(_id in path("drafts.**"))] | order(name asc){_id,name}`,
        {},
        { cache: "no-store" },
      ),
      client.fetch<SanityChoice[]>(
        `*[_type == "author" && !(_id in path("drafts.**"))] | order(name asc){_id,name}`,
        {},
        { cache: "no-store" },
      ),
    ]);

    if (safeId) {
      const document = await client.fetch<SanityArticle | null>(
        `*[_type == "blogPost" && _id in [$id, $draftId]][0]{
          _id, title, slug, excerpt,
          "featuredImage": featuredImage{alt, asset, "url": asset->url},
          "body": body[]{..., "assetUrl": asset->url},
          "author": author->{"_ref": _id},
          "categories": categories[]->{"_ref": _id},
          tags, seo
        }`,
        { id: safeId, draftId: `drafts.${safeId}` },
        { cache: "no-store" },
      );
      if (!document) unavailable = "That article could not be found.";
      else {
        article = {
          id: document._id.replace(/^drafts\./, ""),
          title: document.title ?? "",
          slug: document.slug?.current ?? "",
          excerpt: document.excerpt ?? "",
          featuredImage: document.featuredImage?.asset?._ref
            ? {
                assetId: document.featuredImage.asset._ref,
                url: document.featuredImage.url ?? "",
                alt: document.featuredImage.alt ?? "",
              }
            : null,
          body: document.body ?? [],
          authorId: document.author?._ref ?? "",
          categoryId: document.categories?.[0]?._ref ?? "",
          tags: document.tags ?? [],
          seoTitle: document.seo?.title ?? "",
          seoDescription: document.seo?.description ?? "",
        };
      }
    }
  } catch (error) {
    console.error("Could not load Sanity data for the manual article editor.", error);
    unavailable = "Sanity categories, authors, or article data could not be loaded. Check server-side read-token permissions.";
  }

  return (
    <>
      {unavailable && <p role="alert" className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">{unavailable}</p>}
      {!unavailable && categories.length === 0 && (
        <p role="alert" className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Publish at least one Sanity category before creating an article.
        </p>
      )}
      {!unavailable && authors.length === 0 && (
        <p role="alert" className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Publish at least one Sanity author before creating an article.
        </p>
      )}
      <ManualArticleEditor
        categories={categories.map(({ _id, name }) => ({ id: _id, name }))}
        authors={authors.map(({ _id, name }) => ({ id: _id, name }))}
        initialArticle={article}
      />
    </>
  );
}
