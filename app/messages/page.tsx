"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ClayCard, ClayButton, ClayTag } from "@/components/clay";
import { Reveal } from "@/components/reveal";
import type { AnonymousMessage } from "@/lib/messages";

function useDebouncedValue<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

interface TrackResult {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}

function SongPicker({
  selected,
  onSelect,
}: {
  selected: TrackResult | null;
  onSelect: (t: TrackResult | null) => void;
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<TrackResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounced = useDebouncedValue(search, 450);

  useEffect(() => {
    if (selected) return;
    const q = debounced.trim();
    if (q.length < 2) return;
    let cancelled = false;
    fetch(`/api/youtube-search?q=${encodeURIComponent(q)}`)
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setResults([]);
          setError(data.error || "Gagal mencari lagu.");
          return;
        }
        setResults(data.results ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Gagal mencari lagu.");
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced, selected]);

  function handleSearchChange(val: string) {
    setSearch(val);
    if (val.trim().length >= 2) {
      setSearching(true);
      setError(null);
    } else {
      setResults(null);
      setSearching(false);
      setError(null);
    }
  }

  if (selected) {
    return (
      <div className="flex items-center gap-3 rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset p-3">
        {selected.thumbnail && (
          <Image
            src={selected.thumbnail}
            alt=""
            width={72}
            height={48}
            className="h-12 w-[72px] shrink-0 rounded-md object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{selected.title}</p>
          <p className="truncate text-xs text-fg-faint">{selected.channel}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="text-xs text-fg-faint hover:text-fg transition-colors"
        >
          Ganti
        </button>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor="song-search"
        className="block text-sm font-medium text-fg-secondary mb-1.5"
      >
        Cari lagu <span className="text-fg-faint font-normal">(opsional)</span>
      </label>
      <input
        id="song-search"
        type="text"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Cari lagu yang match sama vibe pesanmu..."
        className="w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-2.5 text-[15px] text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent-strong/30 focus:border-accent-strong"
      />

      {searching && (
        <p className="mt-2 text-xs text-fg-faint">Mencari...</p>
      )}

      {error && (
        <p className="mt-2 text-xs text-accent-strong">{error}</p>
      )}

      {!searching && results && results.length > 0 && (
        <div className="mt-2 max-h-64 space-y-1 overflow-y-auto rounded-[var(--radius-clay-sm)] border border-border bg-bg-card p-1.5">
          {results.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t)}
              className="flex w-full items-center gap-3 rounded-[var(--radius-clay-sm)] px-2 py-1.5 text-left transition-colors hover:bg-bg-inset"
            >
              {t.thumbnail && (
                <Image
                  src={t.thumbnail}
                  alt=""
                  width={64}
                  height={40}
                  className="h-10 w-16 shrink-0 rounded-md object-cover"
                />
              )}
              <span className="min-w-0">
                <span className="block truncate text-sm text-fg">{t.title}</span>
                <span className="block truncate text-xs text-fg-faint">
                  {t.channel}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {!searching && results && results.length === 0 && !error && (
        <p className="mt-2 text-xs text-fg-faint">Tidak ada hasil.</p>
      )}
    </div>
  );
}

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video mt-3 overflow-hidden rounded-[var(--radius-clay-sm)] border border-border">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

function MessageCard({ msg }: { msg: AnonymousMessage }) {
  const timeAgo = getTimeAgo(msg.createdAt);
  return (
    <ClayCard className="p-5 sm:p-6">
      <p className="text-[15px] leading-relaxed text-fg">{msg.text}</p>
      {msg.youtubeId && (
        <>
          {msg.songTitle && (
            <ClayTag className="mt-3">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
              {msg.songTitle}
            </ClayTag>
          )}
          <YouTubeEmbed videoId={msg.youtubeId} />
        </>
      )}
      <p className="mt-3 text-xs text-fg-faint">{timeAgo}</p>
    </ClayCard>
  );
}

function SubmitForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [text, setText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [song, setSong] = useState<TrackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3) {
      setResult({ type: "error", msg: "Pesan minimal 3 karakter." });
      textRef.current?.focus();
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          senderName: senderName.trim() || null,
          youtubeId: song?.id,
          songTitle: song?.title,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setResult({ type: "error", msg: data.error || "Gagal mengirim." });
        return;
      }

      setResult({ type: "success", msg: data.message });
      setText("");
      setSenderName("");
      setSong(null);
      onSubmitted();
    } catch {
      setResult({ type: "error", msg: "Terjadi kesalahan jaringan." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClayCard className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="msg-text"
            className="block text-sm font-medium text-fg-secondary mb-1.5"
          >
            Pesan anonimmu
          </label>
          <textarea
            id="msg-text"
            ref={textRef}
            rows={3}
            maxLength={500}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis sesuatu... curhat, motivasi, atau sekadar halo."
            className="w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-3 text-[15px] text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent-strong/30 focus:border-accent-strong resize-none"
          />
          <p className="mt-1 text-right text-xs text-fg-faint">
            {text.length}/500
          </p>
        </div>

        <div>
          <label
            htmlFor="sender-name"
            className="block text-sm font-medium text-fg-secondary mb-1.5"
          >
            Nama <span className="text-fg-faint font-normal">(opsional)</span>
          </label>
          <input
            id="sender-name"
            type="text"
            maxLength={50}
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Inisial atau nama panggilan, tidak tampil di publik"
            className="w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-2.5 text-[15px] text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent-strong/30 focus:border-accent-strong"
          />
        </div>

        <SongPicker selected={song} onSelect={setSong} />

        <div>
          <ClayButton type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </ClayButton>

          {result && (
            <p
              className={`mt-3 text-sm ${
                result.type === "success" ? "text-online" : "text-accent-strong"
              }`}
            >
              {result.msg}
            </p>
          )}
        </div>
      </form>
    </ClayCard>
  );
}

function getTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  const months = Math.floor(days / 30);
  return `${months} bulan lalu`;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-secondary hover:text-fg transition-colors mb-8"
          >
            ← Kembali ke beranda
          </Link>

          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
            Pesan Anonim
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Wall of Notes
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            Kirim pesan, cerita, curhat, atau motivasi. Langsung tampil di
            dinding tanpa menunggu. Kalau ada lagu yang match sama vibe
            pesanmu, cari dan lampirkan.
          </p>
        </Reveal>

        <div className="mt-10">
          <Reveal delay={0.06}>
            <SubmitForm onSubmitted={fetchMessages} />
          </Reveal>
        </div>

        <div className="mt-12 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-sm text-fg-muted">
              Memuat pesan...
            </div>
          ) : messages.length === 0 ? (
            <ClayCard className="p-8 text-center">
              <p className="text-fg-secondary">
                Belum ada pesan. Jadilah yang pertama!
              </p>
            </ClayCard>
          ) : (
            messages.map((msg, i) => (
              <Reveal key={msg.id} delay={i * 0.04}>
                <MessageCard msg={msg} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}