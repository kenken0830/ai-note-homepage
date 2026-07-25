import { siteConfig } from "@/config/site";
import { isPlaceholderUrl } from "@/lib/utm";
import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    id: "free-starter-kit",
    name: "AIノート無料スターターキット",
    type: "無料キット",
    description:
      "AIノート基本テンプレート、プロンプト10個、1週間導入ガイドをまとめた入口商品です。",
    audience: "AIノートをこれから始める個人、note読者",
    priceLabel: "無料",
    platform: "サイト内配布",
    purchaseUrl: "/free",
    status: "available",
    relatedArticleIds: ["ai-note-order", "prompt-first-ten"],
    ctaLabel: "無料キットを見る",
  },
  {
    id: "booth-template-pack",
    name: "AIノート運用テンプレート集",
    type: "BOOTHテンプレート",
    description:
      "情報収集、要約、記事化、商品化までを1つのノート運用にまとめるテンプレート集です。",
    audience: "AI発信を習慣化したいクリエイター、個人事業主",
    priceLabel: "1,000-3,000円想定",
    platform: "BOOTH",
    purchaseUrl: siteConfig.links.booth,
    status: "planned",
    relatedArticleIds: ["ai-note-order", "workflow-library"],
    ctaLabel: "販売準備を見る",
  },
  {
    id: "weekly-paid-note",
    name: "AI運用の週次深掘り",
    type: "note有料記事",
    description:
      "AI運用で実際に起きた失敗、判断基準、テンプレート、チェックリストを週次でまとめる買い切り記事です。",
    audience: "AI活用を仕組みとして運用したい個人、クリエイター",
    priceLabel: "1記事980円",
    platform: "note",
    purchaseUrl: siteConfig.links.note,
    status: "draft",
    relatedArticleIds: ["meeting-workflow", "prompt-first-ten"],
    ctaLabel: "公開状況を見る",
  },
  {
    id: "prompt-card-pack",
    name: "仕事効率化プロンプトカード",
    type: "note有料記事",
    description:
      "調査、比較、要約、企画、メール、議事録に使えるカード型プロンプトを収録します。",
    audience: "ChatGPTを仕事で使いたい会社員、チームリーダー",
    priceLabel: "500-1,500円想定",
    platform: "note",
    purchaseUrl: siteConfig.links.note,
    status: "draft",
    relatedArticleIds: ["prompt-first-ten", "meeting-workflow"],
    ctaLabel: "準備状況を見る",
  },
  {
    id: "zenn-builder-kit",
    name: "AIノート技術者向けキット",
    type: "Zenn本・技術キット",
    description:
      "Markdown、GitHub、静的サイト、AI補助をつなぐ技術者向けの実装キットです。",
    audience: "開発者、技術ブログ運営者、Zenn読者",
    priceLabel: "1,500-4,000円想定",
    platform: "Zenn / GitHub",
    purchaseUrl: siteConfig.links.zenn,
    status: "planned",
    relatedArticleIds: ["zenn-knowledge-base"],
    ctaLabel: "技術キットを見る",
  },
  {
    id: "automation-design-pack",
    name: "AI自動化設計テンプレートパック",
    type: "BOOTHテンプレート",
    description:
      "自動化対象の棚卸し、優先順位、停止条件、週次評価を自分で設計できる買い切りテンプレート集です。",
    audience: "顧客対応なしでAI運用を整えたい個人、クリエイター",
    priceLabel: "1,980-3,980円想定",
    platform: "BOOTH",
    purchaseUrl: siteConfig.links.booth,
    status: "planned",
    relatedArticleIds: ["funnel-map-overview", "workflow-library"],
    ctaLabel: "販売準備を見る",
  },
];

const externalProfileOnlyPatterns = [
  /^https?:\/\/note\.com\/[^/]+\/?$/i,
  /^https?:\/\/zenn\.dev\/[^/]+\/?$/i,
  /^https?:\/\/[^/]+\.booth\.pm\/?$/i,
];

export function isSafePublicProductTarget(url: string) {
  const target = url.trim();
  if (
    isPlaceholderUrl(target) ||
    /^[a-z]:[\\/]/i.test(target) ||
    target.startsWith("file:") ||
    target.startsWith("//")
  ) {
    return false;
  }

  if (target.startsWith("/")) {
    return !target.startsWith("//");
  }

  try {
    const parsed = new URL(target);
    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      !parsed.username &&
      !parsed.password &&
      !externalProfileOnlyPatterns.some((pattern) => pattern.test(target))
    );
  } catch {
    return false;
  }
}

export function isPublicProduct(product: Product) {
  return product.status === "available" && isSafePublicProductTarget(product.purchaseUrl);
}

export const publicProducts = products.filter(isPublicProduct);

export function getPublicProductById(productId: string) {
  return publicProducts.find((product) => product.id === productId);
}

export const featuredProducts = publicProducts.filter(
  (product) => product.id === "free-starter-kit",
);
