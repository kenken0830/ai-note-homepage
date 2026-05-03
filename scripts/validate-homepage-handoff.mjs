#!/usr/bin/env node
/**
 * homepage_handoff JSON validator.
 *
 * Usage:
 *   node scripts/validate-homepage-handoff.mjs <path/to/handoff.json> [--check-url]
 *
 * Exit codes:
 *   0  pass
 *   1  payload validation failed
 *   2  filename / IO error
 *   3  url unreachable / 4xx / 5xx (only with --check-url)
 */
import fs from "node:fs";

const ALLOWED_KEYS = new Set([
  "title",
  "note_url",
  "published_at",
  "summary",
  "tags",
  "research_theme",
  "note_angle",
  "homepage_angle",
  "homepage_candidate",
  "priority",
  "suggested_use_case_slug",
  "suggested_category",
  "related_homepage_paths",
]);

const REQUIRED_BASE = [
  "title",
  "note_url",
  "published_at",
  "summary",
  "tags",
  "research_theme",
  "note_angle",
  "homepage_candidate",
  "priority",
  "suggested_category",
  "related_homepage_paths",
];

const NOTE_URL_RE = /^https:\/\/note\.com\/[A-Za-z0-9_-]+\/n\/[A-Za-z0-9]+$/;
const EDITOR_RE = /editor\.note\.com/i;
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const PATH_RE = /^\/[A-Za-z0-9/_-]*$/;
const ALLOWED_PRIORITY = new Set(["high", "medium", "low"]);
const ALLOWED_CATEGORY = new Set([
  "書く",
  "調べる",
  "整える",
  "学ぶ",
  "考える",
  "作る",
  "伝える",
  "自動化する",
  "はじめる",
  "運用",
]);

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

const BODY_HEURISTIC_PHRASES = [
  "続きをみる",
  "続きを読む",
  "ここから先は",
  "メンバーシップに参加すると",
];

function fail(errors, code = 1) {
  console.log("FAIL");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(code);
}

