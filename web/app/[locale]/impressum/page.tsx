import LegalPage from "@/app/components/LegalPage";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import { legalPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "de") notFound();
  return legalPageMetadata(locale, "imprint");
}

export default async function ImpressumPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "de") notFound();
  return <LegalPage locale={locale} page="imprint" />;
}
