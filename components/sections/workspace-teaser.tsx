"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { ClayCard } from "@/components/clay";

export function WorkspaceTeaser() {
  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <ClayCard className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">Digital Workspace</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Ruang kerja & lab.</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-secondary">
                  Tempat saya mendokumentasikan proses belajar, eksperimen, technical notes, lab, dan hal-hal yang sedang saya bangun di balik layar.
                </p>
              </div>
              <Link
                href="/workspace"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors"
              >
                Explore Workspace →
              </Link>
            </div>
          </ClayCard>
        </Reveal>
      </div>
    </section>
  );
}
