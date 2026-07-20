import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const productsSource = readFileSync(resolve(root, "src/data/products.ts"), "utf8");
const routesSource = readFileSync(resolve(root, "src/data/revenueRoutes.ts"), "utf8");
const useCasesSource = readFileSync(resolve(root, "src/data/aiUseCases.ts"), "utf8");
const registrySource = readFileSync(resolve(root, "src/data/aiUseCaseRegistry.ts"), "utf8");
const sitemapSource = readFileSync(resolve(root, "src/app/sitemap.ts"), "utf8");
const productPageSource = readFileSync(resolve(root, "src/app/products/page.tsx"), "utf8");
const productCardSource = readFileSync(resolve(root, "src/components/ProductCard.tsx"), "utf8");
const revenueCtaSource = readFileSync(resolve(root, "src/components/RevenueCta.tsx"), "utf8");

function matches(source, pattern) {
  return [...source.matchAll(pattern)];
}

const productIds = new Set(
  matches(productsSource, /\bid:\s*"([a-z0-9-]+)"/g).map((match) => match[1]),
);

const routeRows = matches(
  routesSource,
  /^\s*"([a-z0-9-]+)":\s*\{"funnel":\s*"([a-z_]+)",\s*"productId":\s*"([a-z0-9-]+)"/gm,
).map((match) => ({ slug: match[1], funnel: match[2], productId: match[3] }));

function parseUseCases(source) {
  const rows = new Map();
  const idMatches = matches(source, /\bid:\s*"([a-z0-9-]+)"/g);

  for (let index = 0; index < idMatches.length; index += 1) {
    const match = idMatches[index];
    const next = idMatches[index + 1];
    const segment = source.slice(match.index, next?.index ?? source.length);
    const slug = segment.match(/\bslug:\s*"([a-z0-9-]+)"/);
    const status = segment.match(/\bstatus:\s*"([a-z]+)"/);
    if (slug && status) rows.set(match[1], { slug: slug[1], status: status[1] });
  }

  return rows;
}

const finalUseCases = parseUseCases(useCasesSource);
for (const [id, useCase] of parseUseCases(registrySource)) {
  finalUseCases.set(id, useCase);
}

const allUseCaseSlugs = new Set(
  [...finalUseCases.values()].map((useCase) => useCase.slug),
);
const publishedSlugs = new Set(
  [...finalUseCases.values()]
    .filter((useCase) => useCase.status === "published")
    .map((useCase) => useCase.slug),
);

const errors = [];
// PR Cでcanonical payloadへ接続するまでの一時的な公開安全基準。
const EXPECTED_PUBLISHED_USE_CASES = 17;
const NON_PUBLIC_SLUGS = new Set(["make-todo-list", "summarize-research-notes"]);
const seenRoutes = new Set();
const allowedFunnels = new Set([
  "free_kit",
  "paid_note",
  "booth",
  "zenn",
  "affiliate_separate_site",
]);

for (const row of routeRows) {
  if (seenRoutes.has(row.slug)) errors.push(`duplicate route: ${row.slug}`);
  seenRoutes.add(row.slug);
  if (!allUseCaseSlugs.has(row.slug)) errors.push(`route has no use case: ${row.slug}`);
  if (!productIds.has(row.productId)) errors.push(`unknown product: ${row.slug} -> ${row.productId}`);
  if (!allowedFunnels.has(row.funnel)) errors.push(`unknown funnel: ${row.slug} -> ${row.funnel}`);
}

for (const slug of publishedSlugs) {
  if (!seenRoutes.has(slug)) errors.push(`published use case has no revenue route: ${slug}`);
}

if (publishedSlugs.size !== EXPECTED_PUBLISHED_USE_CASES) {
  errors.push(
    `expected ${EXPECTED_PUBLISHED_USE_CASES} published use cases, found ${publishedSlugs.size}`,
  );
}
for (const slug of NON_PUBLIC_SLUGS) {
  if (publishedSlugs.has(slug)) errors.push(`planned use case is public: ${slug}`);
}
if (publishedSlugs.has("explain-for-beginners")) {
  errors.push("legacy slug is still a published use case: explain-for-beginners");
}

const seenPublishedSlugs = new Set();
for (const useCase of finalUseCases.values()) {
  if (useCase.status !== "published") continue;
  if (seenPublishedSlugs.has(useCase.slug)) {
    errors.push(`duplicate published slug: ${useCase.slug}`);
  }
  seenPublishedSlugs.add(useCase.slug);
}

function parseProductRows(source) {
  const rows = [];
  const idMatches = matches(source, /\bid:\s*"([a-z0-9-]+)"/g);
  for (let index = 0; index < idMatches.length; index += 1) {
    const match = idMatches[index];
    const next = idMatches[index + 1];
    const segment = source.slice(match.index, next?.index ?? source.indexOf("];", match.index));
    const status = segment.match(/\bstatus:\s*"([a-z]+)"/);
    const purchaseUrl = segment.match(/\bpurchaseUrl:\s*"([^"]*)"/);
    rows.push({
      id: match[1],
      status: status?.[1],
      purchaseUrl: purchaseUrl?.[1],
    });
  }
  return rows;
}

