#!/usr/bin/env node
/**
 * validate-experiment-config.mjs
 *
 * scripts/experiments/[id].yml の設定ファイルを検証する。
 * シンプルな YAML サブセット(キー: 値、ハイフン箇条書き)に対応する手書きパーサで、
 * 依存ゼロで動く。
 *
 * Usage:
 *   node scripts/validate-experiment-config.mjs <path/to/config.yml>
 *
 * Exit codes:
 *   0  PASS
 *   1  FAIL
 */
import fs from "node:fs";
import path from "node:path";

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FORBIDDEN_RE = /editor\.note\.com|cookie\s*:|token\s*:|api[_-]?key\s*:|password\s*:|secret\s*:/i;
const ALLOWED_AGENTS = new Set([
  "codex",
  "claude-sonnet",
  "claude-opus",
  "gpt-5",
  "gpt-thinking",
  "gemini",
  "human",
]);

function parseYaml(text) {
  // 最小サブセットの YAML パーサ。
  // - キー: 値(クォート任意)
  // - ハイフン箇条書き(文字列リスト or オブジェクトリスト)
  // - 多段ネスト(per-frame の pendingListKey を保持)
  // 複雑な YAML 機能(アンカー / マルチライン文字列 / フロー記法)は未対応。
  const lines = text.split(/\r?\n/);
  const root = {};
  // 各フレームは pendingListKey を独自に保持する
  const stack = [
    { container: root, indent: -1, kind: "object", pendingListKey: null },
  ];

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const raw = lines[lineNum];
    if (!raw.trim()) continue;
    if (raw.trim().startsWith("#")) continue;

    const indentMatch = raw.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    const trimmed = raw.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    const top = stack[stack.length - 1];

    if (trimmed.startsWith("- ")) {
      const itemText = trimmed.slice(2).trim();
      if (top.kind === "object" && top.pendingListKey) {
        const arr = top.container[top.pendingListKey];
        if (itemText.includes(":")) {
          const obj = {};
          arr.push(obj);
          stack.push({
            container: obj,
            indent,
            kind: "object",
            pendingListKey: null,
          });
          const colonIdx = itemText.indexOf(":");
          const key = itemText.slice(0, colonIdx).trim();
          const val = itemText.slice(colonIdx + 1).trim();
          obj[key] = unquote(val);
        } else {
          arr.push(unquote(itemText));
        }
        continue;
      }
      throw new Error(
        `line ${lineNum + 1}: unexpected list item without parent key`,
      );
    }

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) {
      throw new Error(
        `line ${lineNum + 1}: expected 'key: value', got: ${trimmed}`,
      );
    }
    const key = trimmed.slice(0, colonIdx).trim();
    const val = trimmed.slice(colonIdx + 1).trim();

    if (!val) {
      // Look ahead to determine if this is an object child or list parent
      let nextIdx = lineNum + 1;
      while (
        nextIdx < lines.length &&
        (!lines[nextIdx].trim() || lines[nextIdx].trim().startsWith("#"))
      ) {
        nextIdx++;
      }
      if (nextIdx < lines.length) {
        const nextTrimmed = lines[nextIdx].trim();
        const nextIndent = (lines[nextIdx].match(/^(\s*)/) ?? [""])[0].length;
        if (nextTrimmed.startsWith("- ") && nextIndent > indent) {
          top.container[key] = [];
          top.pendingListKey = key;
          continue;
        }
      }
      top.container[key] = "";
      // 現在のフレームの pendingListKey は触らない(別のキーなら関係ない)
      continue;
    }

    top.container[key] = unquote(val);
    // 通常の key: value はリストペアレントを持たないキー。
    // pendingListKey は同じ frame 上にある別のリストキー宣言を保護するため触らない。
  }

  return root;
}

function unquote(s) {
  if (typeof s !== "string") return s;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function fail(errors) {
  console.log("FAIL");
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}

function main(argv) {
  if (argv.length < 1) {
    console.error("Usage: validate-experiment-config <config.yml>");
    process.exit(1);
  }
  const filePath = path.resolve(argv[0]);
  if (!fs.existsSync(filePath)) {
    console.log(`FAIL\n  - file not found: ${filePath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  if (raw.length > 16000) {
    console.log(`FAIL\n  - config too large (${raw.length} chars)`);
    process.exit(1);
  }
  if (FORBIDDEN_RE.test(raw)) {
    console.log("FAIL\n  - forbidden pattern (editor.note.com / secret-like keys) detected");
    process.exit(1);
  }
  let cfg;
  try {
    cfg = parseYaml(raw);
  } catch (e) {
    console.log(`FAIL\n  - YAML parse: ${e.message}`);
    process.exit(1);
  }

  const errors = [];

  for (const k of [
    "id",
    "slug",
    "title",
    "description",
    "hypothesis",
    "method",
    "subjects",
    "trial_count",
    "tags",
    "agent_perspectives",
    "reproduction_steps",
    "next_steps",
  ]) {
    if (!(k in cfg)) errors.push(`missing required: ${k}`);
  }

  if (typeof cfg.slug === "string" && !KEBAB_RE.test(cfg.slug)) {
    errors.push(`slug '${cfg.slug}' must be kebab-case`);
  }
  if (typeof cfg.id === "string" && !KEBAB_RE.test(cfg.id)) {
    errors.push(`id '${cfg.id}' must be kebab-case`);
  }

  if (Array.isArray(cfg.subjects) && cfg.subjects.length < 2) {
    errors.push(`subjects must have >= 2 entries (got ${cfg.subjects.length})`);
  }
  const tc = parseInt(cfg.trial_count, 10);
  if (Number.isNaN(tc) || tc < 5) {
    errors.push(`trial_count must be integer >= 5`);
  }

  if (Array.isArray(cfg.agent_perspectives)) {
    if (cfg.agent_perspectives.length < 2) {
      errors.push("agent_perspectives must have >= 2 entries");
    }
    for (let i = 0; i < cfg.agent_perspectives.length; i++) {
      const p = cfg.agent_perspectives[i];
      if (!p.agent || !ALLOWED_AGENTS.has(p.agent)) {
        errors.push(
          `agent_perspectives[${i}].agent '${p.agent}' not allowed (${[...ALLOWED_AGENTS].join("/")})`,
        );
      }
      if (!p.perspective || typeof p.perspective !== "string") {
        errors.push(`agent_perspectives[${i}].perspective is required`);
      }
      if (!p.instruction || typeof p.instruction !== "string") {
        errors.push(`agent_perspectives[${i}].instruction is required`);
      }
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log("PASS");
  console.log(JSON.stringify({ slug: cfg.slug, subjects: cfg.subjects, trial_count: cfg.trial_count }, null, 2));
  process.exit(0);
}

main(process.argv.slice(2));
