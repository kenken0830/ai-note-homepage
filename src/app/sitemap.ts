import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = [
  "",
  "/start",
  "/free",
  "/products",
  "/library",
  "/media",
  "/newsletter",
  "/community",
  "/consulting",
  "/en",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl;

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