function isSafePublicUrl(url) {
  if (!url || url === "#" || /placeholder|example\.com|\.invalid/i.test(url)) return false;
  if (/^[a-z]:[\\/]|^file:|^\/\//i.test(url)) return false;
  if (url.startsWith("/")) return true;
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
      return false;
    }
    return !(
      /^https?:\/\/note\.com\/[^/]+\/?$/i.test(url) ||
      /^https?:\/\/zenn\.dev\/[^/]+\/?$/i.test(url) ||
      /^https?:\/\/[^/]+\.booth\.pm\/?$/i.test(url)
    );
  } catch {
    return false;
  }
}

const productRows = parseProductRows(productsSource);
const publicProductRows = productRows.filter(
  (product) => product.status === "available" && isSafePublicUrl(product.purchaseUrl),
);
for (const product of productRows.filter((item) => item.status === "available")) {
  if (!isSafePublicUrl(product.purchaseUrl)) {
    errors.push(`available product has unsafe purchase URL: ${product.id}`);
  }
}
if (publicProductRows.length !== 1 || publicProductRows[0]?.id !== "free-starter-kit") {
  errors.push("public product baseline must contain only free-starter-kit");
}
if (!productPageSource.includes("publicProducts")) {
  errors.push("product page does not use the centralized publicProducts filter");
}
if (!productCardSource.includes("isPublicProduct(product)")) {
  errors.push("ProductCard does not reject non-public products");
}
if (!revenueCtaSource.includes('getPublicProductById("free-starter-kit")')) {
  errors.push("RevenueCta does not explicitly fall back to the free starter kit");
}

if (!sitemapSource.includes("publishedAiUseCases")) {
  errors.push("sitemap does not use the published use-case helper");
}
if (sitemapSource.includes("new Date()")) {
  errors.push("sitemap substitutes build time for missing publication dates");
}

const publicSourcePaths = [
  "src/app/page.tsx",
  "src/app/ai-use-cases/page.tsx",
  "src/app/updates/page.tsx",
  "src/data/updates.ts",
];
for (const relativePath of publicSourcePaths) {
  const source = readFileSync(resolve(root, relativePath), "utf8");
  if (source.includes('href: "/ai-use-cases/explain-for-beginners"')) {
    errors.push(`legacy slug remains in a public link: ${relativePath}`);
  }
}

const workflowDir = resolve(root, ".github/workflows");
for (const file of readdirSync(workflowDir).filter((name) => /\.ya?ml$/i.test(name))) {
  const source = readFileSync(resolve(workflowDir, file), "utf8");
  if (/git\s+push(?:\s+[^\r\n]+)?\s+(?:origin\s+)?main(?:\s|$)/im.test(source)) {
    errors.push(`workflow can push directly to main: ${file}`);
  }
}
const autoPublishSource = readFileSync(
  resolve(workflowDir, "auto-publish-use-case.yml"),
  "utf8",
);
if (/^\s*schedule\s*:/m.test(autoPublishSource)) {
  errors.push("scheduled automatic publication is still enabled");
}
if (!autoPublishSource.includes("PUBLICATION_DISABLED_UNTIL_CANONICAL_GUARDRAIL")) {
  errors.push("automatic publication disable reason is missing");
}

if (routeRows.length === 0) errors.push("no revenue routes parsed");
if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(
  `PASS: ${routeRows.length} routes, ${publishedSlugs.size} published use cases, ${publicProductRows.length} public product, ${productIds.size} products total`,
);
