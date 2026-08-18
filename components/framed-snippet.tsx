"use client";

import { useState, type ReactNode } from "react";

export function FramedSnippet({
  src,
  alt,
  caption,
  chrome,
  children,
  className = "",
}: {
  src?: string;
  alt: string;
  caption: string;
  chrome?: string;
  children: ReactNode;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-border bg-bg-elevated ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-green" />
        {chrome && (
          <span className="ml-2 truncate font-mono text-[10px] text-fg-muted">
            {chrome}
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] bg-bg">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-3">
            {children}
          </div>
        )}
      </div>

      <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[11px] leading-snug text-fg-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
