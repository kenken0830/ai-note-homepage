import { siteConfig } from "@/config/site";
import type { Platform } from "@/types/content";

export const platforms: Platform[] = [
  {
    id: "note",
    name: "note",
    role: "日本語の実践マガジン",
    url: siteConfig.links.note,
    description:
      "AIニュース、ChatGPT活用、仕事効率化を、日々の行動に落とし込める記事として届けます。",
    cadence: "週2-4本",
    contentTypes: ["解説記事", "活用ログ", "有料記事", "メンバーシップ"],
    primaryCta: "noteを読む",
    homepagePath: "/library?source=note",
  },
  {
    id: "zenn",
    name: "Zenn",
    role: "技術者向けの実装知",
    url: siteConfig.links.zenn,
    description:
      "AIワークフロー、プロンプト設計、GitHub連携など、開発者が再現できる形で整理します。",
    cadence: "月2本",
    contentTypes: ["技術記事", "Zenn本", "コード付き解説"],
    primaryCta: "Zenn記事を見る",
    homepagePath: "/library?source=zenn",
  },
  {
    id: "medium",
    name: "Medium",
    role: "英語圏への入口",
    url: siteConfig.links.medium,
    description:
      "AI note-taking workflowsを英語で紹介し、海外読者を英語ニュースレターへ戻します。",
    cadence: "月1-2本",
    contentTypes: ["English essays", "Case studies", "Workflow notes"],
    primaryCta: "Mediumを開く",
    homepagePath: "/en",
  },
  {
    id: "booth",
    name: "BOOTH",
    role: "テンプレート販売所",
    url: siteConfig.links.booth,
    description:
      "AIノートのテンプレート、プロンプトカード、導入ガイドを購入・無料DLできる場所にします。",
    cadence: "商品追加ごと",
    contentTypes: ["無料配布", "テンプレート", "プロンプト集"],
    primaryCta: "商品を見る",
    homepagePath: "/products",
  },
  {
    id: "github",
    name: "GitHub",
    role: "公開キットと実装サンプル",
    url: siteConfig.links.github,
    description:
      "技術者向けスターター、記事連動のサンプル、サイト改善履歴を公開する置き場です。",
    cadence: "更新時",
    contentTypes: ["サンプルコード", "テンプレート", "ドキュメント"],
    primaryCta: "GitHubを見る",
    homepagePath: "/products",
  },
  {
    id: "x",
    name: "X",
    role: "発見と速報",
    url: siteConfig.links.x,
    description:
      "短い気づき、ニュース速報、記事の入口を流し、詳しい解説は本店へ戻します。",
    cadence: "随時",
    contentTypes: ["短文メモ", "記事告知", "ニュース反応"],
    primaryCta: "Xをフォロー",
    homepagePath: "/start",
  },
  {
    id: "youtube",
    name: "YouTube",
    role: "画面で学ぶ導入ガイド",
    url: siteConfig.links.youtube,
    description:
      "AIノートの作り方、テンプレート活用、商品導線の設計を動画で見せます。",
    cadence: "準備中",
    contentTypes: ["チュートリアル", "ライブ解説", "ショート動画"],
    primaryCta: "YouTubeを見る",
    homepagePath: "/media",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    role: "無料DL後の学習導線",
    url: siteConfig.links.newsletter,
    description:
      "無料キットの使い方から、有料テンプレート、コミュニティ、相談まで段階的に案内します。",
    cadence: "ステップ配信",
    contentTypes: ["無料キット", "導入メール", "商品案内"],
    primaryCta: "メルマガ登録",
    homepagePath: "/newsletter",
  },
  {
    id: "community",
    name: "Community",
    role: "継続実践の場所",
    url: siteConfig.links.community,
    description:
      "noteメンバーシップ、Discord、LINE公式などを将来束ねる実践コミュニティです。",
    cadence: "準備中",
    contentTypes: ["質問", "事例共有", "月次テーマ"],
    primaryCta: "準備状況を見る",
    homepagePath: "/community",
  },
];

export const primaryPlatforms = platforms.filter((platform) =>
  ["note", "zenn", "medium", "booth", "github", "x", "youtube", "newsletter"].includes(
    platform.id,
  ),
);
