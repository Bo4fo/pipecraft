export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6" role="status" aria-label="Loading page">
      <div className="h-6 w-40 animate-pulse rounded bg-subtle" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-lg border border-border-subtle bg-surface" />)}
      </div>
      <div className="h-64 animate-pulse rounded-lg border border-border-subtle bg-surface" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
