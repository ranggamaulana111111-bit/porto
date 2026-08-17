"use client";

import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const categoryColor: Record<string, string> = {
  Belajar: "text-green",
  Project: "text-amber",
  Catatan: "text-sky",
};

export function Catatan() {
  return (
    <section id="catatan" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="05"
          title="Catatan belajar."
          description="Tulisan ringan dari proses belajar. Bukan artikel — ini catatan untuk diri sendiri yang saya bagikan."
        />

        <div className="space-y-0">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.06}>
              <div className="group block border-b border-border py-6 px-4 -mx-4">
                <div className="flex items-center gap-3 text-xs text-fg-muted mb-2">
                  <span className={`font-mono ${categoryColor[post.category] ?? "text-accent"}`}>{post.category}</span>
                  <span className="text-fg-faint">·</span>
                  <span>{post.readTime} min baca</span>
                  <span className="text-fg-faint">·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold transition-colors">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-fg-secondary">
                  {post.excerpt}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
