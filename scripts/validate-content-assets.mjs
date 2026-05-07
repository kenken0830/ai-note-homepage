#!/usr/bin/env node
/**
 * validate-content-assets.mjs
 *
 * src/data/contentAssets.ts のテキストを解析し、ContentAsset 配列の各エントリが
 * 安全に扱える形になっているかを検証する。スクリプトは依存ゼロ。
 *
 * チェック項目:
 *  - editor.note.com URL を含まない
 *  - status=published のとき url が存在し、空文字でない
 *  - status=planned / draft のとき url を持つ場合は警告(非リンク表示前提のため)
 *  - topicSlug が kebab-case 正規表現に従う
 *  - id が一意
 *  - 認証情報を匂わせるキー名(cookie / token / session / api_key /
 *    authorization / bearer / password / secret)が混入していない
 *  - type が ContentAssetType の許可値
 *
 * Usage:
 *   node scripts/validate-content-assets.mjs            # デフォルトで src/data/contentAssets.ts
 *   node scripts/validate-content-assets.mjs path/to/file.ts
 *
 * Exit code:
 *   0 = PASS(警告のみは PASS とする)
 *   1 = FAIL(必須ルール違反)
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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

const KEBAB_CASE_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NOTE_URL_RE = /^https:\/\/note\.com\/[A-Za-z0-9_-]+\/n\/[A-Za-z0-9]+$/;
const EDITOR_NOTE_RE = /editor\.note\.com/i;
const URL_HTTP_RE = /^https?:\/\//;
const INTERNAL_PATH_RE = /^\//;

const SECRET_KEY_HINTS = [
  "cookie",
  "token",
  "session",
  "api_key",
  "apikey",
  "authorization",
  "bearer",
  "password",
  "secret",
];

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

const inputPath = resolve(process.argv[2] ?? "src/data/contentAssets.ts");
let raw;
try {
  raw = readFileSync(inputPath, "utf8");
} catch (e) {
  console.error(`FAIL: cannot read ${inputPath}: ${e.message}`);
  process.exit(1);
}

// 認証情報キー名の混入を検出(コメント行は除外)
{
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
    const lower = line.toLowerCase();
    for (const hint of SECRET_KEY_HINTS) {
      const re = new RegExp(`(^|[^a-z])${hint}\\s*:`);
      if (re.test(lower)) {
        fail(`line ${i + 1}: forbidden secret-like key "${hint}:" found — never include in contentAssets.ts`);
      }
    }
  }
}

// editor.note.com URL を全文走査(コメント行は除外)
{
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue;
    if (EDITOR_NOTE_RE.test(lines[i])) {
      fail(`line ${i + 1}: editor.note.com URL is forbidden`);
    }
  }
}

// オブジェクトリテラルを抽出して個別に検証する。
// `export const contentAssets: ContentAsset[] = [` の後に続く { ... } のブロックを
// 中括弧の対応でブルートに切り出す簡易パーサ。
function extractObjectBlocks(text) {
  // `contentAssets ...= [` を探す。型アノテーションの形式に依存しないよう緩く検索。
  const start = text.search(/\bcontentAssets\b[^=]*=\s*\[/);
  if (start === -1) return [];
  // contentAssets 以降で最初に出てくる '[' を array start とする
  const eqIdx = text.indexOf("=", start);
  if (eqIdx === -1) return [];
  const arrayStart = text.indexOf("[", eqIdx);
  if (arrayStart === -1) return [];
  // 配列の末尾 ] を中括弧/角括弧の対応で見つける
  let depth = 0;
  let inString = null;
  let prev = "";
  let arrayEnd = -1;
  for (let i = arrayStart; i < text.length; i++) {
    const ch = text[i];
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
  if (arrayEnd === -1) return [];
  const arrayBody = text.slice(arrayStart + 1, arrayEnd);

  const blocks = [];
  let braceDepth = 0;
  let blockStart = -1;
  inString = null;
  prev = "";
  for (let i = 0; i < arrayBody.length; i++) {
    const ch = arrayBody[i];
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
    if (ch === "{") {
      if (braceDepth === 0) blockStart = i;
      braceDepth++;
    } else if (ch === "}") {
      braceDepth--;
      if (braceDepth === 0 && blockStart !== -1) {
        blocks.push(arrayBody.slice(blockStart, i + 1));
        blockStart = -1;
      }
    }
    prev = ch;
  }
  return blocks;
}

function extractFieldString(block, key) {
  // 文字列値: key: "...", key: '...', key: `...`
  const re = new RegExp(
    `\\b${key}\\s*:\\s*(?:\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)'|\`((?:[^\`\\\\]|\\\\.)*)\`)`,
  );
  const m = block.match(re);
  if (!m) return undefined;
  return m[1] ?? m[2] ?? m[3];
}

function extractFieldHasKey(block, key) {
  const re = new RegExp(`\\b${key}\\s*:\\s*`);
  return re.test(block);
}

const blocks = extractObjectBlocks(raw);
if (blocks.length === 0) {
  warn(
    "no ContentAsset entries found (contentAssets array is empty or unparseable)",
  );
}

const seenIds = new Map();

blocks.forEach((block, idx) => {
  const ctx = `entry[${idx}]`;
  const id = extractFieldString(block, "id");
  const topicSlug = extractFieldString(block, "topicSlug");
  const type = extractFieldString(block, "type");
  const status = extractFieldString(block, "status");
  const priority = extractFieldString(block, "priority");
  const title = extractFieldString(block, "title");
  const url = extractFieldString(block, "url");
  const hasUrlField = extractFieldHasKey(block, "url");

  if (!id) fail(`${ctx}: missing or unreadable "id"`);
  if (!topicSlug) fail(`${ctx}: missing or unreadable "topicSlug"`);
  if (!type) fail(`${ctx}: missing or unreadable "type"`);
  if (!status) fail(`${ctx}: missing or unreadable "status"`);
  if (!priority) fail(`${ctx}: missing or unreadable "priority"`);
  if (!title) fail(`${ctx}: missing or unreadable "title"`);

  if (id) {
    if (seenIds.has(id)) fail(`${ctx}: duplicate id "${id}"`);
    else seenIds.set(id, idx);
  }

  if (topicSlug && !KEBAB_CASE_RE.test(topicSlug)) {
    fail(`${ctx}: topicSlug "${topicSlug}" must be kebab-case`);
  }

  if (type && !ALLOWED_TYPES.has(type)) {
    fail(
      `${ctx}: type "${type}" is not allowed (allowed: ${[...ALLOWED_TYPES].join(", ")})`,
    );
  }

  if (status && !ALLOWED_STATUSES.has(status)) {
    fail(
      `${ctx}: status "${status}" is not allowed (allowed: ${[...ALLOWED_STATUSES].join(", ")})`,
    );
  }

  if (priority && !ALLOWED_PRIORITIES.has(priority)) {
    fail(
      `${ctx}: priority "${priority}" is not allowed (allowed: ${[...ALLOWED_PRIORITIES].join(", ")})`,
    );
  }

  // url ルール
  if (status === "published") {
    if (!hasUrlField || !url) {
      fail(`${ctx}: status=published requires non-empty url`);
    } else {
      if (EDITOR_NOTE_RE.test(url)) {
        fail(`${ctx}: editor.note.com URL is forbidden`);
      }
      if (type === "note" && !NOTE_URL_RE.test(url) && URL_HTTP_RE.test(url)) {
        warn(
          `${ctx}: type=note url "${url}" does not match https://note.com/<user>/n/<id>`,
        );
      }
      if (!URL_HTTP_RE.test(url) && !INTERNAL_PATH_RE.test(url)) {
        fail(
          `${ctx}: url "${url}" must be either http(s) URL or internal path (starting with /)`,
        );
      }
    }
  } else if ((status === "planned" || status === "draft") && url) {
    warn(
      `${ctx}: status=${status} entry has a url. UI is expected to render it as non-link.`,
    );
  }
});

console.log(`Validated ${blocks.length} ContentAsset entries`);
if (warnings.length > 0) {
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error("\nFAIL");
  process.exit(1);
}
console.log("\nPASS");
process.exit(0);
