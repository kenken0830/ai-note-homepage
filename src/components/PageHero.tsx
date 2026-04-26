import { CtaButton } from "@/components/CtaButton";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl border-b border-stone-200 pb-12">
        <p className="text-sm font-bold tracking-[0.16em] text-teal-700 uppercase">
          {eyebrow}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div>
            <p className="max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
              {description}
            </p>
            {(primaryCta || secondaryCta) ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {primaryCta ? (
                  <CtaButton href={primaryCta.href}>{primaryCta.label}</CtaButton>
                ) : null}
                {secondaryCta ? (
                  <CtaButton href={secondaryCta.href} variant="secondary">
                    {secondaryCta.label}
                  </CtaButton>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
