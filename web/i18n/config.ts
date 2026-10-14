export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const languageNames: Record<Locale, string> = { de: "Deutsch", en: "English" };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function localizedPath(path: string, locale: Locale): string {
  const parts = path.split("/");
  if (isLocale(parts[1])) parts.splice(1, 1);
  const unprefixed = parts.join("/") || "/";
  return locale === defaultLocale ? unprefixed : `/${locale}${unprefixed === "/" ? "" : unprefixed}`;
}
