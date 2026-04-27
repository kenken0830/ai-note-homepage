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

export type UpdateItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  href: string;
  category: string;
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
};
