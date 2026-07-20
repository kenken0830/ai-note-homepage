import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const productsSource = readFileSync(resolve(root, "src/data/products.ts"), "utf8");
const routesSource = readFileSync(resolve(root, "src/data/revenueRoutes.ts"), "utf8");
const useCasesSource = readFileSync(resolve(root, "src/data/aiUseCases.ts"), "utf8");
const registrySource = readFileSync(resolve(root, "src/data/aiUseCaseRegistry.ts"), "utf8");

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

if (routeRows.length === 0) errors.push("no revenue routes parsed");
if (errors.length > 0) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(
  `PASS: ${routeRows.length} routes, ${publishedSlugs.size} published use cases, ${productIds.size} products`,
);
