import { isPlaceholderUrl, withUtm } from "@/lib/utm";

type ExternalLinkProps = {
  href?: string;
  children: React.ReactNode;
  source?: string;
  medium?: string;
  campaign?: string;
  className?: string;
};

export function ExternalLink({
  href,
  children,
  source = "homepage",
  medium = "referral",
  campaign = "ai_compass_journal",
  className = "",
}: ExternalLinkProps) {
  const normalizedHref = href?.trim() ?? "";

  if (isPlaceholderUrl(normalizedHref)) {
    return (
      <span
        aria-label="外部URL未設定"
        title="外部URL未設定"
        className="inline-flex cursor-not-allowed items-center gap-1 rounded-[8px] bg-stone-100 px-2 py-1 text-sm font-bold text-stone-500"
      >
        {children}
        <span className="text-xs font-semibold text-stone-400">準備中</span>
      </span>
    );
  }

  if (normalizedHref.startsWith("mailto:")) {
    return (
      <a href={normalizedHref} className={className}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={withUtm({ baseUrl: normalizedHref, source, medium, campaign })}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
