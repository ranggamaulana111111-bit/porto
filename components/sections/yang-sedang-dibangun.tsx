"use client";

import { currentWork, projects, projectStatus } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ProjectStatus } from "@/components/project-status";
import { ArrowUpRight } from "@/components/icons";

const SLUG_BY_TITLE: Record<string, string> = {
  "Portfolio (porto)": "",
  AlkonekPlus: "alkonekplus",
  RabegLab: "rabeglab",
  "Flutter Mobile": "foodmate",
};

const NOTE_BY_TITLE: Record<string, string> = {
  "Portfolio (porto)":
    "Live — deployed ke server sendiri lewat Cloudflare Tunnel.",
  AlkonekPlus:
    "Sedang dibangun — tinggal penyempurnaan riwayat tes dan ekspor hasil.",
  RabegLab:
    "Menunggu hardware — arsitektur dan dokumentasi sudah siap, berikutnya implementasi Proxmox.",
  "Flutter Mobile":
    "Eksperimen — kumpulan app Flutter dari tugas kuliah.",
};

export function YangSedangDibangun() {
  return (
    <section id="yang-sedang" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="01"
          title="Yang sedang saya bangun."
          description="Bukan rencana, bukan mimpi. Ini yang sedang ada di meja kerja saya saat ini."
        />

        <div className="mt-12 space-y-12">
          {currentWork.map((item, i) => {
            const slug = SLUG_BY_TITLE[item.title];
            const project = slug
              ? projects.find((p) => p.slug === slug)
              : undefined;
            const status = project ? projectStatus(project) : "production";
            const link = project?.live ?? project?.link;

            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-t border-border pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <ProjectStatus status={status} />
                  </div>

                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-fg-secondary">
                    {item.desc}
                  </p>

                  <p className="mt-2 font-mono text-xs text-fg-faint">
                    {NOTE_BY_TITLE[item.title] ?? ""}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs text-fg-muted">
                        {tag}
                      </span>
                    ))}
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent transition-colors hover:text-fg"
                      >
                        {project?.live ? "Live Project" : "Lihat di GitHub"}
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
