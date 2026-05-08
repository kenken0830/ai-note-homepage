#!/usr/bin/env node
/**
 * score-use-case-payload.mjs
 *
 * Scores a publish-use-case-detail payload JSON against the 100-point
 * quality rubric defined in docs/article-quality-score.md, using
 * mechanical checks where possible.
 *
 * This is *not* a perfect substitute for human editorial review of
 * subjective items (naturalness, accuracy of unverified claims). It
 * gates auto-merge by ensuring structural requirements are met.
 *
 * Usage:
 *   node scripts/score-use-case-payload.mjs <payload.json> [--threshold=80]
 *
 * Output:
 *   JSON to stdout: { score, passed, threshold, breakdown: [{item, points, max, note}] }
 *
 * Exit codes:
 *   0  scored successfully (regardless of pass/fail)
 *   1  invalid input
 */
import fs from "node:fs";
import path from "node:path";

function loadPayload(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function scorePayload(payload) {
  const breakdown = [];

  // 1. 読者のやりたいことが明確 (15)
  {
    const max = 15;
    let score = 0;
    const notes = [];
    if (typeof payload.description === "string" && payload.description.length >= 30) {
      score += 7;
    } else {
      notes.push("description が短い or 欠落");
    }
    if (typeof payload.target === "string" && payload.target.length >= 30) {
      score += 8;
    } else {
      notes.push("target が短い or 欠落");
    }
    breakdown.push({ item: "読者のやりたいことが明確", points: score, max, note: notes.join(" / ") });
  }

  // 2. 手順が具体的 (15)
  {
    const max = 15;
    let score = 0;
    const notes = [];
    if (Array.isArray(payload.steps) && payload.steps.length >= 4 && payload.steps.length <= 8) {
      score += 8;
    } else {
      notes.push(`steps 件数が範囲外 (got ${payload.steps?.length})`);
    }
    if (Array.isArray(payload.steps) && payload.steps.every((s) => typeof s === "string" && s.length >= 15)) {
      score += 7;
    } else {
      notes.push("各 step が短すぎる");
    }
    breakdown.push({ item: "手順が具体的", points: score, max, note: notes.join(" / ") });
  }

  // 3. コピペ用プロンプトが使える (15)
  {
    const max = 15;
    let score = 0;
    const notes = [];
    if (typeof payload.prompt === "string" && payload.prompt.length >= 80) {
      score += 6;
    } else {
      notes.push("prompt が短い");
    }
    if (typeof payload.prompt === "string" && /\{[^}]+\}/.test(payload.prompt)) {
      score += 5;
    } else {
      notes.push("prompt に変数 {...} が含まれない");
    }
    if (typeof payload.prompt === "string" && /[1-5]\.|出力形式|フォーマット|分けて/.test(payload.prompt)) {
      score += 4;
    } else {
      notes.push("prompt に出力形式の指定が見当たらない");
    }
    breakdown.push({ item: "コピペ用プロンプトが使える", points: score, max, note: notes.join(" / ") });
  }

  // 4. 入力例・出力例 (10)
  {
    const max = 10;
    let score = 0;
    const notes = [];
    if (typeof payload.input_example === "string" && payload.input_example.length >= 30) {
      score += 5;
    } else {
      notes.push("入力例が短い or 欠落");
    }
    if (typeof payload.output_example === "string" && payload.output_example.length >= 30) {
      score += 5;
    } else {
      notes.push("出力例が短い or 欠落");
    }
    breakdown.push({ item: "入力例・出力例", points: score, max, note: notes.join(" / ") });
  }

  // 5. よくある失敗と改善策 (10)
  {
    const max = 10;
    let score = 0;
    const notes = [];
    if (Array.isArray(payload.common_mistakes) && payload.common_mistakes.length >= 3) {
      score += 5;
    } else {
      notes.push("common_mistakes が 3 件未満");
    }
    if (typeof payload.improvement_prompt === "string" && payload.improvement_prompt.length >= 50) {
      score += 5;
    } else {
      notes.push("improvement_prompt が短い");
    }
    breakdown.push({ item: "よくある失敗と改善策", points: score, max, note: notes.join(" / ") });
  }

  // 6. 内部リンク (10)
  {
    const max = 10;
    let score = 0;
    const notes = [];
    const related = Array.isArray(payload.related_pages) ? payload.related_pages : [];
    const hrefs = related.map((p) => p?.href).filter((h) => typeof h === "string");
    const required = ["/free", "/prompts", "/workflows", "/guides", "/ai-use-cases"];
    const matched = required.filter((req) =>
      hrefs.some((href) => href === req || href.startsWith(`${req}/`)),
    );
    score += Math.min(10, matched.length * 2);
    if (matched.length < required.length) {
      notes.push(`関連ページに ${required.filter((r) => !matched.includes(r)).join(", ")} が無い`);
    }
    breakdown.push({ item: "内部リンク", points: score, max, note: notes.join(" / ") });
  }

  // 7. noteとの住み分け (10)
  {
    const max = 10;
    let score = 0;
    const notes = [];
    const noteAngle = typeof payload.note_angle === "string" ? payload.note_angle : "";
    if (noteAngle.length >= 40) score += 4;
    else notes.push("note_angle が短い");
    if (/note|実験ログ|ログ/.test(noteAngle)) score += 3;
    else notes.push("note_angle に「note/実験ログ」の住み分け表現が無い");
    if (/HP|ホームページ|手順|完成版|再現/.test(noteAngle)) score += 3;
    else notes.push("note_angle に「HP/手順/完成版」の住み分け表現が無い");
    breakdown.push({ item: "noteとの住み分け", points: score, max, note: notes.join(" / ") });
  }

  // 8. 未確認情報を断定していない (10)
  {
    const max = 10;
    let score = 10;
    const notes = [];
    const allText = [
      payload.description,
      payload.target,
      payload.scene,
      payload.prompt,
      payload.input_example,
      payload.output_example,
      ...(payload.steps ?? []),
      ...(payload.check_points ?? []),
      ...(payload.common_mistakes ?? []),
      payload.note_angle,
    ]
      .filter((s) => typeof s === "string")
      .join(" ");
    // Risk indicators: assertive numbers without source
    const numericClaims = allText.match(/\b\d+(\.\d+)?\s*(%|倍|割|時間短縮|ユーザー|ダウンロード)/g);
    if (numericClaims && numericClaims.length > 0) {
      score -= 5;
      notes.push(`未確認の数値表現の可能性: ${numericClaims.slice(0, 3).join(", ")}`);
    }
    if (/必ず.*できる|絶対に.*できる|誰でも.*できる/.test(allText)) {
      score -= 3;
      notes.push("断定表現の可能性");
    }
    if (score < 0) score = 0;
    breakdown.push({ item: "未確認情報を断定していない", points: score, max, note: notes.join(" / ") });
  }

  // 9. title/description が自然 (5) — slug が kebab-case で description が 1..200 chars
  {
    const max = 5;
    let score = 0;
    const notes = [];
    if (
      typeof payload.slug === "string" &&
      /^[a-z0-9]+(-[a-z0-9]+)*$/.test(payload.slug)
    ) {
      score += 2;
    } else {
      notes.push("slug が kebab-case でない");
    }
    if (
      typeof payload.description === "string" &&
      payload.description.length >= 30 &&
      payload.description.length <= 200
    ) {
      score += 3;
    } else {
      notes.push("description の長さが範囲外");
    }
    breakdown.push({ item: "title/description が自然", points: score, max, note: notes.join(" / ") });
  }

  const total = breakdown.reduce((acc, b) => acc + b.points, 0);
  const maxTotal = breakdown.reduce((acc, b) => acc + b.max, 0);
  return { score: total, max: maxTotal, breakdown };
}

function main(argv) {
  if (argv.length < 1) {
    console.error("Usage: score-use-case-payload <payload.json> [--threshold=80]");
    process.exit(1);
  }
  const filePath = path.resolve(argv[0]);
  const thresholdArg = argv.find((a) => a.startsWith("--threshold="));
  const threshold = thresholdArg ? parseInt(thresholdArg.split("=")[1], 10) : 80;

  let payload;
  try {
    payload = loadPayload(filePath);
  } catch (e) {
    console.error(`failed to load payload: ${e.message}`);
    process.exit(1);
  }

  const { score, max, breakdown } = scorePayload(payload);
  const passed = score >= threshold;

  const result = {
    slug: payload.slug ?? null,
    score,
    max,
    threshold,
    passed,
    breakdown,
  };

  console.log(JSON.stringify(result, null, 2));
}

main(process.argv.slice(2));
