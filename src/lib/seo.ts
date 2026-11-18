import type { Metadata } from "next";

/**
 * Canonical production origin.
 *
 * This is intentionally a constant and NOT derived from NEXT_PUBLIC_SITE_URL:
 * canonical URLs, the sitemap and robots.txt must always point at the
 * non-www HTTPS production host, regardless of which environment built the app.
 */
export const SITE_URL = "https://abhirajdigitalinnovation.com";
export const SITE_HOST = "abhirajdigitalinnovation.com";
export const WWW_HOST = `www.${SITE_HOST}`;
export const SITE_NAME = "Abhiraj Digital Innovation";

/**
 * Every public, indexable route on the site. Used by the sitemap and the
 * automated SEO tests. Redirect-only routes (e.g. /application) and API
 * endpoints are deliberately excluded.
 */
export const INDEXABLE_ROUTES = [
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
] as const;

export type IndexableRoute = (typeof INDEXABLE_ROUTES)[number];

/** Absolute canonical URL for a route path, e.g. "/about" -> "https://abhirajdigitalinnovation.com/about". */
export function canonicalUrl(path: IndexableRoute): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Builds the canonical + Open Graph URL metadata for a page so each route
 * renders exactly one self-referencing <link rel="canonical"> in its
 * server-rendered <head>.
 */
export function pageSeo(
  path: IndexableRoute,
  og: { title: string; description: string },
): Pick<Metadata, "alternates" | "openGraph"> {
  const url = canonicalUrl(path);
  return {
    alternates: { canonical: url },
    openGraph: {
      title: og.title,
      description: og.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
