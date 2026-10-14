import { pageMetadata } from "@/lib/seo";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import Reveal from "@/app/components/Reveal";

type ContactPageData = {
  email?: string;
  phone?: string;
  instagram?: string;
  contactText?: string;
};

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await getLocale(params), "contact", "/contact");
}

export default async function ContactPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const contact: ContactPageData = await client.fetch(contactPageQuery, { locale, fallbackLocale: defaultLocale });

  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              {t.contact}
            </p>

            <h1 className="max-w-3xl text-4xl font-light sm:text-5xl leading-tight md:text-7xl">
              {t.contactTitle}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              {contact?.contactText ||
                t.contactText}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-neutral-200 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
              {t.contactDetails}
            </p>

            <div className="space-y-6 text-base text-neutral-800">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  {t.email}
                </p>
                {contact?.email ? (
                  <a href={`mailto:${contact.email}`} className="[overflow-wrap:anywhere] hover:text-black">
                    {contact.email}
                  </a>
                ) : (
                  <p>{t.noEmail}</p>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  {t.phone}
                </p>
                {contact?.phone ? (
                  <a href={`tel:${contact.phone}`} className="[overflow-wrap:anywhere] hover:text-black">
                    {contact.phone}
                  </a>
                ) : (
                  <p>{t.noPhone}</p>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  {t.instagram}
                </p>
                {contact?.instagram ? (
                  <Link
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    {t.instagram}
                  </Link>
                ) : (
                  <p>{t.noInstagram}</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}