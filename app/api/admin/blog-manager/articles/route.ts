import { NextRequest, NextResponse } from "next/server";
import { isBlogManagerAuthenticated, isSameOriginRequest } from "@/lib/blog-manager/auth";
import { validateArticleDraft } from "@/lib/blog-manager/article-validation";
import { getBlogManagerReadClient, getBlogManagerWriteClient } from "@/lib/blog-manager/sanity";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  if (!(await isBlogManagerAuthenticated())) {
    return NextResponse.json({ error: "Sign in to use the Blog Manager." }, { status: 401 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 1_500_000) {
    return NextResponse.json({ error: "Article content is too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid article data." }, { status: 400 });
  }
  const article = validateArticleDraft(raw);
  if (!article) {
    return NextResponse.json({ error: "Review the article fields and rich-text content, then try again." }, { status: 400 });
  }

  try {
    const readClient = getBlogManagerReadClient("drafts");
    const writeClient = getBlogManagerWriteClient();
    const [author, category] = await Promise.all([
      readClient.fetch<{ _id: string } | null>(
        `*[_type == "author" && _id == $id][0]{_id}`,
        { id: article.authorId },
        { cache: "no-store" },
      ),
      readClient.fetch<{ _id: string } | null>(
        `*[_type == "category" && _id == $id][0]{_id}`,
        { id: article.categoryId },
        { cache: "no-store" },
      ),
    ]);
    if (!author || !category) {
      return NextResponse.json({ error: "Select an existing published author and category." }, { status: 400 });
    }

    let featured = false;
    let publishedAt = new Date().toISOString();
    let openGraphImage: unknown;
    if (article.id) {
      const existing = await readClient.fetch<{ _id: string; featured?: boolean; publishedAt?: string; seo?: { openGraphImage?: unknown } } | null>(
        `*[_type == "blogPost" && _id in [$id, $draftId]][0]{_id, featured, publishedAt, "seo": seo{openGraphImage}}`,
        { id: article.id, draftId: `drafts.${article.id}` },
        { cache: "no-store" },
      );
      if (!existing) return NextResponse.json({ error: "That article could not be found." }, { status: 404 });
      featured = existing.featured ?? false;
      publishedAt = existing.publishedAt ?? publishedAt;
      openGraphImage = existing.seo?.openGraphImage;
    }

    const documentId = article.id ?? crypto.randomUUID();
    await writeClient.createOrReplace({
      _id: `drafts.${documentId}`,
      _type: "blogPost",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      excerpt: article.excerpt,
      featuredImage: {
        _type: "image",
        asset: { _type: "reference", _ref: article.featuredImage.assetId },
        alt: article.featuredImage.alt,
      },
      body: article.body,
      author: { _type: "reference", _ref: article.authorId },
      categories: [{ _type: "reference", _ref: article.categoryId, _key: crypto.randomUUID() }],
      tags: article.tags,
      seo: {
        title: article.seoTitle,
        description: article.seoDescription,
        ...(openGraphImage ? { openGraphImage } : {}),
      },
      publishedAt,
      featured,
    });

    return NextResponse.json(
      { id: documentId, status: "draft", studioUrl: `/studio/structure/blogPost;${documentId}` },
      { status: article.id ? 200 : 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const statusCode =
      error && typeof error === "object" && "statusCode" in error && typeof error.statusCode === "number"
        ? error.statusCode
        : null;
    if (statusCode === 403) {
      return NextResponse.json({ error: "Sanity rejected the write token. Grant it permission to create blog-post drafts." }, { status: 503 });
    }
    if (error instanceof Error && error.message.includes("SANITY_API_WRITE_TOKEN")) {
      return NextResponse.json({ error: "Article saving is not configured. Add SANITY_API_WRITE_TOKEN on the server." }, { status: 503 });
    }
    console.error("Could not save Blog Manager article draft.", error);
    return NextResponse.json({ error: "The draft could not be saved to Sanity." }, { status: 500 });
  }
}
