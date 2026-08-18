"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export function NowPlaying({ fallback }: { fallback: string }) {
  const [data, setData] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const json = (await res.json()) as NowPlaying;
        if (active) setData(json);
      } catch {
        if (active) setData({ isPlaying: false });
      }
    };

    load();
    const id = setInterval(load, 30000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!data || !data.isPlaying) {
    return <p className="text-sm text-fg-secondary">{fallback}</p>;
  }

  return (
    <div className="flex items-center gap-3">
      {data.albumImageUrl && (
        <Image
          src={data.albumImageUrl}
          alt=""
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 rounded object-cover"
        />
      )}
      <div className="min-w-0">
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-sm text-fg transition-colors hover:text-accent"
        >
          {data.title}
        </a>
        <p className="truncate text-xs text-fg-muted">{data.artist}</p>
      </div>
    </div>
  );
}
