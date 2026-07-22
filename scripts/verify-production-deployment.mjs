const args = new Map();
for (const raw of process.argv.slice(2)) {
  const [key, ...valueParts] = raw.split("=");
  args.set(key, valueParts.join("="));
}

const baseUrl = (args.get("--base-url") || "https://ai-compass-journal.com").replace(/\/$/, "");
const expectedSha = args.get("--expected-sha") || "";
const attempts = Number(args.get("--attempts") || 40);
const intervalMs = Number(args.get("--interval-ms") || 15000);
const baseOrigin = new URL(baseUrl).origin;

const expectedPublishedUseCaseSlugs = new Set([
  "rewrite-friendly-text",
  "ai-tool-principle-map",
  "build-ai-agent-skill-file",
  "choose-minimal-ai-stack",
  "explain-technical-terms",
  "find-routine-automation",
  "make-checklist",
  "make-comparison-table",
  "make-learning-plan",
  "make-prompt-template",
  "make-review-quiz",
  "make-weekly-report",
  "make-weekly-review",
  "meeting-notes-to-minutes",
  "organize-reading-notes",
  "structure-note-article",
  "write-email-reply",
]);

const plannedUseCaseSlugs = ["make-todo-list", "summarize-research-notes"];

const nonPublicProductNames = [
  "AIノート運用テンプレート集",
  "AI運用の週次深掘り",
  "仕事効率化プロンプトカード",
  "AIノート技術者向けキット",
  "AI自動化設計テンプレートパック",
];

