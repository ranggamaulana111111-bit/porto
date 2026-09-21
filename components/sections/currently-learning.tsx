"use client";

import { Reveal } from "@/components/reveal";
import { ClayTag } from "@/components/clay";

const ITEMS = ["Next.js", "Infrastructure", "Networking", "System Architecture", "Deployment", "Security"];

export function CurrentlyLearning() {
  return (
    <section className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="rounded-[var(--radius-clay-lg)] border border-border bg-bg-card shadow-[var(--shadow-card)] p-6 sm:p-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Sekarang</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-secondary max-w-md">
                Masih berkembang. Ini yang sedang saya dalami sekarang.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end max-w-[320px]">
              {ITEMS.map((t) => (
                <ClayTag key={t}>{t}</ClayTag>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
