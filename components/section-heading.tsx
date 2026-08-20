"use client";

import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-20 max-w-2xl">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-fg-muted">{index}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-fg-secondary">
          {description}
        </p>
      )}
    </Reveal>
  );
}