const internalExposureRules = [
  ["/about", ["main branch", "mainブランチ", "PR経由", "docs/", "src/", "factory_os/"]],
  [
    "/experiments",
    [
      "GitHub Actions",
      "run-experiment",
      "scripts/experiments/",
      "workflow_dispatch",
      "auto-publish-use-case",
      "publish-use-case-detail",
      "intake-homepage-handoff",
      "intake-content-handoff",
    ],
  ],
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkError(url, checkId, expected, actual) {
  return new Error(`url=${url} check=${checkId} expected=${expected} actual=${actual}`);
}

async function read(pathOrUrl, { redirect = "follow", checkId = "HTTP_FETCH" } = {}) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${baseUrl}${pathOrUrl}`;
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "ai-compass-production-verifier" },
      redirect,
    });
    const text = await response.text();
    return { response, text };
  } catch {
    const safeUrl = pathOrUrl.startsWith("http") ? new URL(pathOrUrl).pathname : pathOrUrl;
    throw checkError(safeUrl, checkId, "reachable", "network_error");
  }
}

async function requireStatus(path, expectedStatus, options) {
  const result = await read(path, options);
  if (result.response.status !== expectedStatus) {
    throw checkError(path, options?.checkId || "HTTP_STATUS", expectedStatus, result.response.status);
  }
  return result;
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function extractMainHtml(html, path) {
  const match = html.match(/<main(?:\s[^>]*)?>([\s\S]*?)<\/main>/i);
  if (!match) throw checkError(path, "MAIN_ELEMENT", "present", "missing");
  return match[1];
}

function extractAnchors(html) {
  const anchors = [];
  const anchorPattern = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(anchorPattern)) {
    const attributes = match[1];
    const quotedHref = attributes.match(/\bhref\s*=\s*(["'])(.*?)\1/i);
    const unquotedHref = attributes.match(/\bhref\s*=\s*([^\s>]+)/i);
    const classMatch = attributes.match(/\bclass\s*=\s*(["'])(.*?)\1/i);
    anchors.push({
      href: decodeHtmlAttribute(quotedHref?.[2] ?? unquotedHref?.[1] ?? ""),
      className: classMatch?.[2] ?? "",
    });
  }
  return anchors;
}

function isCtaAnchor(anchor) {
  return anchor.className.includes("inline-flex") && /\bmin-h-(?:11|12)\b/.test(anchor.className);
}

function hrefProblemType(href) {
  const value = href.trim();
  if (!value) return "empty";
  if (value === "#" || value.startsWith("#")) return "hash";
  if (/^javascript:/i.test(value)) return "javascript";
  if (/placeholder|example\.com|\{\{|\}\}|<[^>]+>/i.test(value)) return "placeholder";
  return null;
}

function isExternalProfileTop(href) {
  return (
    /^https?:\/\/note\.com\/[^/?#]+\/?(?:[?#].*)?$/i.test(href) ||
    /^https?:\/\/zenn\.dev\/[^/?#]+\/?(?:[?#].*)?$/i.test(href) ||
    /^https?:\/\/[^/?#]+\.booth\.pm\/?(?:[?#].*)?$/i.test(href)
  );
}

function isAllowedFreeKitHref(href) {
  if (hrefProblemType(href)) return false;
  try {
    const target = new URL(href, baseUrl);
    return (
      target.origin === baseOrigin &&
      (target.pathname === "/free" || target.pathname.startsWith("/free-starter-kit/"))
    );
  } catch {
    return false;
  }
}

async function verifyFreeKitCta(path, html, checkPrefix) {
  const mainHtml = extractMainHtml(html, path);
  const ctaAnchors = extractAnchors(mainHtml).filter(isCtaAnchor);

  for (const anchor of ctaAnchors) {
    if (isExternalProfileTop(anchor.href)) {
      throw checkError(
        path,
        `${checkPrefix}_CTA_HREF`,
        "product_or_internal_route",
        "href_type=external_profile_top",
      );
    }
  }

  const freeKitCtas = ctaAnchors.filter((anchor) => isAllowedFreeKitHref(anchor.href));
  if (freeKitCtas.length < 1) {
    throw checkError(path, `${checkPrefix}_FREE_KIT_CTA`, "count>=1", "count=0");
  }

  const targetUrl = new URL(freeKitCtas[0].href, baseUrl);
  const target = await read(targetUrl.href, { checkId: `${checkPrefix}_CTA_TARGET_FETCH` });
  if (target.response.status !== 200) {
    throw checkError(
      path,
      `${checkPrefix}_CTA_TARGET_STATUS`,
      "200",
      target.response.status,
    );
  }
}

function verifyNoNonPublicProducts(path, html) {
  for (const productName of nonPublicProductNames) {
    if (html.includes(productName)) {
      throw checkError(path, "NON_PUBLIC_PRODUCT_NAME", "absent", "count>=1");
    }
  }
}

function extractUseCaseSlugs(text) {
  return new Set(
    [...text.matchAll(/\/ai-use-cases\/([a-z0-9-]+)/g)].map((match) => match[1]),
  );
}

function verifyPublishedSlugSet(path, actualSlugs, checkPrefix) {
  if (actualSlugs.size !== expectedPublishedUseCaseSlugs.size) {
    throw checkError(
      path,
      `${checkPrefix}_COUNT`,
      expectedPublishedUseCaseSlugs.size,
      actualSlugs.size,
    );
  }
  for (const slug of expectedPublishedUseCaseSlugs) {
    if (!actualSlugs.has(slug)) {
      throw checkError(path, `${checkPrefix}_EXPECTED_SLUG`, "all_present", "missing_count>=1");
    }
  }
  for (const slug of plannedUseCaseSlugs) {
    if (actualSlugs.has(slug)) {
      throw checkError(path, `${checkPrefix}_PLANNED_SLUG`, "absent", "present_count>=1");
    }
  }
}

function verifyNoInternalExposure(path, html, forbiddenValues) {
  const normalized = html.toLowerCase();
  for (const value of forbiddenValues) {
    if (normalized.includes(value.toLowerCase())) {
      throw checkError(path, "INTERNAL_EXPOSURE", "count=0", "count>=1");
    }
  }
}

async function verifyRedirect() {
  const legacyPath = "/ai-use-cases/explain-for-beginners";
  const destinationPath = "/ai-use-cases/rewrite-friendly-text";
  const redirect = await requireStatus(legacyPath, 308, {
    redirect: "manual",
    checkId: "LEGACY_REDIRECT_STATUS",
  });
  const location = redirect.response.headers.get("location");
  if (!location) {
    throw checkError(legacyPath, "LEGACY_REDIRECT_LOCATION", destinationPath, "missing");
  }
  let locationPath;
  try {
    locationPath = new URL(location, baseUrl).pathname;
  } catch {
    throw checkError(legacyPath, "LEGACY_REDIRECT_LOCATION", destinationPath, "invalid");
  }
  if (locationPath !== destinationPath) {
    throw checkError(legacyPath, "LEGACY_REDIRECT_LOCATION", destinationPath, "path_mismatch");
  }
  await requireStatus(legacyPath, 200, { checkId: "LEGACY_REDIRECT_FOLLOW_STATUS" });
}

async function verifyOnce() {
  const status = await requireStatus("/deployment-status", 200, {
    checkId: "DEPLOYMENT_STATUS_HTTP",
  });
  let deployment;
  try {
    deployment = JSON.parse(status.text);
  } catch {
    throw checkError("/deployment-status", "DEPLOYMENT_STATUS_JSON", "valid_json", "invalid_json");
  }
  if (expectedSha && deployment.commitSha !== expectedSha) {
    throw checkError(
      "/deployment-status",
      "DEPLOYMENT_SHA",
      "expected_sha_match",
      "sha_mismatch",
    );
  }

  await requireStatus("/", 200, { checkId: "HOMEPAGE_HTTP" });

  const products = await requireStatus("/products", 200, { checkId: "PRODUCTS_HTTP" });
  verifyNoNonPublicProducts("/products", products.text);
  await verifyFreeKitCta("/products", products.text, "PRODUCTS");

  const meetingPath = "/ai-use-cases/meeting-notes-to-minutes";
  const meeting = await requireStatus(meetingPath, 200, { checkId: "MEETING_USE_CASE_HTTP" });
  verifyNoNonPublicProducts(meetingPath, meeting.text);
  await verifyFreeKitCta(meetingPath, meeting.text, "MEETING_USE_CASE");

  const useCaseIndex = await requireStatus("/ai-use-cases", 200, {
    checkId: "USE_CASE_INDEX_HTTP",
  });
  const publishedUseCaseSlugs = extractUseCaseSlugs(useCaseIndex.text);
  verifyPublishedSlugSet("/ai-use-cases", publishedUseCaseSlugs, "USE_CASE_INDEX");

  await requireStatus("/ai-use-cases/rewrite-friendly-text", 200, {
    checkId: "BEGINNER_USE_CASE_HTTP",
  });
  await verifyRedirect();
  for (const slug of plannedUseCaseSlugs) {
    await requireStatus(`/ai-use-cases/${slug}`, 404, { checkId: "PLANNED_USE_CASE_HTTP" });
  }

  const sitemap = await requireStatus("/sitemap.xml", 200, { checkId: "SITEMAP_HTTP" });
  const sitemapUseCaseSlugs = extractUseCaseSlugs(sitemap.text);
  verifyPublishedSlugSet("/sitemap.xml", sitemapUseCaseSlugs, "SITEMAP");
  if (sitemapUseCaseSlugs.has("explain-for-beginners")) {
    throw checkError("/sitemap.xml", "SITEMAP_LEGACY_SLUG", "absent", "present_count=1");
  }

  for (const [path, forbiddenValues] of internalExposureRules) {
    const result = await requireStatus(path, 200, { checkId: "INTERNAL_PAGE_HTTP" });
    verifyNoInternalExposure(path, result.text, forbiddenValues);
  }

  return {
    ...deployment,
    publishedUseCaseCount: publishedUseCaseSlugs.size,
    sitemapUseCaseCount: sitemapUseCaseSlugs.size,
    plannedExposureCount: 0,
    nonPublicProductExposureCount: 0,
    freeKitCtaValid: true,
    internalExposureCount: 0,
  };
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const deployment = await verifyOnce();
    console.log(JSON.stringify({ finalStatus: "PRODUCTION_VERIFIED", baseUrl, ...deployment }));
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.log(`attempt ${attempt}/${attempts}: ${error.message}`);
    if (attempt < attempts) await sleep(intervalMs);
  }
}

console.error(`PRODUCTION_VERIFY_FAILED: ${lastError?.message || "unknown error"}`);
process.exit(1);
