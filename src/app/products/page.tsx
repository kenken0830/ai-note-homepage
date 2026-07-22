import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { publicProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "商品一覧",
  description:
    "現在利用できるAI Compass Journalの商品と無料キットを一覧できます。",
};

const categories = [...new Set(publicProducts.map((product) => product.type))];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="いま利用できる、AI Compass Journalの商品棚。"
        description="公開済みで、実際に利用できる配布物だけを掲載します。"
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
    </main>
  );
}
