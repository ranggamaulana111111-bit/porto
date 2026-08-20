"use client";

import { techStackCategories } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

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
                <Reveal key={cat.category} delay={i * 0.06}>
                  <tr className="border-b border-border">
                    <td className="py-4 pr-6 align-top font-display text-sm font-semibold text-fg whitespace-nowrap">
                      {cat.category}
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2">
                        {cat.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
