import { pageMetadata } from "@/lib/seo";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import Reveal from "@/app/components/Reveal";
import PortraitReveal from "@/app/components/PortraitReveal";

type AboutPageData = {
  title?: string;
  bio?: string;
  portraitTop?: SanityImageSource;
  portraitBottom?: SanityImageSource;
  portrait?: SanityImageSource;
};

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await getLocale(params), "about", "/about");
}

export default async function AboutPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const about: AboutPageData = await client.fetch(aboutPageQuery, { locale, fallbackLocale: defaultLocale });

  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="order-2 lg:order-1">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              {t.about}
            </p>

            <h1 className="max-w-3xl text-4xl font-light sm:text-5xl leading-tight md:text-7xl">
              {about?.title || t.aboutTitle}
            </h1>

            <div className="mt-8 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              {about?.bio ? (
                about.bio.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>{t.noBio}</p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            {about?.portraitTop || about?.portrait ? (
              <PortraitReveal
                topImage={about?.portraitTop || about!.portrait!}
                bottomImage={about?.portraitBottom}
                alt={about?.title || t.portrait}
                width={1200}
                height={1500}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                {t.noPortrait}
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </main>
  );
}