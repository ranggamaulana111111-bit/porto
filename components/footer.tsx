"use client";

import Link from "next/link";
import { profile } from "@/lib/content";
import { GitHub, LinkedIn, WhatsApp } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";

export function Footer() {
  const socials = [
    { label: "github.com/ranggamaulana", href: profile.socials.github, Icon: GitHub },
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedIn },
    { label: "WhatsApp", href: profile.socials.whatsapp, Icon: WhatsApp },
  ];

  return (
    <footer className="border-t border-border bg-bg-warm/50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#home" className="font-display text-lg font-bold tracking-tight text-fg">
              {profile.shortName}
            </a>
            <p className="mt-1 text-sm text-fg-muted">{profile.role}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-bg-card px-4 py-2 text-xs font-medium text-fg-secondary shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                Lihat CV
              </Link>
              <Link
                href="/stack"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border bg-bg-card px-4 py-2 text-xs font-medium text-fg-secondary shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                Lihat Stack
              </Link>
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-4 py-2 text-xs font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors"
              >
                Workspace →
              </Link>
            </div>
          </div>

          <ul className="flex flex-col gap-2 sm:items-end">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <Icon size={16} />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <CopyEmail variant="inline" />
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-xs text-fg-faint">
          &copy; {new Date().getFullYear()} {profile.name} · Dibuat dengan Next.js & Clay
        </div>
      </div>
    </footer>
  );
}
