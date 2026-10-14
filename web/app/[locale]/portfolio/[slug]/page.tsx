import { cache } from "react";
import { pageMetadata } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/server";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { galleryBySlugQuery, gallerySlugsQuery } from "@/sanity/lib/queries";
import GalleryImages from "@/app/components/GalleryImages";
import Reveal from "@/app/components/Reveal";

type GalleryPageProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

type Gallery = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: SanityImageSource;
  photos?: SanityImageSource[];
};

const getGallery = cache((slug: string, locale: Locale) =>
  client.fetch<Gallery | null>(galleryBySlugQuery, { slug, locale, fallbackLocale: defaultLocale }));

export async function generateMetadata({ params }: GalleryPageProps) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const gallery = await getGallery(slug, locale);
  if (!gallery) notFound();
  return pageMetadata(locale, "gallery", `/portfolio/${encodeURIComponent(slug)}`, {
    title: gallery.title,
    description: gallery.description,
    image: gallery.coverImage ? urlFor(gallery.coverImage).ignoreImageParams().width(1200).url() : undefined,
  });
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(gallerySlugsQuery);

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function GalleryDetailPage({ params }: GalleryPageProps) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const { slug } = await params;
  const gallery = await getGallery(slug, locale);

  if (!gallery) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
            {t.gallery}
          </p>

          <h1 className="max-w-4xl text-4xl font-light sm:text-5xl leading-tight md:text-7xl">
            {gallery.title}
          </h1>

          {gallery.description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              {gallery.description}
            </p>
          ) : null}
        </Reveal>
      </section>

      <GalleryImages
        title={gallery.title}
        coverImage={gallery.coverImage}
        photos={gallery.photos}
        locale={locale}
      />
    </main>
  );
}