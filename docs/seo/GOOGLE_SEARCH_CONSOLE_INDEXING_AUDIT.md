# Google Search Console Indexing Audit

**Site:** https://abhirajdigitalinnovation.com
**Audit date:** 18 November 2026
**Code audited:** `live-site` branch (the branch whose `DEPLOY_TRIGGER.md` says it triggers the Cloudflare deployment). The `main` branch is older than production (it has no `/gharmitra` or `/portfolio` pages), so it was not used as the base.

> Indexing is decided by Google. These fixes remove the technical defects found; they do not guarantee that every page will be indexed or that it will happen on a particular date.

---

## 1. Root causes found

| # | Defect | Evidence | Effect in Search Console |
|---|---|---|---|
| 1 | **No canonical tag on any page.** Page metadata never set `alternates.canonical`. | Built the production branch and fetched every route: zero `<link rel="canonical">` tags. Matches the "User-declared canonical: None" you saw for `/about`. | Google had to pick a canonical itself, which produced **"Duplicate without user-selected canonical"**. |
| 2 | **The www host serves the full site with HTTP 200 from the app.** The app had no host redirect. | Requesting `/about` with `Host: www.abhirajdigitalinnovation.com` against the production build returned 200 with full content. | If any www request reaches the Worker (the `www.abhirajdigitalinnovation.com/*` Worker route sends it there), Google sees two copies of every page. Google chose the **www** version as canonical for `/about`. |
| 3 | **Likely history from the old Vercel hosting.** The `live-site` branch commit says the site was previously "deployed on Vercel". Vercel's usual setup with a www domain redirects the bare domain to www. | Commit history only. I could not confirm the old Vercel domain settings. | Would explain why Google already knew the www URLs and preferred them. Treat this as a probable cause, not a proven one. |
| 4 | **`metadataBase` came from `NEXT_PUBLIC_SITE_URL` with a `http://localhost:3000` fallback.** | `src/lib/config.ts`. | Any absolute URL Next.js generates (canonical, Open Graph) could point to localhost if the variable was missing at build time. |
| 5 | **No `sitemap.xml` and no `robots.txt`.** | Both returned 404 from the production build. | The sitemap you submitted had nothing valid behind it. That fits the "Sitemap: Temporary processing error" message. |
| 6 | **Every page title repeated the brand name**, e.g. `About \| Abhiraj Digital Innovation \| Abhiraj Digital Innovation`. | Pages put the brand in their own title and the layout's title template appended it again. | Weaker, duplicated-looking titles in results. |
| 7 | **`/contact` had no title or description of its own** (it is a client component, so it could not export metadata). | Built HTML showed the homepage's title on `/contact`. | Two pages with the same title. |
| 8 | **`/application` used a temporary (307) redirect** to `/opd-assistant-ai`. | Production build returned 307. | Google keeps re-checking a temporary redirect instead of consolidating it. |

## 2. Files changed

| File | Change |
|---|---|
| `src/lib/seo.ts` (new) | One place for the canonical origin (`https://abhirajdigitalinnovation.com`), the list of indexable routes, and a helper that builds canonical + Open Graph URL metadata. |
| `src/app/layout.tsx` | `metadataBase` is now always the production non-www origin. |
| `src/app/page.tsx` | Homepage canonical, Open Graph, and `Organization` structured data (name, URL, email and description already on the site; nothing invented). |
| `src/app/about`, `terms`, `privacy`, `services`, `opd-assistant-ai`, `gharmitra`, `portfolio`, `portfolio/kumar-solar-panel` `/page.tsx` | Self-referencing canonical, Open Graph URL/title/description, and the duplicated brand removed from the title. Title and description wording is unchanged. |
| `src/app/colony-mitra/page.tsx` | Canonical added, existing Open Graph kept, duplicated brand removed from title. |
| `src/app/contact/layout.tsx` (new) | Title, description and canonical for `/contact`. |
| `src/app/application/page.tsx` | Redirect changed from temporary (307) to permanent (308). |
| `src/app/sitemap.ts` (new) | Generates `/sitemap.xml` at build time. |
| `src/app/robots.ts` (new) | Generates `/robots.txt`. |
| `next.config.ts` | Permanent 308 redirect from the www host to the same path on the non-www host. |
| `tests/seo.test.mjs` (new), `package.json` | Automated SEO tests (`npm run test:seo`). |

