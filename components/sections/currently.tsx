"use client";

import { useEffect, useState } from "react";
import { todayStatus } from "@/lib/content";
import { Reveal } from "@/components/reveal";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
};

export function Currently() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);

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
    <section id="now" className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Currently</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Yang sedang terjadi.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-secondary">
            {todayStatus.intro}
          </p>
        </Reveal>

        <div className="mt-8">
          {todayStatus.fragments.map((fragment, i) => (
            <Reveal key={fragment.label} delay={i * 0.05}>
              {fragment.type === "listen" ? (
                <ListenRow index={i} nowPlaying={nowPlaying} />
              ) : (
                <div className="flex items-baseline gap-4 border-t border-border py-5">
                  <span className="w-6 shrink-0 font-mono text-xs text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-fg-muted">
                    {fragment.label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] leading-relaxed text-fg-secondary">{fragment.text}</p>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function toSpotifyEmbed(url: string): string {
  const m = url.match(/open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/);
  if (!m) return url;
  return `https://open.spotify.com/embed/${m[1]}/${m[2]}`;
}

function ListenRow({ index, nowPlaying }: { index: number; nowPlaying: NowPlayingData | null }) {
  const playlist = todayStatus.listeningPlaylist;
  const fragment = todayStatus.fragments.find((f) => f.type === "listen");
  const [showTrack, setShowTrack] = useState(false);
  const trackEmbed =
    nowPlaying?.isPlaying && nowPlaying.songUrl ? toSpotifyEmbed(nowPlaying.songUrl) : null;

  return (
    <div className="border-t border-border py-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="w-6 shrink-0 font-mono text-xs text-fg-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-fg-muted">
          {fragment?.label}
        </span>
        {nowPlaying?.isPlaying && nowPlaying.title && nowPlaying.songUrl ? (
          <p className="min-w-0 flex-1 text-[15px] leading-relaxed text-fg-secondary">
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
          <p className="min-w-0 flex-1 text-[15px] leading-relaxed text-fg-secondary">{fragment?.text}</p>
        )}
      </div>

      <div className="mt-3 w-full max-w-[320px] sm:ml-[8.5rem]">
        <iframe
          key={showTrack && trackEmbed ? "track" : "playlist"}
          src={showTrack && trackEmbed ? trackEmbed : playlist.embed}
          title={showTrack && trackEmbed ? nowPlaying?.title ?? "Spotify" : playlist.title}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="w-full rounded-[12px]"
          style={{ border: 0, height: 80 }}
        />
      </div>

      <div className="mt-2 flex w-full flex-wrap items-center gap-x-4 gap-y-1 sm:ml-[8.5rem]">
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