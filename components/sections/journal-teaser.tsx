"use client";

import Link from "next/link";
import { posts } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function JournalTeaser() {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="journal" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Catatan</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Dari jurnal.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Hal-hal yang saya pelajari, pikirkan, atau dokumentasikan.
          </p>
        </Reveal>

        <div className="mt-8">
          {latest.map((post, i) => (
            <Link
              key={i}
              href={`/catatan/${i}`}
              className="group block border-t border-border py-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                {post.date} · {post.category} · {post.readTime} min baca
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent-strong">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>

        <Reveal>
          <Link
            href="/workspace#catatan"
            className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-fg-muted transition-colors hover:text-accent-strong"
          >
            Semua catatan ada di Di Balik Layar
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}