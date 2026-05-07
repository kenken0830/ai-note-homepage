export type PlatformId =
  | "note"
  | "zenn"
  | "medium"
  | "booth"
  | "github"
  | "x"
  | "youtube"
  | "newsletter"
  | "community";

export type ProductStatus = "available" | "planned" | "draft";

export type ArticleStatus = "published" | "sample" | "planned";

export type FunnelStage =
  | "discover"
  | "learn"
  | "download"
  | "nurture"
  | "buy"
  | "join"
  | "consult";

export type Platform = {
  id: PlatformId;
  name: string;
  role: string;
  url: string;
  description: string;
  cadence: string;
  contentTypes: string[];
  primaryCta: string;
  homepagePath: string;
};

export type Product = {
  id: string;
  name: string;
  type: string;
  description: string;
  audience: string;
  priceLabel: string;
  platform: string;
  purchaseUrl: string;
  status: ProductStatus;
  relatedArticleIds: string[];
  ctaLabel: string;
};

export type Article = {
  id: string;
  title: string;
  source: PlatformId | "site";
  sourceUrl: string;
  description: string;
  status: ArticleStatus;
  tags: string[];
  funnelStage: FunnelStage;
  relatedProductIds: string[];
  isPlaceholder: boolean;
  publishedAt: string;
};

export type NotePost = {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  relatedUseCaseSlug?: string;
  relatedPages: {
    label: string;
    href: string;
  }[];
  homepageCandidate: boolean;
  priority: "high" | "medium" | "low";
  noteAngle?: string;
  homepageAngle?: string;
};

// テーマ単位で複数コンテンツ(note / 漫画 / 動画 / テンプレ / キット / 商品 /
// ワークフロー / プロンプト)を束ねるための統一型。
// `topicSlug` は通常 `/ai-use-cases/[slug]` の slug と一致させる。
// `status: "published"` のときだけ `url` を必須相当として扱い、
// `planned` / `draft` はリンク化しない方針(UI 側で非リンク表示)。
// 既存 NotePost とは並存し、表示層で統合する想定。
export type ContentAssetType =
  | "note"
  | "manga"
  | "video"
  | "template"
  | "kit"
  | "product"
  | "workflow"
  | "prompt";

export type ContentAssetStatus = "published" | "planned" | "draft";

export type ContentAsset = {
  id: string;
  topicSlug: string;
  type: ContentAssetType;
  title: string;
  description: string;
  url?: string;
  status: ContentAssetStatus;
  source: string;
  publishedAt?: string;
  tags: string[];
  relatedUseCaseSlug?: string;
  priority: "high" | "medium" | "low";
};

export type UpdateItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  href: string;
  category: string;
};

export type GuideSection = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

export type PromptExample = {
  id: string;
  title: string;
  prompt: string;
  useCase: string;
};

export type PromptCategory = {
  id: string;
  name: string;
  description: string;
  examples: PromptExample[];
};

export type Workflow = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  output: string;
};

export type AiUseCaseStatus = "published" | "planned";

export type AiUseCaseDifficulty = "beginner" | "intermediate";

export type AiUseCaseRelatedPage = {
  label: string;
  href: string;
};

export type AiUseCase = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: AiUseCaseDifficulty;
  timeToTry: string;
  status: AiUseCaseStatus;
  target?: string;
  scene?: string;
  preparation?: string[];
  prompt: string;
  inputExample?: string;
  outputExample?: string;
  improvementPrompt?: string;
  steps: string[];
  commonMistakes: string[];
  checkPoints: string[];
  noteAngle: string;
  relatedPages: AiUseCaseRelatedPage[];
};

export type ArticleBacklogPriority = "high" | "medium" | "low";

export type ArticleBacklogStatus =
  | "candidate"
  | "outline-ready"
  | "needs-validation"
  | "published";

export type ArticleBacklogItem = {
  id: string;
  title: string;
  category: string;
  target: string;
  noteAngle: string;
  homepageAngle: string;
  searchIntent: string;
  priority: ArticleBacklogPriority;
  status: ArticleBacklogStatus;
  relatedPages: string[];
  suggestedSlug: string;
};

export type FunnelStep = {
  id: string;
  label: string;
  description: string;
  href: string;
  sourcePlatformIds: PlatformId[];
  nextStepIds: string[];
};

export type NavItem = {
  label: string;
  href: string;
  showInHeader?: boolean;
};
