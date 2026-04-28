import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedAiUseCases } from "@/data/aiUseCases";

const routes = [
  "",
  "/start",
  "/free",
  "/ai-use-cases",
  "/guides",
  "/prompts",
  "/workflows",
  "/products",
  "/library",
  "/updates",
  "/media",
  "/newsletter",
  "/community",
  "/consulting",
  "/en",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl;
  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const useCaseRoutes = publishedAiUseCases.map((useCase) => ({
    url: `${baseUrl}/ai-use-cases/${useCase.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...useCaseRoutes];
}
