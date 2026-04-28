import type { AiUseCase } from "@/types/content";
import {
  aiUseCaseCategories,
  aiUseCases as baseAiUseCases,
} from "@/data/aiUseCases";

const todoListUseCase: AiUseCase = {
  id: "todo-list",
  slug: "make-todo-list",
  title: "AIで散らかったメモからTODOリストを作る方法",
  description:
    "思いつき、会話メモ、作業メモを整理し、今日やること、確認すること、保留することに分けます。",
  category: "整える",
  tags: ["TODO", "整理", "仕事効率化"],
  difficulty: "beginner",
  timeToTry: "10分",
  status: "published",
  target:
    "メモは残しているのに、何から手を付けるか決められない人、会議後や作業後にTODOを拾い切れない人向けです。",
  scene:
    "朝の作業開始前、会議後、1日の終わり、noteや学習メモを次の行動に変えたい場面で使います。",
  preparation: [
    "箇条書き、走り書き、チャットのメモなど、整理前の素材を用意する",
    "今日やる、今週やる、確認する、保留するのどれで分けたいか決める",
    "締切、相手、提出先など、分かっている条件を追記する",
  ],
  prompt:
    "以下の散らかったメモをTODOリストに整理してください。1. 今日やること、2. 今週やること、3. 確認が必要なこと、4. 保留すること、5. 削ってよいことに分けてください。各TODOは動詞で始め、担当者、期限、必要な素材が不明な場合は「確認が必要」と書いてください。最後に、最初に取り組むべき3つを理由つきで提案してください。",
  inputExample:
    "メモ: noteの下書きを直す。無料キットの説明が長いかも。山田さんに確認。来週の投稿テーマを決める。請求書の件、金額を確認。プロンプト集の導線も見直したい。",
  outputExample:
    "今日やること: note下書きを読み直し、結論が分かるように冒頭を直す。山田さんに無料キット説明の長さを確認する。確認が必要: 請求書の金額。今週やること: 来週の投稿テーマを3案に絞る。保留: プロンプト集導線の全面見直し。",
  improvementPrompt:
    "このTODOリストを実行した結果をもとに、残ったTODO、実行できたTODO、曖昧だったTODOを分けてください。次回からAIに渡すメモに追加すべき条件を3つ提案してください。",
  steps: [
    "整理前のメモをそのまま集め、日付、相手、締切など分かる情報だけ追記する",
    "AIに、今日やること、今週やること、確認が必要なこと、保留、削除候補に分けてもらう",
    "AIが推測した担当者、期限、優先順位を自分で確認する",
    "最初に取り組む3つだけを選び、実行できる動詞に直す",
    "終わった後に、残ったTODOと曖昧だったTODOを改善プロンプトで見直す",
  ],
  checkPoints: [
    "TODOが「確認する」「送る」「直す」など具体的な動詞で始まっているか",
    "今日やることが多すぎず、実行できる数に絞られているか",
    "期限、担当者、必要な素材をAIが勝手に補っていないか",
    "保留や削除候補が分かれていて、全部をやる前提になっていないか",
  ],
  commonMistakes: [
    "メモをきれいに並べるだけで、行動に変わっていない",
    "AIの優先順位をそのまま採用し、自分の締切や体力を反映しない",
    "確認が必要なことまでTODOに入れ、着手できない項目を増やす",
    "今日やることを10個以上にして、結局どれも進まない",
  ],
  noteAngle:
    "noteでは、散らかったメモをAIでTODO化し、実際に終わったもの、残ったもの、曖昧だったものを実験ログとして書きます。ホームページでは、同じ流れを再現できる手順として整理しています。",
  relatedPages: [
    { label: "無料キット", href: "/free" },
    { label: "プロンプト集", href: "/prompts" },
    { label: "ワークフロー", href: "/workflows" },
    { label: "完全ガイド", href: "/guides" },
    { label: "AIでできること一覧", href: "/ai-use-cases" },
  ],
};

const publishedOverrides = new Map<string, AiUseCase>([
  [todoListUseCase.id, todoListUseCase],
]);

export { aiUseCaseCategories };

export const aiUseCases = baseAiUseCases.map(
  (useCase) => publishedOverrides.get(useCase.id) ?? useCase,
);

export const publishedAiUseCases = aiUseCases.filter(
  (useCase) => useCase.status === "published",
);

export function getAiUseCaseBySlug(slug: string) {
  return publishedAiUseCases.find((useCase) => useCase.slug === slug);
}
