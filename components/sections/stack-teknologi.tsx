"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { techStackCategories } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { fadeUp, easeOut } from "@/lib/motion";

function StackRow({ category, technologies, index }: {
  category: string;
  technologies: string[];
  index: number;
}) {
  const ref = useRef<HTMLTableRowElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.tr
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay: index * 0.06, duration: 0.6, ease: easeOut }}
      className="border-b border-border"
    >
      <td className="py-4 pr-6 align-top font-display text-sm font-semibold text-fg whitespace-nowrap">
        {category}
      </td>
      <td className="py-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </td>
    </motion.tr>
  );
}

export function StackTeknologi() {
  return (
    <section id="stack" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="04"
          title="Stack teknologi & kompetensi inti."
          description="Peralatan dan teknologi yang saya gunakan untuk membangun solusi, dari backend sampai infrastruktur."
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pr-6 font-mono text-xs text-fg-muted uppercase tracking-wider">Kategori</th>
                <th className="py-3 font-mono text-xs text-fg-muted uppercase tracking-wider">Teknologi</th>
              </tr>
            </thead>
            <tbody>
              {techStackCategories.map((cat, i) => (
                <StackRow
                  key={cat.category}
                  category={cat.category}
                  technologies={cat.technologies}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
