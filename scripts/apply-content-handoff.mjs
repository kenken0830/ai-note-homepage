#!/usr/bin/env node
/**
 * Apply content_handoff JSON to src/data/contentAssets.ts.
 *
 * Usage:
 *   node scripts/apply-content-handoff.mjs <path/to/handoff.json> [--dry-run]
 *
 * Behavior:
 *   - Idempotent: skips if id already present.
 *   - Refuses editor.note.com URL or oversized payload (re-validates basic safety).
 *   - Appends a new ContentAsset literal to contentAssets[] in TS source.
 *   - Reports JSON summary to stdout.
 *
 * Exit codes:
 *   0  applied (or idempotent skip)
 *   1  validation/IO failure
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const CONTENT_ASSETS_FILE = path.join(REPO_ROOT, "src/data/contentAssets.ts");

const ALLOWED_TYPES = new Set([
  "note",
  "manga",
  "video",
  "template",
  "kit",
  "product",
  "workflow",
  "prompt",
]);
const ALLOWED_STATUSES = new Set(["published", "planned", "draft"]);
const ALLOWED_PRIORITIES = new Set(["high", "medium", "low"]);
const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NOTE_URL_RE = /^https:\/\/note\.com\/[A-Za-z0-9_-]+\/n\/[A-Za-z0-9]+$/;
const EDITOR_RE = /editor\.note\.com/i;
const HTTP_URL_RE = /^https?:\/\//;
const INTERNAL_PATH_RE = /^\/[A-Za-z0-9/_-]*$/;

function die(msg) {
  console.error(`apply-content-handoff: ${msg}`);
  process.exit(1);
}

function loadPayload(filePath) {
  if (!fs.existsSync(filePath)) die(`file not found: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.length > 8000) die(`payload too large (${raw.length} chars)`);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    die(`invalid JSON: ${e.message}`);
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    die("payload must be a JSON object");
  }

  // 必須フィールド
  for (const k of [
    "id",
    "type",
    "topic_slug",
    "title",
    "description",
    "status",
    "source",
    "tags",
    "priority",
  ]) {
    if (data[k] === undefined) die(`missing required: ${k}`);
  }

  if (!ALLOWED_TYPES.has(data.type)) die(`type '${data.type}' not allowed`);
  if (!ALLOWED_STATUSES.has(data.status)) die(`status '${data.status}' not allowed`);
  if (!ALLOWED_PRIORITIES.has(data.priority))
    die(`priority '${data.priority}' not allowed`);
  if (!/^[A-Za-z0-9_-]{3,80}$/.test(data.id)) die(`id must match [A-Za-z0-9_-]{3,80}`);
  if (!KEBAB_RE.test(data.topic_slug))
    die(`topic_slug '${data.topic_slug}' must be kebab-case`);
  if (typeof data.description !== "string" || data.description.length > 600)
    die("description must be string up to 600 chars");
  if (typeof data.title !== "string" || data.title.length > 200)
    die("title must be string up to 200 chars");
  if (!Array.isArray(data.tags)) die("tags must be array");

  if (typeof data.url === "string") {
    if (EDITOR_RE.test(data.url)) die("editor.note.com URL is forbidden");
    if (data.type === "note" && !NOTE_URL_RE.test(data.url)) {
      die("type=note url must match https://note.com/<user>/n/<id>");
    }
    if (
      data.type !== "note" &&
      !HTTP_URL_RE.test(data.url) &&
      !INTERNAL_PATH_RE.test(data.url)
    ) {
      die(`url '${data.url}' must be http(s) URL or internal /path`);
    }
  }
  if (data.status === "published") {
    if (typeof data.url !== "string" || data.url.length === 0) {
      die("status=published requires non-empty url");
    }
  }

  return data;
}

function escapeStringForTsLiteral(s) {
  // 文字列値内のバッククォートとバックスラッシュ・$ をエスケープ
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function renderEntry(payload) {
  const tagsLiteral =
    payload.tags.length === 0
      ? "[]"
      : "[" +
        payload.tags.map((t) => `"${escapeStringForTsLiteral(t)}"`).join(", ") +
        "]";
  const lines = [];
  lines.push("  {");
  lines.push(`    id: "${escapeStringForTsLiteral(payload.id)}",`);
  lines.push(`    topicSlug: "${escapeStringForTsLiteral(payload.topic_slug)}",`);
  lines.push(`    type: "${payload.type}",`);
  lines.push(`    title:`);
  lines.push(`      "${escapeStringForTsLiteral(payload.title)}",`);
  lines.push(`    description:`);
  lines.push(`      "${escapeStringForTsLiteral(payload.description)}",`);
  if (typeof payload.url === "string" && payload.url.length > 0) {
    lines.push(`    url: "${escapeStringForTsLiteral(payload.url)}",`);
  }
  lines.push(`    status: "${payload.status}",`);
  lines.push(`    source: "${escapeStringForTsLiteral(payload.source)}",`);
  if (typeof payload.published_at === "string" && payload.published_at.length > 0) {
    // ContentAsset.publishedAt は string、ISO の date 部分(YYYY-MM-DD)が望ましい
    const ymd = payload.published_at.slice(0, 10);
    lines.push(`    publishedAt: "${ymd}",`);
  }
  lines.push(`    tags: ${tagsLiteral.replace(/, /g, ",\n      ")},`);
  // tags が長い場合、上の置換で複数行に展開される。短い場合はそのまま。
  if (typeof payload.related_use_case_slug === "string") {
    lines.push(
      `    relatedUseCaseSlug: "${escapeStringForTsLiteral(payload.related_use_case_slug)}",`,
    );
  }
  lines.push(`    priority: "${payload.priority}",`);
  lines.push("  },");
  return lines.join("\n");
}

function applyToContentAssets(payload, dryRun) {
  const src = fs.readFileSync(CONTENT_ASSETS_FILE, "utf8");

  // 既存 id が存在するか
  const idRe = new RegExp(
    `\\bid\\s*:\\s*"${payload.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
  );
  if (idRe.test(src)) {
    return { action: "skipped", reason: "id already present", id: payload.id };
  }

  // contentAssets 配列の閉じ括弧 `];` の直前に挿入する
  // 配列開始位置を見つけてから、対応する閉じ ] を探す
  const startMatch = src.match(/contentAssets[^=]*=\s*\[/);
  if (!startMatch) die("cannot find contentAssets array start");
  const arrayStart = src.indexOf("[", startMatch.index);
  let depth = 0;
  let inString = null;
  let prev = "";
  let arrayEnd = -1;
  for (let i = arrayStart; i < src.length; i++) {
    const ch = src[i];
    if (inString) {
      if (ch === inString && prev !== "\\") inString = null;
      prev = ch;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      prev = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }
    prev = ch;
  }
  if (arrayEnd === -1) die("cannot find contentAssets array end");

  // 直前の文字までを保持し、新エントリを差し込む
  // 末尾が ",\n" になるよう正規化
  const before = src.slice(0, arrayEnd);
  const after = src.slice(arrayEnd);

  const entry = renderEntry(payload);
  // before の末尾の空白を整形(改行 + インデント付きで挿入)
  const beforeTrimmed = before.replace(/\s*$/, "\n");
  const updated = beforeTrimmed + entry + "\n" + after;

  if (dryRun) {
    return { action: "dry-run", id: payload.id, would_add_lines: entry.split("\n").length };
  }
  fs.writeFileSync(CONTENT_ASSETS_FILE, updated, "utf8");
  return { action: "added", id: payload.id, file: "src/data/contentAssets.ts" };
}

function main(argv) {
  if (argv.length < 1) {
    console.error("Usage: apply-content-handoff <handoff.json> [--dry-run]");
    process.exit(1);
  }
  const filePath = argv[0];
  const dryRun = argv.includes("--dry-run");
  const payload = loadPayload(filePath);
  const result = applyToContentAssets(payload, dryRun);
  console.log(JSON.stringify({ dry_run: dryRun, result }, null, 2));
}

main(process.argv.slice(2));
