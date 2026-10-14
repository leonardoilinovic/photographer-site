import "server-only";
import { notFound } from "next/navigation";
import { isLocale } from "./config";

export type LocalePageProps = { params: Promise<{ locale: string }> };
export async function getLocale(params: LocalePageProps["params"]) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
