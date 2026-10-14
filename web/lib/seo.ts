import type { Metadata } from "next";
import { defaultLocale, locales, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export const SITE_URL = "https://kristijanturbic.de";
export const SITE_NAME = "Kristijan Turbić Photography";

// Add public/social-preview.jpg (1200 x 630), then set this to "/social-preview.jpg".
// Leave null until the approved artwork exists; never emit a placeholder image URL.
export const DEFAULT_SOCIAL_IMAGE: string | null = "/social-preview.jpg";
const socialLocales: Record<Locale, string> = { de: "de_DE", en: "en_GB" };
export type SeoPage = keyof ReturnType<typeof getDictionary>["seo"];

export function canonicalUrl(path: string, locale: Locale): string {
  return new URL(localizedPath(path, locale), SITE_URL).href.replace(/\/$/, "");
}

export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map(locale => [locale, canonicalUrl(path, locale)])),
    "x-default": canonicalUrl(path, defaultLocale),
  };
}

export function pageMetadata(locale: Locale, page: SeoPage, path: string, overrides?: {
  title?: string | null;
  description?: string | null;
  image?: string;
}): Metadata {
  const copy = getDictionary(locale).seo[page];
  const title = `${overrides?.title?.trim() || copy.title} | ${SITE_NAME}`;
  const description = (overrides?.description?.trim() || copy.description).replace(/\s+/g, " ").trim();
  const image = overrides?.image || DEFAULT_SOCIAL_IMAGE;
  const images = image ? [{ url: new URL(image, SITE_URL).href, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(path, locale), languages: languageAlternates(path) },
    openGraph: {
      type: "website", siteName: SITE_NAME, title, description,
      url: canonicalUrl(path, locale), locale: socialLocales[locale],
      alternateLocale: locales.filter(other => other !== locale).map(other => socialLocales[other]),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title, description, ...(images ? { images } : {}),
    },
  };
}
