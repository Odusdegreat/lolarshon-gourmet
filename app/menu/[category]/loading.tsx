export default function MenuLoading() {
  return (
    <div role="status" aria-live="polite" className="mx-auto min-h-[60vh] max-w-7xl px-5 py-14 lg:px-8">
      <span className="sr-only">Loading menu…</span>
      <div aria-hidden className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
        <div className="mx-auto h-3 w-28 animate-pulse rounded bg-secondary" />
        <div className="mx-auto h-10 w-64 max-w-full animate-pulse rounded bg-secondary" />
        <div className="mx-auto h-4 w-96 max-w-full animate-pulse rounded bg-secondary" />
      </div>
      <div aria-hidden className="mb-8 flex gap-3">
        {[1, 2, 3].map((item) => <div key={item} className="h-11 w-28 animate-pulse rounded-full bg-secondary" />)}
      </div>
      <div aria-hidden className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="overflow-hidden rounded-xl border bg-card">
            <div className="aspect-[4/3] animate-pulse bg-secondary" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-secondary" />
              <div className="h-4 w-full animate-pulse rounded bg-secondary" />
              <div className="h-9 w-1/3 animate-pulse rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
