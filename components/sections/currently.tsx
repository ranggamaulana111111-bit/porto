"use client";

import { todayStatus } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Currently() {
  return (
    <section id="now" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Currently</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Yang sedang terjadi.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            {todayStatus.intro}
          </p>
        </Reveal>

        <div className="mt-8">
          {todayStatus.fragments.map((fragment, i) => (
            <Reveal key={fragment.label} delay={i * 0.05}>
              <div className="flex items-baseline gap-4 border-t border-border py-5">
                <span className="w-6 shrink-0 font-mono text-xs text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-fg-muted">
                  {fragment.label}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] leading-relaxed text-fg-secondary">{fragment.text}</p>
                  {fragment.type === "listen" && (
                    <div className="mt-2">
                      <a
                        href={todayStatus.listeningPlaylist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-border bg-bg-card px-3 py-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-accent-strong"
                      >
                        Buka daftar putar di Spotify
                        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}