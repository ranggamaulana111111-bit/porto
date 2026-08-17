"use client";

import { profile } from "@/lib/content";
import { GitHub, LinkedIn, WhatsApp, Mail } from "@/components/icons";

export function Footer() {
  const socials = [
    { label: "GitHub", href: profile.socials.github, Icon: GitHub },
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedIn },
    { label: "WhatsApp", href: profile.socials.whatsapp, Icon: WhatsApp },
    { label: "Email", href: profile.socials.email, Icon: Mail },
  ];

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a
              href="#hari-ini"
              className="font-display text-lg font-bold tracking-tight text-fg"
            >
              {profile.shortName}
              <span className="text-accent">.</span>
            </a>
            <p className="mt-1 text-sm text-fg-muted">{profile.role}</p>
          </div>

          <ul className="flex items-center gap-5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <Icon size={16} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-xs text-fg-muted">
          &copy; {new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </footer>
  );
}
