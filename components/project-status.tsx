const labels: Record<string, string> = {
  production: "Production",
  building: "Building",
  planned: "Planned",
  completed: "Completed",
  academic: "Academic",
};

export function ProjectStatus({ status }: { status?: string }) {
  const key = status ?? "completed";
  const live = key === "production";

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-fg-muted">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-online" : "bg-fg-faint"}`}
      />
      {labels[key] ?? key}
    </span>
  );
}
