// Short links from videos to stores: /go/<kit>-<store>-<video>.
// Counts one hit before the redirect. Only the date (JST), the code and the count are kept:
// no cookies, no IP address, no user agent, no other personal data is stored.

import goLinkTable from "@/data/goLinks.json";

export type GoLink = {
  to: string;
  kit: string;
  store: "booth" | "unity" | "fab";
  video: string;
  note?: string;
};

const links = goLinkTable.links as Record<string, GoLink>;

export const GO_CODE_PATTERN = /^[a-z0-9]+-(booth|unity|fab)-[a-z0-9]+$/;

const allowedStoreHosts = [
  /^([a-z0-9-]+\.)?booth\.pm$/,
  /^assetstore\.unity\.com$/,
  /^(www\.)?fab\.com$/,
];

export function isAllowedGoDestination(to: string) {
  if (to.startsWith("/") && !to.startsWith("//")) {
    return true;
  }
  try {
    const url = new URL(to);
    return url.protocol === "https:" && allowedStoreHosts.some((host) => host.test(url.hostname));
  } catch {
    return false;
  }
}

export function findGoLink(code: string): GoLink | undefined {
  if (!GO_CODE_PATTERN.test(code) || !Object.hasOwn(links, code)) {
    return undefined;
  }
  const link = links[code];
  return isAllowedGoDestination(link.to) ? link : undefined;
}

// Link-preview fetchers and crawlers are not people coming from a video. The user agent is only
// checked here and never stored.
const nonHumanAgent =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|discord|slack|telegram|curl|wget|python-requests|headless/i;

export function isNonHumanAgent(userAgent: string | null) {
  return !userAgent || nonHumanAgent.test(userAgent);
}

export function jstDate(now = new Date()) {
  // sv-SE formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Tokyo" }).format(now);
}

async function countInLocalFile(file: string, date: string, code: string) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  let counts: Record<string, Record<string, number>> = {};
  try {
    counts = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    counts = {};
  }
  counts[date] ??= {};
  counts[date][code] = (counts[date][code] ?? 0) + 1;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(counts, null, 2)}\n`, "utf8");
}

async function countInRedis(url: string, token: string, date: string, code: string) {
  // Upstash Redis REST (Vercel Marketplace). Hash "go:<date>" holds one number per code.
  await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["HINCRBY", `go:${date}`, code, 1]),
    signal: AbortSignal.timeout(800),
    cache: "no-store",
  });
}

/**
 * Counts one hit for a code. Never throws: a counting problem must not stop the redirect.
 * - Local check: set GO_COUNT_FILE to a JSON file path.
 * - Production store (optional): Upstash Redis env vars added by the Vercel integration.
 * - Always: one log line with only date and code (visible in Vercel runtime logs).
 */
export async function recordGoHit(code: string, now = new Date()) {
  const date = jstDate(now);
  console.log(JSON.stringify({ event: "go_hit", date, code }));

  const tasks: Promise<unknown>[] = [];
  const file = process.env.GO_COUNT_FILE?.trim();
  if (file) {
    tasks.push(countInLocalFile(file, date, code));
  }
  const redisUrl = (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL)?.trim();
  const redisToken = (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN)?.trim();
  if (redisUrl && redisToken) {
    tasks.push(countInRedis(redisUrl, redisToken, date, code));
  }

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "rejected") {
      console.error(JSON.stringify({ event: "go_hit_count_failed", date, code }));
    }
  }
}
