import type { AiUseCase } from "@/types/content";
import { siteConfig } from "@/config/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Inject JSON-LD structured data into the page head as a script tag.
 * Used by detail pages to expose Schema.org HowTo / Article / Breadcrumb
 * data so that Google rich results, ChatGPT/Claude/Perplexity, and other
 * AI search agents can index and cite the content correctly.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Static content, safe; sanitized via JSON.stringify with no HTML.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function getSiteUrl(): string {
  const url = siteConfig.siteUrl ?? siteConfig.fallbackSiteUrl;
  return url.replace(/\/$/, "");
}

export function buildHowToSchema(useCase: AiUseCase) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: useCase.title,
    description: useCase.description,
    inLanguage: "ja",
    totalTime: useCase.timeToTry ? `PT${useCase.timeToTry}` : undefined,
    step: useCase.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `ステップ${index + 1}`,
      text: step,
    })),
    tool: useCase.tags?.map((tag) => ({
      "@type": "HowToTool",
      name: tag,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/ai-use-cases/${useCase.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function buildArticleSchema(useCase: AiUseCase) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: useCase.title,
    description: useCase.description,
    inLanguage: "ja",
    keywords: useCase.tags?.join(", "),
    articleSection: useCase.category,
    proficiencyLevel:
      useCase.difficulty === "beginner" ? "Beginner" : "Intermediate",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/ai-use-cases/${useCase.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function buildBreadcrumbSchema(
  trail: { name: string; href: string }[],
) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${siteUrl}${item.href}`,
    })),
  };
}

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    sameAs: [siteConfig.links.note, siteConfig.links.github].filter(
      (u) => u && u !== "#",
    ),
  };
}

export function buildWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "ja",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}
