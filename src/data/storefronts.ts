// Real public places where the operator's work can be read or bought.
// These are shop / profile pages, not individual products, so they are kept apart from `products.ts`
// (whose safety rule rejects profile-only URLs as product targets).
// Only list a destination after its URL has been opened and confirmed to be the operator's own page.

export type Storefront = {
  id: string;
  name: string;
  platform: string;
  description: string;
  url: string;
  ctaLabel: string;
};

export type StorefrontGroup = {
  id: "articles" | "3d-assets";
  title: string;
  description: string;
  items: Storefront[];
};

export const storefrontGroups: StorefrontGroup[] = [
  {
    id: "articles",
    title: "記事を読む",
    description: "AIの使い方と、AIで仕事を回す実践記録を書いています。",
    items: [
      {
        id: "note",
        name: "note",
        platform: "note",
        description: "毎日の実践記録と漫画。いちばん更新が多い場所です。",
        url: "https://note.com/life_to_ai",
        ctaLabel: "noteを見る",
      },
      {
        id: "medium",
        name: "Medium (English)",
        platform: "Medium",
        description: "note の記事を英語向けに書き直したものです。",
        url: "https://medium.com/@bonnyjames0830",
        ctaLabel: "Mediumを見る",
      },
      {
        id: "zenn",
        name: "Zenn",
        platform: "Zenn",
        description: "開発者向けに、AI開発ツールの仕組みと使い方をまとめています。",
        url: "https://zenn.dev/kmn",
        ctaLabel: "Zennを見る",
      },
      {
        id: "qiita",
        name: "Qiita",
        platform: "Qiita",
        description: "開発者向けの技術メモです。",
        url: "https://qiita.com/bonny_james01",
        ctaLabel: "Qiitaを見る",
      },
    ],
  },
  {
    id: "3d-assets",
    title: "3D素材を買う (D-Studio)",
    description: "ゲームや映像制作に使える3D素材を、3つのストアで販売しています。",
    items: [
      {
        id: "booth",
        name: "BOOTH",
        platform: "BOOTH",
        description: "D-Studio の品ぞろえがいちばん多いストアです。無料の素材もあります。",
        url: "https://d-studio.booth.pm/",
        ctaLabel: "BOOTHを見る",
      },
      {
        id: "fab",
        name: "Fab",
        platform: "Fab",
        description: "Epic Games のマーケットプレイスで販売しています。",
        url: "https://www.fab.com/sellers/D-Studio%203D%20Assets",
        ctaLabel: "Fabを見る",
      },
      {
        id: "unity",
        name: "Unity Asset Store",
        platform: "Unity",
        description: "Unity 用のパッケージを販売しています。",
        url: "https://assetstore.unity.com/publishers/155066",
        ctaLabel: "Unity Asset Storeを見る",
      },
    ],
  },
];

export const assetStorefronts =
  storefrontGroups.find((group) => group.id === "3d-assets")?.items ?? [];
