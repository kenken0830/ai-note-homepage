#!/usr/bin/env node
/**
 * auto-publish-use-case.mjs
 *
 * Picks a planned use-case slug from src/data/aiUseCases.ts (cross-checked
 * with src/data/articleBacklog.ts for editorial intent), calls the Anthropic
 * Claude API to generate a publish-use-case-detail payload, validates the
 * payload structurally, and writes it to disk for downstream steps.
 *
 * Designed to run from GitHub Actions with `ANTHROPIC_API_KEY` set.
 *
 * Usage:
 *   node scripts/auto-publish-use-case.mjs --output <path> [--slug <slug>] [--model <model>]
 *
 * Behavior:
 *   - If --slug is provided, picks that slug (must be planned and have a backlog entry).
 *   - Otherwise, picks the highest-priority planned slug whose backlog entry status is
 *     candidate / outline-ready, deterministically tie-broken by alphabetical id.
 *   - Calls the Claude API once. Validates JSON shape. No retries.
 *
 * Output:
 *   <path>          — payload JSON ready for publish-use-case-detail.mjs
 *   stdout          — { slug, model, picked_from }
 *
 * Exit codes:
 *   0  payload generated successfully
 *   1  no eligible slug, API failure, or validation failure
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

const AI_USE_CASES_FILE = path.join(REPO_ROOT, "src/data/aiUseCases.ts");
const ARTICLE_BACKLOG_FILE = path.join(REPO_ROOT, "src/data/articleBacklog.ts");
const CONTENT_ASSETS_FILE = path.join(REPO_ROOT, "src/data/contentAssets.ts");
const QUALITY_RUBRIC_FILE = path.join(REPO_ROOT, "docs/article-quality-score.md");
const QUALITY_CHECKLIST_FILE = path.join(REPO_ROOT, "docs/content-quality-checklist.md");

const DEFAULT_MODEL = "claude-sonnet-4-5";

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FORBIDDEN_RE = /editor\.note\.com|cookie\s*:|token\s*:|api[_-]?key\s*:/i;

function die(msg, code = 1) {
  console.error(`auto-publish-use-case: ${msg}`);
  process.exit(code);
}

function readFile(p) {
  if (!fs.existsSync(p)) die(`file not found: ${p}`);
  return fs.readFileSync(p, "utf8");
}

function parseArgs(argv) {
  const args = { output: null, slug: null, model: DEFAULT_MODEL };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--output") args.output = argv[++i];
    else if (a === "--slug") args.slug = argv[++i];
    else if (a === "--model") args.model = argv[++i];
  }
  if (!args.output) die("--output <path> is required");
  return args;
}

/** Extract the planned aiUseCase block whose slug matches. */
function findPlannedUseCase(src, slug) {
  const slugRe = new RegExp(`slug:\\s*"${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}"`);
  const m = src.match(slugRe);
  if (!m) return null;
  const slugPos = m.index;

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

  braceDepth = 0;
  let blockEnd = -1;
  let inString = null;
  let prev = "";
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

  const content = src.slice(blockStart, blockEnd + 1);
  if (!/status:\s*"planned"/.test(content)) return null;

  const get = (key) => {
    const re = new RegExp(`\\b${key}:\\s*"([^"]+)"`);
    const found = content.match(re);
    return found ? found[1] : null;
  };
  const tagsMatch = content.match(/tags:\s*\[([^\]]*)\]/);
  return {
    raw: content,
    slug,
    title: get("title"),
    description: get("description"),
    category: get("category"),
    difficulty: get("difficulty"),
    timeToTry: get("timeToTry"),
    tags: tagsMatch ? tagsMatch[1].trim() : "",
  };
}

/** Find all planned slugs in aiUseCases.ts, in source order. */
function listAllPlannedSlugs(src) {
  const slugs = [];
  const slugRe = /slug:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    slugs.push({ slug: m[1], pos: m.index });
  }
  return slugs.filter((entry) => {
    const block = findPlannedUseCase(src, entry.slug);
    return block !== null;
  });
}

