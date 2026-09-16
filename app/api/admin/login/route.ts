import { NextRequest, NextResponse } from "next/server";
import { getTotpSecret, verifyCode } from "@/lib/totp";

export const dynamic = "force-dynamic";

const ATTEMPT_MAP = new Map<string, number[]>();
const WINDOW = 15 * 60 * 1000;
const MAX_FAILURES = 5;

function failures(ip: string): number[] {
  const now = Date.now();
  const recent = (ATTEMPT_MAP.get(ip) ?? []).filter((t) => now - t < WINDOW);
  ATTEMPT_MAP.set(ip, recent);
  return recent;
}

function isLocked(ip: string): boolean {
  return failures(ip).length >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const list = failures(ip);
  list.push(Date.now());
  ATTEMPT_MAP.set(ip, list);
}

function clearFailures(ip: string) {
  ATTEMPT_MAP.delete(ip);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isLocked(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan, tunggu 15 menit." },
      { status: 429 }
    );
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const secret = getTotpSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "TOTP belum dikonfigurasi." },
      { status: 409 }
    );
  }

  const code = (body.code ?? "").trim();
  if (!verifyCode(secret, code)) {
    recordFailure(ip);
    return NextResponse.json({ error: "Kode salah." }, { status: 401 });
  }

  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "ADMIN_TOKEN belum diset di server." },
      { status: 500 }
    );
  }

  clearFailures(ip);
  return NextResponse.json({ success: true, token });
}