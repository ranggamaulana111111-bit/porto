"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { todayStatus, profile } from "@/lib/content";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

function toSpotifyEmbed(url: string): string {
  const m = url.match(/open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/);
  if (!m) return url;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
}

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: profile.timezone,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono tabular-nums">{time}</span>;
}

function LiveDate() {
  const date = useMemo(
    () =>
      new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: profile.timezone,
      }).format(new Date()),
    []
  );

  return <span suppressHydrationWarning>{date}</span>;
}

function TypingTagline({ words, className = "" }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? words[0] : "");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[wi];
    if (!deleting && ci === word.length) {
      const id = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(id);
    }
    if (deleting && ci === 0) {
      const id = setTimeout(() => {
        setDeleting(false);
        setWi((p) => (p + 1) % words.length);
      }, 0);
      return () => clearTimeout(id);
    }
    const delay = deleting ? 45 : 80;
    const id = setTimeout(() => {
      if (!deleting && ci < word.length) {
        setCi(ci + 1);
        setText(word.slice(0, ci + 1));
      } else if (deleting && ci > 0) {
        setCi(ci - 1);
        setText(word.slice(0, ci - 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, wi, ci, deleting, reduced, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-0.5 bg-accent align-middle animate-pulse" />
    </span>
  );
}

export function HariIni() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);
  const [showTrack, setShowTrack] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const json = (await res.json()) as NowPlayingData;
        if (active) setNowPlaying(json);
      } catch {
        if (active) setNowPlaying({ isPlaying: false });
      }
    };

    load();
    const id = setInterval(load, 15000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section id="hari-ini" className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } },
          }}
        >
          {/* metadata line */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8 } },
            }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
              </span>
              Online
            </span>
            <span className="text-fg-faint">·</span>
            <LiveDate />
            <span className="text-fg-faint">·</span>
            <LiveClock />
            <span className="text-fg-faint">WIB</span>
            <span className="text-fg-faint">·</span>
            <span>{profile.location}</span>
          </motion.div>

          {/* greeting */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-10 font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {todayStatus.greeting}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-4 text-base leading-relaxed text-fg-secondary max-w-xl"
          >
            {todayStatus.intro}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-3 text-base text-fg-secondary"
          >
            <span className="text-fg-muted">Sekarang lagi: </span>
            <TypingTagline
              words={["belajar", "membangun", "gagal", "belajar lagi", "deploy ke server"]}
            />
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <a
              href="#project"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg transition-colors hover:text-accent"
            >
              <span className="text-fg-faint group-hover:text-accent">[</span>
              lihat project
              <span className="text-fg-faint group-hover:text-accent">]</span>
            </a>
            <a
              href="#berbincang"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <span className="text-fg-faint group-hover:text-accent">[</span>
              ngobrol dengan saya
              <span className="text-fg-faint group-hover:text-accent">]</span>
            </a>
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <span className="text-fg-faint group-hover:text-accent">[</span>
              lihat cv
              <span className="text-fg-faint group-hover:text-accent">]</span>
            </a>
          </motion.div>

          {/* focus section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="mt-14"
          >
            <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-4">
              {todayStatus.focus}
            </p>
            <div className="space-y-2">
              {todayStatus.focusItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                      ["bg-accent", "bg-green", "bg-teal", "bg-amber", "bg-coral", "bg-sky"][i % 6]
                    }`}
                  />
                  <span className="text-sm text-fg-secondary">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* bottom row: tech stack + music + mood */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.8 } },
            }}
            className="mt-14 grid gap-8 sm:grid-cols-3"
          >
            {/* tech stack */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {todayStatus.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 text-xs text-fg-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* music */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Mendengarkan
              </p>
              {nowPlaying?.isPlaying && (
                <button
                  type="button"
                  onClick={() => setShowTrack((v) => !v)}
                  aria-label={
                    showTrack
                      ? "Kembali ke playlist"
                      : "Putar lagu ini di pemutar"
                  }
                  className="group flex w-full items-center gap-3 rounded-lg text-left transition-colors hover:bg-bg-card/60"
                >
                  {nowPlaying.albumImageUrl && (
                    <Image
                      src={nowPlaying.albumImageUrl}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 rounded object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-fg transition-colors group-hover:text-accent">
                      {nowPlaying.title}
                    </span>
                    <span className="block truncate text-xs text-fg-muted">
                      {nowPlaying.artist}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-fg-faint transition-colors group-hover:text-accent">
                    {showTrack ? "playlist" : "putar di sini"}
                  </span>
                </button>
              )}

              <p className="mt-4 font-mono text-xs text-fg-muted uppercase tracking-wider mb-2">
                {showTrack && nowPlaying?.isPlaying ? "Sedang diputar" : "Mix dari playlist"}
              </p>
              <iframe
                key={showTrack && nowPlaying?.isPlaying ? "track" : "playlist"}
                src={
                  showTrack && nowPlaying?.isPlaying && nowPlaying.songUrl
                    ? toSpotifyEmbed(nowPlaying.songUrl)
                    : todayStatus.listeningPlaylist.embed
                }
                title={
                  showTrack && nowPlaying?.isPlaying
                    ? nowPlaying.title ?? "Spotify"
                    : todayStatus.listeningPlaylist.title
                }
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="w-full rounded-xl"
                style={{ border: 0, borderRadius: 12, height: 152 }}
              />
              <a
                href={
                  showTrack && nowPlaying?.isPlaying && nowPlaying.songUrl
                    ? nowPlaying.songUrl
                    : todayStatus.listeningPlaylist.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-fg-muted transition-colors hover:text-accent"
              >
                Buka di Spotify
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
            </div>

            {/* mood */}
            <div>
              <p className="font-mono text-xs text-fg-muted uppercase tracking-wider mb-3">
                Suasana
              </p>
              <p className="text-sm text-fg-secondary">
                {todayStatus.mood}
              </p>
            </div>
          </motion.div>

          {/* divider */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 1 } },
            }}
            className="mt-20 border-t border-border"
          />
        </motion.div>
      </div>
    </section>
  );
}
