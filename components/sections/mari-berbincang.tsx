"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { GitHub, LinkedIn, WhatsApp, ArrowUpRight } from "@/components/icons";
import { CopyEmail } from "@/components/copy-email";

export function MariBerbincang() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);

    try {
      await fetch("/api/submit-message", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      setSent(true);
      setTimeout(() => setSent(false), 3500);
      (e.target as HTMLFormElement).reset();
    } catch {
      alert("Gagal mengirim pesan. Coba lagi atau hubungi lewat WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    { label: "github.com/ranggamaulana", href: profile.socials.github, Icon: GitHub },
    { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedIn },
    { label: "WhatsApp", href: profile.socials.whatsapp, Icon: WhatsApp },
  ];

  return (
    <section id="berbincang" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="08"
          title="Mari berbincang."
          description="Punya ide, mau kolaborasi, atau sekadar menyapa? Saya senang diajak ngobrol."
        />

        <div className="grid gap-12 sm:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-4">
                  Temui saya di
                </p>
                <div className="space-y-2">
                  {channels.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2 border-b border-border text-sm transition-colors hover:border-fg-faint"
                    >
                      <span className="flex items-center gap-3 text-fg-secondary group-hover:text-fg transition-colors">
                        <Icon size={16} className="text-fg-faint group-hover:text-fg-muted transition-colors" />
                        {label}
                      </span>
                      <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg-muted transition-colors" />
                    </a>
                  ))}
                  <CopyEmail />
                </div>
              </div>

              <div>
                <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-2">
                  Lokasi
                </p>
                <p className="text-sm text-fg-secondary">{profile.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={handleSubmit} className="relative">
              <div className="space-y-4">
                <div>
                  <label htmlFor="nama" className="mb-1.5 block text-xs text-fg-muted uppercase tracking-wider">
                    Nama
                  </label>
                  <input
                    id="nama"
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    required
                    autoComplete="name"
                    className="w-full border-b border-border bg-transparent py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-fg-muted"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs text-fg-muted uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="anda@perusahaan.com"
                    required
                    autoComplete="email"
                    className="w-full border-b border-border bg-transparent py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-fg-muted"
                  />
                </div>
                <div>
                  <label htmlFor="pesan" className="mb-1.5 block text-xs text-fg-muted uppercase tracking-wider">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="message"
                    rows={4}
                    placeholder="Ceritakan tentang project Anda..."
                    required
                    minLength={10}
                    className="w-full resize-none border-b border-border bg-transparent py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-fg-muted"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 border border-fg px-6 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-fg hover:text-bg disabled:opacity-50"
                >
                  {loading ? "Mengirim..." : "Kirim pesan"}
                </button>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-live="polite"
                    className="absolute inset-0 grid place-items-center bg-bg"
                  >
                    <div className="text-center">
                      <p className="font-display text-lg font-semibold">
                        Pesan terkirim!
                      </p>
                      <p className="mt-1 text-sm text-fg-muted">
                        Terima kasih — saya akan segera membalas.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
