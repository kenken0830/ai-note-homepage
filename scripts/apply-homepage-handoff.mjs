#!/usr/bin/env node
/**
 * Apply homepage_handoff JSON to src/data/{notePosts,articleBacklog,updates}.ts.
 *
 * Usage:
 *   node scripts/apply-homepage-handoff.mjs <path/to/handoff.json> [--dry-run]
 *
 * Behavior:
 *   - Idempotent: skips entries already present (by id / suggestedSlug).
 *   - Sets relatedUseCaseSlug only if suggested_use_case_slug is published.
 *   - Refuses to include editor.note.com URLs or note body fields.
 *   - Writes 3 files in place. Reports JSON to stdout describing changes.
 *
 * Exit codes:
 *   0  applied (or no-op idempotent skip)
 *   1  validation/IO failure
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const NOTE_POSTS_FILE = path.join(REPO_ROOT, "src/data/notePosts.ts");
const ARTICLE_BACKLOG_FILE = path.join(REPO_ROOT, "src/data/articleBacklog.ts");
const UPDATES_FILE = path.join(REPO_ROOT, "src/data/updates.ts");
const AI_USE_CASES_FILE = path.join(REPO_ROOT, "src/data/aiUseCases.ts");
const AI_USE_CASE_REGISTRY_FILE = path.join(
  REPO_ROOT,
  "src/data/aiUseCaseRegistry.ts",
);

const NOTE_URL_RE = /^https:\/\/note\.com\/[A-Za-z0-9_-]+\/n\/[A-Za-z0-9]+$/;
const EDITOR_RE = /editor\.note\.com/i;

function die(msg) {
  console.error(`apply-homepage-handoff: ${msg}`);
  process.exit(1);
}

function loadPayload(filePath) {
  if (!fs.existsSync(filePath)) die(`file not found: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    die(`invalid JSON: ${e.message}`);
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    die("payload must be a JSON object");
  }
  if (typeof data.note_url !== "string" || !NOTE_URL_RE.test(data.note_url)) {
    die("note_url missing or wrong format");
  }
  if (EDITOR_RE.test(data.note_url)) die("note_url is editor.note.com — refused");
  if (typeof data.summary !== "string" || data.summary.length > 600) {
    die("summary missing or too long");
  }
  if (raw.length > 8000) die("payload too large — refusing");
  return data;
}

function getPublishedSlugs(content) {
  const slugs = new Set();
  const slugPositions = [];
  const slugRe = /slug:\s*"([a-z0-9-]+)"/g;
  let s;
  while ((s = slugRe.exec(content)) !== null) {
    slugPositions.push({ slug: s[1], start: s.index });
  }
  for (let i = 0; i < slugPositions.length; i++) {
    const start = slugPositions[i].start;
    const end =
      i + 1 < slugPositions.length ? slugPositions[i + 1].start : content.length;
    const block = content.slice(start, end);
    if (/status:\s*"published"/.test(block)) {
      slugs.add(slugPositions[i].slug);
    }
  }
  return slugs;
}

function isUseCasePublished(slug) {
  if (!slug) return false;
  const aiUseCases = fs.existsSync(AI_USE_CASES_FILE)
    ? fs.readFileSync(AI_USE_CASES_FILE, "utf8")
    : "";
  const registry = fs.existsSync(AI_USE_CASE_REGISTRY_FILE)
    ? fs.readFileSync(AI_USE_CASE_REGISTRY_FILE, "utf8")
    : "";
  const a = getPublishedSlugs(aiUseCases);
  const b = getPublishedSlugs(registry);
  return a.has(slug) || b.has(slug);
}

function jsString(s) {
  return JSON.stringify(s);
}

function deriveRelatedPagesEntries(payload) {
  const labelOverrides = {
    "/free": "無料キット",
    "/prompts": "プロンプト集",
    "/workflows": "ワークフロー",
    "/guides": "完全ガイド",
    "/ai-use-cases": "AIでできること一覧",
    "/library": "記事ライブラリ",
    "/start": "はじめての方へ",
  };
  const entries = [];
  const seen = new Set();
  for (const p of payload.related_homepage_paths || []) {
    if (seen.has(p)) continue;
    seen.add(p);
    let label = labelOverrides[p];
    if (!label && p.startsWith("/ai-use-cases/")) {
      label = "関連AIユースケース";
    }
    if (!label) {
      label = p.replace(/^\//, "");
    }
    entries.push({ label, href: p });
  }
  return entries;
}

function buildNotePostEntry(payload, withRelatedUseCaseSlug) {
  const id = `${payload.published_at.slice(0, 10)}_${payload.suggested_use_case_slug || "post"}`;
  const publishedAt = payload.published_at.slice(0, 10);
  const tagsLines = (payload.tags || []).map((t) => `      ${jsString(t)},`).join("\n");
  const relatedPages = deriveRelatedPagesEntries(payload);
  const relatedPagesLines = relatedPages
    .map((r) => `      { label: ${jsString(r.label)}, href: ${jsString(r.href)} },`)
    .join("\n");

  const optionalSlugLine = withRelatedUseCaseSlug
    ? `    relatedUseCaseSlug: ${jsString(payload.suggested_use_case_slug)},\n`
    : "";

  return `  {
    id: ${jsString(id)},
    title:
      ${jsString(payload.title)},
    url: ${jsString(payload.note_url)},
    publishedAt: ${jsString(publishedAt)},
    summary:
      ${jsString(payload.summary)},
    tags: [
${tagsLines}
    ],
    homepageCandidate: ${payload.homepage_candidate ? "true" : "false"},
    priority: ${jsString(payload.priority || "medium")},
    noteAngle: ${jsString(payload.note_angle || "")},
    homepageAngle:
      ${jsString(payload.homepage_angle || "")},
${optionalSlugLine}    relatedPages: [
${relatedPagesLines}
    ],
  }`;
}

function buildBacklogEntry(payload) {
  const slug = payload.suggested_use_case_slug;
  const relatedPagesLines = (payload.related_homepage_paths || [])
    .map((p) => `      ${jsString(p)},`)
    .join("\n");
  return `  {
    id: ${jsString(slug)},
    title: ${jsString(payload.title.replace(/【.*?】/g, "").replace(/\s—\s.*$/, "").trim() || payload.title)},
    category: ${jsString(payload.suggested_category || "整える")},
    target: "homepage",
    noteAngle: ${jsString(payload.note_angle || "")},
    homepageAngle:
      ${jsString(payload.homepage_angle || "")},
    searchIntent:
      ${jsString(payload.research_theme || payload.title)},
    priority: ${jsString(payload.priority || "medium")},
    status: "candidate",
    relatedPages: [
${relatedPagesLines}
    ],
    suggestedSlug: ${jsString(slug)},
  }`;
}

function buildUpdateEntry(payload) {
  const date = payload.published_at.slice(0, 10);
  const slug = payload.suggested_use_case_slug || "post";
  const id = `note-handoff-${slug}-${date}`;
  const title = `公開済みnote「${payload.title.slice(0, 60)}」を /library に取り込みました`;
  const description = `note自動投稿プロジェクトから受け取ったhomepage_handoff JSONをもとに、/library のnote実験ログを更新し、HP化候補をarticleBacklogに追加しました。${payload.homepage_candidate ? "未公開slugへの404を避けるためrelatedUseCaseSlugは未設定にしています(詳細ページ公開後に別PRで追加)。" : ""}`;
  return `  {
    id: ${jsString(id)},
    date: ${jsString(date)},
    title:
      ${jsString(title)},
    description:
      ${jsString(description)},
    href: "/library",
    category: "連携",
  }`;
}

function readFileSafe(p) {
  return fs.readFileSync(p, "utf8");
}

function writeFile(p, content, dryRun) {
  if (dryRun) return;
  fs.writeFileSync(p, content);
}

function applyNotePosts(payload, withRelatedUseCaseSlug) {
  const file = NOTE_POSTS_FILE;
  const content = readFileSafe(file);
  const id = `${payload.published_at.slice(0, 10)}_${payload.suggested_use_case_slug || "post"}`;
  const idLiteral = `id: ${jsString(id)}`;
  if (content.includes(idLiteral)) {
    return { file, action: "skip", reason: `notePost ${id} already exists` };
  }
  const entry = buildNotePostEntry(payload, withRelatedUseCaseSlug);
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const closeRe = /(\r?\n)\];\s*$/;
  if (!closeRe.test(content)) {
    die(`could not locate closing '];' in ${file}`);
  }
  const newContent = content.replace(
    closeRe,
    `${eol}${entry.replace(/\n/g, eol)},${eol}];${eol}`,
  );
  return { file, action: "added", id, content: newContent };
}

function applyBacklog(payload) {
  const slug = payload.suggested_use_case_slug;
  if (!slug) return { file: ARTICLE_BACKLOG_FILE, action: "skip", reason: "no suggested_use_case_slug" };
  const file = ARTICLE_BACKLOG_FILE;
  const content = readFileSafe(file);
  if (
    content.includes(`id: ${jsString(slug)}`) ||
    content.includes(`suggestedSlug: ${jsString(slug)}`)
  ) {
    return { file, action: "skip", reason: `backlog ${slug} already exists` };
  }
  const entry = buildBacklogEntry(payload);
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  // Insert before the FIRST `\r?\n];\r?\n` (which closes articleBacklog array).
  const closeRe = /(\r?\n)\];(\r?\n)/;
  if (!closeRe.test(content)) {
    die(`could not locate closing '];' in ${file}`);
  }
  const newContent = content.replace(
    closeRe,
    `${eol}${entry.replace(/\n/g, eol)},${eol}];${eol}`,
  );
  return { file, action: "added", id: slug, content: newContent };
}

function applyUpdates(payload) {
  const file = UPDATES_FILE;
  const content = readFileSafe(file);
  const date = payload.published_at.slice(0, 10);
  const slug = payload.suggested_use_case_slug || "post";
  const id = `note-handoff-${slug}-${date}`;
  if (content.includes(`id: ${jsString(id)}`)) {
    return { file, action: "skip", reason: `update ${id} already exists` };
  }
  const entry = buildUpdateEntry(payload);
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const anchorRe = /(export const updates: UpdateItem\[\] = \[)(\r?\n)/;
  if (!anchorRe.test(content)) {
    die(`could not locate anchor in ${file}`);
  }
  const newContent = content.replace(
    anchorRe,
    (_m, decl, nl) => `${decl}${nl}${entry.replace(/\n/g, eol)},${nl}`,
  );
  return { file, action: "added", id, content: newContent };
}

async function main() {
  const args = process.argv.slice(2);
  const handoffPath = args[0];
  const dryRun = args.includes("--dry-run");
  if (!handoffPath) {
    console.error("Usage: node scripts/apply-homepage-handoff.mjs <path> [--dry-run]");
    process.exit(1);
  }
  const payload = loadPayload(handoffPath);

  const useCasePublished = isUseCasePublished(payload.suggested_use_case_slug);
  const results = [];
  results.push(applyNotePosts(payload, useCasePublished));
  if (payload.homepage_candidate) {
    results.push(applyBacklog(payload));
  } else {
    results.push({
      file: ARTICLE_BACKLOG_FILE,
      action: "skip",
      reason: "homepage_candidate=false",
    });
  }
  results.push(applyUpdates(payload));

  let wrote = 0;
  for (const r of results) {
    if (r.content) {
      writeFile(r.file, r.content, dryRun);
      wrote++;
    }
  }

  const summary = {
    dry_run: dryRun,
    files_written: wrote,
    relatedUseCaseSlug_set: useCasePublished,
    suggested_use_case_slug: payload.suggested_use_case_slug,
    results: results.map((r) => ({
      file: path.relative(REPO_ROOT, r.file),
      action: r.action,
      id: r.id,
      reason: r.reason,
    })),
  };
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((e) => {
  console.error(`FATAL: ${e.message ?? e}`);
  process.exit(1);
});
