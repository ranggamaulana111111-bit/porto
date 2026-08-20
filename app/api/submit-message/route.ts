import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

export async function POST(req: NextRequest) {
  if (!WEB3FORMS_KEY) {
    return NextResponse.json({ error: "Missing WEB3FORMS_ACCESS_KEY" }, { status: 500 });
  }

  const body = await req.json();

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      name: body.name,
      email: body.email,
      message: body.message,
      subject: `Pesan dari ${body.name} — rangga.dev`,
      from_name: "rangga.dev",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || "Failed to send" }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
