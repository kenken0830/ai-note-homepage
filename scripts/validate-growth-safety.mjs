import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const canonicalOrigin = "https://www.ai-compass-journal.com";

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function requireCondition(condition, check, detail) {
  if (!condition) {
    throw new Error(`${check}: ${detail}`);
  }
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const useCaseSource = read("src/data/aiUseCases.ts");
const publishedCount = [...useCaseSource.matchAll(/status:\s*"published"/g)].length;
const plannedCount = [...useCaseSource.matchAll(/status:\s*"planned"/g)].length;
const slugs = [...useCaseSource.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map(
  (match) => match[1],
);
requireCondition(publishedCount === 17, "PUBLISHED_USE_CASE_COUNT", publishedCount);
requireCondition(new Set(slugs).size === slugs.length, "DUPLICATE_SLUG", "found");

const siteConfig = read("src/config/site.ts");
requireCondition(
  siteConfig.includes(`const canonicalSiteUrl = "${canonicalOrigin}"`),
  "CANONICAL_ORIGIN",
  "source mismatch",
);
requireCondition(
  siteConfig.includes('parsed.hostname === "note.com"'),
  "NOTE_DESTINATION_GUARD",
  "missing",
);

const homepage = read("src/app/page.tsx");
for (const forbidden of ["Platform Hub", "Funnel Map", "NewsletterCta"]) {
  requireCondition(!homepage.includes(forbidden), "HOMEPAGE_OPERATOR_CONTENT", forbidden);
}
requireCondition(
  homepage.includes("recommendedSlugs") &&
    [...homepage.matchAll(/^\s*"[^"]+",?$/gm)].length >= 5,
  "HOMEPAGE_RECOMMENDED_SET",
  "missing",
);

const jsonLd = read("src/components/JsonLd.tsx");
requireCondition(
  !jsonLd.includes("PT${useCase.timeToTry}") && jsonLd.includes("PT${minutes[1]}M"),
  "HOWTO_TOTAL_TIME",
  "invalid conversion",
);

const ctaButton = read("src/components/CtaButton.tsx");
for (const eventName of ["free_kit_click", "article_cta_click"]) {
  requireCondition(ctaButton.includes(eventName), "CTA_EVENT", eventName);
}
requireCondition(
  !/track\(eventName,\s*\{[^}]*\bhref\b/s.test(ctaButton),
  "CTA_EVENT_DESTINATION",
  "href must not be emitted",
);

const sitemapSource = read("src/app/sitemap.ts");
requireCondition(sitemapSource.includes('"/about"'), "SITEMAP_ABOUT", "missing");
for (const excluded of ["/en", "/newsletter", "/media", "/legal", "/experiments"]) {
  requireCondition(
    !sitemapSource.includes(`"${excluded}":`),
    "SITEMAP_NOINDEX_ROUTE",
    excluded,
  );
}

const publicSourceFiles = walk(path.join(root, "src")).filter((file) =>
  /\.(?:ts|tsx|js|jsx)$/.test(file),
);
const publicSource = publicSourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
for (const forbidden of [
  /px\.a8\.net/i,
  /s00000024524001/i,
  /\/tools\/notta/i,
  /affiliate_click/i,
]) {
  requireCondition(!forbidden.test(publicSource), "PREAPPROVAL_AFFILIATE_EXPOSURE", forbidden);
}

const buildFiles = walk(path.join(root, ".next", "server", "app"));
const sitemapFile = buildFiles.find((file) => /sitemap\.xml\.body$/.test(file));
const robotsFile = buildFiles.find((file) => /robots\.txt\.body$/.test(file));
requireCondition(Boolean(sitemapFile), "BUILT_SITEMAP", "missing; run npm run build first");
requireCondition(Boolean(robotsFile), "BUILT_ROBOTS", "missing; run npm run build first");

const builtSitemap = fs.readFileSync(sitemapFile, "utf8");
const builtRobots = fs.readFileSync(robotsFile, "utf8");
const sitemapUseCases = new Set(
  [...builtSitemap.matchAll(/\/ai-use-cases\/([a-z0-9-]+)/g)].map(
    (match) => match[1],
  ),
);
requireCondition(
  sitemapUseCases.size === publishedCount,
  "SITEMAP_USE_CASE_COUNT",
  `${sitemapUseCases.size}/${publishedCount}`,
);
requireCondition(
  !builtSitemap.includes("https://ai-compass-journal.com"),
  "SITEMAP_REDIRECTING_APEX",
  "present",
);
requireCondition(
  builtSitemap.includes(`${canonicalOrigin}/about`),
  "SITEMAP_ABOUT",
  "built entry missing",
);
for (const excluded of ["/en", "/newsletter", "/media", "/legal", "/experiments"]) {
  requireCondition(
    !builtSitemap.includes(`${canonicalOrigin}${excluded}`),
    "SITEMAP_NOINDEX_ROUTE",
    excluded,
  );
}
requireCondition(
  builtRobots.includes(`Host: ${canonicalOrigin}`) &&
    builtRobots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`),
  "ROBOTS_CANONICAL_ORIGIN",
  "mismatch",
);

const builtPublicText = buildFiles
  .filter((file) => /\.(?:html|rsc|body)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
for (const forbidden of [/px\.a8\.net/i, /s00000024524001/i, /rel="[^"]*sponsored/i]) {
  requireCondition(!forbidden.test(builtPublicText), "BUILT_AFFILIATE_EXPOSURE", forbidden);
}

console.log(
  JSON.stringify({
    finalStatus: "GROWTH_SAFETY_VALIDATED",
    publishedUseCaseCount: publishedCount,
    plannedUseCaseCount: plannedCount,
    sitemapUseCaseCount: sitemapUseCases.size,
    canonicalOrigin,
    liveAffiliateLinks: 0,
    publicNottaReviews: 0,
  }),
);