/** Find a backlog entry for a slug (by suggestedSlug). */
function findBacklogEntry(src, slug) {
  const re = new RegExp(`suggestedSlug:\\s*"${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}"`);
  const m = src.match(re);
  if (!m) return null;

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
  if (blockStart === -1) return null;

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
  if (blockEnd === -1) return null;

  const content = src.slice(blockStart, blockEnd + 1);
  const get = (key) => {
    const re = new RegExp(`\\b${key}:\\s*"([^"]+)"`);
    const found = content.match(re);
    return found ? found[1] : null;
  };
  return {
    id: get("id"),
    target: get("target"),
    noteAngle: get("noteAngle"),
    homepageAngle: get("homepageAngle"),
    searchIntent: get("searchIntent"),
    priority: get("priority"),
    status: get("status"),
  };
}

/**
 * 同じ topicSlug の公開済み note(type=note, status=published)を contentAssets.ts のテキスト解析でカウント。
 * 「5 回ルール」(docs/note-hp-content-strategy.md)で knowledge-rich 優先選定に使う。
 */
function countPublishedNotesForTopicSlug(contentAssetsSrc, slug) {
  const re = new RegExp(
    `topicSlug:\\s*"${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")}"`,
    "g",
  );
  const matches = [...contentAssetsSrc.matchAll(re)];
  let count = 0;
  for (const m of matches) {
    let braceDepth = 0;
    let blockStart = -1;
    for (let i = m.index; i >= 0; i--) {
      if (contentAssetsSrc[i] === "}") braceDepth++;
      else if (contentAssetsSrc[i] === "{") {
        if (braceDepth === 0) {
          blockStart = i;
          break;
        }
        braceDepth--;
      }
    }
    braceDepth = 0;
    let blockEnd = -1;
    for (let i = blockStart; i < contentAssetsSrc.length; i++) {
      if (contentAssetsSrc[i] === "{") braceDepth++;
      else if (contentAssetsSrc[i] === "}") {
        braceDepth--;
        if (braceDepth === 0) {
          blockEnd = i;
          break;
        }
      }
    }
    if (blockStart < 0 || blockEnd < 0) continue;
    const block = contentAssetsSrc.slice(blockStart, blockEnd + 1);
    if (/type:\s*"note"/.test(block) && /status:\s*"published"/.test(block)) {
      count++;
    }
  }
  return count;
}

/** Pick the next slug to publish. Knowledge-rich slugs are preferred. */
function pickSlug(useCasesSrc, backlogSrc, contentAssetsSrc) {
  const planned = listAllPlannedSlugs(useCasesSrc);
  if (planned.length === 0) {
    die("no planned use cases found in src/data/aiUseCases.ts");
  }
  const candidates = planned
    .map((p) => ({
      slug: p.slug,
      backlog: findBacklogEntry(backlogSrc, p.slug),
      noteCount: countPublishedNotesForTopicSlug(contentAssetsSrc, p.slug),
    }))
    .filter((p) => {
      if (!p.backlog) return false;
      const s = p.backlog.status;
      return s === "candidate" || s === "outline-ready";
    });
  if (candidates.length === 0) {
    return {
      slug: planned[0].slug,
      backlog: null,
      noteCount: 0,
      picked_from: "fallback-no-backlog",
    };
  }
  const priorityRank = { high: 0, medium: 1, low: 2 };
  // 優先順: (1) knowledge-rich (note >= 5), (2) priority, (3) noteCount 降順, (4) slug 名
  candidates.sort((a, b) => {
    const aRich = a.noteCount >= 5 ? 0 : 1;
    const bRich = b.noteCount >= 5 ? 0 : 1;
    if (aRich !== bRich) return aRich - bRich;
    const pa = priorityRank[a.backlog.priority ?? "low"] ?? 2;
    const pb = priorityRank[b.backlog.priority ?? "low"] ?? 2;
    if (pa !== pb) return pa - pb;
    if (b.noteCount !== a.noteCount) return b.noteCount - a.noteCount;
    return a.slug.localeCompare(b.slug);
  });
  const top = candidates[0];
  return {
    slug: top.slug,
    backlog: top.backlog,
    noteCount: top.noteCount,
    picked_from: top.noteCount >= 5 ? "knowledge-rich" : "backlog-priority",
  };
}

