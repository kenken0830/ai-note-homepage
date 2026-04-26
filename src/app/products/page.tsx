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
        title="販売前の状態まで分かる、AIノートの商品棚。"
        description="無料キット、テンプレート、有料記事、技術キット、相談導線を、公開中・近日公開・準備中に分けて整理します。"
        primaryCta={{ label: "無料キットから始める", href: "/free" }}
        secondaryCta={{ label: "相談を見る", href: "/consulting" }}
      />
      <Section tone="soft">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["公開中", "ページまたは相談導線を確認できます。"],
            ["近日公開", "配布・販売ページを準備中です。購入できるようには見せません。"],
            ["準備中", "内容設計中です。価格や販売場所は目安として掲載します。"],
          ].map(([label, text]) => (
            <div key={label} className="rounded-[8px] bg-white p-5 shadow-sm">
              <p className="text-lg font-semibold text-stone-950">{label}</p>
              <p className="mt-2 leading-7 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </Section>
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
