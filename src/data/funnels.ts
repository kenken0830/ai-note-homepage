import type { FunnelStep } from "@/types/content";

export const funnelSteps: FunnelStep[] = [
  {
    id: "discover",
    label: "発見",
    description: "note / X / YouTube / Zenn / MediumでAIノートの考え方に出会う。",
    href: "/media",
    sourcePlatformIds: ["note", "x", "youtube", "zenn", "medium"],
    nextStepIds: ["home"],
  },
  {
    id: "home",
    label: "本店",
    description: "ホームページで媒体、無料DL、買い切り商品の全体像を確認する。",
    href: "/",
    sourcePlatformIds: ["note", "zenn", "medium", "x", "youtube"],
    nextStepIds: ["free"],
  },
  {
    id: "free",
    label: "無料DL",
    description: "無料スターターキットでAIノートを1週間試す。",
    href: "/free",
    sourcePlatformIds: ["newsletter", "booth"],
    nextStepIds: ["newsletter"],
  },
  {
    id: "newsletter",
    label: "メルマガ",
    description: "ステップ配信で基本思想、活用例、商品案内を受け取る。",
    href: "/newsletter",
    sourcePlatformIds: ["newsletter"],
    nextStepIds: ["products"],
  },
  {
    id: "products",
    label: "商品",
    description: "BOOTH、note有料、Zenn本で必要なテンプレートや技術キットを選ぶ。",
    href: "/products",
    sourcePlatformIds: ["booth", "note", "zenn", "github"],
    nextStepIds: [],
  },
];
