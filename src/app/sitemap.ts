import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedAiUseCases } from "@/data/aiUseCaseRegistry";
import { contentAssets } from "@/data/contentAssets";

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
  "/free": { priority: 0.8, changeFrequency: "monthly" },
  "/library": { priority: 0.8, changeFrequency: "weekly" },
  "/guides": { priority: 0.7, changeFrequency: "monthly" },
  "/prompts": { priority: 0.7, changeFrequency: "monthly" },
  "/workflows": { priority: 0.7, changeFrequency: "monthly" },
  "/updates": { priority: 0.6, changeFrequency: "weekly" },
  "/products": { priority: 0.5, changeFrequency: "monthly" },
  "/newsletter": { priority: 0.5, changeFrequency: "monthly" },
  "/community": { priority: 0.5, changeFrequency: "monthly" },
  "/consulting": { priority: 0.5, changeFrequency: "monthly" },
  "/media": { priority: 0.4, changeFrequency: "monthly" },
  "/en": { priority: 0.3, changeFrequency: "monthly" },
  "/legal": { priority: 0.2, changeFrequency: "yearly" },
};

const ROUTES = Object.keys(ROUTE_CONFIG);

function parseDateOrNow(dateStr: string | undefined): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl).replace(
    /\/$/,
    "",
  );
  const now = new Date();

  // 静的ルート: 配列順序を保ったまま
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => {
    const cfg = ROUTE_CONFIG[route];
    return {
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: cfg.changeFrequency,
      priority: cfg.priority,
    };
  });

  // ユースケース詳細: 各ユースケースに紐づく ContentAsset の最新公開日を lastModified に
  const useCaseRoutes: MetadataRoute.Sitemap = publishedAiUseCases.map(
    (useCase) => {
      const relatedAssets = contentAssets.filter(
        (asset) =>
          asset.topicSlug === useCase.slug &&
          asset.status === "published" &&
          asset.publishedAt,
      );
      const latestRelated = relatedAssets.reduce<Date | null>((acc, asset) => {
        const d = parseDateOrNow(asset.publishedAt);
        if (!acc || d > acc) return d;
        return acc;
      }, null);
      return {
        url: `${baseUrl}/ai-use-cases/${useCase.slug}`,
        lastModified: latestRelated ?? now,
        changeFrequency: "monthly",
        priority: 0.7,
      };
    },
  );

  // ContentAsset の内部リンク先(/ で始まるもの)を sitemap に追加
  const internalAssetRoutes: MetadataRoute.Sitemap = contentAssets
    .filter(
      (asset) =>
        asset.status === "published" &&
        typeof asset.url === "string" &&
        asset.url.startsWith("/") &&
        !asset.url.startsWith("/ai-use-cases/"),
    )
    .map((asset) => ({
      url: `${baseUrl}${asset.url}`,
      lastModified: parseDateOrNow(asset.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  // 重複 URL を排除(同じ内部ページが複数 ContentAsset に紐づく場合)
  const seenUrls = new Set<string>();
  const all = [...staticRoutes, ...useCaseRoutes, ...internalAssetRoutes];
  return all.filter((entry) => {
    if (seenUrls.has(entry.url)) return false;
    seenUrls.add(entry.url);
    return true;
  });
}
