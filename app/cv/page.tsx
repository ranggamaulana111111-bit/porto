import type { Metadata } from "next";
import { profile, projects, journey, todayStatus } from "@/lib/content";
import { CvPrintButton } from "@/components/cv-print-button";

export const metadata: Metadata = {
  title: "CV — rangga.mrw",
  description: "Ringkasan eksekutif profil, pengalaman, dan kapabilitas Rangga.",
};

export default function CvPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="no-print mb-8 flex justify-end">
          <CvPrintButton />
        </div>

        <header className="border-b border-border pb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-sm text-fg-secondary">{profile.role}</p>
          <p className="mt-2 text-xs text-fg-muted">
            {profile.location} · {profile.email} · rangga.mrw
          </p>
        </header>

        <section className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-fg-muted mb-4">
            Pengalaman
          </h2>
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-fg">{p.title}</span>
                  <span className="shrink-0 font-mono text-xs text-fg-muted">{p.year}</span>
                </div>
                <p className="text-xs text-fg-muted">{p.kind} · {p.role}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-secondary">{p.summary}</p>
                <p className="mt-1 text-xs text-fg-muted">{p.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-fg-muted mb-4">
            Perjalanan
          </h2>
          <div className="space-y-3">
            {journey.map((j) => (
              <div key={j.year} className="flex gap-4">
                <span className="w-12 shrink-0 font-mono text-xs text-fg-muted">{j.year}</span>
                <div>
                  <p className="text-sm text-fg">{j.title}</p>
                  <p className="text-sm leading-relaxed text-fg-secondary">{j.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-wider text-fg-muted mb-4">
            Tech stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {todayStatus.techStack.map((t) => (
              <span
                key={t}
                className="border border-border px-2.5 py-1 text-xs text-fg-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
