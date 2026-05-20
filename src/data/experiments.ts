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
export const experiments: Experiment[] = [
  {
    id: "run-now-automation-test",
    slug: "run-now-automation-test",
    title:
      "ChatGPT Automation × Codex Desktop App で AI Compass Journal の記事更新は自動化できるか?",
    description:
      "PR #56 の実行結果をもとに、記事生成、ファイル編集、ローカル検証、GitHub 反映までのどこが自動化でき、どこで人間の介入が必要だったかを整理した初回実験です。",
    category: "自動化する",
    status: "published",
    conductedAt: "2026-05-20",
    publishedAt: "2026-05-20",
    hypothesis:
      "個人の AI 活用サイトの記事更新は、ChatGPT Automation と Codex Desktop App を組み合わせることで、記事案の生成・ファイル編集・ローカル検証までは高い割合で自動化できる。一方で、品質確認・GitHub への反映・マージ判断は、人間が担う必要が残ると予想する。",
    method:
      "ChatGPT Automation の Run now から Codex Desktop App に AI Compass Journal の planned ユースケース公開タスクを渡し、Codex が main 最新化、ブランチ作成、ファイル編集、ローカル検証、push / PR 作成まで進められるかを確認した。対象は PR #56 で、selected slug は explain-technical-terms、変更ファイルは src/data/aiUseCases.ts、src/data/articleBacklog.ts、src/data/updates.ts の3件だった。",
    subjects: [
      "ChatGPT Automation",
      "Codex Desktop App",
      "GitHub PR 作成",
      "Vercel Preview",
    ],
    trialCount: 1,
    successCriteria: [
      "Run now から処理が自動開始する",
      "Codex が対象ファイルを編集する",
      "記事追加 PR が自動で立つ",
      "lint / typecheck / build が通る",
      "note 本文の転載や未確認情報の断定がない",
      "人間が全面的に書き直さなくてもレビュー可能な品質になっている",
      "マージすれば公開できる状態になっている",
    ],
    automationRate: 50,
    automationRateDefinition:
      "自動化率は、Run now 起動後に自動完了した工程数を、検証対象工程数で割って算出する。検証対象工程は、処理開始、ファイル編集開始、必要ファイル更新、PR 作成、CI 実行、マージ可能状態の 6 工程とする。今回は Codex / Automation だけで自動完了した工程が 3 / 6 だったため、50% とした。マージ判断は安全上、人間の役割として自動化率には含めない。",
    dataPoints: [
      { label: "selected slug", value: "explain-technical-terms" },
      { label: "relatedUseCaseSlug", value: "explain-technical-terms" },
      { label: "referenceUseCaseSlug", value: "build-ai-agent-skill-file" },
      { label: "対象 PR", value: "#56" },
      {
        label: "元ブランチ",
        value: "codex/publish-planned-use-case-detail",
      },
      {
        label: "元 commit",
        value:
          "384283b feat(use-case): publish explain-technical-terms detail page",
      },
      { label: "変更ファイル数", value: 3, unit: "files" },
      { label: "自動完了工程", value: "3 / 6", unit: "steps" },
      { label: "automationRate", value: 50, unit: "%" },
      { label: "npm run lint", value: "PASS" },
      { label: "npm run typecheck", value: "PASS" },
      { label: "npm run build", value: "PASS" },
      { label: "npm run validate-content-assets", value: "PASS" },
      {
        label: "npm run validate-experiment-config",
        value: "対象外 / config.yml 引数必須のため今回の通常検証から除外",
      },
    ],
    failureCases: [
      {
        description: "GitHub HTTPS 認証なしで git push が失敗した",
        occurrences: 1,
        example:
          "fatal: could not read Username for 'https://github.com': No such file or directory",
      },
      {
        description:
          "GitHub connector の branch 作成が 403 Resource not accessible by integration で拒否された",
        occurrences: 1,
        example:
          "GitHub API error 403: Resource not accessible by integration",
      },
      {
        description: "PR 作成は人間の補助が必要だった",
        occurrences: 1,
      },
    ],
    agentConsiderations: [
      {
        agent: "codex",
        perspective: "自動化できた範囲",
        body:
          "planned ユースケースの選定、必要ファイルの編集、lint / typecheck / build / validate-content-assets のローカル検証までは Codex が完了した。記事内容も note 本文の転載ではなく、HP向けの再現手順として成立した。",
      },
      {
        agent: "codex",
        perspective: "停止した範囲",
        body:
          "GitHub への push と PR 作成は、HTTPS 認証と connector 権限で停止した。これは記事生成能力の問題ではなく、リポジトリへ書き込む認証・権限設計の問題として分けて扱う必要がある。",
      },
      {
        agent: "human",
        perspective: "運用判断",
        body:
          "現時点では、AI が記事更新の下準備を行い、人間が push、PR 作成、レビュー、マージ判断を担う運用が現実的。完全自動化を目指す前に、書き込み権限と公開判断の境界を明確にする必要がある。",
      },
    ],
    integratedConsideration:
      "記事生成・ファイル編集・ローカル検証までは自動化できた。一方で、GitHub への push / PR 作成は認証で止まり、完全自動化には至らなかった。現時点では「記事更新の下準備を自動化し、人間がPR化と公開判断を担う」運用が現実的。",
    nextSteps: [
      "Codex / GitHub の push 権限を整理する",
      "PR 作成まで自動化できる設定を検証する",
      "2回目以降の実験で automationRate が改善するか測定する",
      "Search Console 登録後、実験記事の流入を確認する",
    ],
    reproductionSteps: [
      "GitHub リポジトリを main 最新状態にする",
      "ChatGPT Automation または Codex Desktop App に記事公開タスクを投げる",
      "planned ユースケースを 1 件選ばせる",
      "詳細ページ化に必要なデータファイルを編集させる",
      "lint / typecheck / build / validate-content-assets を実行する",
      "GitHub への push / PR 作成ができるか確認する",
      "PR を人間がレビューし、問題なければマージする",
    ],
    relatedUseCaseSlug: "explain-technical-terms",
    referenceUseCaseSlug: "build-ai-agent-skill-file",
    tags: [
      "自動化",
      "ChatGPT Automation",
      "Codex",
      "サイト運営",
      "実験",
    ],
  },
];

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
