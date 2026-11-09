"use client";

import { useState, useEffect, useCallback, useRef, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ClayCard, ClayButton, ClayTag } from "@/components/clay";
import { Reveal } from "@/components/reveal";
import { MessageCircle } from "@/components/icons";
import { SongPlayer } from "@/components/song-player";
import type { AnonymousMessage } from "@/lib/messages";

const PAGE_SIZE = 10;

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
  const searchId = useId();

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
      <SongPlayer
        videoId={selected.id}
        title={selected.title}
        channel={selected.channel}
        onRemove={() => onSelect(null)}
      />
    );
  }

  return (
    <div>
      <label
        htmlFor={searchId}
        className="mb-1.5 block text-sm font-medium text-fg-secondary"
      >
        Cari lagu <span className="font-normal text-fg-faint">(opsional)</span>
      </label>
      <input
        id={searchId}
        type="text"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Cari lagu yang match sama vibe pesanmu..."
        className="w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-2.5 text-[15px] text-fg placeholder:text-fg-faint focus:border-accent-strong focus:outline-none focus:ring-2 focus:ring-accent-strong/30"
      />

      {searching && (
        <div
          role="status"
          aria-label="Mencari lagu"
          className="mt-2 space-y-1 rounded-[var(--radius-clay-sm)] border border-border bg-bg-card p-1.5"
        >
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-3 px-2 py-1.5">
              <div className="h-10 w-16 shrink-0 animate-pulse rounded-md bg-bg-inset" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-3/4 animate-pulse rounded bg-bg-inset" />
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-bg-inset" />
              </div>
            </div>
          ))}
          <span className="sr-only">Mencari lagu...</span>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-accent-strong">{error}</p>}

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

function MessageCard({ msg }: { msg: AnonymousMessage }) {
  const timeAgo = getTimeAgo(msg.createdAt);

  return (
    <ClayCard
      className={`p-5 sm:p-6 ${msg.pinned ? "border-accent/40" : ""}`}
    >
      {(msg.pinned || msg.isOwner) && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {msg.pinned && (
            <ClayTag>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17v5M9 3h6l-1 6 3 3H7l3-3z" />
              </svg>
              Disematkan
            </ClayTag>
          )}
          {msg.isOwner && (
            <ClayTag className="border-accent/25 bg-accent-soft text-accent-strong">
              Pemilik situs
            </ClayTag>
          )}
        </div>
      )}

      <p className="text-[15px] leading-relaxed text-fg">{msg.text}</p>

      {msg.youtubeId && (
        <SongPlayer
          videoId={msg.youtubeId}
          title={msg.songTitle}
          channel={msg.songChannel}
          className="mt-3"
        />
      )}

      <p className="mt-3 text-xs text-fg-faint">{timeAgo}</p>
    </ClayCard>
  );
}

function MessageSkeleton() {
  return (
    <ClayCard className="p-5 sm:p-6">
      <div className="animate-pulse space-y-2.5">
        <div className="h-3.5 w-11/12 rounded bg-bg-inset" />
        <div className="h-3.5 w-4/5 rounded bg-bg-inset" />
        <div className="h-3.5 w-2/3 rounded bg-bg-inset" />
      </div>
    </ClayCard>
  );
}

