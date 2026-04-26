import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import "./globals.css";

const metadataBase = siteConfig.siteUrl
  ? new URL(siteConfig.siteUrl)
  : undefined;

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.ogDescription,
    ...(siteConfig.siteUrl ? { url: siteConfig.siteUrl } : {}),
    siteName: siteConfig.name,
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
