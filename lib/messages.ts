import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface AnonymousMessage {
  id: string;
  text: string;
  senderName: string | null;
  youtubeId: string | null;
  songTitle: string | null;
  songChannel: string | null;
  pinned: boolean;
  isOwner: boolean;
  createdAt: string;
}

type StoredMessage = Omit<
  AnonymousMessage,
  "songChannel" | "pinned" | "isOwner"
> & {
  songChannel?: string | null;
  pinned?: boolean;
  isOwner?: boolean;
};

const DATA_PATH = join(process.cwd(), "data", "messages.json");

function readMessages(): AnonymousMessage[] {
  if (!existsSync(DATA_PATH)) return [];
  const raw = readFileSync(DATA_PATH, "utf-8");
  const parsed = JSON.parse(raw) as StoredMessage[];
  return parsed.map((message) => ({
    ...message,
    songChannel: message.songChannel ?? null,
    pinned: message.pinned ?? false,
    isOwner: message.isOwner ?? false,
  }));
}

function writeMessages(messages: AnonymousMessage[]) {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2));
}

export function getAllMessages(): AnonymousMessage[] {
  return readMessages().sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function addMessage(
  text: string,
  senderName: string | null,
  youtubeId: string | null,
  songTitle: string | null,
  songChannel: string | null
): AnonymousMessage {
  const messages = readMessages();
  const newMsg: AnonymousMessage = {
    id: crypto.randomUUID(),
    text: text.slice(0, 500),
    senderName: senderName?.slice(0, 50) || null,
    youtubeId,
    songTitle,
    songChannel: songChannel?.slice(0, 120) || null,
    pinned: false,
    isOwner: false,
    createdAt: new Date().toISOString(),
  };
  messages.push(newMsg);
  writeMessages(messages);
  return newMsg;
}

export function updateMessage(
  id: string,
  patch: Partial<Pick<AnonymousMessage, "pinned" | "isOwner">>
): AnonymousMessage | null {
  const messages = readMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index === -1) return null;
  messages[index] = { ...messages[index], ...patch };
  writeMessages(messages);
  return messages[index];
}

export function deleteMessage(id: string): boolean {
  const messages = readMessages();
  const next = messages.filter((m) => m.id !== id);
  if (next.length === messages.length) return false;
  writeMessages(next);
  return true;
}

const RATE_LIMIT_MAP = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = RATE_LIMIT_MAP.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  RATE_LIMIT_MAP.set(ip, recent);
  return true;
}

export function sanitizeText(text: string): string {
  return text.replace(/<[^>]*>/g, "").trim();
}