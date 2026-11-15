// Checks the /go/<code> table (src/data/goLinks.json).
// Usage: node scripts/validate-go-links.mjs
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "src/data/goLinks.json");
const table = JSON.parse(fs.readFileSync(file, "utf8"));
const codePattern = /^[a-z0-9]+-(booth|unity|fab)-[a-z0-9]+$/;
const storeHosts = [/^([a-z0-9-]+\.)?booth\.pm$/, /^assetstore\.unity\.com$/, /^(www\.)?fab\.com$/];
const problems = [];

function allowedDestination(to) {
  if (typeof to !== "string" || to.length === 0) return false;
  if (to.startsWith("/") && !to.startsWith("//")) return true;
  try {
    const url = new URL(to);
    return url.protocol === "https:" && storeHosts.some((host) => host.test(url.hostname));
  } catch {
    return false;
  }
}

const entries = Object.entries(table.links ?? {});
if (entries.length === 0) problems.push("links is empty");

for (const [code, link] of entries) {
  if (!codePattern.test(code)) problems.push(`${code}: code must be <kit>-<booth|unity|fab>-<video>`);
  const [kit, store, video] = code.split("-");
  if (link.kit !== kit || link.store !== store || link.video !== video) {
    problems.push(`${code}: kit/store/video fields do not match the code`);
  }
  if (!allowedDestination(link.to)) {
    problems.push(`${code}: destination must be a site path or an https BOOTH / Unity Asset Store / Fab URL`);
  }
}

if (problems.length > 0) {
  console.error(`GO_LINKS_INVALID\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`GO_LINKS_OK ${entries.length} codes: ${entries.map(([code]) => code).join(", ")}`);
