#!/usr/bin/env node
/**
 * Validate content_handoff JSON.
 *
 * 共通スキーマ。type に応じて追加検証を行う。
 * note 以外(manga / video / template / kit / product / workflow / prompt)も対象。
 *
 * Usage:
 *   node scripts/validate-content-handoff.mjs <path/to/handoff.json> [--check-url]
 *
 * Exit codes:
 *   0 = PASS / 1 = schema or content violation / 3 = url unreachable (with --check-url)
 */
import fs from "node:fs";
import path from "node:path";

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
const ALLOWED_KEYS = new Set([
  "id",
  "type",
  "topic_slug",
  "title",
  "description",
  "url",
  "status",
  "source",
  "published_at",
  "tags",
  "related_use_case_slug",
  "priority",
]);

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NOTE_URL_RE = /^https:\/\/note\.com\/[A-Za-z0-9_-]+\/n\/[A-Za-z0-9]+$/;
const EDITOR_RE = /editor\.note\.com/i;
const HTTP_URL_RE = /^https?:\/\//;
const INTERNAL_PATH_RE = /^\/[A-Za-z0-9/_-]*$/;
const SECRET_HINTS = [
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

function fail(errs, code = 1) {
  console.log("FAIL");
  for (const e of errs) console.log(`  - ${e}`);
  process.exit(code);
}

async function main(argv) {
  if (argv.length < 1) {
    console.error("Usage: validate-content-handoff <handoff.json> [--check-url]");
    process.exit(1);
  }
  const filePath = path.resolve(argv[0]);
  const checkUrl = argv.includes("--check-url");
  if (!fs.existsSync(filePath)) fail([`file not found: ${filePath}`]);
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.length > 8000) fail([`payload too large (${raw.length} chars)`]);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail([`invalid JSON: ${e.message}`]);
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    fail(["payload must be a JSON object"]);
  }

  const errors = [];
  const warnings = [];

  // 想定外フィールド + 認証情報キー名
  for (const k of Object.keys(data)) {
    if (!ALLOWED_KEYS.has(k)) errors.push(`disallowed key: '${k}'`);
    const lower = k.toLowerCase();
    if (SECRET_HINTS.some((h) => lower.includes(h))) {
      errors.push(`key '${k}' looks like a secret/auth field — never include`);
    }
  }

  const required = [
    "id",
    "type",
    "topic_slug",
    "title",
    "description",
    "status",
    "source",
    "tags",
    "priority",
  ];
  for (const k of required) {
    if (data[k] === undefined) errors.push(`missing required: ${k}`);
  }

  if (typeof data.id === "string" && !/^[A-Za-z0-9_-]{3,80}$/.test(data.id)) {
    errors.push(`id must match [A-Za-z0-9_-]{3,80}`);
  }

  if (typeof data.type === "string" && !ALLOWED_TYPES.has(data.type)) {
    errors.push(
      `type '${data.type}' not allowed (${[...ALLOWED_TYPES].join(", ")})`,
    );
  }
  if (typeof data.status === "string" && !ALLOWED_STATUSES.has(data.status)) {
    errors.push(
      `status '${data.status}' not allowed (${[...ALLOWED_STATUSES].join(", ")})`,
    );
  }
  if (
    typeof data.priority === "string" &&
    !ALLOWED_PRIORITIES.has(data.priority)
  ) {
    errors.push(
      `priority '${data.priority}' not allowed (${[...ALLOWED_PRIORITIES].join(", ")})`,
    );
  }

  if (typeof data.topic_slug === "string" && !KEBAB_RE.test(data.topic_slug)) {
    errors.push(`topic_slug '${data.topic_slug}' must be kebab-case`);
  }

  if (typeof data.title === "string") {
    if (data.title.length < 1 || data.title.length > 200) {
      errors.push("title length must be 1..200");
    }
  } else if (data.title !== undefined) {
    errors.push("title must be string");
  }

  if (typeof data.description === "string") {
    if (data.description.length < 1 || data.description.length > 600) {
      errors.push(
        `description length must be 1..600 (got ${data.description.length})`,
      );
    }
  } else if (data.description !== undefined) {
    errors.push("description must be string");
  }

  if (typeof data.source === "string") {
    if (data.source.length < 1 || data.source.length > 40) {
      errors.push("source length must be 1..40");
    }
  }

  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push("tags must be array");
    } else {
      if (data.tags.length > 20) errors.push("tags must have <= 20");
      const seen = new Set();
      data.tags.forEach((t, i) => {
        if (typeof t !== "string" || t.length < 1 || t.length > 40) {
          errors.push(`tags[${i}] must be string of length 1..40`);
        }
        if (seen.has(t)) errors.push(`tags[${i}] duplicate "${t}"`);
        seen.add(t);
      });
    }
  }

  if (data.published_at !== undefined) {
    if (typeof data.published_at !== "string") {
      errors.push("published_at must be string");
    } else {
      try {
        new Date(data.published_at).toISOString();
      } catch {
        errors.push(`published_at '${data.published_at}' not ISO 8601`);
      }
    }
  }
  if (data.status === "published" && data.published_at === undefined) {
    warnings.push("status=published without published_at");
  }

  if (data.related_use_case_slug !== undefined) {
    if (
      typeof data.related_use_case_slug !== "string" ||
      !KEBAB_RE.test(data.related_use_case_slug)
    ) {
      errors.push("related_use_case_slug must be kebab-case");
    }
  }

  // url ルール(type 別)
  if (data.url !== undefined && typeof data.url !== "string") {
    errors.push("url must be string");
  }
  if (typeof data.url === "string") {
    if (EDITOR_RE.test(data.url)) errors.push("editor.note.com URL is forbidden");
    if (data.type === "note") {
      if (!NOTE_URL_RE.test(data.url)) {
        errors.push(
          "type=note url must match https://note.com/<user>/n/<id> (no query, no editor)",
        );
      }
    } else if (!HTTP_URL_RE.test(data.url) && !INTERNAL_PATH_RE.test(data.url)) {
      errors.push(
        `url '${data.url}' must be http(s) URL or internal path /...`,
      );
    }
  }
  if (data.status === "published") {
    if (typeof data.url !== "string" || data.url.length === 0) {
      errors.push("status=published requires non-empty url");
    }
  } else if (data.status === "planned" || data.status === "draft") {
    if (typeof data.url === "string" && data.url.length > 0) {
      warnings.push(
        `status=${data.status} entry has url. UI will render as non-link.`,
      );
    }
  }

  // type 別の追加チェック
  if (data.type === "product" || data.type === "kit") {
    // 商品 / 無料キットは慎重に: planned のときに外部 URL を持っていたら警告強め
    if (
      data.status === "planned" &&
      typeof data.url === "string" &&
      HTTP_URL_RE.test(data.url)
    ) {
      warnings.push(
        `type=${data.type} planned has external url — confirm it's not a real sales/distribution URL leak`,
      );
    }
  }

  if (errors.length > 0) {
    if (warnings.length > 0) {
      console.log(`${warnings.length} warning(s):`);
      warnings.forEach((w) => console.log(`  - ${w}`));
    }
    fail(errors);
  }

  if (warnings.length > 0) {
    console.log(`${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log(`  - ${w}`));
  }

  if (checkUrl && typeof data.url === "string" && HTTP_URL_RE.test(data.url)) {
    // HEAD で 4xx/5xx を検出
    try {
      const res = await fetchHead(data.url);
      if (res.status >= 400) {
        console.log(`FAIL\n  - url HTTP ${res.status}`);
        process.exit(3);
      }
    } catch (e) {
      console.log(`FAIL\n  - url unreachable: ${e.message}`);
      process.exit(3);
    }
  }

  console.log("PASS");
  process.exit(0);
}

async function fetchHead(url) {
  const res = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    headers: { "User-Agent": "content-handoff-validator/1.0" },
  });
  return { status: res.status };
}

await main(process.argv.slice(2));
