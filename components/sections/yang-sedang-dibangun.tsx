"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { currentWork } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const barColors = ["bg-green", "bg-teal", "bg-amber", "bg-sky", "bg-coral", "bg-accent"];

function ProgressBar({ percent, tone = "bg-fg" }: { percent: number; tone?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="h-px w-full bg-border">
      <motion.div
        className={`h-full ${tone}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${percent}%` } : { width: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export function YangSedangDibangun() {
  return (
    <section id="yang-sedang" className="px-6 pt-6 pb-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="01"
          title="Yang sedang saya bangun."
          description="Bukan rencana, bukan mimpi. Ini yang sedang ada di meja kerja saya saat ini."
        />

        <div className="space-y-10">
          {currentWork.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <span className="font-mono text-sm text-accent">{item.percent}%</span>
                </div>

                <p className="text-sm leading-relaxed text-fg-secondary mb-4">
                  {item.desc}
                </p>

                <ProgressBar percent={item.percent} tone={barColors[i % barColors.length]} />

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-fg-muted font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
