import { NextResponse } from "next/server";
import { isTotpConfigured, setupTotp } from "@/lib/totp";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ configured: isTotpConfigured() });
}

export async function POST() {
  if (isTotpConfigured()) {
    return NextResponse.json(
      { error: "TOTP sudah dikonfigurasi." },
      { status: 409 }
    );
  }
  const { secret, otpauthUrl } = setupTotp();
  return NextResponse.json({ configured: true, secret, otpauthUrl });
}