function validatePayload(data) {
  const errs = [];
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return ["payload must be a JSON object"];
  }

  const keys = Object.keys(data);
  for (const k of keys) {
    if (!ALLOWED_KEYS.has(k)) {
      errs.push(`disallowed key: '${k}' (no cookies/tokens/body fields)`);
    }
    const kl = k.toLowerCase();
    for (const hint of SECRET_KEY_HINTS) {
      if (kl.includes(hint)) {
        errs.push(`key '${k}' looks like a secret/auth field — never include`);
        break;
      }
    }
  }

  for (const k of REQUIRED_BASE) {
    if (!(k in data)) errs.push(`missing required field: ${k}`);
  }

  if (typeof data.title === "string") {
    if (data.title.length < 1 || data.title.length > 200) {
      errs.push("title length must be 1..200");
    }
  } else if ("title" in data) {
    errs.push("title must be string");
  }

  if (typeof data.note_url === "string") {
    if (EDITOR_RE.test(data.note_url)) {
      errs.push("note_url must not point to editor.note.com");
    }
    if (!NOTE_URL_RE.test(data.note_url)) {
      errs.push(
        "note_url must match ^https://note.com/<user>/n/<id>$ (no query string, no editor URL, no draft URL)",
      );
    }
  } else if ("note_url" in data) {
    errs.push("note_url must be string");
  }

  if (typeof data.published_at === "string") {
    const d = new Date(data.published_at);
    if (Number.isNaN(d.getTime())) {
      errs.push(`published_at '${data.published_at}' is not ISO 8601`);
    }
  } else if ("published_at" in data) {
    errs.push("published_at must be string");
  }

  if (typeof data.summary === "string") {
    if (data.summary.length < 1 || data.summary.length > 600) {
      errs.push(
        `summary length must be 1..600 (got ${data.summary.length}). Do not paste full note body — write a short summary.`,
      );
    }
    for (const phrase of BODY_HEURISTIC_PHRASES) {
      if (data.summary.includes(phrase)) {
        errs.push(
          `summary contains body-trailing phrase '${phrase}' — looks like raw note body, not a summary`,
        );
        break;
      }
    }
  } else if ("summary" in data) {
    errs.push("summary must be string");
  }

  if (Array.isArray(data.tags)) {
    if (data.tags.length > 20) errs.push("tags must have <= 20 items");
    data.tags.forEach((t, i) => {
      if (typeof t !== "string" || t.length < 1 || t.length > 40) {
        errs.push(`tags[${i}] must be string of length 1..40`);
      }
    });
    if (new Set(data.tags).size !== data.tags.length) {
      errs.push("tags must be unique");
    }
  } else if ("tags" in data) {
    errs.push("tags must be array");
  }

  for (const f of ["research_theme", "note_angle"]) {
    if (typeof data[f] === "string") {
      if (data[f].length < 1 || data[f].length > 300) {
        errs.push(`${f} length must be 1..300`);
      }
    } else if (f in data) {
      errs.push(`${f} must be string`);
    }
  }

  if (typeof data.homepage_candidate !== "boolean") {
    if ("homepage_candidate" in data) {
      errs.push("homepage_candidate must be boolean");
    }
  } else if (data.homepage_candidate) {
    for (const f of ["homepage_angle", "suggested_use_case_slug"]) {
      const v = data[f];
      if (typeof v !== "string" || !v) {
        errs.push(`${f} is required when homepage_candidate=true`);
      }
    }
  }

  if (data.priority != null && !ALLOWED_PRIORITY.has(data.priority)) {
    errs.push(`priority must be one of ${[...ALLOWED_PRIORITY].join(", ")}`);
  }

  if (
    data.suggested_category != null &&
    !ALLOWED_CATEGORY.has(data.suggested_category)
  ) {
    errs.push(
      `suggested_category must be one of ${[...ALLOWED_CATEGORY].join(", ")} (got '${data.suggested_category}')`,
    );
  }

  if (typeof data.suggested_use_case_slug === "string" && data.suggested_use_case_slug) {
    if (
      !SLUG_RE.test(data.suggested_use_case_slug) ||
      data.suggested_use_case_slug.length < 3 ||
      data.suggested_use_case_slug.length > 80
    ) {
      errs.push("suggested_use_case_slug must be kebab-case, length 3..80");
    }
  } else if (
    data.suggested_use_case_slug != null &&
    typeof data.suggested_use_case_slug !== "string"
  ) {
    errs.push("suggested_use_case_slug must be string");
  }

  if (typeof data.homepage_angle === "string" && data.homepage_angle) {
    if (data.homepage_angle.length < 1 || data.homepage_angle.length > 300) {
      errs.push("homepage_angle length must be 1..300");
    }
  } else if (data.homepage_angle != null && typeof data.homepage_angle !== "string") {
    errs.push("homepage_angle must be string");
  }

  if (Array.isArray(data.related_homepage_paths)) {
    if (data.related_homepage_paths.length > 10) {
      errs.push("related_homepage_paths must have <= 10 items");
    }
    data.related_homepage_paths.forEach((p, i) => {
      if (typeof p !== "string" || !PATH_RE.test(p)) {
        errs.push(
          `related_homepage_paths[${i}] must be an absolute path like /ai-use-cases/foo`,
        );
      }
    });
    if (
      new Set(data.related_homepage_paths).size !==
      data.related_homepage_paths.length
    ) {
      errs.push("related_homepage_paths must be unique");
    }
  } else if ("related_homepage_paths" in data) {
    errs.push("related_homepage_paths must be array");
  }

  const raw = JSON.stringify(data);
  if (raw.length > 8000) {
    errs.push(
      `payload is suspiciously large (${raw.length} chars). Did you accidentally include note body?`,
    );
  }

  return errs;
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "homepage-handoff-validator/1.0" },
    });
    if (res.status >= 400) return [`note_url returned HTTP ${res.status}`];
    if (EDITOR_RE.test(res.url)) {
      return [`note_url redirected to editor URL: ${res.url}`];
    }
    return [];
  } catch (e) {
    return [`note_url unreachable: ${e.message ?? e}`];
  }
}

async function main() {
  const args = process.argv.slice(2);
  const filePath = args[0];
  const checkUrlFlag = args.includes("--check-url");

  if (!filePath) {
    console.error("Usage: node scripts/validate-homepage-handoff.mjs <path> [--check-url]");
    process.exit(2);
  }
  if (!fs.existsSync(filePath)) {
    console.log(`FAIL\n  - file not found: ${filePath}`);
    process.exit(2);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.log(`FAIL\n  - invalid JSON: ${e.message}`);
    process.exit(2);
  }

  const errs = validatePayload(data);
  if (errs.length) fail(errs, 1);

  if (checkUrlFlag) {
    const urlErrs = await checkUrl(data.note_url);
    if (urlErrs.length) fail(urlErrs, 3);
  }

  console.log("PASS");
}

main().catch((e) => {
  console.error(`FATAL: ${e.message ?? e}`);
  process.exit(2);
});
