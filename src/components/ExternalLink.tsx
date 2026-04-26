import { isPlaceholderUrl, withUtm } from "@/lib/utm";

type ExternalLinkProps = {
  href: string;
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
  if (isPlaceholderUrl(href)) {
    return (
      <span className={`text-stone-400 ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={withUtm({ baseUrl: href, source, medium, campaign })}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
