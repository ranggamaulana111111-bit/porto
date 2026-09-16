import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_KEY = process.env.YOUTUBE_API_KEY;

interface YouTubeSearchItem {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    channelTitle?: string;
    thumbnails?: {
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  if (!API_KEY) {
    return NextResponse.json(
      { error: "YouTube search belum tersedia.", results: [] },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    videoCategoryId: "10",
    q,
    maxResults: "8",
    key: API_KEY,
  });

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [], error: "YouTube API error" }, { status: res.status });
    }

    const data = (await res.json()) as { items?: YouTubeSearchItem[] };
    const results = (data.items ?? [])
      .filter((it) => it.id?.videoId)
      .map((it) => ({
        id: it.id?.videoId as string,
        title: it.snippet?.title ?? "",
        channel: it.snippet?.channelTitle ?? "",
        thumbnail:
          it.snippet?.thumbnails?.medium?.url ??
          it.snippet?.thumbnails?.default?.url ??
          "",
      }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [], error: "Gagal mencari lagu." }, { status: 500 });
  }
}