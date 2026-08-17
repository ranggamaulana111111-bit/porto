"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <p className="font-mono text-xs text-fg-muted">error</p>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Terjadi kesalahan.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-secondary max-w-xl">
          Ada yang tidak beres. Coba muat ulang, atau kembali ke meja kerja.
        </p>
        <button
          onClick={() => reset()}
          className="mt-8 border border-fg px-6 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-fg hover:text-bg"
        >
          Coba lagi
        </button>
      </div>
    </main>
  );
}
