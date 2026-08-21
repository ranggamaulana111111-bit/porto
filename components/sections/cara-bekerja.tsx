"use client";

import { howIWork } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const EVIDENCE: Record<string, string> = {
  "01": "// ALKONEK dimulai dari billing & network monitoring yang tersebar, bukan dari keinginan membuat dashboard.",
  "02": "// RabegLab diiterasi dari dokumentasi dulu, baru beli hardware Proxmox.",
  "03": "// Prodesa punya activity log per transisi approval supaya versi dokumen bisa dilacak.",
  "04": "// AlkonekPlus pakai Recharts bukan chart library berat demi performa tes real-time.",
};

export function CaraBekerja() {
  return (
    <section id="cara-kerja" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="03"
          title="Cara saya bekerja."
          description="Bukan framework, bukan metodologi. Ini cara saya berpikir saat membangun sesuatu."
        />

        <div className="space-y-12">
          {howIWork.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="group">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-xs text-accent">
                    {item.label}
                  </span>
                  <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-fg-secondary max-w-lg ml-8">
                  {item.body}
                </p>
                {EVIDENCE[item.label] && (
                  <p className="mt-2 ml-8 font-mono text-xs text-fg-faint">
                    {EVIDENCE[item.label]}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
