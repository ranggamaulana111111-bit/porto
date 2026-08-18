import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DISCORD_USER_ID = process.env.DISCORD_USER_ID;

export async function GET() {
  if (!DISCORD_USER_ID) {
    return NextResponse.json({ isPlaying: false });
  }

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`, {
      cache: "no-store",
    });

    if (!res.ok) return NextResponse.json({ isPlaying: false });

    const json = await res.json();
    const data = json?.data;

    if (!data?.listening_to_spotify || !data?.spotify) {
      return NextResponse.json({ isPlaying: false });
    }

    const spotify = data.spotify;
    const artist = Array.isArray(spotify.artists)
      ? spotify.artists.join(", ")
      : spotify.artist ?? "";

    return NextResponse.json({
      isPlaying: true,
      title: spotify.song,
      artist,
      album: spotify.album,
      albumImageUrl: spotify.album_art_url,
      songUrl: spotify.track_url,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
