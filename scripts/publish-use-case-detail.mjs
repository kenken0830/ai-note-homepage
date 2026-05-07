#!/usr/bin/env node
/**
 * Publish a use case detail page from a payload JSON.
 *
 * Updates an existing `planned` entry in src/data/aiUseCases.ts to `published`
 * with the provided detail content (target / scene / preparation / prompt /
 * inputExample / outputExample / improvementPrompt / steps / checkPoints /
 * commonMistakes / noteAngle / relatedPages). Also flips the corresponding
 * articleBacklog entry status to `published`, and prepends an entry to
 * src/data/updates.ts.
 *
 * Usage:
 *   node scripts/publish-use-case-detail.mjs <path/to/payload.json> [--dry-run]
 *
 * Payload schema:
 *   {
 *     "slug": "build-something-new",
 *     "description": "...",
 *     "target": "...",
 *     "scene": "...",
 *     "preparation": ["...", "..."],
 *     "prompt": "...",
 *     "input_example": "...",
 *     "output_example": "...",
 *     "improvement_prompt": "...",
 *     "steps": ["...", "..."],
 *     "check_points": ["...", "..."],
 *     "common_mistakes": ["...", "..."],
 *     "note_angle": "...",
 *     "related_pages": [{"label": "...", "href": "/..."}]
 *   }
 *
 * Behavior:
 *   - 80-point quality is NOT enforced here; human review on the resulting PR is required.
 *   - Refuses if the slug is not yet present in aiUseCases.ts.
 *   - Refuses if the entry is already `status: "published"` (idempotent skip).
 *   - All required fields must be non-empty strings (or arrays).
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

const AI_USE_CASES_FILE = path.join(REPO_ROOT, "src/data/aiUseCases.ts");
const ARTICLE_BACKLOG_FILE = path.join(REPO_ROOT, "src/data/articleBacklog.ts");
const UPDATES_FILE = path.join(REPO_ROOT, "src/data/updates.ts");

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const HREF_RE = /^\/[A-Za-z0-9/_-]*$/;
const FORBIDDEN_RE = /editor\.note\.com|cookie|token|session|api_key|authorization|bearer|password|secret/i;

function die(msg) {
  console.error(`publish-use-case-detail: ${msg}`);
  process.exit(1);
}

function loadPayload(filePath) {
  if (!fs.existsSync(filePath)) die(`file not found: ${filePath}`);
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.length > 16000) die(`payload too large (${raw.length} chars)`);
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    die(`invalid JSON: ${e.message}`);
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    die("payload must be a JSON object");
  }

  const requiredString = [
    "slug",
    "description",
    "target",
    "scene",
    "prompt",
    "input_example",
    "output_example",
    "improvement_prompt",
    "note_angle",
  ];
  const requiredArray = [
    "preparation",
    "steps",
    "check_points",
    "common_mistakes",
    "related_pages",
  ];

  for (const k of requiredString) {
    if (typeof data[k] !== "string" || data[k].length === 0) {
      die(`missing or empty string field: ${k}`);
    }
  }
  for (const k of requiredArray) {
    if (!Array.isArray(data[k]) || data[k].length === 0) {
      die(`missing or empty array field: ${k}`);
    }
  }

  if (!KEBAB_RE.test(data.slug)) die(`slug '${data.slug}' must be kebab-case`);

  // 認証情報・editor.note.com 混入を全文走査
  if (FORBIDDEN_RE.test(raw)) {
    die("payload contains forbidden pattern (editor.note.com / secret-like keys)");
  }

  // related_pages の構造
  for (const p of data.related_pages) {
    if (
      typeof p !== "object" ||
      p === null ||
      typeof p.label !== "string" ||
      typeof p.href !== "string" ||
      !HREF_RE.test(p.href)
    ) {
      die(`related_pages entries must be { label: string, href: "/..." }`);
    }
  }

  return data;
}

function escapeTs(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\$\{/g, "\\${");
}

function findUseCaseBlock(src, slug) {
  // slug: "..." を含むオブジェクトリテラルを探す
  const slugRe = new RegExp(`slug:\\s*"${slug}"`);
  const m = src.match(slugRe);
  if (!m) return null;
  const slugPos = m.index;

  // slug 位置から左に向かって、対応する `{` を探す
  let braceDepth = 0;
  let blockStart = -1;
  for (let i = slugPos; i >= 0; i--) {
    if (src[i] === "}") braceDepth++;
    else if (src[i] === "{") {
      if (braceDepth === 0) {
        blockStart = i;
        break;
      }
      braceDepth--;
    }
  }
  if (blockStart === -1) return null;

  // blockStart から右に向かって対応する `}` を探す
  braceDepth = 0;
  let inString = null;
  let prev = "";
  let blockEnd = -1;
  for (let i = blockStart; i < src.length; i++) {
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
    if (ch === "{") braceDepth++;
    else if (ch === "}") {
      braceDepth--;
      if (braceDepth === 0) {
        blockEnd = i;
        break;
      }
    }
    prev = ch;
  }
  if (blockEnd === -1) return null;

  return { start: blockStart, end: blockEnd, content: src.slice(blockStart, blockEnd + 1) };
}

function buildPublishedBlock(payload, currentBlock) {
  // 既存ブロックから id / title / category / tags / difficulty / timeToTry を抽出して維持
  const idMatch = currentBlock.match(/id:\s*"([^"]+)"/);
  const titleMatch = currentBlock.match(/title:\s*"([^"]+)"/);
  const categoryMatch = currentBlock.match(/category:\s*"([^"]+)"/);
  const tagsMatch = currentBlock.match(/tags:\s*\[([^\]]*)\]/);
  const difficultyMatch = currentBlock.match(/difficulty:\s*"([^"]+)"/);
  const timeMatch = currentBlock.match(/timeToTry:\s*"([^"]+)"/);

  if (!idMatch || !titleMatch || !categoryMatch || !tagsMatch || !difficultyMatch || !timeMatch) {
    die(
      `failed to extract base fields from existing planned entry for slug='${payload.slug}'`,
    );
  }

  const stepsTs = payload.steps.map((s) => `      "${escapeTs(s)}"`).join(",\n");
  const checkPointsTs = payload.check_points
    .map((s) => `      "${escapeTs(s)}"`)
    .join(",\n");
  const commonMistakesTs = payload.common_mistakes
    .map((s) => `      "${escapeTs(s)}"`)
    .join(",\n");
  const preparationTs = payload.preparation
    .map((s) => `      "${escapeTs(s)}"`)
    .join(",\n");
  const relatedPagesTs = payload.related_pages
    .map(
      (p) =>
        `      { label: "${escapeTs(p.label)}", href: "${escapeTs(p.href)}" }`,
    )
    .join(",\n");

  return [
    "{",
    `    id: "${idMatch[1]}",`,
    `    slug: "${escapeTs(payload.slug)}",`,
    `    title: "${escapeTs(titleMatch[1])}",`,
    `    description:`,
    `      "${escapeTs(payload.description)}",`,
    `    category: "${categoryMatch[1]}",`,
    `    tags: [${tagsMatch[1].trim()}],`,
    `    difficulty: "${difficultyMatch[1]}",`,
    `    timeToTry: "${timeMatch[1]}",`,
    `    status: "published",`,
    `    target:`,
    `      "${escapeTs(payload.target)}",`,
    `    scene:`,
    `      "${escapeTs(payload.scene)}",`,
    `    preparation: [`,
    preparationTs + ",",
    `    ],`,
    `    prompt:`,
    `      "${escapeTs(payload.prompt)}",`,
    `    inputExample:`,
    `      "${escapeTs(payload.input_example)}",`,
    `    outputExample:`,
    `      "${escapeTs(payload.output_example)}",`,
    `    improvementPrompt:`,
    `      "${escapeTs(payload.improvement_prompt)}",`,
    `    steps: [`,
    stepsTs + ",",
    `    ],`,
    `    checkPoints: [`,
    checkPointsTs + ",",
    `    ],`,
    `    commonMistakes: [`,
    commonMistakesTs + ",",
    `    ],`,
    `    noteAngle:`,
    `      "${escapeTs(payload.note_angle)}",`,
    `    relatedPages: [`,
    relatedPagesTs + ",",
    `    ],`,
    `  }`,
  ].join("\n");
}

function applyToAiUseCases(payload, dryRun) {
  const src = fs.readFileSync(AI_USE_CASES_FILE, "utf8");
  const block = findUseCaseBlock(src, payload.slug);
  if (!block) {
    die(`slug '${payload.slug}' not found in aiUseCases.ts`);
  }
  if (/status:\s*"published"/.test(block.content)) {
    return {
      action: "skipped",
      reason: "already published",
      file: "src/data/aiUseCases.ts",
    };
  }
  if (!/status:\s*"planned"/.test(block.content)) {
    die(
      `slug '${payload.slug}' is not in 'planned' state — refusing to overwrite`,
    );
  }
  const newBlock = buildPublishedBlock(payload, block.content);
  const updated = src.slice(0, block.start) + newBlock + src.slice(block.end + 1);
  if (dryRun) {
    return {
      action: "dry-run",
      file: "src/data/aiUseCases.ts",
      slug: payload.slug,
    };
  }
  fs.writeFileSync(AI_USE_CASES_FILE, updated, "utf8");
  return { action: "updated", file: "src/data/aiUseCases.ts", slug: payload.slug };
}

function applyToArticleBacklog(payload, dryRun) {
  if (!fs.existsSync(ARTICLE_BACKLOG_FILE)) {
    return { action: "skipped", reason: "articleBacklog.ts not present" };
  }
  const src = fs.readFileSync(ARTICLE_BACKLOG_FILE, "utf8");
  // suggestedSlug が一致するエントリを探して status を "published" に
  const slugRe = new RegExp(
    `suggestedSlug:\\s*"${payload.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
  );
  const m = src.match(slugRe);
  if (!m) {
    return {
      action: "skipped",
      reason: "no matching backlog entry by suggestedSlug",
    };
  }
  // entry block を見つけて status を更新
  let braceDepth = 0;
  let blockStart = -1;
  for (let i = m.index; i >= 0; i--) {
    if (src[i] === "}") braceDepth++;
    else if (src[i] === "{") {
      if (braceDepth === 0) {
        blockStart = i;
        break;
      }
      braceDepth--;
    }
  }
  braceDepth = 0;
  let blockEnd = -1;
  for (let i = blockStart; i < src.length; i++) {
    if (src[i] === "{") braceDepth++;
    else if (src[i] === "}") {
      braceDepth--;
      if (braceDepth === 0) {
        blockEnd = i;
        break;
      }
    }
  }
  if (blockStart === -1 || blockEnd === -1) {
    return { action: "skipped", reason: "block boundary not found" };
  }
  const block = src.slice(blockStart, blockEnd + 1);
  const updatedBlock = block.replace(
    /status:\s*"(?:candidate|outline-ready|needs-validation)"/,
    'status: "published"',
  );
  if (updatedBlock === block) {
    return { action: "skipped", reason: "status already published or unexpected" };
  }
  const updated =
    src.slice(0, blockStart) + updatedBlock + src.slice(blockEnd + 1);
  if (dryRun) {
    return { action: "dry-run", file: "src/data/articleBacklog.ts" };
  }
  fs.writeFileSync(ARTICLE_BACKLOG_FILE, updated, "utf8");
  return { action: "updated", file: "src/data/articleBacklog.ts" };
}

function applyToUpdates(payload, dryRun) {
  const src = fs.readFileSync(UPDATES_FILE, "utf8");
  const today = new Date().toISOString().slice(0, 10);
  const id = `${payload.slug}-use-case-live`;
  if (new RegExp(`id:\\s*"${id}"`).test(src)) {
    return { action: "skipped", reason: "updates entry already present" };
  }
  const entry = [
    "  {",
    `    id: "${id}",`,
    `    date: "${today}",`,
    `    title: "${escapeTs(payload.slug)} の詳細ページを公開しました",`,
    `    description:`,
    `      "AI活用辞典として ${escapeTs(payload.slug)} の完成版手順を公開しました。手順、コピペ用プロンプト、入力例、出力例、確認ポイント、よくある失敗、改善プロンプトを含みます。",`,
    `    href: "/ai-use-cases/${escapeTs(payload.slug)}",`,
    `    category: "辞典",`,
    "  },",
  ].join("\n");

  const anchor = "export const updates: UpdateItem[] = [";
  const idx = src.indexOf(anchor);
  if (idx === -1) die("updates anchor not found");
  const insertAt = src.indexOf("\n", idx) + 1;
  const updated = src.slice(0, insertAt) + entry + "\n" + src.slice(insertAt);
  if (dryRun) {
    return { action: "dry-run", file: "src/data/updates.ts" };
  }
  fs.writeFileSync(UPDATES_FILE, updated, "utf8");
  return { action: "added", file: "src/data/updates.ts" };
}

function main(argv) {
  if (argv.length < 1) {
    console.error("Usage: publish-use-case-detail <payload.json> [--dry-run]");
    process.exit(1);
  }
  const filePath = argv[0];
  const dryRun = argv.includes("--dry-run");
  const payload = loadPayload(filePath);
  const results = {
    aiUseCases: applyToAiUseCases(payload, dryRun),
    articleBacklog: applyToArticleBacklog(payload, dryRun),
    updates: applyToUpdates(payload, dryRun),
  };
  console.log(JSON.stringify({ dry_run: dryRun, slug: payload.slug, results }, null, 2));
}

main(process.argv.slice(2));
