export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto flex min-h-[45vh] max-w-7xl flex-col items-center justify-center gap-4 px-5">
      <span aria-hidden className="size-9 animate-spin rounded-full border-2 border-champagne border-t-primary" />
      <span className="text-sm text-muted-foreground">Loading page…</span>
    </div>
  );
}
