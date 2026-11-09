import { NextRequest, NextResponse } from "next/server";
import { getAllMessages, deleteMessage, updateMessage } from "@/lib/messages";

export const dynamic = "force-dynamic";

function isAdmin(req: NextRequest): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${token}`;
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getAllMessages());
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
  }

  let body: { pinned?: unknown; isOwner?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const patch: { pinned?: boolean; isOwner?: boolean } = {};
  if (typeof body.pinned === "boolean") patch.pinned = body.pinned;
  if (typeof body.isOwner === "boolean") patch.isOwner = body.isOwner;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "Tidak ada perubahan." },
      { status: 400 }
    );
  }

  const updated = updateMessage(id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: updated });
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
  }

  const deleted = deleteMessage(id);
  if (!deleted) {
    return NextResponse.json({ error: "Pesan tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}