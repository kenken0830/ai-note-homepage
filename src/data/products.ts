import { siteConfig } from "@/config/site";
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
    platform: "BOOTH / Newsletter",
    purchaseUrl: "/free",
    status: "planned",
    relatedArticleIds: ["ai-note-order", "prompt-first-ten"],
    ctaLabel: "配布準備を見る",
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
    id: "membership-lab",
    name: "AI Compass Lab",
    type: "メンバーシップ",
    description:
      "月次テーマ、実践ログ、質問、テンプレ更新を継続的に受け取るコミュニティ構想です。",
    audience: "AIノートを継続して改善したい読者",
    priceLabel: "月額制を検討中",
    platform: "note / Discord / LINE",
    purchaseUrl: "/community",
    status: "planned",
    relatedArticleIds: ["community-roadmap"],
    ctaLabel: "準備状況を見る",
  },
  {
    id: "consulting-session",
    name: "AIノート導線設計相談",
    type: "個別相談",
    description:
      "note、Zenn、Medium、BOOTH、メルマガ、ホームページをつなぐ導線を一緒に設計します。",
    audience: "発信を商品や相談につなげたい個人・事業者",
    priceLabel: "個別見積もり",
    platform: "Consulting",
    purchaseUrl: "/consulting",
    status: "available",
    relatedArticleIds: ["funnel-map-overview"],
    ctaLabel: "相談メニューを見る",
  },
];

export const featuredProducts = products.filter((product) =>
  [
    "free-starter-kit",
    "booth-template-pack",
    "prompt-card-pack",
    "zenn-builder-kit",
    "consulting-session",
  ].includes(product.id),
);
