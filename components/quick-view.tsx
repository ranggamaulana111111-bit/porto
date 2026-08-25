"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";
import { scaleIn, easeOut } from "@/lib/motion";
import { ArrowUpRight } from "@/components/icons";

const STATUS_LABEL: Record<string, string> = {
  production: "Production",
  building: "Sedang dibangun",
  planned: "Direncanakan",
  completed: "Selesai",
  academic: "Akademik",
};

type QuickViewProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectQuickView({ project, onClose }: QuickViewProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector<HTMLElement>(
        "button, a[href]"
      );
      (focusable ?? panelRef.current)?.focus();
    }, 0);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent<string[]>("porto:view-project", { detail: project.stack })
    );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      window.dispatchEvent(new CustomEvent<string[] | null>("porto:view-project", { detail: null }));
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose, project.stack]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${project.title}`}
          tabIndex={-1}
          variants={scaleIn}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: easeOut }}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto mt-[8vh] flex max-h-[84vh] w-[calc(100%-2rem)] max-w-lg flex-col overflow-hidden border border-border bg-bg shadow-2xl outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                <span className="text-accent">{project.kind}</span>
                <span className="text-fg-faint" aria-hidden>·</span>
                <span className="text-fg-muted">{project.year}</span>
                {project.status && (
                  <>
                    <span className="text-fg-faint" aria-hidden>·</span>
                    <span className="text-fg-muted">
                      {STATUS_LABEL[project.status] ?? project.status}
                    </span>
                  </>
                )}
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">
                {project.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-fg-faint">{project.role}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup quick view"
              className="shrink-0 font-mono text-xs text-fg-faint transition-colors hover:text-fg"
            >
              ESC ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-sm leading-relaxed text-fg-secondary">
              {project.summary}
            </p>

            {project.metrics.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                      {m.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl font-bold text-fg">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-faint">
                Stack
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="border border-border px-2 py-0.5 font-mono text-[11px] text-fg-secondary"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-6 py-4">
            {project.caseStudy && (
              <a
                href="#project"
                onClick={onClose}
                className="font-mono text-xs text-accent underline-offset-4 hover:underline"
              >
                lihat studi kasus
              </a>
            )}
            <span className="flex-1" />
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-fg-secondary transition-colors hover:text-fg"
              >
                Live <ArrowUpRight size={12} />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-fg-secondary transition-colors hover:text-fg"
            >
              GitHub <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
