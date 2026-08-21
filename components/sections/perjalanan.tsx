"use client";

import { journey } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function Perjalanan() {
  return (
    <section id="perjalanan" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="02"
          title="Perjalanan saya."
          description="Dari pertama kali menyentuh kode hingga hari ini. Setiap langkah punya cerita."
        />

        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-px bg-border" />

          <div className="space-y-14">
            {journey.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} variant={i % 2 === 0 ? "left" : "up"}>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[4px] rounded-full bg-accent" />

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span
                    className="font-mono text-xs text-accent"
                    >
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-fg-secondary max-w-lg">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
