"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { blogIdeaCategories, suggestedBlogTopics } from "@/data/blog-ideas";
import type { BlogGenerationRecord, BlogManagerOverview, BlogTopic } from "@/types/blog-manager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type QueuedTopic = { id: string; topic: BlogTopic };

const statusLabels = {
  pending: "Pending",
  processing: "Processing",
  draftCreated: "Draft created",
  failed: "Failed",
  published: "Published",
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function StatusBadge({ status }: { status: BlogGenerationRecord["status"] }) {
  const classes = {
    pending: "border-amber-300 bg-amber-50 text-amber-900",
    processing: "border-blue-300 bg-blue-50 text-blue-900",
    draftCreated: "border-champagne bg-accent text-accent-foreground",
    failed: "border-destructive/30 bg-destructive/10 text-destructive",
    published: "border-emerald-300 bg-emerald-50 text-emerald-900",
  };
  return <Badge className={classes[status]} variant="outline">{statusLabels[status]}</Badge>;
}

function OverviewCard({ label, value, icon: Icon, detail }: {
  label: string;
  value: number;
  icon: typeof FileText;
  detail: string;
}) {
  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
        </div>
        <span className="rounded-lg bg-secondary p-2.5 text-brand"><Icon aria-hidden className="size-5" /></span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}

export function GenerationDashboard({
  overview,
  generationSetupIssue,
}: {
  overview: BlogManagerOverview;
  generationSetupIssue: string | null;
}) {
  const router = useRouter();
  const [articleCount, setArticleCount] = useState(1);
  const [queue, setQueue] = useState<QueuedTopic[]>([]);
  const [customTitle, setCustomTitle] = useState("");
  const [customDetails, setCustomDetails] = useState("");
  const [customCategory, setCustomCategory] = useState<string>(blogIdeaCategories[0]);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const queuedIdeaIds = useMemo(() => new Set(queue.map((item) => item.id)), [queue]);
  const remainingSlots = articleCount - queue.length;

  function addTopic(topic: BlogTopic, id: string) {
    if (queue.length >= articleCount) {
      setSelectionError(`This request is set for ${articleCount} article${articleCount === 1 ? "" : "s"}. Increase the number before adding another topic.`);
      return;
    }
    if (queue.some((entry) => entry.topic.title.trim().toLowerCase() === topic.title.trim().toLowerCase())) {
      setSelectionError("That topic is already in your generation queue.");
      return;
    }
    setQueue((current) => [...current, { id, topic }]);
    setSelectionError(null);
    setRequestError(null);
    setRequestMessage(null);
  }

  function toggleSuggestion(topic: BlogTopic, checked: boolean) {
    const id = `idea:${topic.category}:${topic.title}`;
    if (checked) {
      addTopic(topic, id);
    } else {
      setQueue((current) => current.filter((entry) => entry.id !== id));
      setSelectionError(null);
    }
  }

  function addCustomTopic() {
    const title = customTitle.trim();
    if (title.length < 3) {
      setSelectionError("Enter a topic with at least three characters.");
      return;
    }
    addTopic(
      { title, description: customDetails.trim() || `Create an original article about: ${title}`, category: customCategory },
      `custom:${crypto.randomUUID()}`,
    );
    if (queue.length < articleCount) {
      setCustomTitle("");
      setCustomDetails("");
    }
  }

  async function submitGeneration() {
    if (queue.length !== articleCount || submitting) return;
    setSubmitting(true);
    setRequestError(null);
    setRequestMessage(null);
    try {
      const response = await fetch("/api/admin/blog-manager/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId: crypto.randomUUID(), topics: queue.map((item) => item.topic) }),
      });
      const result = await response.json();
      if (!response.ok) {
        setRequestError(result.error ?? "The generation request could not be submitted.");
        return;
      }

      setQueue([]);
      setRequestMessage("Your request was accepted by the configured workflow. Its status will update here when n8n records progress in Sanity.");
      setConfirmOpen(false);
      router.refresh();
    } catch {
      setRequestError("Could not reach the generation service. Check the History page before retrying to avoid duplicate requests.");
    } finally {
      setSubmitting(false);
    }
  }

  const visibleRecentActivity = overview.recentActivity.slice(0, 5);

  return (
    <div className="space-y-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Private content workspace</p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">AI Blog Manager</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Choose an article direction, send it to the content workflow, then review every draft in Sanity before publishing.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/studio">Open Sanity Studio <ArrowRight aria-hidden /></Link>
        </Button>
      </div>

      {!overview.available && (
        <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
          {overview.unavailableReason ?? "Dashboard statistics are unavailable."}
        </div>
      )}
      {overview.available && (
        <section aria-label="Dashboard overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard label="Generated articles" value={overview.generatedArticles} icon={Sparkles} detail="Requests with a created or published article" />
          <OverviewCard label="Drafts awaiting approval" value={overview.draftsAwaitingApproval} icon={Clock3} detail="All unpublished blog post drafts in Sanity" />
          <OverviewCard label="Published articles" value={overview.publishedArticles} icon={CheckCircle2} detail="Currently public on the website" />
          <OverviewCard label="Recent generation activity" value={overview.recentActivity.length} icon={FileText} detail="Recorded generation requests" />
        </section>
      )}

      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-brand uppercase">Generation settings</p>
            <h2 className="mt-2 text-2xl font-semibold">Choose article topics</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Select a topic from the ideas below or add a custom one. Each topic becomes a separate unpublished draft for review.
            </p>
          </div>
          <label className="block min-w-44 space-y-2 text-sm font-medium" htmlFor="article-count">
            Articles in this request
            <select
              id="article-count"
              className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
              value={articleCount}
              onChange={(event) => {
                setArticleCount(Number(event.target.value));
                setSelectionError(null);
              }}
            >
              {[1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count} article{count === 1 ? "" : "s"}</option>)}
            </select>
          </label>
        </div>

        {generationSetupIssue ? (
          <div role="status" className="mt-6 rounded-lg border border-champagne/70 bg-secondary/60 p-4 text-sm leading-6">
            <p className="font-semibold">Generation is not configured yet.</p>
            <p className="mt-1 text-muted-foreground">{generationSetupIssue}</p>
            <p className="mt-2 text-xs text-muted-foreground">These topics can be queued, but no request will be sent until the server-side integration is ready.</p>
          </div>
        ) : null}

        <div className="mt-7 space-y-8">
          {blogIdeaCategories.map((category) => (
            <fieldset key={category}>
              <legend className="mb-3 text-lg font-semibold">{category}</legend>
              <div className="grid gap-3 lg:grid-cols-2">
                {suggestedBlogTopics.filter((topic) => topic.category === category).map((topic) => {
                  const id = `idea:${topic.category}:${topic.title}`;
                  const checked = queuedIdeaIds.has(id);
                  return (
                    <label
                      key={id}
                      className={`flex gap-3 rounded-lg border p-4 transition-colors ${checked ? "border-brand/50 bg-secondary/60" : "bg-background hover:bg-secondary/30"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!checked && remainingSlots <= 0}
                        onChange={(event) => toggleSuggestion(topic, event.target.checked)}
                        className="mt-1 size-4 accent-[#4b001f]"
                        aria-label={`Select ${topic.title}`}
                      />
                      <span>
                        <span className="block text-sm font-semibold">{topic.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-muted-foreground">{topic.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-champagne/50 bg-secondary/30 p-4 sm:p-5">
          <h3 className="font-semibold">Add a custom article topic</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label htmlFor="custom-topic" className="space-y-2 text-sm font-medium">
              Topic
              <Input id="custom-topic" value={customTitle} onChange={(event) => setCustomTitle(event.target.value)} maxLength={180} placeholder="What should the article explore?" />
            </label>
            <label htmlFor="custom-category" className="space-y-2 text-sm font-medium">
              Category
              <select
                id="custom-category"
                value={customCategory}
                onChange={(event) => setCustomCategory(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
              >
                {blogIdeaCategories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label htmlFor="custom-details" className="space-y-2 text-sm font-medium md:col-span-2">
              Additional direction <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea id="custom-details" value={customDetails} onChange={(event) => setCustomDetails(event.target.value)} maxLength={500} rows={3} placeholder="Add helpful context or an angle for the article." />
            </label>
          </div>
          <Button type="button" className="mt-4" variant="outline" onClick={addCustomTopic} disabled={!customTitle.trim() || remainingSlots <= 0}>
            <Plus aria-hidden /> Add to queue
          </Button>
        </div>

        {queue.length > 0 && (
          <section aria-labelledby="queued-topics-title" className="mt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 id="queued-topics-title" className="font-semibold">Generation queue</h3>
              <p className="text-sm text-muted-foreground">{queue.length} of {articleCount} selected</p>
            </div>
            <ul className="mt-3 divide-y rounded-lg border bg-background">
              {queue.map(({ id, topic }) => (
                <li key={id} className="flex items-start justify-between gap-4 p-4">
                  <div>
                    <p className="text-sm font-semibold">{topic.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{topic.category}</p>
                  </div>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Remove ${topic.title}`}
                    onClick={() => setQueue((current) => current.filter((item) => item.id !== id))}
                  >
                    <Trash2 aria-hidden />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {selectionError && <p role="alert" className="mt-4 text-sm text-destructive">{selectionError}</p>}
        {requestError && <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{requestError}</p>}
        {requestMessage && <p role="status" className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-900">{requestMessage}</p>}

        <div className="mt-7 flex flex-wrap items-center gap-4 border-t pt-6">
          <Button
            type="button"
            size="lg"
            disabled={Boolean(generationSetupIssue) || queue.length !== articleCount || submitting || !overview.available}
            onClick={() => setConfirmOpen(true)}
          >
            <Sparkles aria-hidden /> Generate Articles
          </Button>
          <p className="text-sm text-muted-foreground">
            {queue.length !== articleCount
              ? `Select ${articleCount - queue.length} more topic${articleCount - queue.length === 1 ? "" : "s"} to continue.`
              : "You will confirm this request before it is sent."}
          </p>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Recent generation activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">Status is based on request records stored in Sanity.</p>
          </div>
          <Button asChild variant="outline" size="sm"><Link href="/admin/blog-manager/history">View history <ArrowRight aria-hidden /></Link></Button>
        </div>
        {!overview.available ? (
          <p className="mt-5 rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
            Activity is unavailable until Sanity connectivity is restored.
          </p>
        ) : visibleRecentActivity.length === 0 ? (
          <p className="mt-5 rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
            No generation requests have been recorded yet.
          </p>
        ) : (
          <ul className="mt-5 divide-y">
            {visibleRecentActivity.map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold">{item.articleTitle ?? item.topic}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.category} · {formatDate(item.requestedAt)}</p>
                </div>
                <StatusBadge status={item.status} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <Dialog open={confirmOpen} onOpenChange={(open) => !submitting && setConfirmOpen(open)}>
        <DialogContent>
          <DialogTitle>Confirm article generation</DialogTitle>
          <DialogDescription>
            Send {queue.length} topic{queue.length === 1 ? "" : "s"} to the configured content workflow? Articles are requested as drafts and will not be published automatically.
          </DialogDescription>
          <ul className="max-h-56 space-y-2 overflow-auto rounded-lg border bg-background p-3 text-sm">
            {queue.map(({ id, topic }) => <li key={id}><span className="font-medium">{topic.title}</span><span className="ml-2 text-muted-foreground">· {topic.category}</span></li>)}
          </ul>
          {requestError && <p role="alert" className="text-sm text-destructive">{requestError}</p>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" disabled={submitting} onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button type="button" disabled={submitting} onClick={submitGeneration}>
              {submitting ? <><LoaderCircle aria-hidden className="animate-spin" /> Submitting...</> : "Confirm and generate"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
