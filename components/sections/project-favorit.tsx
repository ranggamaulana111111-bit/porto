"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { FlowDiagram } from "@/components/flow-diagram";
import { FramedSnippet } from "@/components/framed-snippet";
import { AlkonekMapMockup, AlkonekPlusChartMockup, ProdesaAnalyticsMockup } from "@/components/project-visuals";

const tabColors = ["bg-accent", "bg-green", "bg-teal", "bg-amber", "bg-coral", "bg-sky"];
const textColors = ["text-accent", "text-green", "text-teal", "text-amber", "text-coral", "text-sky"];

export function ProjectFavorit() {
  const [active, setActive] = useState(projects[0].slug);
  const activeProject = projects.find((p) => p.slug === active)!;
  const activeIndex = projects.findIndex((p) => p.slug === active);
  const visual = (activeProject as { visual?: { caption: string; image?: string } }).visual;

  return (
    <section id="project" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="04"
          title="Project favorit."
          description="Setiap project punya cerita. Klik untuk membuka catatan studi kasusnya."
        />

        <Reveal>
          {/* folder tabs */}
          <div className="flex gap-0 border-b border-border mb-8 overflow-x-auto">
            {projects.map((p) => {
              const isActive = p.slug === active;
              return (
                <button
                  key={p.slug}
                  onClick={() => setActive(p.slug)}
                  className={`relative shrink-0 px-5 py-3 text-sm font-mono transition-colors ${
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg-secondary"
                  }`}
                >
                  {p.title}
                  {isActive && (
                    <motion.span
                      layoutId="project-tab"
                      className={`absolute bottom-0 left-0 right-0 h-px ${
                        tabColors[projects.indexOf(p) % tabColors.length]
                      }`}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* project detail */}
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* header */}
              <div className="flex items-baseline justify-between mb-2">
                <span className={`font-mono text-xs ${textColors[activeIndex % textColors.length]}`}>{activeProject.kind}</span>
                <span className="font-mono text-xs text-fg-muted">{activeProject.year}</span>
              </div>

              <h3 className="font-display text-3xl font-bold tracking-tight mb-4">
                {activeProject.title}
              </h3>

              <p className="text-sm leading-relaxed text-fg-secondary max-w-lg mb-10">
                {activeProject.summary}
              </p>

              {visual && (
                <div className="mb-10">
                  <FramedSnippet
                    src={visual.image}
                    alt={visual.caption}
                    caption={visual.caption}
                    chrome={
                      activeProject.slug === "alkonek"
                        ? "billing.alkonek.online/peta-odp"
                        : activeProject.slug === "alkonekplus"
                          ? "alkonekplus · speed test"
                          : activeProject.slug === "prodesa"
                            ? "prodesa · dashboard"
                            : "rabeglab · topologi"
                    }
                  >
                    {activeProject.slug === "alkonek" ? (
                      <AlkonekMapMockup />
                    ) : activeProject.slug === "alkonekplus" ? (
                      <AlkonekPlusChartMockup />
                    ) : activeProject.slug === "prodesa" ? (
                      <ProdesaAnalyticsMockup />
                    ) : (
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
                    )}
                  </FramedSnippet>
                </div>
              )}

              {/* case study sections */}
              <div className="space-y-8 mb-10">
                <CaseStudy label="Konteks & Masalah" text={activeProject.challenge} />
                <CaseStudy label="Solusi" text={activeProject.solution} />
                <CaseStudy label="Hasil" text={activeProject.result} />
              </div>

              {/* metrics */}
              <div className="flex gap-8 mb-10 py-6 border-y border-border">
                {activeProject.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-2xl font-bold text-fg">{m.value}</div>
                    <div className="mt-1 text-xs text-fg-muted">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* stack */}
              <div className="mb-10">
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-border px-3 py-1 font-mono text-xs text-fg-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* architecture / integration diagram */}
              {(activeProject.slug === "alkonek" ||
                activeProject.slug === "prodesa") && (
                <div className="mb-10">
                  <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                    {activeProject.slug === "alkonek" ? "Alur integrasi" : "Alur layanan"}
                  </p>
                  <FlowDiagram
                    steps={
                      activeProject.slug === "alkonek"
                        ? [
                            { label: "MikroTik OLT", sub: "Multi-brand" },
                            { label: "Laravel Billing", sub: "MySQL · Midtrans" },
                            { label: "WhatsApp Gateway", sub: "Notifikasi" },
                          ]
                        : [
                            { label: "Warga Desa", sub: "Pengaju" },
                            { label: "Portal Desa", sub: "Laravel + Alpine" },
                            { label: "Surat · APBDesa · Laporan", sub: "Output" },
                          ]
                    }
                    arrows={
                      activeProject.slug === "alkonek" ? ["↔", "↔"] : ["→", "→"]
                    }
                  />
                </div>
              )}

              {/* learnings - editorial highlight */}
              <div className="bg-bg-warm border border-border p-6">
                <p className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                  Yang saya pelajari
                </p>
                <ul className="space-y-3">
                  {activeProject.learnings.map((l, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-fg-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* links */}
              <div className="mt-8 flex flex-wrap gap-6">
                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
                  >
                    Kunjungi live
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                )}
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-fg"
                  >
                    Lihat di GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudy({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-fg-secondary max-w-lg">{text}</p>
    </div>
  );
}
