"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "@/components/icons";

type YTPlayerInstance = {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

type YTEvent = { target: YTPlayerInstance; data: number };

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (event: YTEvent) => void;
        onStateChange?: (event: YTEvent) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
    BUFFERING: number;
  };
};

let youtubeApiPromise: Promise<YTNamespace> | null = null;
let activePlayer: YTPlayerInstance | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const win = window as unknown as {
      YT?: YTNamespace;
      onYouTubeIframeAPIReady?: () => void;
    };

    if (win.YT?.Player) {
      resolve(win.YT);
      return;
    }

    const previous = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (win.YT) resolve(win.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

export function SongPlayer({
  videoId,
  title,
  channel,
  className = "",
  onRemove,
}: {
  videoId: string;
  title?: string | null;
  channel?: string | null;
  className?: string;
  onRemove?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let timer: number | undefined;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;

      const mount = document.createElement("div");
      mount.style.width = "100%";
      mount.style.height = "100%";
      containerRef.current.appendChild(mount);

      const player = new YT.Player(mount, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            playerRef.current = event.target;
            setDuration(event.target.getDuration() || 0);
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (cancelled) return;
            if (event.data === YT.PlayerState.PLAYING) {
              activePlayer = event.target;
              setIsPlaying(true);
              setIsLoading(false);
              setDuration(event.target.getDuration() || 0);
            } else if (event.data === YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              setIsLoading(false);
            } else if (event.data === YT.PlayerState.ENDED) {
              setIsPlaying(false);
              setIsLoading(false);
              setCurrent(0);
            } else if (event.data === YT.PlayerState.BUFFERING) {
              setIsLoading(true);
            }
          },
        },
      });

      playerRef.current = player;

      timer = window.setInterval(() => {
        const active = playerRef.current;
        if (!active) return;
        setCurrent(active.getCurrentTime() || 0);
        const total = active.getDuration();
        if (total && Number.isFinite(total)) setDuration(total);
      }, 500);
    });

    return () => {
      cancelled = true;
      if (timer) window.clearInterval(timer);
      if (activePlayer === playerRef.current) activePlayer = null;
      playerRef.current?.destroy();
      playerRef.current = null;
      setCurrent(0);
      setDuration(0);
      setIsPlaying(false);
      setIsLoading(false);
    };
  }, [open, videoId]);

  function togglePlayback() {
    if (!open) {
      setIsLoading(true);
      setOpen(true);
      return;
    }
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      if (activePlayer && activePlayer !== player) activePlayer.pauseVideo();
      activePlayer = player;
      setIsLoading(true);
      player.playVideo();
    }
  }

  function seekTo(ratio: number) {
    const player = playerRef.current;
    if (!player || duration <= 0) return;
    const next = Math.min(Math.max(ratio, 0), 1) * duration;
    player.seekTo(next, true);
    setCurrent(next);
  }

  function handleSeekClick(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    seekTo((event.clientX - rect.left) / rect.width);
  }

  function handleSeekKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (duration <= 0) return;
    let next = current;
    if (event.key === "ArrowRight") next = Math.min(current + 5, duration);
    else if (event.key === "ArrowLeft") next = Math.max(current - 5, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = duration;
    else return;
    event.preventDefault();
    seekTo(next / duration);
  }

  const label = title?.trim() || "Lagu tanpa judul";
  const artist = channel?.trim() || "YouTube";
  const progress = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;
  const actionLabel = isLoading ? "Memuat lagu" : isPlaying ? "Jeda" : "Putar";

  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-clay)] border border-border bg-bg-inset ${className}`}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-bg-inset">
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{label}</p>
          <p className="truncate text-xs text-fg-faint">{artist}</p>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          aria-label={actionLabel}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-strong"
        >
          {isLoading ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          ) : isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="translate-x-px" />
          )}
        </button>
      </div>

      {open && (
        <div className="flex items-center gap-2 px-3 pb-3">
          <span className="w-9 text-right font-mono text-[10px] tabular-nums text-fg-faint">
            {formatTime(current)}
          </span>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Geser posisi lagu"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration)}
            aria-valuenow={Math.floor(current)}
            aria-valuetext={`${formatTime(current)} dari ${formatTime(duration)}`}
            onClick={handleSeekClick}
            onKeyDown={handleSeekKeyDown}
            className="group relative h-6 flex-1 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong"
          >
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
            <div
              className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span className="w-9 font-mono text-[10px] tabular-nums text-fg-faint">
            {formatTime(duration)}
          </span>
        </div>
      )}

      {open && (
        <div className="border-t border-border-subtle bg-bg-inset p-2">
          <div className="aspect-video overflow-hidden rounded-[var(--radius-clay-sm)] bg-fg">
            <div ref={containerRef} className="h-full w-full" />
          </div>
        </div>
      )}

      {onRemove && (
        <div className="flex justify-end border-t border-border-subtle px-3 py-1.5">
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] px-2 text-xs text-fg-faint transition-colors hover:text-fg"
          >
            Ganti lagu
          </button>
        </div>
      )}
    </div>
  );
}
