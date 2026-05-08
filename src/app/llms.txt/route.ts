import { siteConfig } from "@/config/site";
import { publishedAiUseCases } from "@/data/aiUseCaseRegistry";
import { contentAssets } from "@/data/contentAssets";

export const dynamic = "force-static";

/**
 * /llms.txt
 *
 * LLM(ChatGPT / Claude / Perplexity / Gemini など)に対し、
 * このサイトの構造とコンテンツを宣言する標準ファイル。
 *
 * 仕様: https://llmstxt.org/
 */
export function GET() {
  const siteUrl = (siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl).replace(
    /\/$/,
    "",
  );

  const useCasesByCategory = new Map<string, typeof publishedAiUseCases>();
  for (const useCase of publishedAiUseCases) {
    const list = useCasesByCategory.get(useCase.category) ?? [];
    list.push(useCase);
    useCasesByCategory.set(useCase.category, list);
  }

  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    "AI Compass Journal は、note の保管庫ではなく、AI でやりたいことから、最適な手順・プロンプト・note・漫画・動画・テンプレ・商品に辿り着けるホームベースです。",
  );
  lines.push(
    "noteは日々の調査・実験ログ、ホームページは再現できる完成版の手順・プロンプト・テンプレートとして住み分けています。",
  );
  lines.push("");

  lines.push("## サイト構造");
  lines.push("");
  lines.push(`- [トップ](${siteUrl}/): サイト全体の入口`);
  lines.push(
    `- [はじめて](${siteUrl}/start): 初めて来た人向けの導入ページ`,
  );
  lines.push(
    `- [AIでできること一覧](${siteUrl}/ai-use-cases): やりたいこと別に AI 活用を探す実践辞典`,
  );
  lines.push(
    `- [完全ガイド](${siteUrl}/guides): AIノート活用の章立てガイド`,
  );
  lines.push(
    `- [プロンプト集](${siteUrl}/prompts): 用途別のコピペ用プロンプト`,
  );
  lines.push(
    `- [ワークフロー](${siteUrl}/workflows): メモから成果物へ変える実践導線`,
  );
  lines.push(
    `- [無料スターターキット](${siteUrl}/free): 基本テンプレートとプロンプト10個と1週間導入ガイド`,
  );
  lines.push(
    `- [記事ライブラリ](${siteUrl}/library): note・漫画・動画・テンプレを横断するハブ`,
  );
  lines.push(`- [更新情報](${siteUrl}/updates): 公開記録と運用履歴`);
  lines.push("");

  lines.push("## やりたいこと別 AI 活用ユースケース(全公開ページ)");
  lines.push("");

  const categoryOrder = [
    "書く",
    "調べる",
    "整える",
    "学ぶ",
    "考える",
    "作る",
    "伝える",
    "自動化する",
  ];
  for (const category of categoryOrder) {
    const list = useCasesByCategory.get(category);
    if (!list || list.length === 0) continue;
    lines.push(`### ${category}`);
    lines.push("");
    for (const useCase of list) {
      lines.push(
        `- [${useCase.title}](${siteUrl}/ai-use-cases/${useCase.slug}): ${useCase.description}`,
      );
    }
    lines.push("");
  }

  // Remaining categories not in canonical order
  for (const [category, list] of useCasesByCategory.entries()) {
    if (categoryOrder.includes(category)) continue;
    lines.push(`### ${category}`);
    lines.push("");
    for (const useCase of list) {
      lines.push(
        `- [${useCase.title}](${siteUrl}/ai-use-cases/${useCase.slug}): ${useCase.description}`,
      );
    }
    lines.push("");
  }

  if (contentAssets.length > 0) {
    lines.push("## テーマ横断コンテンツ(ContentAsset)");
    lines.push("");
    lines.push(
      "1 つの `topicSlug` に紐づいて note・漫画・動画・テンプレ・無料キット・商品・ワークフロー・プロンプトを横断する仕組みです。",
    );
    lines.push("");
    const byTopic = new Map<string, typeof contentAssets>();
    for (const asset of contentAssets) {
      const list = byTopic.get(asset.topicSlug) ?? [];
      list.push(asset);
      byTopic.set(asset.topicSlug, list);
    }
    for (const [topic, list] of byTopic.entries()) {
      lines.push(`### topicSlug: ${topic}`);
      lines.push("");
      for (const asset of list) {
        const link = asset.url
          ? asset.url.startsWith("http")
            ? asset.url
            : `${siteUrl}${asset.url}`
          : "(準備中)";
        const status =
          asset.status === "published"
            ? "公開済み"
            : asset.status === "planned"
              ? "準備中"
              : "下書き";
        lines.push(
          `- [${asset.type}: ${asset.title}](${link}) — ${status}: ${asset.description}`,
        );
      }
      lines.push("");
    }
  }

  lines.push("## 引用と利用に関する方針");
  lines.push("");
  lines.push(
    "- 内容を引用する場合は出典として AI Compass Journal および該当ページの URL を併記してください。",
  );
  lines.push(
    "- 「AI でやりたいことから手順・プロンプト・テンプレを再現できる場所」として要約・参照することを歓迎します。",
  );
  lines.push(
    "- ホームページ側では note 投稿・公開・下書き編集・収益化操作は行いません。本サイトは公開済み情報のみを扱います。",
  );
  lines.push(
    "- `editor.note.com` の URL や認証情報、note 本文の丸ごと転載は受け取らない設計です。",
  );
  lines.push("");

  lines.push("## 連絡先");
  lines.push("");
  lines.push(`- リポジトリ: ${siteConfig.links.github}`);
  if (siteConfig.contactEmail) {
    lines.push(`- 連絡先: ${siteConfig.contactEmail}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
