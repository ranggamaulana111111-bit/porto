"use client";

import { profile } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { ClayCard } from "@/components/clay";
import { GitHub, LinkedIn, WhatsApp } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Kontak</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Mari terhubung.</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Terbuka untuk kesempatan belajar, internship, part-time, freelance project, dan kolaborasi teknis.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ClayCard className="mt-8 p-6 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <CopyEmail variant="inline" />
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-bg-card px-4 py-2 text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  <GitHub size={16} /> GitHub
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-bg-card px-4 py-2 text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  <LinkedIn size={16} /> LinkedIn
                </a>
                <a
                  href={profile.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-bg-card px-4 py-2 text-sm text-fg-secondary hover:text-fg transition-colors"
                >
                  <WhatsApp size={16} /> WhatsApp
                </a>
              </div>
              <p className="text-xs text-fg-faint">{profile.location} · {profile.email}</p>
            </div>
          </ClayCard>
        </Reveal>
      </div>
    </section>
  );
}
