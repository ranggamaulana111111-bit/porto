"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { techStackByProject } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, easeOut } from "@/lib/motion";

function TechTag({ name, role, version }: { name: string; role: string; version?: string | null }) {
  return (
    <div className="flex items-center gap-1.5 border border-border bg-bg-card px-2 py-1 sm:gap-2 sm:px-3">
      <span className="font-mono text-[11px] sm:text-xs text-fg">{name}</span>
      {version && <span className="text-[9px] sm:text-[10px] text-fg-faint">v{version}</span>}
      <span className="text-[9px] sm:text-[10px] text-fg-muted">·</span>
      <span className="text-[9px] sm:text-[10px] text-fg-muted hidden sm:inline">{role}</span>
    </div>
  );
}

function ProjectStack({ project, slug, technologies, index }: {
  project: string;
  slug?: string;
  technologies: { name: string; role: string; versions: (string | null)[] }[];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay: index * 0.05, duration: 0.5, ease: easeOut }}
      className="border-t border-border py-6"
    >
      <div className="flex items-center gap-3">
        {slug ? (
          <a
            href={`/project/${slug}`}
            className="font-display text-base font-semibold text-fg transition-colors hover:text-accent"
          >
            {project}
          </a>
        ) : (
          <span className="font-display text-base font-semibold text-fg">
            {project}
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {technologies.map((t, i) => (
          <TechTag
            key={t.name}
            name={t.name}
            role={t.role}
            version={t.versions[i]}
          />
        ))}
      </div>
    </motion.div>
  );
}

function StackDiagram() {
  return (
    <div className="mt-10 border border-border bg-bg-card p-4 sm:p-6">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
        Architecture Overview
      </p>
      <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-fg-secondary sm:text-xs">
{`                    SOFTWARE
                        │
         ┌──────────────┴──────────────┐
         │                             │
      Backend                    Infrastructure
         │                             │
     Laravel                    Linux / Docker
         │                             │
   Business Logic                Proxmox
         │                             │
         └──────────────┬──────────────┘
                        │
                    Networking
                        │
              MikroTik / OLT / ISP
                        │
                        ▼
                     Security`}
      </pre>
      <p className="mt-4 border-t border-border pt-3 font-mono text-[10px] text-fg-faint sm:text-[11px]">
        Memahami bagaimana sistem bekerja dari ujung ke ujung.
      </p>
    </div>
  );
}

export function StackTeknologi() {
  return (
    <section id="stack" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="04"
          title="Apa yang saya bangun, dan dengan apa."
          description="Stack teknologi yang saya pakai di setiap project."
        />

        <StackDiagram />

        <div className="mt-12">
          {techStackByProject.map((group, i) => (
            <ProjectStack
              key={group.project}
              project={group.project}
              slug={group.slug}
              technologies={group.technologies}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
