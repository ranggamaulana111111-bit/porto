"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { profile, todayStatus } from "@/lib/content";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

function toSpotifyEmbed(url: string): string {
  const m = url.match(/open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/);
  if (!m) return url;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
}

export function Hero() {
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
    <section id="home" className="px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="font-mono text-xs uppercase tracking-wider text-fg-muted"
            >
              {profile.location} · {profile.shortName}
            </motion.p>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              className="mt-4 font-display text-[2.2rem] font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.25rem]"
            >
              Rangga Maulana
              <br />
              <span className="text-fg-secondary">Ramadhan Wiharto</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="mt-5 text-base leading-relaxed text-fg-secondary max-w-xl"
            >
              Mahasiswa Program Studi Sistem Informasi di Universitas Pamulang, Kampus Serang.
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="mt-3 text-sm leading-relaxed text-fg-muted max-w-xl"
            >
              Sedang mempelajari dan mengembangkan kemampuan di bidang software development, networking, dan infrastructure, lewat project nyata, bukan teori saja.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/cv"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-[var(--shadow-button)] border border-accent-strong/10 hover:bg-accent-strong transition-colors"
              >
                View CV
              </Link>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-bg-card px-6 py-2.5 text-sm font-medium text-fg border border-border shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                View Projects
              </a>
              <Link
                href="/workspace"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-bg-card px-6 py-2.5 text-sm font-medium text-fg border border-border shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                Explore Workspace →
              </Link>
              <div className="w-[280px] rounded-[var(--radius-clay)] border border-border bg-bg-card shadow-[var(--shadow-card)] p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">Mendengarkan</p>
                {nowPlaying?.isPlaying && (
                  <button
                    type="button"
                    onClick={() => setShowTrack((v) => !v)}
                    className="mt-2 group flex w-full items-center gap-2.5 rounded-[10px] text-left hover:bg-bg-inset p-1.5 -mx-1.5 transition-colors"
                  >
                    {nowPlaying.albumImageUrl && (
                      <Image src={nowPlaying.albumImageUrl} alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-[8px] object-cover" />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium text-fg group-hover:text-accent-strong">{nowPlaying.title}</span>
                      <span className="block truncate text-[11px] text-fg-muted">{nowPlaying.artist}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-fg-faint group-hover:text-accent-strong">
                      {showTrack ? "playlist" : "putar"}
                    </span>
                  </button>
                )}
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-fg-muted">
                  {showTrack && nowPlaying?.isPlaying ? "Sedang diputar" : "Mix dari playlist"}
                </p>
                <iframe
                  key={showTrack && nowPlaying?.isPlaying ? "track" : "playlist"}
                  src={showTrack && nowPlaying?.isPlaying && nowPlaying.songUrl ? toSpotifyEmbed(nowPlaying.songUrl) : todayStatus.listeningPlaylist.embed}
                  title={showTrack && nowPlaying?.isPlaying ? nowPlaying.title ?? "Spotify" : todayStatus.listeningPlaylist.title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="mt-2 w-full rounded-[12px]"
                  style={{ border: 0, height: 80 }}
                />
                <a
                  href={showTrack && nowPlaying?.isPlaying && nowPlaying.songUrl ? nowPlaying.songUrl : todayStatus.listeningPlaylist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-fg-muted hover:text-accent-strong transition-colors"
                >
                  Buka di Spotify
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
      </div>
    </section>
  );
}
