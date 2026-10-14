import LegalPage from "@/app/components/LegalPage";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import { legalPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "de") notFound();
  return legalPageMetadata(locale, "privacy");
}

export default async function DatenschutzPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "de") notFound();
  return <LegalPage locale={locale} page="privacy" />;
}
