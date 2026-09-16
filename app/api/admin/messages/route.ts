import { NextRequest, NextResponse } from "next/server";
import { getAllMessages, deleteMessage } from "@/lib/messages";

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