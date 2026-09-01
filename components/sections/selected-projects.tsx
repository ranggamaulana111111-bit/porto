"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ClayCard, ClayTag } from "@/components/clay";
import { ProjectStatus } from "@/components/project-status";
import { ArrowUpRight } from "@/components/icons";

const PRIORITY = ["alkonek", "prodesa", "alkonekplus", "rabeglab"];

export function SelectedProjects() {
  const items = PRIORITY.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean) as typeof projects;

  return (
    <section id="projects" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Selected Projects</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Project sebagai bukti belajar.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Bukan daftar stack — setiap project adalah sistem yang saya bangun dan pelajari dari awal sampai bisa dipakai.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ClayCard hover className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                  <span className="text-accent-strong">{p.kind}</span>
                  <span className="text-fg-faint" aria-hidden>·</span>
                  <span className="text-fg-muted">{p.year}</span>
                  <ProjectStatus status={p.status} />
                </div>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-fg-faint">{p.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">{p.summary}</p>

                {p.technologies && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 6).map((t) => (
                      <ClayTag key={t.name}>{t.name}</ClayTag>
                    ))}
                    {p.technologies.length > 6 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs text-fg-faint">+{p.technologies.length - 6}</span>
                    )}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-accent px-4 py-2 text-xs font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors"
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  )}
                  <Link
                    href={`/project/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-bg-inset border border-border-subtle px-4 py-2 text-xs font-medium text-fg-secondary hover:bg-bg-warm transition-colors"
                  >
                    Detail <ArrowUpRight size={12} />
                  </Link>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors py-2"
                  >
                    GitHub <ArrowUpRight size={12} />
                  </a>
                </div>
              </ClayCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                const el = document.querySelector('[aria-label="Cari project"]') as HTMLElement | null;
                el?.focus();
              }}
              className="font-mono text-xs text-fg-muted hover:text-fg transition-colors hidden"
            >
              Lihat semua project
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
            >
              Semua project ada di archive · <span className="text-accent-strong">Lihat di bawah</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