function buildPrompt({ useCase, backlog, rubric, checklist }) {
  return [
    "あなたは AI Compass Journal の編集エージェントです。",
    "やりたいこと別の AI 活用ユースケース詳細ページを、80 点品質基準を満たす完成版手順として日本語で書きます。",
    "",
    "## 作業対象",
    "",
    `slug: ${useCase.slug}`,
    `タイトル: ${useCase.title}`,
    `現状の説明: ${useCase.description}`,
    `カテゴリ: ${useCase.category}`,
    `タグ: ${useCase.tags}`,
    `難易度: ${useCase.difficulty}`,
    `試す時間の目安: ${useCase.timeToTry}`,
    "",
    backlog
      ? [
          "## articleBacklog 編集意図",
          "",
          `target(対象読者): ${backlog.target}`,
          `noteAngle(note 側の実験ログ視点): ${backlog.noteAngle}`,
          `homepageAngle(HP 側の手順視点): ${backlog.homepageAngle}`,
          `searchIntent(検索意図): ${backlog.searchIntent}`,
          `priority: ${backlog.priority}`,
          "",
        ].join("\n")
      : "(該当 articleBacklog エントリなし、上記 metadata から推定してください)",
    "",
    "## 品質ルーブリック(100 点満点、80 点未満は公開しません)",
    "",
    rubric.slice(0, 2400),
    "",
    "## コンテンツ品質チェックリスト",
    "",
    checklist.slice(0, 1800),
    "",
    "## 厳守する制約",
    "",
    "- note 本文の丸ごと転載をしない(noteは実験ログ、HP は再現できる完成版手順という住み分け)",
    "- editor.note.com の URL を含めない",
    "- 認証情報を匂わせるキー名(cookie / token / session / api_key 等)を含めない",
    "- 未確認の数値・統計・実績を断定で書かない",
    '- 「必ず」「絶対に」「誰でも」のような断定表現を避ける',
    "- 出力は JSON だけ。他の説明やコードフェンスは含めない",
    "",
    "## 必須フィールド(全て埋める)",
    "",
    "```json",
    "{",
    `  "slug": "${useCase.slug}",`,
    '  "description": "30〜200字、検索意図と合った説明",',
    '  "target": "誰向けか、業務文脈を含めた 80〜200字",',
    '  "scene": "使う場面 80〜200字",',
    '  "preparation": ["3 項目、各 30 字以上"],',
    '  "prompt": "コピペ用プロンプト本文。1. 2. 3. のような出力形式の指定と {変数} を含む 200〜500字",',
    '  "input_example": "実際の業務で起こりそうな具体的な入力 80〜250字",',
    '  "output_example": "AI が返しそうな現実的な出力 80〜250字",',
    '  "improvement_prompt": "1 回試した後の見直しプロンプト 80〜250字",',
    '  "steps": ["5〜7 個、各 25 字以上、命令形で具体的"],',
    '  "check_points": ["4〜5 個、Yes/No 判定可能、各 20 字以上"],',
    '  "common_mistakes": ["4〜5 個、具体的な失敗パターン、各 20 字以上"],',
    '  "note_angle": "noteは実験ログ視点、HPは完成版手順視点で住み分けを明記する 80〜200字",',
    '  "related_pages": [',
    '    {"label": "プロンプトテンプレート化", "href": "/ai-use-cases/make-prompt-template"},',
    '    {"label": "プロンプト集", "href": "/prompts"},',
    '    {"label": "ワークフロー", "href": "/workflows"},',
    '    {"label": "完全ガイド", "href": "/guides"},',
    '    {"label": "無料キット", "href": "/free"},',
    '    {"label": "AIでできること一覧", "href": "/ai-use-cases"}',
    "  ]",
    "}",
    "```",
    "",
    "出力は上記 JSON だけ。コードフェンスや説明文は付けないでください。",
  ].join("\n");
}

