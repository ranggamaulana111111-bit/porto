import type { Metadata } from "next";
import Link from "next/link";
import { YangSedangDibangun } from "@/components/sections/yang-sedang-dibangun";
import { CaraBekerja } from "@/components/sections/cara-bekerja";
import { Catatan } from "@/components/sections/catatan";
import { Rencana } from "@/components/sections/rencana";
import { todayStatus } from "@/lib/content";
import { ClayCard } from "@/components/clay";

export const metadata: Metadata = {
  title: "Workspace · rangga.mrw",
  description:
    "Digital workspace: dokumentasi proses belajar, eksperimen, technical notes, lab, dan hal-hal yang sedang saya bangun.",
};

export default function WorkspacePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="font-mono text-sm text-fg-muted transition-colors hover:text-fg">
            ← Kembali
          </Link>
        </div>

        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Digital Workspace</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">Ruang kerja & lab.</h1>
          <p className="mt-4 text-lg leading-relaxed text-fg-secondary">
            Ini bukan portfolio. Ini ruang kerja saya, tempat saya belajar, membangun, dan sesekali gagal.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted max-w-xl">
            Selamat datang di meja kerja saya. Di sini saya mendokumentasikan proses belajar, eksperimen, technical notes, dan hal-hal yang sedang saya eksplorasi di balik layar.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          <ClayCard className="p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{todayStatus.focus}</p>
            <ul className="mt-3 space-y-2">
              {todayStatus.focusItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-fg-secondary">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </ClayCard>
          <ClayCard className="p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">Suasana & Musik</p>
            <p className="mt-3 text-sm text-fg-secondary">{todayStatus.mood}</p>
            <p className="mt-2 text-xs text-fg-faint">{todayStatus.listeningTo}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href="/stack"
                className="inline-flex items-center rounded-[var(--radius-pill)] bg-bg-inset border border-border-subtle px-3 py-1.5 text-xs text-fg-secondary hover:bg-bg-warm transition-colors"
              >
                Lihat Stack →
              </Link>
            </div>
          </ClayCard>
        </div>
      </div>

      <YangSedangDibangun />
      <CaraBekerja />
      <Catatan />
      <Rencana />

      <div className="mx-auto max-w-3xl px-6">
        <div className="mt-8 border-t border-border pt-6 text-xs text-fg-faint">Diperbarui {new Date().getFullYear()} · rangga.dev</div>
      </div>
    </main>
  );
}
