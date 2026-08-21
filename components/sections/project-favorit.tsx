import type { ReactNode } from "react";
import {
  featuredProjects,
  selectedProjects,
  experimentProjects,
  type Project,
} from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FeaturedProject } from "@/components/featured-project";
import { ProjectStatus } from "@/components/project-status";
import { ProjectTechMap } from "@/components/project-tech-map";
import { FramedSnippet } from "@/components/framed-snippet";
import { FlowDiagram } from "@/components/flow-diagram";
import {
  AlkonekPlusChartMockup,
  ProdesaAnalyticsMockup,
} from "@/components/project-visuals";
import { ArrowUpRight } from "@/components/icons";

function TierLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">
          {children}
        </h3>
        <span className="h-px flex-1 bg-border" />
      </div>
    </Reveal>
  );
}

function selectedVisual(project: Project) {
  const workflow = project.caseStudy?.workflow;
  if (workflow) {
    return (
      <div className="w-full px-4">
        <FlowDiagram
          steps={workflow.map((s) => ({ label: s.label, sub: s.sub }))}
          arrows={Array(Math.max(workflow.length - 1, 0)).fill("→")}
        />
      </div>
    );
  }
  if (project.slug === "alkonekplus") return <AlkonekPlusChartMockup />;
  if (project.slug === "prodesa") return <ProdesaAnalyticsMockup />;
  return (
    <div className="w-full px-4">
      <FlowDiagram
        steps={[
          { label: "Proxmox VE", sub: "Node" },
          { label: "Docker", sub: "Containers" },
          { label: "Cloudflare Tunnel", sub: "Ingress" },
          { label: "Internet", sub: "Public" },
        ]}
        arrows={["→", "→", "→"]}
      />
    </div>
  );
}

function selectedChrome(project: Project) {
  if (project.caseStudy?.workflow) return `${project.slug} · alur persetujuan`;
  if (project.slug === "alkonekplus") return "alkonekplus · speed test";
  if (project.slug === "prodesa") return "prodesa · dashboard";
  return "rabeglab · topologi";
}

function SelectedCaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;

  return (
    <div className="mt-10 space-y-8 border-t border-border pt-8">
      <CaseBlock index="01" label="Konteks">
        <p>{cs.context}</p>
      </CaseBlock>
      <CaseBlock index="02" label="Masalah">
        <p>{cs.problem}</p>
      </CaseBlock>
      <CaseBlock index="03" label="Pendekatan">
        <p>{cs.approach}</p>
      </CaseBlock>
      <CaseBlock index="04" label="Implementasi">
        <p>{cs.implementation}</p>
      </CaseBlock>
      {cs.features && (
        <CaseBlock index="05" label="Fitur Inti">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {cs.features.map((f) => (
              <div key={f.title}>
                <p className="text-sm font-medium text-fg">{f.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </CaseBlock>
      )}
      {project.technologies && (
        <CaseBlock index="06" label="Teknologi">
          <ProjectTechMap items={project.technologies} />
        </CaseBlock>
      )}
      <CaseBlock index="07" label="Hasil">
        <p>{cs.result}</p>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-xl font-bold text-fg">
                {m.value}
              </div>
              <div className="mt-1 text-xs text-fg-muted">{m.label}</div>
            </div>
          ))}
        </div>
      </CaseBlock>
      <CaseBlock index="08" label="Pelajaran">
        <ul className="space-y-2">
          {cs.lessons.map((l, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </CaseBlock>
    </div>
  );
}

function CaseBlock({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="sm:flex sm:gap-8">
      <div className="sm:w-24 sm:shrink-0">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted sm:ml-0 sm:mt-1 sm:block">
          {label}
        </span>
      </div>
      <div className="mt-2 flex-1 text-sm leading-relaxed text-fg-secondary sm:mt-0">
        {children}
      </div>
    </div>
  );
}

function SelectedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const visual = project.visual;

  return (
    <Reveal delay={index * 0.05}>
      <article className="border-t border-border py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h4 className="font-display text-2xl font-bold tracking-tight">
            {project.title}
          </h4>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-fg-muted">{project.year}</span>
            <ProjectStatus status={project.status} />
          </div>
        </div>

        <p className="mt-1 font-mono text-xs text-accent">{project.kind}</p>

        <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg-secondary">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
            >
              Live Project
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

        {visual && (
          <div className="mt-8 max-w-xl">
            <FramedSnippet
              src={visual.image}
              alt={visual.caption}
              caption={visual.caption}
              chrome={selectedChrome(project)}
              tag={
                project.caseStudy?.workflow
                  ? "Diagram"
                  : visual.image
                    ? "Mockup"
                    : "Diagram"
              }
            >
              {selectedVisual(project)}
            </FramedSnippet>
          </div>
        )}

        <SelectedCaseStudy project={project} />
      </article>
    </Reveal>
  );
}

function ExperimentRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.04}>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-3 border-b border-border py-4 transition-colors hover:bg-bg-card/30 sm:gap-6"
      >
        <span className="font-mono text-xs text-fg-faint">{project.year}</span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
            {project.title}
          </span>
          <span className="mt-0.5 block truncate text-xs text-fg-muted">
            {project.kind}
          </span>
        </span>
        <span className="flex items-center gap-3">
          <ProjectStatus status={project.status} />
          <ArrowUpRight
            size={14}
            className="text-fg-faint transition-colors group-hover:text-accent"
          />
        </span>
      </a>
    </Reveal>
  );
}

export function ProjectFavorit() {
  const featured = featuredProjects;
  const selected = selectedProjects;
  const experiments = experimentProjects;

  return (
    <section id="project" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="05"
          title="Yang sudah dan sedang saya bangun."
          description="Dari sistem yang dipakai produksi sampai eksperimen belajar. Semua punya cerita teknisnya masing-masing."
        />

        {featured.length > 0 && (
          <>
            <TierLabel>Featured work</TierLabel>
            <div className="mt-10">
              {featured.map((p) => (
                <FeaturedProject key={p.slug} project={p} />
              ))}
            </div>
          </>
        )}

        {selected.length > 0 && (
          <>
            <div className="mt-20">
              <TierLabel>Selected projects</TierLabel>
            </div>
            <div>
              {selected.map((p, i) => (
                <SelectedProject key={p.slug} project={p} index={i} />
              ))}
            </div>
          </>
        )}

        {experiments.length > 0 && (
          <>
            <div className="mt-20">
              <TierLabel>Experiments</TierLabel>
            </div>
            <p className="mt-4 mb-2 text-xs text-fg-muted">
              Project kecil dan tugas kuliah yang tetap saya kerjakan serius.
            </p>
            <div>
              {experiments.map((p, i) => (
                <ExperimentRow key={p.slug} project={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
