import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <p className="font-mono text-xs text-fg-muted">404</p>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Halaman ini tidak ada.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-fg-secondary max-w-xl">
          Mungkin alamatnya salah, atau halamannya memang belum saya buat. Kembali
          ke meja kerja.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors hover:text-accent"
        >
          <span className="text-fg-faint">[</span>kembali ke beranda
          <span className="text-fg-faint">]</span>
        </Link>
      </div>
    </main>
  );
}
