import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { canonicalUrl, languageAlternates } from "@/lib/seo";
import { client } from "@/sanity/lib/client";

// Generated alongside the static pages at build time. Rebuild after publishing content.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const galleries = await client.fetch<{ slug: string; updatedAt: string }[]>(`
    *[_type == "gallery" && defined(slug.current) && !(_id in path("drafts.**"))]{
      "slug": slug.current, "updatedAt": _updatedAt
    }
  `);
  const paths = ["/", "/portfolio", "/about", "/contact"];
  const entries: MetadataRoute.Sitemap = paths.flatMap(path => locales.map(locale => ({
    url: canonicalUrl(path, locale),
    alternates: { languages: languageAlternates(path) },
  })));
  const legalPaths = [
    { de: "/impressum", en: "/imprint" },
    { de: "/datenschutz", en: "/privacy" },
  ] as const;
  for (const paths of legalPaths) {
    const languages = Object.fromEntries(
      locales.map(locale => [locale, canonicalUrl(paths[locale], locale)]),
    );
    entries.push(...locales.map(locale => ({
      url: canonicalUrl(paths[locale], locale),
      alternates: { languages: { ...languages, "x-default": canonicalUrl(paths.de, "de") } },
    })));
  }
  for (const gallery of galleries) {
    const path = `/portfolio/${encodeURIComponent(gallery.slug)}`;
    for (const locale of locales) entries.push({
      url: canonicalUrl(path, locale),
      lastModified: gallery.updatedAt,
      alternates: { languages: languageAlternates(path) },
    });
  }
  return entries;
}
