import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from "react";

type ClayCardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
};

export function ClayCard({ className = "", hover = false, ...props }: ClayCardProps) {
  const base = "rounded-[var(--radius-clay-lg)] border bg-bg-card";
  const shadow = hover
    ? "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200"
    : "shadow-[var(--shadow-card)]";
  return <div className={`${base} ${shadow} ${className}`} {...props} />;
}

type ClayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function ClayButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ClayButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 rounded-[var(--radius-pill)] focus-visible:outline-2 focus-visible:outline-accent-strong focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-2.5 text-sm", lg: "px-8 py-3.5 text-base" } as const;
  const variants = {
    primary: "bg-accent text-white border border-accent-strong/10 shadow-[var(--shadow-button)] hover:bg-accent-strong",
    secondary: "bg-bg-card text-fg border border-border shadow-[var(--shadow-button)] hover:bg-bg-warm",
    ghost: "bg-transparent text-fg-secondary hover:text-fg border border-transparent",
  } as const;
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ClayBadge({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] border border-border bg-bg-card px-3 py-1 text-xs font-medium text-fg-secondary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function ClayTag({ children, className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-pill)] bg-bg-inset border border-border-subtle px-3 py-1 text-xs text-fg-secondary ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function ClaySection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

export function ClayPillLink({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & HTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-2.5 text-sm font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-accent text-white border border-accent-strong/10 shadow-[var(--shadow-button)] hover:bg-accent-strong",
    secondary: "bg-bg-card text-fg border border-border shadow-[var(--shadow-button)] hover:bg-bg-warm",
    ghost: "bg-transparent text-fg-secondary hover:text-fg",
  } as const;
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
