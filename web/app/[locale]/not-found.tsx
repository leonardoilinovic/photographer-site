"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale, localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export default function NotFound() {
  const params = useParams();
  const locale = typeof params.locale === "string" && isLocale(params.locale) ? params.locale : defaultLocale;
  const t = getDictionary(locale);
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:px-12">
      <p className="mb-4 text-xs tracking-[0.35em] text-neutral-500">404</p>
      <h1 className="text-4xl font-light md:text-7xl">{t.notFound}</h1>
      <Link href={localizedPath("/", locale)} className="mt-8 inline-block text-sm uppercase tracking-[0.2em]">{t.backHome}</Link>
    </main>
  );
}
