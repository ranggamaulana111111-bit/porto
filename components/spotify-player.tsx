"use client";

import { useEffect, useState } from "react";
import { todayStatus } from "@/lib/content";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
};

function toSpotifyEmbed(url: string): string {
  const m = url.match(/open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/);
  if (!m) return url;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
}

export function SpotifyPlayer({ className = "" }: { className?: string }) {
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

  const playlist = todayStatus.listeningPlaylist;
  const trackEmbed =
    nowPlaying?.isPlaying && nowPlaying.songUrl ? toSpotifyEmbed(nowPlaying.songUrl) : null;

  return (
    <div className={`rounded-[var(--radius-clay)] border border-border bg-bg-card p-4 shadow-[var(--shadow-card)] ${className}`}>
      <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Mendengarkan</p>
      {nowPlaying?.isPlaying && nowPlaying.title ? (
        <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">
          Sedang memutar{" "}
          <a
            href={nowPlaying.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-strong underline decoration-accent/30 underline-offset-4 hover:decoration-accent-strong"
          >
            {nowPlaying.title}
          </a>{" "}
          oleh {nowPlaying.artist}.
        </p>
      ) : (
        <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{playlist.title}.</p>
      )}

      <iframe
        key={showTrack && trackEmbed ? "track" : "playlist"}
        src={showTrack && trackEmbed ? trackEmbed : playlist.embed}
        title={showTrack && trackEmbed ? nowPlaying?.title ?? "Spotify" : playlist.title}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="mt-3 w-full rounded-[12px]"
        style={{ border: 0, height: 80 }}
      />

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        {trackEmbed && (
          <button
            type="button"
            onClick={() => setShowTrack((v) => !v)}
            className="font-mono text-xs text-fg-muted transition-colors hover:text-accent-strong"
          >
            {showTrack ? "Kembali ke playlist" : "Putar track yang sedang diputar"}
          </button>
        )}
        <a
          href={playlist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-fg-muted transition-colors hover:text-accent-strong"
        >
          Buka di Spotify
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>
    </div>
  );
}