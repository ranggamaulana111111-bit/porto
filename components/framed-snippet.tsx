"use client";

import { useState, type ReactNode } from "react";

export function FramedSnippet({
  src,
  alt,
  caption,
  chrome,
  tag,
  children,
  className = "",
}: {
  src?: string;
  alt: string;
  caption: string;
  chrome?: string;
  tag?: string;
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
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint" />
        {chrome && (
          <span className="ml-2 truncate font-mono text-[10px] text-fg-muted">
            {chrome}
          </span>
        )}
        {tag && (
          <span className="ml-auto shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-fg-muted">
            {tag}
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
