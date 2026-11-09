"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ClayCard, ClayButton } from "@/components/clay";
import type { AnonymousMessage } from "@/lib/messages";

function AdminMessageCard({
  msg,
  token,
  onDeleted,
  onUpdated,
}: {
  msg: AnonymousMessage;
  token: string;
  onDeleted: () => void;
  onUpdated: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handlePatch(patch: { pinned?: boolean; isOwner?: boolean }) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/messages?id=${encodeURIComponent(msg.id)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patch),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal memperbarui pesan.");
      }
      onUpdated();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Yakin hapus pesan ini?")) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/messages?id=${encodeURIComponent(msg.id)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal menghapus.");
      }
      onDeleted();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ClayCard className="p-5 sm:p-6">
      <p className="text-[15px] leading-relaxed text-fg">{msg.text}</p>

      {msg.youtubeId && (
        <div className="mt-2 flex items-center gap-3 rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset p-2.5">
          <Image
            src={`https://i.ytimg.com/vi/${msg.youtubeId}/mqdefault.jpg`}
            alt=""
            width={64}
            height={40}
            className="h-10 w-16 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-fg">
              {msg.songTitle ?? "Lagu"}
            </p>
            <a
              href={`https://www.youtube.com/watch?v=${msg.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:underline"
            >
              Buka di YouTube →
            </a>
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-faint">
        <span className="rounded-full border border-border bg-bg-inset px-2.5 py-0.5 font-medium text-fg-secondary">
          {msg.senderName || "Anonim"}
        </span>
        {msg.isOwner && (
          <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-medium text-accent-strong">
            Pemilik
          </span>
        )}
        {msg.pinned && (
          <span className="rounded-full border border-border bg-bg-card px-2.5 py-0.5 font-medium text-fg-secondary">
            Disematkan
          </span>
        )}
        <span>{new Date(msg.createdAt).toLocaleString("id-ID")}</span>
        <span>·</span>
        <span className="font-mono text-[10px]">{msg.id.slice(0, 8)}</span>
      </div>

      {error && <p className="mt-2 text-sm text-accent-strong">{error}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        <ClayButton
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={() => handlePatch({ pinned: !msg.pinned })}
        >
          {msg.pinned ? "Lepas sematan" : "Sematkan"}
        </ClayButton>
        <ClayButton
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={() => handlePatch({ isOwner: !msg.isOwner })}
        >
          {msg.isOwner ? "Hapus badge pemilik" : "Tandai pemilik"}
        </ClayButton>
        <ClayButton
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={handleDelete}
        >
          {busy ? "Memproses..." : "Hapus pesan"}
        </ClayButton>
      </div>
    </ClayCard>
  );
}

export default function AdminApp() {
  const [token, setToken] = useState(
    () => localStorage.getItem("admin_token") ?? ""
  );
  const [authed, setAuthed] = useState(
    () => !!localStorage.getItem("admin_token")
  );
  const [messages, setMessages] = useState<AnonymousMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"checking" | "setup" | "ready" | "error">("checking");
  const [setup, setSetup] = useState<{ secret: string; otpauthUrl: string } | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (authed) fetchMessages();
  }, [authed, fetchMessages]);

  useEffect(() => {
    if (authed) return;
    fetch("/api/admin/totp")
      .then((res) => res.json())
      .then((data) => setPhase(data.configured ? "ready" : "setup"))
      .catch(() => setPhase("error"));
  }, [authed]);

  function handleStartSetup() {
    setBusy(true);
    setError("");
    fetch("/api/admin/totp", { method: "POST" })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error ?? "Gagal membuat kode otentikator.");
        setSetup({ secret: data.secret, otpauthUrl: data.otpauthUrl });
        setPhase("ready");
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setBusy(false));
  }

  function handleVerify() {
    const value = code.trim();
    if (!/^\d{6}$/.test(value)) {
      setError("Masukkan 6 digit kode dari aplikasi.");
      return;
    }
    setBusy(true);
    setError("");
    fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: value }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error ?? "Gagal masuk.");
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setAuthed(true);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setBusy(false));
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-12">
        <ClayCard className="p-8 w-full max-w-sm">
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
            Admin
          </p>
          <h1 className="mt-2 font-display text-xl font-bold">
            Kelola Pesan
          </h1>

          {phase === "checking" && (
            <p className="mt-6 text-sm text-fg-muted">Memeriksa konfigurasi...</p>
          )}

          {phase === "error" && (
            <div className="mt-6">
              <p className="text-sm text-accent-strong">
                Gagal memeriksa kode otentikator. Coba muat ulang halaman.
              </p>
              <ClayButton
                variant="secondary"
                size="md"
                className="mt-4 w-full"
                onClick={() => {
                  setPhase("checking");
                  fetch("/api/admin/totp")
                    .then((res) => res.json())
                    .then((data) => setPhase(data.configured ? "ready" : "setup"))
                    .catch(() => setPhase("error"));
                }}
              >
                Muat ulang
              </ClayButton>
            </div>
          )}

          {phase === "setup" && (
            <div className="mt-6">
              <p className="text-sm text-fg-secondary">
                Login admin dilindungi Google Authenticator. Siapkan sekali saja lewat QR di bawah.
              </p>
              <ClayButton
                variant="primary"
                size="md"
                className="mt-4 w-full"
                disabled={busy}
                onClick={handleStartSetup}
              >
                Buat kode otentikator
              </ClayButton>
            </div>
          )}

          {phase === "ready" && (
            <div className="mt-6 space-y-5">
              {setup && (
                <>
                  <div>
                    <p className="text-xs font-medium text-fg-secondary">01 · Pindai QR ini</p>
                    <div className="mt-3 inline-block rounded-[var(--radius-clay-sm)] border border-border bg-white p-4">
                      <QRCodeSVG value={setup.otpauthUrl} size={176} />
                    </div>
                    <p className="mt-2 break-all font-mono text-[11px] text-fg-muted">
                      {setup.secret}
                    </p>
                    <p className="mt-1 text-xs text-fg-faint">
                      Buka Google Authenticator, pilih Tambah, lalu pindai kode atau ketik kunci manual di atas.
                    </p>
                  </div>
                  <div className="border-t border-border-subtle" />
                </>
              )}

              <div>
                <p className="text-xs font-medium text-fg-secondary">
                  {setup ? "02 · Masukkan kode" : "Masukkan kode dari Google Authenticator"}
                </p>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoComplete="one-time-code"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="mt-2 w-full rounded-[var(--radius-clay-sm)] border border-border bg-bg-inset px-4 py-2.5 font-mono text-center text-lg tracking-[0.3em] text-fg placeholder:text-fg-faint focus:outline-none focus:ring-2 focus:ring-accent-strong/30"
                />
                {error && (
                  <p className="mt-2 text-sm text-accent-strong">{error}</p>
                )}
                <ClayButton
                  variant="primary"
                  size="md"
                  className="mt-4 w-full"
                  disabled={busy}
                  onClick={handleVerify}
                >
                  {busy ? "Memverifikasi..." : "Masuk"}
                </ClayButton>
              </div>
            </div>
          )}
        </ClayCard>
      </div>
    );
  }

  const counts = messages.length;

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
              Admin
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold">
              Kelola Pesan
            </h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              setAuthed(false);
              setToken("");
              setMessages([]);
            }}
            className="text-sm text-fg-faint hover:text-fg transition-colors"
          >
            Logout
          </button>
        </div>

        <p className="mb-8 text-sm text-fg-secondary">
          Semua pesan sudah tampil di publik. Panel ini hanya untukmu: lihat
          siapa pengirimnya dan hapus bila perlu.
        </p>

        {loading ? (
          <div className="py-12 text-center text-sm text-fg-muted">
            Memuat...
          </div>
        ) : messages.length === 0 ? (
          <ClayCard className="p-8 text-center">
            <p className="text-fg-secondary">Tidak ada pesan.</p>
          </ClayCard>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-fg-faint">{counts} pesan</p>
            {messages.map((msg) => (
              <AdminMessageCard
                key={msg.id}
                msg={msg}
                token={token}
                onDeleted={fetchMessages}
                onUpdated={fetchMessages}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}