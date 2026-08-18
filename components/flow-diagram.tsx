import { Fragment } from "react";

type Node = { label: string; sub?: string };

export function FlowDiagram({ steps, arrows }: { steps: Node[]; arrows: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span aria-hidden="true" className="text-base text-accent">
              {arrows[i - 1]}
            </span>
          )}
          <div className="rounded border border-border bg-bg-card px-3 py-2 text-center">
            <div className="font-mono text-xs text-fg">{s.label}</div>
            {s.sub && <div className="mt-0.5 text-[10px] text-fg-muted">{s.sub}</div>}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
