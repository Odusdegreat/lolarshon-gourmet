export default function BlogPostLoading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto min-h-[60vh] max-w-4xl px-5 py-14">
      <span className="sr-only">Loading article…</span>
      <div aria-hidden className="aspect-[16/9] animate-pulse rounded-2xl bg-secondary" />
      <div aria-hidden className="mx-auto mt-10 max-w-2xl space-y-5">
        <div className="h-3 w-32 animate-pulse rounded bg-secondary" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="h-5 w-full animate-pulse rounded bg-secondary" />
        <div className="h-5 w-5/6 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}
