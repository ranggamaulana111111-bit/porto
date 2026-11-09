"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ClayCard, ClayTag } from "@/components/clay";
import { MessageCircle, ArrowUpRight } from "@/components/icons";
import type { AnonymousMessage } from "@/lib/messages";

function MiniMessageCard({ msg }: { msg: AnonymousMessage }) {
  return (
    <ClayCard className="p-4 sm:p-5">
      <p className="text-sm leading-relaxed text-fg line-clamp-3">{msg.text}</p>
      {msg.songTitle && (
        <ClayTag className="mt-2">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
            {msg.songTitle}
          </span>
        </ClayTag>
      )}
    </ClayCard>
  );
}

export function AnonymousMessages() {
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages?limit=5")
      .then((r) => r.json())
      .then((data) => setMessages(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="messages" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Pesan Anonim"
          description="Kirim pesan dan langsung tampil tanpa menunggu. Cerita, curhat, motivasi, atau sekadar halo. Kalau ada lagu yang cocok, langsung cari."
        />

        {loading ? (
          <div className="py-8 text-center text-sm text-fg-muted">
            Memuat...
          </div>
        ) : messages.length === 0 ? (
          <Reveal delay={0.06}>
            <ClayCard className="p-6 sm:p-8 text-center">
              <MessageCircle size={28} className="mx-auto text-fg-faint mb-3" />
              <p className="text-fg-secondary">
                Belum ada pesan. Jadilah yang pertama!
              </p>
              <Link
                href="/messages"
                className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 min-h-11 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-button)] hover:bg-accent-strong transition-colors"
              >
                Kirim Pesan <ArrowUpRight size={14} />
              </Link>
            </ClayCard>
          </Reveal>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              {messages.map((msg, i) => (
                <Reveal key={msg.id} delay={0.06 + i * 0.04}>
                  <MiniMessageCard msg={msg} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <div className="mt-6 text-center">
                <Link
                  href="/messages"
                  className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary hover:text-fg transition-colors"
                >
                  Lihat semua pesan <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}