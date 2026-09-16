import { NextRequest, NextResponse } from "next/server";
import {
  getAllMessages,
  addMessage,
  checkRateLimit,
  sanitizeText,
  type AnonymousMessage,
} from "@/lib/messages";

export const dynamic = "force-dynamic";

function toPublic(message: AnonymousMessage) {
  return {
    id: message.id,
    text: message.text,
    youtubeId: message.youtubeId,
    songTitle: message.songTitle,
    createdAt: message.createdAt,
  };
}

export async function GET() {
  const messages = getAllMessages().map(toPublic);
  return NextResponse.json(messages);
}

const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi nanti." },
      { status: 429 }
    );
  }

  let body: { text?: string; senderName?: string; youtubeId?: string; songTitle?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawText = body.text;
  if (!rawText || typeof rawText !== "string") {
    return NextResponse.json({ error: "Pesan wajib diisi." }, { status: 400 });
  }

  const text = sanitizeText(rawText);
  if (text.length < 3) {
    return NextResponse.json({ error: "Pesan terlalu pendek." }, { status: 400 });
  }

  const senderName =
    body.senderName && typeof body.senderName === "string"
      ? sanitizeText(body.senderName)
      : null;

  let youtubeId: string | null = null;
  let songTitle: string | null = null;

  if (body.youtubeId && typeof body.youtubeId === "string") {
    const id = body.youtubeId.trim();
    if (!YOUTUBE_ID_RE.test(id)) {
      return NextResponse.json({ error: "Lagu tidak valid." }, { status: 400 });
    }
    youtubeId = id;
    songTitle =
      body.songTitle && typeof body.songTitle === "string"
        ? body.songTitle.slice(0, 120)
        : null;
  }

  addMessage(text, senderName, youtubeId, songTitle);

  return NextResponse.json(
    { success: true, message: "Pesan tampil di dinding pesan." },
    { status: 201 }
  );
}