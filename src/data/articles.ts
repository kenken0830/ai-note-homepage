export type Article = {
  title: string;
  description: string;
  publishedAt: string;
  href?: string;
  category: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    title: "ChatGPTを仕事の相棒にする最初の10個の型",
    description:
      "企画、調査、要約、メール作成まで、毎日の仕事にすぐ入れられるプロンプトの考え方を整理しました。",
    publishedAt: "2026-04-12",
    category: "ChatGPT活用",
    featured: true,
  },
  {
    title: "生成AIニュースを読むときに見るべき3つの視点",
    description:
      "新モデルや機能追加の発表を、実務への影響、コスト、使いどころから読み解くためのチェックリストです。",
    publishedAt: "2026-03-28",
    category: "AIニュース解説",
    featured: true,
  },
  {
    title: "AI副業を始める前に決めたいサービス設計",
    description:
      "ツール紹介で終わらせず、顧客の課題、納品物、価格の作り方まで実践寄りに解説します。",
    publishedAt: "2026-03-17",
    category: "AI副業",
    featured: true,
  },
  {
    title: "議事録作成をAIで15分短縮するワークフロー",
    description:
      "録音から要点整理、次のアクション抽出まで、チームで使いやすい形に落とし込む方法を紹介します。",
    publishedAt: "2026-02-26",
    category: "仕事効率化",
    featured: true,
  },
  {
    title: "画像生成AIでブランドの世界観を崩さないコツ",
    description:
      "プロンプト、参照画像、チェック項目を分けて、安定したビジュアルを作るための基本をまとめました。",
    publishedAt: "2026-02-11",
    category: "生成AI",
  },
  {
    title: "AIツール選びで失敗しない比較メモ",
    description:
      "話題性だけで選ばず、利用頻度、連携、セキュリティ、学習コストから判断するための考え方です。",
    publishedAt: "2026-01-30",
    category: "生成AI",
  },
];

export const featuredArticles = articles.filter((article) => article.featured);

export const latestNotes = articles.slice(0, 5);