No visual component, style, text content, route or API was changed.

## 3. Canonical URLs

Each page now renders exactly one canonical tag in the server-rendered HTML `<head>` (the pages are pre-rendered, so no JavaScript is needed to see it).

| Page | Canonical |
|---|---|
| Home | `https://abhirajdigitalinnovation.com/` (Next.js writes it without the final slash; the two forms are the same URL) |
| About | `https://abhirajdigitalinnovation.com/about` |
| Terms | `https://abhirajdigitalinnovation.com/terms` |
| OPD Assistant AI | `https://abhirajdigitalinnovation.com/opd-assistant-ai` |
| Colony Mitra | `https://abhirajdigitalinnovation.com/colony-mitra` |
| Ghar Mitra | `https://abhirajdigitalinnovation.com/gharmitra` |
| Services | `https://abhirajdigitalinnovation.com/services` |
| Portfolio | `https://abhirajdigitalinnovation.com/portfolio` |
| Kumar Solar Panel case study | `https://abhirajdigitalinnovation.com/portfolio/kumar-solar-panel` |
| Contact | `https://abhirajdigitalinnovation.com/contact` |
| Privacy | `https://abhirajdigitalinnovation.com/privacy` |

Not given a canonical, on purpose: `/application` (redirect only) and `/api/*` (JSON endpoints, not pages).

## 4. Redirects

| Request | Before (production build) | After |
|---|---|---|
| `www` + `/about` reaching the app | 200, duplicate page | 308 → `https://abhirajdigitalinnovation.com/about` |
| `www` + `/gharmitra?utm_source=x` | 200 | 308 → same path and query on non-www, one hop |
| `/application` | 307 → `/opd-assistant-ai` | 308 → `/opd-assistant-ai` |

**What I could not verify:** this sandbox's network blocks `abhirajdigitalinnovation.com`, so I could not test the live HTTP/HTTPS status codes or Location headers. Your browser test showed www ending on non-www, so Cloudflare may already redirect www before the Worker runs. If so, the new app redirect is never reached and changes nothing; if not, it closes the gap. Either way there is no loop (the target host is never redirected) and no chain.

**No Cloudflare dashboard change is required.** Keep both the custom domain and the www Worker route as they are. After deploying, run the live check in section 8 to confirm www returns a single 301/308.

## 5. Sitemap

- `https://abhirajdigitalinnovation.com/sitemap.xml` now exists, returns valid XML in the sitemaps.org 0.9 format, and lists the 11 canonical non-www URLs above.
- `lastmod` is left out on purpose: there is no reliable per-page modification date, and made-up dates make Google trust `lastmod` less.
- It is generated at build time as a static file, so it works on Cloudflare Workers.
- About "Temporary processing error": before this change the site had no sitemap at all (404), so Search Console had nothing to read. After deployment, resubmit it (section 7).

## 6. robots.txt

```
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://abhirajdigitalinnovation.com/sitemap.xml
```

All pages are crawlable, Googlebot is not blocked, and the sitemap is declared. Only the JSON payment/download endpoints are disallowed. No private or admin URLs are listed. All pages keep `index, follow`.

## 7. Metadata and indexing improvements

- Unique titles on every page (tested), with the duplicated brand name removed.
- `/contact` has its own title and description.
- Open Graph `og:url`, `og:title`, `og:description`, `og:site_name` on every page, so shared links point at the canonical URL.
- `Organization` structured data on the homepage.
- Internal links: every internal link on the 11 pages was requested from the new build and all returned 200. The footer already links to About, OPD Assistant AI, GharMitra, Colony Mitra, Contact, Privacy and Terms.
- Distinct identities kept: About, Terms, OPD Assistant AI, Colony Mitra and Ghar Mitra keep their own titles, descriptions and content. No business facts, ratings or features were added.

### The three "Crawled – currently not indexed" URLs

Search Console has not told us which three URLs these are, so I did not guess. Please send the list (Pages report → "Crawled – currently not indexed" → the URL table). Technical causes that could apply have been fixed site-wide: missing canonicals, www duplicates, no sitemap, duplicate titles, and a temporary redirect. Things I checked that were fine: every page returns 200, no page has `noindex`, and page content is in the server-rendered HTML rather than only rendered by JavaScript. If the three URLs are still not indexed a few weeks after deployment, the remaining cause is usually content Google sees as thin or very similar to another page, which is a content decision for you rather than a code fix.

