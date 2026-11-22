// STAR DODGE — post-x entry program.
// Reads POST.json (the X post carrying this entry's video) and prints a
// deterministic summary. Standard library only, no network, no model calls.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const POST_PATH = join(ROOT, "POST.json");
const PLAY_CODE = "makefun-zebra-rooftop-oasis";
const REFERRAL_CODE = "cxyf1jsy";
const VIDEO = "video.mp4"; // 31 s, 1280x720: prompt, agent working, game, end card

function main(): void {
  let post: unknown;
  try {
    post = JSON.parse(readFileSync(POST_PATH, "utf8"));
  } catch (err) {
    console.error("POST.json is not readable JSON: " + (err as Error).message);
    process.exit(1);
  }
  const url = (post as { url?: unknown }).url;
  const m = typeof url === "string"
    ? url.match(/^https?:\/\/(?:x\.com|twitter\.com)\/([^/]+)\/status\/(\d+)$/)
    : null;
  const out = {
    entry: "post-x-the-agent-builds-a-game-from-20261122-1709",
    game: "STAR DODGE",
    url: typeof url === "string" ? url : "",
    handle: m ? m[1] : "",
    statusId: m ? m[2] : "",
    playCode: PLAY_CODE,
    referralCode: REFERRAL_CODE,
    video: VIDEO,
    valid: m !== null,
  };
  console.log(JSON.stringify(out));
}

main();
