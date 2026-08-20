export default function Loading() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 h-4 w-32 animate-pulse rounded bg-bg-card" />
        <div className="flex items-center gap-3">
          <span className="h-3 w-16 animate-pulse rounded bg-bg-card" />
          <span className="h-3 w-20 animate-pulse rounded bg-bg-card" />
          <span className="h-3 w-16 animate-pulse rounded bg-bg-card" />
        </div>
        <div className="mt-4 h-9 w-3/4 animate-pulse rounded bg-bg-card" />
        <div className="mt-6 h-4 w-full animate-pulse rounded bg-bg-card" />
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-bg-card" />
        <div className="mt-10 h-px w-full bg-border pt-8" />
        <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-bg-card" />
      </div>
    </main>
  );
}