function SubmitForm({
  onSubmitted,
  onSuccess,
  autoFocus = false,
}: {
  onSubmitted: () => void;
  onSuccess: (message: string) => void;
  autoFocus?: boolean;
}) {
  const [text, setText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [song, setSong] = useState<TrackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const uid = useId();
  const textId = `${uid}-text`;
  const nameId = `${uid}-name`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError("Pesan minimal 3 karakter.");
      textRef.current?.focus();
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          senderName: senderName.trim() || null,
          youtubeId: song?.id,
          songTitle: song?.title,
          songChannel: song?.channel,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mengirim.");
        return;
      }

      setText("");
      setSenderName("");
      setSong(null);
      onSubmitted();
      onSuccess(data.message ?? "Pesanmu sudah tampil di dinding.");
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClayCard className="p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor={textId}
            className="mb-1.5 block text-sm font-medium text-fg-secondary"
          >
            Pesan anonimmu
          </label>
          <textarea
            id={textId}
            ref={textRef}
            rows={3}
            maxLength={500}
            required
            autoFocus={autoFocus}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tulis sesuatu... curhat, motivasi, atau sekadar halo."
            className="w-full resize-none rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-3 text-[15px] text-fg placeholder:text-fg-faint focus:border-accent-strong focus:outline-none focus:ring-2 focus:ring-accent-strong/30"
          />
          <p className="mt-1 text-right text-xs text-fg-faint">
            {text.length}/500
          </p>
        </div>

        <div>
          <label
            htmlFor={nameId}
            className="mb-1.5 block text-sm font-medium text-fg-secondary"
          >
            Nama <span className="font-normal text-fg-faint">(opsional)</span>
          </label>
          <input
            id={nameId}
            type="text"
            maxLength={50}
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Inisial atau nama panggilan, tidak tampil di publik"
            className="w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-2.5 text-[15px] text-fg placeholder:text-fg-faint focus:border-accent-strong focus:outline-none focus:ring-2 focus:ring-accent-strong/30"
          />
        </div>

        <SongPicker selected={song} onSelect={setSong} />

        <div>
          <ClayButton type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </ClayButton>

          {error && (
            <p className="mt-3 text-sm text-accent-strong" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>
    </ClayCard>
  );
}

async function requestMessages(
  offset = 0,
  limit = PAGE_SIZE
): Promise<{ items: AnonymousMessage[]; hasMore: boolean; total: number }> {
  const res = await fetch(
    `/api/messages?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Gagal memuat pesan.");
  const items = (await res.json()) as AnonymousMessage[];
  return {
    items,
    hasMore: res.headers.get("X-Has-More") === "true",
    total: Number(res.headers.get("X-Total-Count")) || items.length,
  };
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const { items, hasMore: more, total: count } = await requestMessages(
        0,
        PAGE_SIZE
      );
      setMessages(items);
      setHasMore(more);
      setTotal(count);
      setLoadError(null);
      setLoadMoreError(null);
    } catch {
      setLoadError("Dinding pesan belum bisa dimuat. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    requestMessages(0, PAGE_SIZE)
      .then(({ items, hasMore: more, total: count }) => {
        if (cancelled) return;
        setMessages(items);
        setHasMore(more);
        setTotal(count);
        setLoadError(null);
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Dinding pesan belum bisa dimuat. Coba lagi.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function loadMore() {
    setLoadingMore(true);
    setLoadMoreError(null);
    try {
      const { items, hasMore: more, total: count } = await requestMessages(
        messages.length,
        PAGE_SIZE
      );
      setMessages((current) => [...current, ...items]);
      setHasMore(more);
      setTotal(count);
    } catch {
      setLoadMoreError("Gagal memuat pesan lain. Coba lagi.");
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!formOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFormOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [formOpen]);

  const pinned = messages.filter((msg) => msg.pinned);
  const regular = messages.filter((msg) => !msg.pinned);
  const remaining = Math.max(total - messages.length, 0);

  function handleSubmitted() {
    fetchMessages();
    setFormOpen(false);
  }

  function handleSuccess(message: string) {
    setToast(message);
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-6 pb-28 pt-12 sm:pt-16 lg:pb-16">
        <Reveal>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-fg"
          >
            ← Kembali ke beranda
          </Link>

          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              Pesan Anonim
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Dinding Pesan
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-secondary">
              Kirim pesan, cerita, curhat, atau motivasi. Langsung tampil di
              dinding tanpa menunggu. Kalau ada lagu yang match sama vibe
              pesanmu, cari dan lampirkan.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Reveal delay={0.06}>
                <SubmitForm
                  onSubmitted={handleSubmitted}
                  onSuccess={handleSuccess}
                />
              </Reveal>
            </div>
          </aside>

          <div>
            {pinned.length > 0 && (
              <div className="mb-4 space-y-4">
                {pinned.map((msg) => (
                  <Reveal key={msg.id} delay={0.06}>
                    <MessageCard msg={msg} />
                  </Reveal>
                ))}
              </div>
            )}

            {loading ? (
              <div
                role="status"
                aria-label="Memuat pesan"
                className="grid gap-4 sm:grid-cols-2"
              >
                {[0, 1, 2, 3].map((item) => (
                  <MessageSkeleton key={item} />
                ))}
                <span className="sr-only">Memuat pesan...</span>
              </div>
            ) : loadError ? (
              <ClayCard className="p-8 text-center">
                <p className="text-fg-secondary">{loadError}</p>
                <ClayButton
                  variant="secondary"
                  size="md"
                  className="mt-4"
                  onClick={() => {
                    setLoading(true);
                    fetchMessages();
                  }}
                >
                  Coba lagi
                </ClayButton>
              </ClayCard>
            ) : messages.length === 0 ? (
              <ClayCard className="p-8 text-center">
                <p className="text-fg-secondary">
                  Belum ada pesan. Jadilah yang pertama!
                </p>
                <ClayButton
                  variant="primary"
                  size="md"
                  className="mt-4 lg:hidden"
                  onClick={() => setFormOpen(true)}
                >
                  Tulis pesan
                </ClayButton>
              </ClayCard>
            ) : (
              <>
                {regular.length > 0 && (
                  <div className="columns-1 gap-4 sm:columns-2">
                    {regular.map((msg, index) => (
                      <div key={msg.id} className="mb-4 break-inside-avoid">
                        <Reveal delay={Math.min(index * 0.04, 0.3)}>
                          <MessageCard msg={msg} />
                        </Reveal>
                      </div>
                    ))}
                  </div>
                )}

                {hasMore && (
                  <div className="mt-2 text-center">
                    <ClayButton
                      variant="secondary"
                      size="md"
                      disabled={loadingMore}
                      onClick={loadMore}
                    >
                      {loadingMore
                        ? "Memuat..."
                        : `Muat ${
                            remaining > 0
                              ? Math.min(PAGE_SIZE, remaining)
                              : PAGE_SIZE
                          } pesan lagi`}
                    </ClayButton>
                    {loadMoreError && (
                      <p className="mt-2 text-sm text-accent-strong">
                        {loadMoreError}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFormOpen(true)}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 inline-flex min-h-12 items-center gap-2 rounded-[var(--radius-pill)] bg-accent px-5 text-sm font-medium text-white shadow-[var(--shadow-card-hover)] transition-colors hover:bg-accent-strong lg:hidden"
      >
        <MessageCircle size={16} />
        Tulis pesan
      </button>

      <AnimatePresence>
        {formOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div
              aria-hidden="true"
              onClick={() => setFormOpen(false)}
              className="absolute inset-0 bg-fg/30 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="message-form-title"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 max-h-[90dvh] overflow-y-auto rounded-t-[var(--radius-clay-lg)] border-t border-border bg-bg px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2
                  id="message-form-title"
                  className="font-display text-lg font-bold"
                >
                  Tulis pesan
                </h2>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  aria-label="Tutup formulir"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-pill)] text-fg-secondary transition-colors hover:bg-bg-warm hover:text-fg"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SubmitForm
                onSubmitted={handleSubmitted}
                onSuccess={handleSuccess}
                autoFocus
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-6 lg:bottom-8">
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto flex items-center gap-2 rounded-[var(--radius-pill)] border border-online/25 bg-bg-card px-4 py-2.5 text-sm text-fg shadow-[var(--shadow-card-hover)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-online"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {toast}
          </motion.div>
        )}
      </div>
    </div>
  );
}
