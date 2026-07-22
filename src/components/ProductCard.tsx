import { Badge } from "@/components/Badge";
import { CtaButton } from "@/components/CtaButton";
import { ExternalLink } from "@/components/ExternalLink";
import { isPublicProduct } from "@/data/products";
import type { Product } from "@/types/content";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  if (!isPublicProduct(product)) return null;

  const isInternal = product.purchaseUrl.startsWith("/");

  return (
    <article className="flex h-full flex-col justify-between rounded-[8px] border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <div className="flex flex-wrap gap-2">
          <Badge>{product.type}</Badge>
          <Badge tone="dark">公開中</Badge>
        </div>
        <h3 className="mt-5 text-2xl font-semibold leading-8 text-stone-950">
          {product.name}
        </h3>
        <p className="mt-3 leading-7 text-stone-600">{product.description}</p>
        <p className="mt-4 rounded-[8px] bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-600">
          配布ページまたは販売ページを確認できます。
        </p>
        <dl className="mt-6 grid gap-3 text-sm">
          <div>
            <dt className="font-bold text-stone-950">誰向け</dt>
            <dd className="mt-1 leading-6 text-stone-600">{product.audience}</dd>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <dt className="font-bold text-stone-950">価格目安</dt>
              <dd className="mt-1 text-stone-600">{product.priceLabel}</dd>
            </div>
            <div>
              <dt className="font-bold text-stone-950">販売場所</dt>
              <dd className="mt-1 text-stone-600">{product.platform}</dd>
            </div>
          </div>
        </dl>
      </div>
      <div className="mt-7">
        {isInternal ? (
          <CtaButton href={product.purchaseUrl} variant="secondary" className="w-full">
            {product.ctaLabel}
          </CtaButton>
        ) : (
          <ExternalLink
            href={product.purchaseUrl}
            source={product.id}
            medium="product_card"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[8px] border border-stone-300 px-5 py-3 text-sm font-bold text-stone-950 transition hover:border-teal-500 hover:text-teal-800"
          >
            {product.ctaLabel}
          </ExternalLink>
        )}
      </div>
    </article>
  );
}
