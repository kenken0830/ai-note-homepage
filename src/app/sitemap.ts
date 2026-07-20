import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedAiUseCases } from "@/data/aiUseCaseRegistry";
import { publishedContentAssets } from "@/data/contentAssets";
import { publishedExperiments } from "@/data/experiments";

/**
 * Static route priority and change frequency map.
 * Higher priority for entry routes (/, /start, /ai-use-cases) and
 * lower for legal/preparation pages.
 */
const ROUTE_CONFIG: Record<
  string,
  { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
> = {
  "": { priority: 1.0, changeFrequency: "weekly" },
  "/start": { priority: 0.9, changeFrequency: "monthly" },
  "/ai-use-cases": { priority: 0.9, changeFrequency: "weekly" },
  "/experiments": { priority: 0.9, changeFrequency: "weekly" },
  "/free": { priority: 0.8, changeFrequency: "monthly" },
  "/library": { priority: 0.8, changeFrequency: "weekly" },
  "/guides": { priority: 0.7, changeFrequency: "monthly" },
  "/prompts": { priority: 0.7, changeFrequency: "monthly" },
  "/workflows": { priority: 0.7, changeFrequency: "monthly" },
  "/updates": { priority: 0.6, changeFrequency: "weekly" },
  "/products": { priority: 0.5, changeFrequency: "monthly" },
  "/newsletter": { priority: 0.5, changeFrequency: "monthly" },
  "/media": { priority: 0.4, changeFrequency: "monthly" },
  "/en": { priority: 0.3, changeFrequency: "monthly" },
  "/legal": { priority: 0.2, changeFrequency: "yearly" },
};

const ROUTES = Object.keys(ROUTE_CONFIG);

function parseDate(dateStr: string | undefined): Date | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl).replace(
    /\/$/,
    "",
  );
  // 静的ルート: 配列順序を保ったまま
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => {
    const cfg = ROUTE_CONFIG[route];
    return {
      url: `${baseUrl}${route}`,
      changeFrequency: cfg.changeFrequency,
      priority: cfg.priority,
    };
  });

  // ユースケース詳細: 各ユースケースに紐づく ContentAsset の最新公開日を lastModified に
  const useCaseRoutes: MetadataRoute.Sitemap = publishedAiUseCases.map(
    (useCase) => {
      const relatedAssets = publishedContentAssets.filter(
        (asset) =>
          asset.topicSlug === useCase.slug &&
          asset.status === "published" &&
          asset.publishedAt,
      );
      const latestRelated = relatedAssets.reduce<Date | undefined>((acc, asset) => {
        const d = parseDate(asset.publishedAt);
        if (d && (!acc || d > acc)) return d;
        return acc;
      }, undefined);
      return {
        url: `${baseUrl}/ai-use-cases/${useCase.slug}`,
        ...(latestRelated ? { lastModified: latestRelated } : {}),
        changeFrequency: "monthly",
        priority: 0.7,
      };
    },
  );

  // ContentAsset の内部リンク先(/ で始まるもの)を sitemap に追加
  const internalAssetRoutes: MetadataRoute.Sitemap = publishedContentAssets
    .filter(
      (asset) =>
        typeof asset.url === "string" &&
        asset.url.startsWith("/") &&
        !asset.url.startsWith("/ai-use-cases/"),
    )
    .map((asset) => ({
      url: `${baseUrl}${asset.url}`,
      ...(parseDate(asset.publishedAt)
        ? { lastModified: parseDate(asset.publishedAt) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  // 独自実験ページ: 各実験の conductedAt を lastModified に
  const experimentRoutes: MetadataRoute.Sitemap = publishedExperiments.map(
    (exp) => ({
      url: `${baseUrl}/experiments/${exp.slug}`,
      ...(parseDate(exp.publishedAt ?? exp.conductedAt)
        ? { lastModified: parseDate(exp.publishedAt ?? exp.conductedAt) }
        : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }),
  );

  // 重複 URL を排除(同じ内部ページが複数 ContentAsset に紐づく場合)
  const seenUrls = new Set<string>();
  const all = [
    ...staticRoutes,
    ...useCaseRoutes,
    ...internalAssetRoutes,
    ...experimentRoutes,
  ];
  return all.filter((entry) => {
    if (seenUrls.has(entry.url)) return false;
    seenUrls.add(entry.url);
    return true;
  });
}
