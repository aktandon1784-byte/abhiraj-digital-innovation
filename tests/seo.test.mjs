// SEO regression tests: canonical tags, sitemap, robots.txt and www redirect.
//
// Local (default): builds must already exist (`npm run build`); the test starts
// `next start` on a free port and checks the server-rendered HTML.
//   npm run test:seo
//
// Live site: point it at production instead (no local server is started).
//   SEO_BASE_URL=https://abhirajdigitalinnovation.com npm run test:seo
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import net from "node:net";

const SITE = "https://abhirajdigitalinnovation.com";
const WWW_HOST = "www.abhirajdigitalinnovation.com";
const LIVE = Boolean(process.env.SEO_BASE_URL);

// Keep in sync with INDEXABLE_ROUTES in src/lib/seo.ts.
const ROUTES = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/portfolio/kumar-solar-panel",
  "/opd-assistant-ai",
  "/gharmitra",
  "/colony-mitra",
  "/contact",
  "/privacy",
  "/terms",
];

let base = process.env.SEO_BASE_URL?.replace(/\/$/, "");
let server;

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
    s.on("error", reject);
  });
}

before(async () => {
  if (base) return;
  const port = await freePort();
  base = `http://127.0.0.1:${port}`;
  server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore", detached: true });
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(`${base}/robots.txt`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("next start did not come up; run `npm run build` first");
});

after(() => {
  if (server) process.kill(-server.pid);
});

// For the homepage, "https://host" and "https://host/" are the same URL
// (an empty path is "/"), and Next.js renders the former. Normalise to "/".
const norm = (u) => (u === SITE ? `${SITE}/` : u);

function canonicalsOf(html) {
  const head = html.split("</head>")[0];
  return [...head.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map(
    (m) => norm(m[0].match(/href="([^"]+)"/)[1]),
  );
}

for (const route of ROUTES) {
  const expected = route === "/" ? `${SITE}/` : `${SITE}${route}`;

  test(`${route} returns 200 with exactly one self-referencing canonical`, async () => {
    const res = await fetch(`${base}${route}`, { redirect: "manual" });
    assert.equal(res.status, 200);
    const html = await res.text();
    const canonicals = canonicalsOf(html);
    assert.deepEqual(canonicals, [expected], "canonical in initial HTML <head>");
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    assert.equal(norm(ogUrl), expected, "og:url");
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
    const title = html.match(/<title>([^<]*)<\/title>/)[1];
    assert.ok(
      !/Abhiraj Digital Innovation \| Abhiraj Digital Innovation/.test(title),
      `title repeats the brand: ${title}`,
    );
  });
}

test("page titles are unique", async () => {
  const titles = await Promise.all(
    ROUTES.map(async (r) => (await (await fetch(`${base}${r}`)).text()).match(/<title>([^<]*)<\/title>/)[1]),
  );
  assert.equal(new Set(titles).size, titles.length, titles.join("\n"));
});

test("sitemap.xml is valid and lists exactly the canonical URLs", async () => {
  const res = await fetch(`${base}/sitemap.xml`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /xml/);
  const xml = await res.text();
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(
    [...locs].sort(),
    ROUTES.map((r) => (r === "/" ? `${SITE}/` : `${SITE}${r}`)).sort(),
  );
  for (const loc of locs) assert.ok(loc.startsWith(`${SITE}/`) && !loc.includes("www."), loc);
});

test("robots.txt allows crawling and declares the sitemap", async () => {
  const res = await fetch(`${base}/robots.txt`);
  assert.equal(res.status, 200);
  const txt = await res.text();
  assert.match(txt, /User-Agent: \*/i);
  assert.match(txt, /^Allow: \/$/m);
  assert.doesNotMatch(txt, /^Disallow: \/$/m);
  assert.match(txt, new RegExp(`Sitemap: ${SITE}/sitemap.xml`));
});

test("/application permanently redirects to /opd-assistant-ai", async () => {
  const res = await fetch(`${base}/application`, { redirect: "manual" });
  assert.ok([301, 308].includes(res.status), String(res.status));
  assert.match(res.headers.get("location") ?? "", /\/opd-assistant-ai$/);
});

// Request with the www Host header and inspect the raw redirect (no following).
function wwwRequest(path) {
  if (LIVE) {
    return fetch(`https://${WWW_HOST}${path}`, { redirect: "manual" }).then((r) => ({
      status: r.status,
      location: r.headers.get("location"),
    }));
  }
  const { hostname, port } = new URL(base);
  return new Promise((resolve, reject) => {
    http
      .get({ hostname, port, path, headers: { host: WWW_HOST } }, (res) => {
        res.resume();
        resolve({ status: res.statusCode, location: res.headers.location });
      })
      .on("error", reject);
  });
}

for (const path of ["/", "/about", "/gharmitra?utm_source=test"]) {
  test(`www${path} redirects permanently in one hop to non-www, keeping path and query`, async () => {
    const { status, location } = await wwwRequest(path);
    assert.ok([301, 308].includes(status), `status ${status}`);
    assert.equal(norm(location), `${SITE}${path}`);
    if (LIVE) {
      const hop = await fetch(location, { redirect: "manual" });
      assert.equal(hop.status, 200, "redirect target must not redirect again");
    }
  });
}
