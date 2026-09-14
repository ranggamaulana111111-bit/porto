"use client";

import { Reveal } from "@/components/reveal";
import { ClayCard } from "@/components/clay";

export function Education() {
  return (
    <section id="education" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Education</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Pendidikan.</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <ClayCard className="mt-8 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">Universitas Pamulang</h3>
                <p className="mt-1 text-sm text-fg-secondary">Program Studi Sistem Informasi, Kampus Serang</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                  Masuk 2024. Fokus belajar software development, database, dan bagaimana sistem bekerja secara menyeluruh.
                </p>
              </div>
              <span className="shrink-0 rounded-[var(--radius-pill)] bg-bg-inset border border-border-subtle px-3 py-1.5 font-mono text-xs text-fg-muted">
                2024–Sekarang
              </span>
            </div>
          </ClayCard>
        </Reveal>
        <Reveal delay={0.12}>
          <ClayCard className="mt-4 p-6 sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">SMKN 4 Pandeglang</h3>
                <p className="mt-1 text-sm text-fg-secondary">Rekayasa Perangkat Lunak</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                  Awal masuk 2021. Fondasi pertama mengenal pemrograman dan pengembangan perangkat lunak.
                </p>
              </div>
              <span className="shrink-0 rounded-[var(--radius-pill)] bg-bg-inset border border-border-subtle px-3 py-1.5 font-mono text-xs text-fg-muted">
                2021–2024
              </span>
            </div>
          </ClayCard>
        </Reveal>
      </div>
    </section>
  );
}
