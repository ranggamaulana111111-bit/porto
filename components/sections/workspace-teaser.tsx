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
                <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">Di Balik Layar</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">Hal yang sedang saya kerjakan, pelajari, dan coba.</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-secondary">
                  Dokumentasi proses, eksperimen, dan technical notes yang tidak muat di halaman ini, tersimpan di sana.
                </p>
              </div>
              <Link
                href="/workspace"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 min-h-11 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors"
              >
                Buka Di Balik Layar →
              </Link>
            </div>
          </ClayCard>
        </Reveal>
      </div>
    </section>
  );
}
