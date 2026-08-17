"use client";

import { plans } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Rencana() {
  return (
    <section id="rencana" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="06"
          title="Rencana berikutnya."
          description="Yang ingin saya pelajari dan bangun selanjutnya. Bukan target — ini niat."
        />

        <div className="space-y-8">
          {plans.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group border-l-2 border-border pl-6 hover:border-accent transition-colors">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <span
                    className={`font-mono text-xs ${
                      ["text-green", "text-teal", "text-amber", "text-coral", "text-sky"][i % 5]
                    }`}
                  >
                    {item.timeline}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-fg-secondary max-w-lg">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
