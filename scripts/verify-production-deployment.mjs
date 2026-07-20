const args = new Map();
for (const raw of process.argv.slice(2)) {
  const [key, ...valueParts] = raw.split("=");
  args.set(key, valueParts.join("="));
}

const baseUrl = (args.get("--base-url") || "https://ai-compass-journal.com").replace(/\/$/, "");
const expectedSha = args.get("--expected-sha") || "";
const attempts = Number(args.get("--attempts") || 40);
const intervalMs = Number(args.get("--interval-ms") || 15000);

const requiredPages = [
  ["/", "AI Compass Journal"],
  ["/products", "販売前の状態まで分かる"],
  ["/ai-use-cases/meeting-notes-to-minutes", "AI運用の週次深掘り"],
  ["/sitemap.xml", "<urlset"],
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function read(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "ai-compass-production-verifier" },
    redirect: "follow",
  });
  const text = await response.text();
  return { response, text };
}

async function verifyOnce() {
  const status = await read(`${baseUrl}/deployment-status`);
  if (!status.response.ok) throw new Error(`deployment-status HTTP ${status.response.status}`);
  const deployment = JSON.parse(status.text);
  if (expectedSha && deployment.commitSha !== expectedSha) {
    throw new Error(`waiting for commit ${expectedSha}; current=${deployment.commitSha || "unknown"}`);
  }

  for (const [path, needle] of requiredPages) {
    const result = await read(`${baseUrl}${path}`);
    if (!result.response.ok) throw new Error(`${path} HTTP ${result.response.status}`);
    if (!result.text.includes(needle)) throw new Error(`${path} missing expected content: ${needle}`);
  }
  return deployment;
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
