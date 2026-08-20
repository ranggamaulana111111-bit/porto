import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, profile } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const index = Number(slug);
  const post = posts[index];
  if (!post) return {};
  return {
    title: `${post.title} — ${profile.shortName}`,
    description: post.excerpt,
  };
}

export function generateStaticParams() {
  return posts.map((_, i) => ({ slug: String(i) }));
}

export default async function CatatanDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = Number(slug);
  const post = posts[index];

  if (!post) notFound();

  const categoryColor: Record<string, string> = {
    Belajar: "text-green",
    Project: "text-amber",
    Catatan: "text-sky",
  };

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#catatan"
          className="mb-8 inline-flex font-mono text-sm text-fg-muted transition-colors hover:text-fg"
        >
          ← Kembali ke catatan
        </Link>

        <article>
          <div className="flex items-center gap-3 text-xs text-fg-muted mb-4">
            <span className={`font-mono ${categoryColor[post.category] ?? "text-accent"}`}>
              {post.category}
            </span>
            <span className="text-fg-faint">·</span>
            <span>{post.readTime} min baca</span>
            <span className="text-fg-faint">·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-fg-secondary">
            {post.excerpt}
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="text-sm text-fg-muted italic">
              Catatan ini masih dalam bentuk draft. Konten lengkap akan segera tersedia.
            </p>
          </div>
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/#catatan"
            className="font-mono text-sm text-fg-muted transition-colors hover:text-fg"
          >
            ← Semua catatan
          </Link>
        </div>
      </div>
    </main>
  );
}
