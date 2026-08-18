"use client";

import { useEffect, useState } from "react";
import { Mail, ArrowUpRight } from "@/components/icons";

const EMAIL_LOCAL = "ranggamaulana111111";
const EMAIL_DOMAIN = "gmail.com";

export function CopyEmail({ variant = "row" }: { variant?: "row" | "inline" }) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEmail(`${EMAIL_LOCAL}@${EMAIL_DOMAIN}`));
    return () => cancelAnimationFrame(id);
  }, []);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const label = copied ? "Tersalin!" : email || "Email";

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={copy}
        aria-label="Salin alamat email"
        className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <Mail size={16} />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email tersalin" : "Salin alamat email"}
      className="group flex w-full items-center justify-between py-2 border-b border-border text-sm transition-colors hover:border-fg-faint"
    >
      <span className="flex items-center gap-3 text-fg-secondary group-hover:text-fg transition-colors">
        <Mail size={16} className="text-fg-faint group-hover:text-fg-muted transition-colors" />
        {label}
      </span>
      <ArrowUpRight size={14} className="text-fg-faint group-hover:text-fg-muted transition-colors" />
    </button>
  );
}
