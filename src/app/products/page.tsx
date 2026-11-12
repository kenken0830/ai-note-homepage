import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { StorefrontGrid } from "@/components/StorefrontGrid";
import { publicProducts } from "@/data/products";
import { storefrontGroups } from "@/data/storefronts";

export const metadata: Metadata = {
  title: "作品と販売先",
  description:
    "無料キットと、記事(note・Medium・Zenn・Qiita)、3D素材(BOOTH・Fab・Unity Asset Store)の公開先を一覧できます。",
  alternates: { canonical: "/products" },
};

const categories = [...new Set(publicProducts.map((product) => product.type))];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Works & stores"
        title="読める場所と、買える場所。"
        description="サイト内の無料キットに加えて、記事と3D素材を公開しているストアをまとめています。公開済みで、実際に開ける場所だけを載せています。"
        primaryCta={{ label: "無料キットから始める", href: "/free" }}
        secondaryCta={{ label: "記事から選ぶ", href: "/ai-use-cases" }}
      />
      {categories.map((category, index) => {
        const categoryProducts = publicProducts.filter(
          (product) => product.type === category,
        );
        if (categoryProducts.length === 0) {
          return null;
        }

        return (
          <Section key={category} tone={index % 2 === 0 ? "white" : "soft"}>
            <h2 className="text-3xl font-semibold text-stone-950">{category}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Section>
        );
      })}
      {storefrontGroups.map((group, index) => (
        <Section
          key={group.id}
          tone={(categories.length + index) % 2 === 0 ? "white" : "soft"}
        >
          <h2 className="text-3xl font-semibold text-stone-950">{group.title}</h2>
          <p className="mt-3 max-w-3xl leading-8 text-stone-600">{group.description}</p>
          <StorefrontGrid items={group.items} placement={`products_${group.id}`} />
        </Section>
      ))}
    </main>
  );
}
