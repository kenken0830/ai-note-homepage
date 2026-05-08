import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Web App Manifest for AI Compass Journal.
 *
 * Generated at /manifest.webmanifest. Allows the site to be installed
 * as a PWA on supported devices (iOS / Android / desktop) and improves
 * Lighthouse PWA score.
 *
 * Spec: https://developer.mozilla.org/en-US/docs/Web/Manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "AI Compass",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fafaf9",
    theme_color: "#0d9488",
    lang: "ja",
    categories: ["education", "productivity", "lifestyle"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
