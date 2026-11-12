import { CtaButton } from "@/components/CtaButton";
import type { Storefront } from "@/data/storefronts";

type StorefrontGridProps = {
  items: Storefront[];
  placement: string;
};

export function StorefrontGrid({ items, placement }: StorefrontGridProps) {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex flex-col justify-between gap-5 rounded-[8px] border border-stone-200 bg-white p-6"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              {item.platform}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-stone-950">{item.name}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
          </div>
          <CtaButton
            href={item.url}
            variant="secondary"
            trackingId={`${placement}_${item.id}`}
          >
            {item.ctaLabel}
          </CtaButton>
        </article>
      ))}
    </div>
  );
}
