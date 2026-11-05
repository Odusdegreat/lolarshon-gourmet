"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, RotateCcw } from "lucide-react";
import type { BlogGenerationRecord, BlogManagerStatus } from "@/types/blog-manager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusLabels: Record<BlogManagerStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  draftCreated: "Draft created",
  failed: "Failed",
  published: "Published",
};

const statusClasses: Record<BlogManagerStatus, string> = {
  pending: "border-amber-300 bg-amber-50 text-amber-900",
  processing: "border-blue-300 bg-blue-50 text-blue-900",
  draftCreated: "border-champagne bg-accent text-accent-foreground",
  failed: "border-destructive/30 bg-destructive/10 text-destructive",
  published: "border-emerald-300 bg-emerald-50 text-emerald-900",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function GenerationHistory({
  initialRequests,
  unavailableReason,
  retryAvailable,
}: {
  initialRequests: BlogGenerationRecord[];
  unavailableReason: string | null;
  retryAvailable: boolean;
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function retry(id: string) {
    setRetryingId(id);
    setError(null);
    try {
      const response = await fetch(`/api/admin/blog-manager/generations/${encodeURIComponent(id)}/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? "This request could not be retried.");
        return;
      }
      setRequests((current) => current.map((item) => item.id === id ? { ...item, status: "pending" } : item));
    } catch {
      setError("Could not reach the retry service.");
    } finally {
      setRetryingId(null);
    }
  }

  if (unavailableReason) {
    return <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-5 text-sm">{unavailableReason}</p>;
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-8 text-center">
        <p className="font-semibold">No generation history yet</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          This is an empty history, not a connection error. A record appears after a generation request is sent through the configured n8n workflow.
        </p>
        <Button asChild className="mt-5" variant="outline"><Link href="/admin/blog-manager">Choose article topics</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
      <ul className="space-y-3">
        {requests.map((item) => (
          <li key={item.id} className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">{item.category}</p>
                <h2 className="mt-1 text-lg font-semibold">{item.articleTitle ?? item.topic}</h2>
                {item.articleTitle && <p className="mt-1 text-sm text-muted-foreground">Requested: {item.topic}</p>}
                <p className="mt-2 text-xs text-muted-foreground">Requested {formatDate(item.requestedAt)}</p>
                {item.errorMessage && item.status === "failed" && (
                  <p className="mt-3 rounded-md bg-destructive/5 p-3 text-sm text-destructive">{item.errorMessage}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={statusClasses[item.status]}>{statusLabels[item.status]}</Badge>
                {item.status === "failed" && retryAvailable && (
                  <Button size="sm" variant="outline" disabled={retryingId !== null} onClick={() => retry(item.id)}>
                    {retryingId === item.id ? <LoaderCircle aria-hidden className="animate-spin" /> : <RotateCcw aria-hidden />}
                    Retry
                  </Button>
                )}
              </div>
            </div>
            {item.status === "draftCreated" && (
              <p className="mt-4 border-t pt-4 text-sm text-muted-foreground">
                Review and edit this draft in <Link href="/studio" className="font-medium text-brand underline underline-offset-4">Sanity Studio</Link>. Publishing remains a manual action.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
