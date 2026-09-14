"use client";

import { Reveal } from "@/components/reveal";
import { ClayCard, ClayTag } from "@/components/clay";

const STACK = [
  { group: "Languages", items: ["PHP", "TypeScript", "JavaScript", "Dart"] },
  { group: "Frameworks", items: ["Laravel", "Next.js", "React", "Flutter", "Blade"] },
  { group: "Database", items: ["MySQL", "SQLite"] },
  { group: "Infrastructure", items: ["Linux", "Docker", "Nginx", "Proxmox", "Cloudflare"] },
  { group: "Networking", items: ["MikroTik", "OLT", "FTTH"] },
  { group: "Tools", items: ["Git", "GitHub", "Postman", "Playwright", "Figma"] },
];

export function TechnicalStack() {
  return (
    <section id="skills" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Technical Stack</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Teknologi yang saya pakai.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Hanya yang memang sudah saya pakai di project, bukan daftar populer.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {STACK.map((cat, i) => (
            <Reveal key={cat.group} delay={i * 0.04}>
              <ClayCard className="p-5 sm:p-6 h-full">
                <h3 className="font-mono text-xs uppercase tracking-wider text-fg-muted">{cat.group}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((t) => (
                    <ClayTag key={t}>{t}</ClayTag>
                  ))}
                </div>
              </ClayCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
