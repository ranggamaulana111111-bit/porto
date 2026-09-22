"use client";

import Image from "next/image";
import { outside } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function OutsideWork() {
  if (outside.length === 0) return null;

  return (
    <section id="outside" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Di Luar Layar</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Hidup di luar layar.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Hal-hal di luar pekerjaan yang saya pilih untuk dibagikan. Jarang diperbarui, itu memang disengaja.
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {outside.map((entry, i) => (
            <Reveal key={i} className="max-w-xl">
              {entry.image && (
                <Image
                  src={entry.image}
                  alt={entry.caption}
                  width={1024}
                  height={640}
                  className="aspect-[16/10] w-full rounded-[var(--radius-clay)] border border-border object-cover shadow-[var(--shadow-card)]"
                />
              )}
              {entry.date && (
                <p className="mt-3 font-mono text-xs text-fg-faint">{entry.date}</p>
              )}
              <p className="mt-1.5 text-base leading-relaxed text-fg">{entry.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}