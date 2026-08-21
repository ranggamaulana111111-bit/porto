"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { techStackCategories } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, easeOut } from "@/lib/motion";

function TechRow({
  name,
  role,
  projects,
  versions,
  index,
}: {
  name: string;
  role: string;
  projects: string[];
  versions: (string | null)[];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay: index * 0.04, duration: 0.5, ease: easeOut }}
      className="grid gap-1 border-b border-border py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
    >
      <div>
        <span className="font-display text-base font-semibold text-fg">
          {name}
        </span>
        <span className="mt-0.5 block text-xs text-fg-muted">{role}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {projects.map((p, i) => (
          <span key={p} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-fg-faint" aria-hidden>
                ·
              </span>
            )}
            <a
              href="#project"
              className="font-mono text-xs text-accent transition-colors hover:text-fg"
            >
              {p}
              {versions[i] && (
                <span className="text-fg-faint"> · v{versions[i]}</span>
              )}
            </a>
          </span>
        ))}
      </div>
    </motion.li>
  );
}

export function StackTeknologi() {
  return (
    <section id="stack" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="04"
          title="Apa yang saya bangun, dan dengan apa."
          description="Setiap teknologi di bawah ini saya pakai di project nyata — bukan sekadar yang pernah saya pelajari."
        />

        <div className="mt-12 space-y-12">
          {techStackCategories.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">
                  {cat.category}
                </h3>
                <span className="h-px flex-1 bg-border" />
              </div>

              <ul className="mt-2">
                {cat.technologies.map((t, i) => (
                  <TechRow
                    key={t.name}
                    name={t.name}
                    role={t.role}
                    projects={t.projects}
                    versions={t.versions}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
