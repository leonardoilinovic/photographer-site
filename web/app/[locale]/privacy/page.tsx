import LegalPage from "@/app/components/LegalPage";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import { legalPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "en") notFound();
  return legalPageMetadata(locale, "privacy");
}

export default async function PrivacyPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  if (locale !== "en") notFound();
  return <LegalPage locale={locale} page="privacy" />;
}
