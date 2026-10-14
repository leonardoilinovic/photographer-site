import { pageMetadata } from "@/lib/seo";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { localizedPath } from "@/i18n/config";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { galleriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/app/components/Reveal";

type Gallery = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: unknown;
  description?: string;
};

export async function generateMetadata({ params }: LocalePageProps) {
  return pageMetadata(await getLocale(params), "portfolio", "/portfolio");
}

export default async function PortfolioPage({ params }: LocalePageProps) {
  const locale = await getLocale(params);
  const t = getDictionary(locale);
  const galleries: Gallery[] = await client.fetch(galleriesQuery, { locale, fallbackLocale: defaultLocale });

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
            {t.portfolio}
          </p>
          <h1 className="max-w-5xl text-4xl font-light sm:text-5xl leading-tight md:text-7xl">
            {t.portfolioTitle}
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
        <div className="grid gap-12">
          {galleries.map((gallery, index) => (
            <Reveal key={gallery._id} delay={0.05 * index}>
              <Link
                href={localizedPath(`/portfolio/${gallery.slug?.current || ""}`, locale)}
                className="group grid gap-6 border-b border-neutral-200 pb-12 md:grid-cols-[1.3fr_1fr]"
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className={index % 2 === 0 ? "relative aspect-[16/10]" : "relative aspect-[4/3]"}>
                    {gallery.coverImage ? (
                      <Image
                        src={urlFor(gallery.coverImage).width(1400).height(1000).url()}
                        alt={gallery.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        {t.noImage}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {t.gallery} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl font-light sm:text-4xl md:text-5xl lg:text-6xl">{gallery.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
                    {gallery.description}
                  </p>
                  <span className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-neutral-700 group-hover:text-black">
                    {t.openGallery}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}