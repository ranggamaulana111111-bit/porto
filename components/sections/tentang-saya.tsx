"use client";

import { about } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function TentangSaya() {
  return (
    <section id="about" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Tentang Saya</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Mahasiswa yang belajar lewat membangun.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8 max-w-xl space-y-4">
            {about.body.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-fg-secondary">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
