import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { StorefrontGrid } from "@/components/StorefrontGrid";
import { storefrontGroups } from "@/data/storefronts";

export const metadata: Metadata = {
  title: "作品と販売先",
  description:
    "記事(note・Medium・Zenn・Qiita)と、3D素材(BOOTH・Fab・Unity Asset Store)を公開している場所の一覧です。",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="Works & stores"
        title="読める場所と、買える場所。"
        description="記事と3D素材を公開しているサイトとストアをまとめています。公開済みで、実際に開ける場所だけを載せています。"
        primaryCta={{ label: "無料キットから始める", href: "/free" }}
        secondaryCta={{ label: "記事から選ぶ", href: "/ai-use-cases" }}
      />
      {storefrontGroups.map((group, index) => (
        <Section key={group.id} tone={index % 2 === 0 ? "white" : "soft"}>
          <h2 className="text-3xl font-semibold text-stone-950">{group.title}</h2>
          <p className="mt-3 max-w-3xl leading-8 text-stone-600">{group.description}</p>
          <StorefrontGrid items={group.items} placement={`works_${group.id}`} />
        </Section>
      ))}
    </main>
  );
}
