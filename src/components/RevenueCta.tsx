import { CtaButton } from "@/components/CtaButton";
import { ExternalLink } from "@/components/ExternalLink";
import { products } from "@/data/products";
import { getRevenueRoute } from "@/data/revenueRoutes";
import { isPlaceholderUrl } from "@/lib/utm";

type RevenueCtaProps = {
  slug: string;
};

const funnelLabels: Record<string, string> = {
  free_kit: "無料で試す",
  paid_note: "買い切りで深掘りする",
  booth: "テンプレートで仕組み化する",
  zenn: "技術キットで実装する",
  affiliate_separate_site: "無料キットから比較軸を作る",
};

export function RevenueCta({ slug }: RevenueCtaProps) {
  const route = getRevenueRoute(slug);
  if (!route) return null;

  const product = products.find((item) => item.id === route.productId);
  if (!product) return null;

  const ready = product.status === "available" && !isPlaceholderUrl(product.purchaseUrl);
  const internal = product.purchaseUrl.startsWith("/");
  const label = ready ? product.ctaLabel : "商品準備状況を見る";

  return (
    <section className="border-y border-stone-200 bg-stone-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-300">
            {funnelLabels[route.funnel] ?? "次のステップ"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">{product.name}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-stone-300">{product.description}</p>
          <p className="mt-3 text-sm font-semibold text-stone-400">
            {ready
              ? `${product.platform} / ${product.priceLabel}`
              : "販売・配布ページは準備中です。公開済みのようには表示しません。"}
          </p>
        </div>
        {ready && !internal ? (
          <ExternalLink
            href={product.purchaseUrl}
            source={slug}
            medium="use_case_revenue_cta"
            campaign={product.id}
            className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-teal-300 px-5 py-3 text-sm font-bold text-stone-950 transition hover:bg-teal-200"
          >
            {label}
          </ExternalLink>
        ) : (
          <CtaButton
            href={ready ? product.purchaseUrl : "/products"}
            variant="light"
            trackingId={`use_case_revenue_${slug}_${product.id}`}
          >
            {label}
          </CtaButton>
        )}
      </div>
    </section>
  );
}
