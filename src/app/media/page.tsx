import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PlatformCard } from "@/components/PlatformCard";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { platforms } from "@/data/platforms";

export const metadata: Metadata = {
  title: "メディア設計",
  description:
    "note、X、Zenn、GitHub、Medium、YouTube、BOOTH、Newsletter、Communityの役割を整理するページです。",
};

export default function MediaPage() {
  return (
    <main>
      <PageHero
        eyebrow="Media"
        title="各プラットフォームの役割を固定する。"
        description="投稿内容、更新頻度、ホームページへの戻し方を明確にし、媒体が増えても導線が散らからないようにします。"
        primaryCta={{ label: "記事ライブラリへ", href: "/library" }}
        secondaryCta={{ label: "導線相談を見る", href: "/consulting" }}
      />
      <Section>
        <SectionHeading
          eyebrow="Platform Roles"
          title="目的、投稿内容、更新頻度、戻し方。"
          description="すべての媒体は、最終的に本店、無料DL、商品、メルマガ、相談へ戻す前提で運用します。"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      </Section>
    </main>
  );
}
