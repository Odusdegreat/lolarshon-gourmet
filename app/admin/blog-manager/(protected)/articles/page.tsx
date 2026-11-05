import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBlogManagerReadClient } from "@/lib/blog-manager/sanity";

export const metadata: Metadata = { title: "All Articles", robots: { index: false, follow: false } };

type ArticleRow = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  categories?: { name?: string }[];
};

export default async function BlogManagerArticlesPage() {
  let articles: ArticleRow[] = [];
  let unavailable = false;
  try {
    const client = getBlogManagerReadClient("drafts");
    articles = await client.fetch<ArticleRow[]>(
      `*[_type == "blogPost"] | order(_updatedAt desc) {
        _id, title, slug, publishedAt, "categories": categories[]->{name}
      }`,
      {},
      { cache: "no-store" },
    );
  } catch (error) {
    console.error("Could not load Blog Manager articles from Sanity.", error);
    unavailable = true;
  }

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Blog Manager</p>
          <h1 className="mt-1 text-3xl font-semibold">All articles</h1>
          <p className="mt-2 text-sm text-muted-foreground">Edit drafts here; use Sanity Studio to publish or unpublish.</p>
        </div>
        <Button asChild><Link href="/admin/blog-manager/create">Create article</Link></Button>
      </div>
      {unavailable ? (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Articles could not be loaded. Check Sanity read-token permissions.
        </p>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <h2 className="font-semibold">No articles found</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create your first draft or check the Sanity connection.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-champagne/50 bg-card">
          <ul className="divide-y">
            {articles.map((article) => {
              const isDraft = article._id.startsWith("drafts.");
              const id = isDraft ? article._id.slice("drafts.".length) : article._id;
              return (
                <li key={article._id} className="flex flex-wrap items-center justify-between gap-4 p-4 sm:px-5">
                  <div className="min-w-0">
                    <h2 className="truncate font-medium">{article.title || "Untitled article"}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {(article.categories ?? []).map((category) => category.name).filter(Boolean).join(", ") || "No category"}
                      {" · "}{isDraft ? "Draft" : "Published"}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline"><Link href={`/admin/blog-manager/create?id=${encodeURIComponent(id)}`}>Edit</Link></Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
