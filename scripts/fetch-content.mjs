import fs from "node:fs";
import path from "node:path";

const RAW_URL =
  "https://raw.githubusercontent.com/ranggamaulana111111-bit/porto/main/content.json";
const OUT = path.join(process.cwd(), "content.json");

async function main() {
  try {
    const res = await fetch(RAW_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    JSON.parse(text);
    fs.writeFileSync(OUT, text);
    console.log("[fetch-content] content.json diperbarui dari GitHub");
  } catch (err) {
    if (fs.existsSync(OUT)) {
      console.log(
        `[fetch-content] gagal ambil dari GitHub (${String(err)}), pakai content.json lokal.`
      );
    } else {
      console.error(
        "[fetch-content] tidak ada content.json lokal maupun dari GitHub:",
        err
      );
      process.exit(1);
    }
  }
}

main();