## 8. Automated test results

Run against a local production build (`npm run build`, then `npm run test:seo`): **18 of 18 passed.**

- All 11 pages return 200 with exactly one correct self-referencing canonical in the initial HTML, a matching `og:url`, no `noindex`, and no doubled brand in the title.
- Page titles are unique.
- `sitemap.xml` is valid XML and lists exactly the canonical URLs, all non-www HTTPS.
- `robots.txt` allows crawling and declares the sitemap.
- `/application` redirects permanently.
- www requests for `/`, `/about` and `/gharmitra?utm_source=test` redirect permanently in one hop to the same path and query on non-www.

Other checks:

- `tsc --noEmit`: passed. `next build`: passed (type check included).
- `next lint`: not run. The repository has no ESLint configuration, so the command would only start an interactive setup.
- **Layout unchanged:** full-page screenshots of 9 pages at desktop (1366px) and mobile (390px) widths, original build vs new build, were **pixel-identical** (18 of 18).
- **Live-site tests: not run** (network blocked here). To run them after deploying: `SEO_BASE_URL=https://abhirajdigitalinnovation.com npm run test:seo`.

## 9. Deployment status

**Not deployed.** The changes are in a pull request into `live-site`. Cloudflare builds production from that branch, so merging the pull request is the deployment step. No Cloudflare credentials or wrangler config are in this repository, and nothing in Cloudflare was changed.

### Cloudflare Workers configuration

Preview builds on non-production branches failed with "Wrangler configuration is missing a `previews` block". Before this change the repository had no Wrangler file, so `npx wrangler deploy` auto-configured OpenNext on every build. `wrangler.jsonc` now commits the same configuration: name, `main`, assets, and the `WORKER_SELF_REFERENCE` and `IMAGES` bindings. On top of that it adds:

- `build.command`, so that `npx wrangler deploy` still builds the OpenNext bundle itself.
- An empty `previews` block. Previews do not inherit production settings, so they get no bindings and cannot reach production resources.

The production branch (`live-site`) and the deploy command (`npx wrangler deploy`) are unchanged.

## 10. Outstanding issues and follow-up

1. **Merge the pull request** to deploy, then run the live test command above.
2. **Send the three "Crawled – currently not indexed" URLs** so they can be checked one by one.
3. **`main` and `live-site` have drifted apart.** `main` has older pages and a different Colony Mitra page; production comes from `live-site`. Deciding which branch is the source of truth would prevent fixes like this one being lost in a later deploy.
4. `NEXT_PUBLIC_SITE_URL` no longer affects SEO URLs, but it is still read elsewhere in `siteConfig`. Set it to `https://abhirajdigitalinnovation.com` in Cloudflare if it isn't already.
5. `/application` and `/api/*` are left out of the sitemap on purpose.

---

## Website owner checklist (Google Search Console)

**After the pull request is merged and the site has redeployed:**

1. **Check the live fix.** Open `https://abhirajdigitalinnovation.com/about`, right-click → View page source, search for `canonical`. You should see exactly one, pointing at `https://abhirajdigitalinnovation.com/about`. Also open `/sitemap.xml` and `/robots.txt`.
2. **Resubmit the sitemap.** Search Console → Sitemaps → enter `sitemap.xml` → Submit. If an old entry shows an error, remove it and submit again. The status should become "Success" within a day or two.
3. **Inspect the five affected URLs.** Paste each into the URL Inspection bar at the top: `/about`, `/terms`, `/opd-assistant-ai`, `/colony-mitra`, `/gharmitra`. Click **Test live URL**. Under "Page indexing" the **User-declared canonical** should now show the non-www URL.
4. **Request indexing** for those five pages and the homepage (button on the inspection page). There is a daily limit, so start with the most important pages. Requesting more than once does not speed things up.
5. **Start Validate Fix only after steps 1–3 look right.** Pages → open "Duplicate without user-selected canonical" → **Validate fix**. Do the same for "Crawled – currently not indexed" once those three URLs have been reviewed.
6. **Monitor.** Validation usually takes days to a few weeks. Check the Pages report weekly. Google may still show www as the "Google-selected canonical" for a while until it recrawls and sees the redirect plus your canonical. If, after about four weeks, Google still picks a different canonical than yours, inspect that URL again and send the result.
