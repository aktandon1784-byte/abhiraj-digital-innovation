import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES, canonicalUrl } from "@/lib/seo";

// Rendered once at build time as a static /sitemap.xml.
// lastmod is intentionally omitted: there is no reliable per-page modification
// date, and Google ignores lastmod values that are not consistently accurate.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({ url: canonicalUrl(route) }));
}
