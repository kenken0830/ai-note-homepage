type UtmParams = {
  baseUrl: string | undefined;
  source: string;
  medium: string;
  campaign: string;
};

const placeholderHosts = ["placeholder", "example.com"];

export function isPlaceholderUrl(url: string | undefined) {
  if (!url) {
    return true;
  }

  const normalized = url.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "#" ||
    normalized.includes("placeholder") ||
    placeholderHosts.some((host) => normalized.includes(host))
  );
}

export function withUtm({ baseUrl, source, medium, campaign }: UtmParams) {
  if (!baseUrl) {
    return "";
  }

  if (isPlaceholderUrl(baseUrl)) {
    return baseUrl;
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
