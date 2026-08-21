import type { ReactNode } from "react";
import type { Project } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { FramedSnippet } from "@/components/framed-snippet";
import { FlowDiagram } from "@/components/flow-diagram";
import { ProjectTechMap } from "@/components/project-tech-map";
import { ProjectStatus } from "@/components/project-status";
import { AlkonekMapMockup } from "@/components/project-visuals";
import { ArrowUpRight } from "@/components/icons";

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
    <div className="sm:flex sm:gap-10">
      <div className="sm:w-28 sm:shrink-0">
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

export function FeaturedProject({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const visual = project.visual;

  return (
    <article>
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-accent">{project.kind}</span>
          <span className="text-fg-faint">·</span>
          <span className="text-fg-muted">{project.year}</span>
          <ProjectStatus status={project.status} />
        </div>

        <h3 className="mt-4 font-display text-4xl font-bold tracking-tight">
          {project.title}
        </h3>

        <p className="mt-4 max-w-xl leading-relaxed text-fg-secondary">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
            >
              Kunjungi live
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

      {visual && (
        <Reveal delay={0.05} className="mt-10">
          <FramedSnippet
            src={visual.image}
            alt={visual.caption}
            caption={visual.caption}
            chrome="billing.alkonek.online/peta-odp"
            tag={visual.image ? "Screenshot asli" : "Mockup"}
          >
            <div className="w-full px-4">
              <AlkonekMapMockup />
            </div>
          </FramedSnippet>
        </Reveal>
      )}

      <div className="mt-14 space-y-10">
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
          <CaseBlock index="04" label="Arsitektur">
            <FlowDiagram
              steps={[
                { label: "MikroTik OLT", sub: "Multi-brand" },
                { label: "Laravel Billing", sub: "MySQL · Midtrans" },
                { label: "WhatsApp Gateway", sub: "Notifikasi" },
              ]}
              arrows={["↔", "↔"]}
            />
            {project.technologies && (
              <div className="mt-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                  Teknologi & fungsinya
                </p>
                <ProjectTechMap items={project.technologies} />
              </div>
            )}
          </CaseBlock>
        </Reveal>

        <Reveal>
          <CaseBlock index="05" label="Implementasi">
            <p>{cs?.implementation ?? project.solution}</p>
          </CaseBlock>
        </Reveal>

        <Reveal>
          <CaseBlock index="06" label="Tantangan">
            <ul className="space-y-2">
              {(cs?.challenges ?? project.learnings.slice(0, 2)).map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </CaseBlock>
        </Reveal>

        <Reveal>
          <CaseBlock index="07" label="Hasil">
            <p>{cs?.result ?? project.result}</p>
            <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-y border-border py-5">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-2xl font-bold text-fg">
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
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </CaseBlock>
        </Reveal>
      </div>
    </article>
  );
}
