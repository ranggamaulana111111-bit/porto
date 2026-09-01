"use client";

import { Reveal } from "@/components/reveal";
import { ClayCard, ClayTag } from "@/components/clay";

const GROUPS = [
  {
    title: "Software Development",
    items: ["Laravel", "Next.js", "React", "TypeScript", "REST API", "Database", "Authentication", "RBAC"],
  },
  {
    title: "Networking",
    items: ["MikroTik", "FTTH", "OLT", "ONU", "Network Monitoring", "Network Troubleshooting"],
  },
  {
    title: "Infrastructure",
    items: ["Linux", "Docker", "Nginx", "Proxmox", "Cloudflare Tunnel", "Deployment"],
  },
  {
    title: "System Architecture",
    items: ["Database Design", "API Integration", "System Architecture", "Security", "Documentation", "Testing"],
  },
];

export function WhatImLearning() {
  return (
    <section id="learning" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">What I&apos;m Learning</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Bidang yang sedang saya dalami.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Area yang sedang saya pelajari dan kembangkan melalui project dan eksplorasi langsung.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <ClayCard className="p-5 sm:p-6 h-full">
                <h3 className="font-display text-base font-semibold">{g.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
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
