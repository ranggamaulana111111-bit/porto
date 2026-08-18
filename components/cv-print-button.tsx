"use client";

export function CvPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-border px-3 py-1.5 text-xs text-fg-secondary transition-colors hover:text-fg"
    >
      Cetak / Simpan PDF
    </button>
  );
}
