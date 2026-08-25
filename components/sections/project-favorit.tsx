"use client";

import { useMemo, useState } from "react";
import {
  projects,
  type Project,
} from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { ProjectStatus } from "@/components/project-status";
import { ArrowUpRight } from "@/components/icons";
import { fadeUp, easeOut } from "@/lib/motion";
import { motion, AnimatePresence } from "framer-motion";

type Filter = "all" | "live" | "selected" | "experiment";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "selected", label: "Selected" },
  { value: "experiment", label: "Experiments" },
];

function matchesQuery(p: Project, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    p.title,
    p.kind,
    p.summary,
    p.role,
    ...p.stack,
    ...(p.technologies?.map((t) => t.name) ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function LiveProjectCard({ project }: { project: Project }) {
  return (
    <div className="border border-accent/20 bg-bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <span className="text-accent">{project.kind}</span>
        <span className="text-fg-faint" aria-hidden>·</span>
        <span className="text-fg-muted">{project.year}</span>
        <ProjectStatus status={project.status} />
      </div>
      <h4 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
        {project.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
        {project.summary}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
        >
          Kunjungi live
          <ArrowUpRight size={14} />
        </a>
        <a
          href={`/project/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-fg"
        >
          Lihat studi kasus
          <ArrowUpRight size={14} />
        </a>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-fg"
        >
          GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

function CompactProjectRow({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="border-t border-border py-6 sm:py-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
        <span className="text-fg-muted">{project.year}</span>
        <span className="text-fg-faint" aria-hidden>·</span>
        <span className="text-accent">{project.kind}</span>
        <ProjectStatus status={project.status} />
      </div>
      <h4 className="mt-2 font-display text-lg font-bold tracking-tight sm:text-xl">
        {project.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
        {project.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-3 sm:gap-4">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-accent transition-colors hover:text-fg"
          >
            Live <ArrowUpRight size={12} />
          </a>
        )}
        <a
          href={`/project/${project.slug}`}
          className="inline-flex items-center gap-1 font-mono text-xs text-fg-secondary transition-colors hover:text-fg"
        >
          Detail <ArrowUpRight size={12} />
        </a>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-fg-secondary transition-colors hover:text-fg"
        >
          GitHub <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

export default function ProjectFavorit() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const showLive = filter === "all" || filter === "live";
  const showSelected = filter === "all" || filter === "selected";
  const showExperiments = filter === "all" || filter === "experiment";

  const liveProjects = useMemo(
    () => projects.filter((p) => p.live && matchesQuery(p, query)),
    [query]
  );
  const selectedProjects = useMemo(
    () => projects.filter((p) => !p.live && p.tier !== "experiment" && matchesQuery(p, query)),
    [query]
  );
  const experimentProjects = useMemo(
    () => projects.filter((p) => p.tier === "experiment" && matchesQuery(p, query)),
    [query]
  );

  const totalResults =
    (showLive ? liveProjects.length : 0) +
    (showSelected ? selectedProjects.length : 0) +
    (showExperiments ? experimentProjects.length : 0);

  return (
    <section id="project" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="05"
          title="Yang sudah dan sedang saya bangun."
          description="Dari sistem yang dipakai produksi sampai eksperimen belajar. Semua punya cerita teknisnya masing-masing."
        />

        <div className="mt-8 mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            role="searchbox"
            aria-label="Cari project berdasarkan nama, kategori, atau teknologi"
            placeholder="Cari project / teknologi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-border bg-transparent px-3 py-2 font-mono text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-accent/50 sm:max-w-xs"
          />

          <div
            role="group"
            aria-label="Filter project"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                  filter === f.value
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-border text-fg-muted hover:text-fg"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {totalResults === 0 && (
          <p className="py-12 text-center text-sm text-fg-muted">
            Tidak ada project yang cocok.
          </p>
        )}

        <AnimatePresence initial={false}>
          {showLive && liveProjects.length > 0 && (
            <motion.div
              key="live"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={fadeUp}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                  Live Projects
                </h3>
                <span className="h-px flex-1 bg-accent/30" />
              </div>
              <div className="mt-6 space-y-6">
                {liveProjects.map((p) => (
                  <LiveProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </motion.div>
          )}

          {showSelected && selectedProjects.length > 0 && (
            <motion.div
              key="selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-16 flex items-center gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                  Selected projects
                </h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-2">
                {selectedProjects.map((p) => (
                  <CompactProjectRow
                    key={p.slug}
                    project={p}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {showExperiments && experimentProjects.length > 0 && (
            <motion.div
              key="experiments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-16 flex items-center gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                  Experiments
                </h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <p className="mt-4 mb-2 text-xs text-fg-muted">
                Project kecil dan tugas kuliah yang tetap saya kerjakan serius.
              </p>
              <div>
                {experimentProjects.map((p) => (
                  <CompactProjectRow
                    key={p.slug}
                    project={p}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
