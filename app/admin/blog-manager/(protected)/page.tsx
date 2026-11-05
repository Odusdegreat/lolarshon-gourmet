import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FilePlus2, Settings2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogManagerOverview } from "@/lib/blog-manager/data";
import type { BlogManagerOverview } from "@/types/blog-manager";

export const metadata: Metadata = {
  title: "Blog Manager Overview",
  robots: { index: false, follow: false },
};

export default async function BlogManagerOverviewPage() {
  let overview: BlogManagerOverview;
  let error: string | null = null;
  try {
    overview = await getBlogManagerOverview();
  } catch (caught) {
    console.error("Could not load Blog Manager overview from Sanity.", caught);
    error = "Dashboard data is unavailable. Check Sanity read-token permissions.";
    overview = {
      generatedArticles: 0,
      draftsAwaitingApproval: 0,
      publishedArticles: 0,
      recentActivity: [],
      available: false,
    };
  }

  const statistics = [
    { label: "Generated articles", value: overview.generatedArticles },
    { label: "Drafts awaiting approval", value: overview.draftsAwaitingApproval },
    { label: "Published articles", value: overview.publishedArticles },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Lolarshons Gourmet</p>
          <h1 className="mt-1 text-3xl font-semibold">AI Blog Manager</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage articles and review recent content activity.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog-manager/create"><FilePlus2 aria-hidden className="mr-2 size-4" />Create article</Link>
        </Button>
      </div>

      {error && <p role="alert" className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        {statistics.map((statistic) => (
          <section key={statistic.label} className="rounded-xl border border-champagne/50 bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{statistic.label}</p>
            <p className="mt-2 text-3xl font-semibold">{overview.available ? statistic.value : "—"}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { href: "/admin/blog-manager/articles", title: "All articles", description: "Review drafts and published posts.", icon: ArrowRight },
          { href: "/admin/blog-manager/generate", title: "AI article generator", description: "Queue topic ideas when n8n is configured.", icon: Sparkles },
          { href: "/admin/blog-manager/settings", title: "Settings", description: "Review integrations and account links.", icon: Settings2 },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group rounded-xl border border-champagne/50 bg-card p-5 transition-colors hover:bg-muted/40">
            <item.icon aria-hidden className="size-5 text-brand" />
            <h2 className="mt-4 font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-champagne/50 bg-card p-5">
        <h2 className="font-semibold">Recent generation activity</h2>
        {overview.available ? (
          overview.recentActivity.length > 0 ? (
            <ul className="mt-4 divide-y">
              {overview.recentActivity.map((item) => (
                <li key={item.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                  <span>{item.articleTitle ?? item.topic}</span>
                  <span className="text-muted-foreground">{item.status}</span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-3 text-sm text-muted-foreground">No generation activity is recorded yet.</p>
        ) : <p className="mt-3 text-sm text-muted-foreground">Activity is unavailable until Sanity connectivity is restored.</p>}
      </section>
    </div>
  );
}
