export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const languageNames: Record<Locale, string> = { de: "Deutsch", en: "English" };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

const localizedRoutes: Record<string, Record<Locale, string>> = {
  "/impressum": { de: "/impressum", en: "/imprint" },
  "/imprint": { de: "/impressum", en: "/imprint" },
  "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  "/privacy": { de: "/datenschutz", en: "/privacy" },
};

export function localizedPath(path: string, locale: Locale): string {
  const parts = path.split("/");
  if (isLocale(parts[1])) parts.splice(1, 1);
  const unprefixed = parts.join("/") || "/";
  const localized = localizedRoutes[unprefixed]?.[locale] ?? unprefixed;
  return locale === defaultLocale ? localized : `/${locale}${localized === "/" ? "" : localized}`;
}
