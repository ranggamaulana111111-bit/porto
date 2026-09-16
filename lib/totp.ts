import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const ISSUER = "Rangga.dev";
const ACCOUNT = "rangga-admin";
const STEP_SECONDS = 30;
const DIGITS = 6;

interface TotpConfig {
  secret: string;
  createdAt: string;
}

const TOTP_PATH = join(process.cwd(), "data", "totp-secret.json");

function base32Encode(buf: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += ALPHABET[(value << (5 - bits)) & 31];
  return output;
}

function base32Decode(input: string): Buffer {
  const cleaned = input.replace(/[=\s-]/g, "").toUpperCase();
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];
  for (const char of cleaned) {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) throw new Error("Secret tidak valid.");
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

function generateCode(secret: string, timestampMs: number): string {
  const counter = Math.floor(timestampMs / (STEP_SECONDS * 1000));
  const counterBuf = Buffer.alloc(8);
  counterBuf.writeUInt32BE(Math.floor(counter / 2 ** 32), 0);
  counterBuf.writeUInt32BE(counter >>> 0, 4);
  const key = base32Decode(secret);
  const hmac = createHmac("sha1", key).update(counterBuf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const bin =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(bin % 10 ** DIGITS).padStart(DIGITS, "0");
}

export function generateSecret(): string {
  return base32Encode(randomBytes(20));
}

export function buildOtpAuthUrl(secret: string): string {
  const label = `${ISSUER}:${ACCOUNT}`;
  return `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(
    ISSUER
  )}&algorithm=SHA1&digits=${DIGITS}&period=${STEP_SECONDS}`;
}

export function verifyCode(
  secret: string,
  code: string,
  window = 2,
  timestampMs = Date.now()
): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  const expected = Buffer.from(code);
  for (let i = -window; i <= window; i++) {
    const actual = Buffer.from(generateCode(secret, timestampMs + i * STEP_SECONDS * 1000));
    if (actual.length === expected.length && timingSafeEqual(actual, expected)) return true;
  }
  return false;
}

function readTotpConfig(): TotpConfig | null {
  if (!existsSync(TOTP_PATH)) return null;
  try {
    const raw = readFileSync(TOTP_PATH, "utf-8");
    return JSON.parse(raw) as TotpConfig;
  } catch {
    return null;
  }
}

function writeTotpConfig(secret: string): TotpConfig {
  const config: TotpConfig = { secret, createdAt: new Date().toISOString() };
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  writeFileSync(TOTP_PATH, JSON.stringify(config, null, 2));
  return config;
}

export function isTotpConfigured(): boolean {
  return readTotpConfig() !== null;
}

export function getTotpSecret(): string | null {
  return readTotpConfig()?.secret ?? null;
}

export function setupTotp(): { secret: string; otpauthUrl: string } {
  const secret = generateSecret();
  writeTotpConfig(secret);
  return { secret, otpauthUrl: buildOtpAuthUrl(secret) };
}