async function callAnthropic({ apiKey, model, prompt }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    die(`Anthropic API error ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
    die("Anthropic API returned empty content");
  }
  const textBlock = data.content.find((c) => c.type === "text");
  if (!textBlock) die("Anthropic API returned no text block");
  return textBlock.text;
}

function extractJsonFromText(text) {
  const trimmed = text.trim();
  // Strip optional code fence
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  const body = fenceMatch ? fenceMatch[1] : trimmed;
  return JSON.parse(body);
}

function validatePayload(payload) {
  const errors = [];
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
  for (const k of requiredString) {
    if (typeof payload[k] !== "string" || payload[k].length === 0) {
      errors.push(`${k} が空 or 文字列でない`);
    }
  }
  const requiredArray = [
    "preparation",
    "steps",
    "check_points",
    "common_mistakes",
    "related_pages",
  ];
  for (const k of requiredArray) {
    if (!Array.isArray(payload[k]) || payload[k].length === 0) {
      errors.push(`${k} が空 or 配列でない`);
    }
  }
  if (typeof payload.slug === "string" && !KEBAB_RE.test(payload.slug)) {
    errors.push(`slug ${payload.slug} が kebab-case でない`);
  }
  const allText = JSON.stringify(payload);
  if (FORBIDDEN_RE.test(allText)) {
    errors.push("payload に editor.note.com / 認証情報の痕跡");
  }
  return errors;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) die("ANTHROPIC_API_KEY environment variable is required");

  const useCasesSrc = readFile(AI_USE_CASES_FILE);
  const backlogSrc = readFile(ARTICLE_BACKLOG_FILE);
  const contentAssetsSrc = readFile(CONTENT_ASSETS_FILE);
  const rubric = readFile(QUALITY_RUBRIC_FILE);
  const checklist = readFile(QUALITY_CHECKLIST_FILE);

  let picked;
  if (args.slug) {
    const block = findPlannedUseCase(useCasesSrc, args.slug);
    if (!block) die(`slug '${args.slug}' is not in 'planned' state or not found`);
    picked = {
      slug: args.slug,
      backlog: findBacklogEntry(backlogSrc, args.slug),
      noteCount: countPublishedNotesForTopicSlug(contentAssetsSrc, args.slug),
      picked_from: "explicit",
    };
  } else {
    picked = pickSlug(useCasesSrc, backlogSrc, contentAssetsSrc);
  }

  const useCase = findPlannedUseCase(useCasesSrc, picked.slug);
  if (!useCase) die(`failed to extract use case for ${picked.slug}`);

  const prompt = buildPrompt({
    useCase,
    backlog: picked.backlog,
    rubric,
    checklist,
  });

  const responseText = await callAnthropic({
    apiKey,
    model: args.model,
    prompt,
  });

  let payload;
  try {
    payload = extractJsonFromText(responseText);
  } catch (e) {
    die(`failed to parse JSON from API response: ${e.message}\nresponse head: ${responseText.slice(0, 400)}`);
  }

  // Force the slug to match the picked one (defense against model drift)
  payload.slug = picked.slug;

  const errors = validatePayload(payload);
  if (errors.length > 0) {
    die(`payload validation failed:\n  - ${errors.join("\n  - ")}`);
  }

  fs.writeFileSync(args.output, JSON.stringify(payload, null, 2), "utf8");

  console.log(
    JSON.stringify(
      {
        slug: picked.slug,
        model: args.model,
        picked_from: picked.picked_from,
        published_note_count: picked.noteCount,
        knowledge_rich: picked.noteCount >= 5,
        output: args.output,
        payload_size: fs.statSync(args.output).size,
      },
      null,
      2,
    ),
  );
}

await main();
