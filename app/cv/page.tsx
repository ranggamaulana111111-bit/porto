import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects, journey, techStackCategories } from "@/lib/content";
import { CvPrintButton } from "@/components/cv-print-button";

export const metadata: Metadata = {
  title: "CV — rangga.mrw",
  description: "Ringkasan eksekutif profil, pengalaman, dan kapabilitas Rangga.",
};

export default function CvPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="no-print mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
          >
            ← Kembali
          </Link>
          <CvPrintButton />
        </div>

        <header className="border-b border-border pb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-base text-fg-secondary">{profile.role}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-muted">
            <span>{profile.location}</span>
            <span className="text-fg-faint">·</span>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">{profile.email}</a>
            <span className="text-fg-faint">·</span>
            <span>{profile.shortName}</span>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-wider text-fg-muted">
            Pengalaman
          </h2>
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.slug} className="group">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-semibold text-fg">{p.title}</span>
                  <span className="shrink-0 font-mono text-xs text-fg-faint">{p.year}</span>
                </div>
                <p className="mt-0.5 text-xs text-fg-faint">{p.kind} · {p.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{p.summary}</p>
                {p.stack.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded border border-border px-1.5 py-0.5 text-[10px] text-fg-muted">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-wider text-fg-muted">
            Perjalanan
          </h2>
          <div className="space-y-4">
            {journey.map((j) => (
              <div key={j.year} className="flex gap-4">
                <span className="w-12 shrink-0 font-mono text-xs text-fg-faint">{j.year}</span>
                <div>
                  <p className="text-sm font-medium text-fg">{j.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-secondary">{j.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-5 font-mono text-xs uppercase tracking-wider text-fg-muted">
            Tech stack & kompetensi
          </h2>
          <div className="space-y-5">
            {techStackCategories.map((cat) => (
              <div key={cat.category}>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-fg-muted">
                  {cat.category}
                </p>
                <ul className="space-y-1.5">
                  {cat.technologies.map((t) => (
                    <li
                      key={t.name}
                      className="flex flex-wrap items-baseline gap-x-2 text-sm"
                    >
                      <span className="font-medium text-fg">{t.name}</span>
                      <span className="text-xs text-fg-muted">{t.role}</span>
                      <span className="text-xs text-fg-faint">
                        — {t.projects.join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 border-t border-border pt-6 text-xs text-fg-faint">
          Diperbarui {new Date().getFullYear()} · rangga.dev
        </div>
      </div>
    </main>
  );
}
