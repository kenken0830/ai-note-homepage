import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "商品一覧",
  description:
    "無料キット、BOOTHテンプレート、note有料記事、Zenn本、メンバーシップ、個別相談を一覧できる商品ページです。",
};

const categories = [
  "無料キット",
  "BOOTHテンプレート",
  "note有料記事",
  "Zenn本・技術キット",
  "メンバーシップ",
  "個別相談",
];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="無料から相談まで、AIノートの商品棚。"
        description="誰向けか、内容、価格目安、販売場所、CTAを1つのデータで管理します。"
        primaryCta={{ label: "無料キットから始める", href: "/free" }}
        secondaryCta={{ label: "相談を見る", href: "/consulting" }}
      />
      {categories.map((category, index) => {
        const categoryProducts = products.filter((product) => product.type === category);
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
