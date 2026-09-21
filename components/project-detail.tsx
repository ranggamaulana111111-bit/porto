"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ProjectTechMap } from "@/components/project-tech-map";
import { ProjectStatus } from "@/components/project-status";
import { ArrowUpRight } from "@/components/icons";

function CaseBlock({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sm:flex sm:gap-8 md:gap-10">
      <div className="mb-2 sm:mb-0 sm:w-24 md:w-28 sm:shrink-0">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted sm:ml-0 sm:mt-1 sm:block">
          {label}
        </span>
      </div>
      <div className="flex-1 text-sm leading-relaxed text-fg-secondary">
        {children}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[var(--radius-clay)] border border-border bg-bg-card p-4 sm:p-5 shadow-[var(--shadow-card)]">
      <h4 className="font-display text-sm font-bold text-fg sm:text-base">{title}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-fg-secondary sm:mt-2 sm:text-sm">
        {description}
      </p>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const cs = project.caseStudy;

  return (
    <article className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
          >
            ← Kembali ke project
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs sm:mt-8">
            <span className="text-accent">{project.kind}</span>
            <span className="text-fg-faint" aria-hidden>·</span>
            <span className="text-fg-muted">{project.year}</span>
            <ProjectStatus status={project.status} />
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:mt-4 sm:text-4xl md:text-5xl">
            {project.title}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-fg-secondary sm:mt-4 sm:text-lg">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 sm:mt-6 sm:gap-6">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
              >
                Kunjungi Live
                <ArrowUpRight size={14} />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-fg"
            >
              Lihat di GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>

        {cs?.workflow && (
          <Reveal delay={0.05} className="mt-10 sm:mt-16">
            <div className="border border-border bg-bg-card p-4 sm:p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted sm:mb-4">
                {project.title} · alur persetujuan
              </p>
              <p className="mb-4 font-mono text-[11px] text-fg-faint sm:mb-6">
                Diagram
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap sm:gap-3">
                {cs.workflow.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    {i > 0 && (
                      <span className="text-accent text-sm" aria-hidden>
                        →
                      </span>
                    )}
                    <div className="rounded border border-border bg-bg-elevated px-3 py-2 text-center sm:px-4 sm:py-3">
                      <div className="font-mono text-[11px] font-medium text-fg sm:text-xs">
                        {step.label}
                      </div>
                      {step.sub && (
                        <div className="mt-0.5 text-[10px] text-fg-muted sm:text-[11px]">
                          {step.sub}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] text-fg-faint sm:mt-5 sm:pt-4 sm:text-[11px]">
                Alur persetujuan surat, state machine berbasis permission
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-12">
          <Reveal>
            <CaseBlock index="01" label="Konteks">
              <p>{cs?.context ?? project.challenge}</p>
            </CaseBlock>
          </Reveal>

          <Reveal>
            <CaseBlock index="02" label="Masalah">
              <p>{cs?.problem ?? project.challenge}</p>
            </CaseBlock>
          </Reveal>

          <Reveal>
            <CaseBlock index="03" label="Pendekatan">
              <p>{cs?.approach ?? project.solution}</p>
            </CaseBlock>
          </Reveal>

          <Reveal>
            <CaseBlock index="04" label="Implementasi">
              <p>{cs?.implementation ?? project.solution}</p>
            </CaseBlock>
          </Reveal>

          {cs?.features && cs.features.length > 0 && (
            <Reveal>
              <CaseBlock index="05" label="Fitur Inti">
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {cs.features.map((f, i) => (
                    <FeatureCard
                      key={i}
                      title={f.title}
                      description={f.description}
                    />
                  ))}
                </div>
              </CaseBlock>
            </Reveal>
          )}

          <Reveal>
            <CaseBlock index="06" label="Teknologi">
              {project.technologies && (
                <ProjectTechMap items={project.technologies} />
              )}
            </CaseBlock>
          </Reveal>

          <Reveal>
            <CaseBlock index="07" label="Hasil">
              <p>{cs?.result ?? project.result}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-4 sm:mt-6 sm:gap-x-10 sm:gap-y-4 sm:py-5">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-xl font-bold text-fg sm:text-2xl">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs text-fg-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            </CaseBlock>
          </Reveal>

          <Reveal>
            <CaseBlock index="08" label="Pelajaran">
              <ul className="space-y-2">
                {(cs?.lessons ?? project.learnings).map((l, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-sm">{l}</span>
                  </li>
                ))}
              </ul>
            </CaseBlock>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
