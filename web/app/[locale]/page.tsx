import { pageMetadata } from "@/lib/seo";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { localizedPath } from "@/i18n/config";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { homepageQuery, galleriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/app/components/Reveal";
import FeaturedCarousel from "@/app/components/FeaturedCarousel";

type GalleryPreview = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: SanityImageSource;
  description?: string;
};

type HomepageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImageSource;
};

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await getLocale(params), "home", "/");
}

export default async function Home({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const homepage = await client.fetch<HomepageData>(homepageQuery, { locale, fallbackLocale: defaultLocale });
  const galleries = await client.fetch<GalleryPreview[]>(galleriesQuery, { locale, fallbackLocale: defaultLocale });

  return (
    <main className="bg-white text-black">
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[calc(100svh-69px)] items-end overflow-hidden bg-neutral-900 text-white md:min-h-[calc(100svh-61px)]"
      >
        {homepage?.heroImage ? (
          <Image
            src={urlFor(homepage.heroImage).width(2560).url()}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover object-[50%_55%] lg:object-[50%_70%]"
          />
        ) : null}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_25%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.72)_100%)] lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.28)_50%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_65%)]"
        />

        <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-10 sm:pb-14 md:px-12 lg:pt-40 lg:pb-20">
          <p className="mb-5 text-[10px] uppercase leading-5 tracking-[0.3em] text-white/85 sm:text-xs sm:tracking-[0.4em] lg:mb-7">
            {t.editorial}
          </p>

          <h1
            id="hero-title"
            className="max-w-[11em] text-5xl font-light leading-[0.98] [text-wrap:balance] [text-shadow:0_2px_24px_rgb(0_0_0/20%)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {homepage?.heroTitle ||
              t.heroTitle}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/90 [text-shadow:0_1px_12px_rgb(0_0_0/35%)] lg:mt-8 lg:text-lg lg:leading-8">
            {homepage?.heroSubtitle ||
              t.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-10 lg:gap-4">
            <Link
              href={localizedPath("/portfolio", locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-neutral-900 transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7 sm:text-xs"
            >
              {t.explore}
            </Link>
            <Link
              href={localizedPath("/contact", locale)}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/65 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-7 sm:text-xs"
            >
              {t.getInTouch}
            </Link>
          </div>
        </div>
      </section>

      <FeaturedCarousel galleries={galleries} locale={locale} />

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[0.9fr_2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              {t.studio}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h2 className="max-w-4xl text-3xl font-light leading-tight sm:text-4xl md:text-6xl">
                {t.studioTitle}
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                {t.studioText}
              </p>

              <Link
                href={localizedPath("/about", locale)}
                className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-neutral-700 hover:text-black"
              >
                {t.readMore}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <Reveal>
          <div className="rounded-[2rem] bg-black px-6 py-10 text-white md:px-14 md:py-16 shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">
              {t.workTogether}
            </p>
            <h2 className="max-w-3xl text-4xl font-light sm:text-5xl leading-tight md:text-7xl">
              {t.ctaTitle}
            </h2>
            <Link
              href={localizedPath("/contact", locale)}
              className="mt-10 inline-block rounded-full bg-white px-7 py-3 text-sm uppercase tracking-[0.18em] text-black transition hover:opacity-85"
            >
              {t.contact}
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}