"use client";

import { profile } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function ProfileSnapshot() {
  return (
    <section className="px-6 pt-2 pb-8">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="flex flex-wrap gap-x-10 gap-y-6 border-y border-border py-6">
            {profile.snapshot.map((item) => (
              <div key={item.label} className="min-w-[140px]">
                <p className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">{item.label}</p>
                <p className="mt-1 text-sm font-medium leading-tight text-fg">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
