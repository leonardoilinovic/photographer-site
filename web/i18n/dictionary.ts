import de from "./de.json";
import en from "./en.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { de, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export const getNavigationDictionary = getDictionary;
