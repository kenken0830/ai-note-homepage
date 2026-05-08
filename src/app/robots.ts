import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * /robots.txt
 *
 * 全クローラに公開、`/sitemap.xml` を案内。AI クローラ
 * (GPTBot / ClaudeBot / PerplexityBot / Google-Extended など)も
 * 引き続き許可することで `/llms.txt` 経由の引用を促す。
 *
 * 個別の AI クローラを拒否したい場合はここで User-agent ごとに disallow を追加できる。
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = (siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl).replace(
    /\/$/,
    "",
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
