import type { PromptCategory } from "@/types/content";

export const promptCategories: PromptCategory[] = [
  {
    id: "meeting",
    name: "会議メモ用",
    description: "議論の流れを、決定事項と次の行動に変えるためのプロンプトです。",
    examples: [
      {
        id: "meeting-summary",
        title: "決定事項とTODOを分ける",
        useCase: "会議直後に、メモから議事録の骨子を作る",
        prompt:
          "以下の会議メモを、1. 決定事項、2. 未決事項、3. TODO、4. 次回確認することに分けて整理してください。曖昧な点は推測せず「確認が必要」と書いてください。",
      },
      {
        id: "meeting-risk",
        title: "抜け漏れを確認する",
        useCase: "共有前に、議事録の弱い部分を見つける",
        prompt:
          "以下の議事録案を読み、責任者、期限、判断理由が不足している箇所を指摘してください。最後に、追記すべき質問を5つ出してください。",
      },
    ],
  },
  {
    id: "reading",
    name: "読書メモ用",
    description: "本や記事から得た知識を、実践に使えるノートへ変えるためのプロンプトです。",
    examples: [
      {
        id: "reading-action",
        title: "実践ポイントに変える",
        useCase: "読書メモを仕事や発信に使える形へ整理する",
        prompt:
          "以下の読書メモを、重要な主張、使える具体例、自分の仕事に応用できる行動、追加で調べるべきことに分けてください。",
      },
    ],
  },
  {
    id: "learning",
    name: "学習用",
    description: "調べた内容を理解、疑問、復習に分けて定着させるプロンプトです。",
    examples: [
      {
        id: "learning-note",
        title: "学習ノート化する",
        useCase: "新しい概念をあとで復習できる形にする",
        prompt:
          "以下の学習メモを、用語の定義、重要ポイント、まだ分からない点、確認問題3問、次に読むべきテーマに分けて整理してください。",
      },
    ],
  },
  {
    id: "note-writing",
    name: "note記事化用",
    description: "毎日の実験ログを、読者に伝わる記事構成へ変えるためのプロンプトです。",
    examples: [
      {
        id: "note-outline",
        title: "note見出しを作る",
        useCase: "日々のAI実験ログから記事の骨子を作る",
        prompt:
          "以下の実験ログをnote記事にします。読者の悩み、結論、手順、失敗した点、明日試すことの順で見出し案を作ってください。",
      },
      {
        id: "note-hook",
        title: "冒頭文を作る",
        useCase: "読者が続きを読みたくなる導入を作る",
        prompt:
          "以下の記事メモから、読者の課題に寄り添う冒頭文を3案作ってください。誇張せず、実験ログとして自然な文体にしてください。",
      },
    ],
  },
  {
    id: "reflection",
    name: "振り返り用",
    description: "1日や1週間のメモから、改善点と次の実験を決めるプロンプトです。",
    examples: [
      {
        id: "weekly-review",
        title: "週次レビューを作る",
        useCase: "note投稿やAI活用の改善点を整理する",
        prompt:
          "以下の1週間のメモを、うまくいったこと、詰まったこと、繰り返すこと、やめること、来週の実験テーマ3つに分けてください。",
      },
    ],
  },
  {
    id: "planning",
    name: "企画用",
    description: "思いつきを、読者、切り口、検証手順のある企画へ変えるプロンプトです。",
    examples: [
      {
        id: "idea-plan",
        title: "企画案にする",
        useCase: "断片的なアイデアを投稿や検証テーマに変える",
        prompt:
          "以下のアイデアメモを、対象読者、読者の困りごと、検証する仮説、最初に作るアウトプット、失敗したときの見直し点に分けてください。",
      },
    ],
  },
  {
    id: "product",
    name: "商品化用",
    description: "反応が良かったメモや記事を、無料キットやテンプレート候補へ育てるプロンプトです。",
    examples: [
      {
        id: "product-seed",
        title: "商品候補に変える",
        useCase: "noteで反応があったテーマを商品案として整理する",
        prompt:
          "以下の反応が良かった記事メモを、無料で配る部分、有料テンプレートにする部分、相談で扱う部分、まだ検証が必要な部分に分けてください。",
      },
    ],
  },
];
