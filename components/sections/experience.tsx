"use client";

import { journey } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Pengalaman</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Perjalanan belajar.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Belum dalam format corporate. Ini project sebagai pengalaman teknis, dari pertama kenal kode sampai sistem yang dipakai orang lain.
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {journey.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.04}>
              <div>
                <p className="font-mono text-xs font-medium text-accent-strong">{item.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold sm:text-xl">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-secondary">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
