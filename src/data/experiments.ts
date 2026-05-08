import type { Experiment } from "@/types/content";

// マルチエージェント独自実験の静的データ。
// 自動化ワークフロー(`.github/workflows/run-experiment.yml`)が
// `scripts/experiments/[id].yml` の設定で実験を実行し、
// Codex App / Claude Code Action のマルチエージェント合意で考察を生成して
// このファイルに append する想定。
//
// このファイルから:
//   - /experiments(一覧ページ)
//   - /experiments/[slug](詳細ページ)
//   - sitemap / llms.txt
// が動的に生成される。
//
// 安全境界:
//   - editor.note.com URL を扱わない
//   - 認証情報を含めない
//   - 数値・主張は実験で実測したものか、出典付きで明記する
export const experiments: Experiment[] = [];

export function getExperimentBySlug(slug: string): Experiment | undefined {
  return experiments.find(
    (e) => e.slug === slug && e.status === "published",
  );
}

export const publishedExperiments = experiments.filter(
  (e) => e.status === "published",
);

export function getExperimentsByTopicSlug(
  topicSlug: string,
): Experiment[] {
  return publishedExperiments.filter(
    (e) => e.relatedUseCaseSlug === topicSlug,
  );
}
