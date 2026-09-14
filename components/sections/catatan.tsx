"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/lib/content";
import { posts } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

type Category = "Belajar" | "Project" | "Catatan";

const categoryColor: Record<string, string> = {
  Belajar: "text-accent",
  Project: "text-accent",
  Catatan: "text-accent",
};

function CategoryFilter({ activeCategory, setActiveCategory }: {
  activeCategory: Category | null;
  setActiveCategory: (category: Category | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setActiveCategory(null)}
        className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
          !activeCategory
            ? "bg-accent/10 text-accent"
            : "text-fg-muted hover:bg-bg-card/30"
        }`}
        aria-label="Tampilkan semua catatan"
      >
        All
      </button>
      <button
        onClick={() => setActiveCategory("Belajar")}
        className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
          activeCategory === "Belajar"
            ? "bg-accent/10 text-accent"
            : "text-fg-muted hover:bg-bg-card/30"
        }`}
        aria-label="Filter Belajar"
      >
        Belajar
      </button>
      <button
        onClick={() => setActiveCategory("Project")}
        className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
          activeCategory === "Project"
            ? "bg-accent/10 text-accent"
            : "text-fg-muted hover:bg-bg-card/30"
        }`}
        aria-label="Filter Project"
      >
        Project
      </button>
      <button
        onClick={() => setActiveCategory("Catatan")}
        className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
          activeCategory === "Catatan"
            ? "bg-accent/10 text-accent"
            : "text-fg-muted hover:bg-bg-card/30"
        }`}
        aria-label="Filter Catatan"
      >
        Catatan
      </button>
    </div>
  );
}

function PostPreview({ post, index }: { post: Post; index: number }) {
  return (
    <a
      href={`/catatan/${index}`}
      className="group block border-b border-border py-6 px-4 -mx-4 transition-colors hover:bg-bg-card/30"
    >
      <div className="mb-2 flex items-center gap-3 text-xs text-fg-muted">
        <span className={`font-mono ${categoryColor[post.category] ?? "text-accent"}`}>
          {post.category}
        </span>
        <span className="text-fg-faint" aria-hidden>·</span>
        <span>{post.readTime} min baca</span>
        <span className="text-fg-faint" aria-hidden>·</span>
        <span>{post.date}</span>
      </div>
      <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-fg-secondary">{post.excerpt}</p>
    </a>
  );
}

export function Catatan() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const filteredPosts = useMemo(
    () =>
      posts
        .map((post, index) => ({ post, index }))
        .filter(({ post }) => !activeCategory || post.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="catatan" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          index="06"
          title="Lab notes."
          description="Catatan yang saya tulis langsung setelah membangun sesuatu: apa yang gagal, apa yang berhasil, apa yang dipelajari. Bukan artikel yang dirapikan; ini jurnal kerja."
        />

        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="space-y-6">
          {filteredPosts.map(({ post, index }, i) => (
            <Reveal key={post.title} delay={i * 0.06} variant="up">
              <PostPreview post={post} index={index} />
            </Reveal>
          ))}
          {filteredPosts.length === 0 && (
            <p className="py-8 text-center text-sm text-fg-muted">
              Belum ada catatan pada kategori ini.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}