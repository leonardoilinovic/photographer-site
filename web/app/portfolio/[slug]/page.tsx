import Image from "next/image";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { galleryBySlugQuery, gallerySlugsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "@/app/components/Reveal";

type GalleryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Gallery = {
  _id: string;
  title: string;
  description?: string;
  coverImage?: SanityImageSource;
  photos?: SanityImageSource[];
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(gallerySlugsQuery);

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function GalleryDetailPage({ params }: GalleryPageProps) {
  const { slug } = await params;
  const gallery: Gallery | null = await client.fetch(galleryBySlugQuery, { slug });

  if (!gallery) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
            Gallery
          </p>

          <h1 className="max-w-4xl text-5xl font-light leading-tight md:text-7xl">
            {gallery.title}
          </h1>

          {gallery.description ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
              {gallery.description}
            </p>
          ) : null}
        </Reveal>
      </section>

      {gallery.coverImage ? (
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
              <img
                src={urlFor(gallery.coverImage).width(1600).url()}
                alt={gallery.title}
                className="block max-h-[80vh] w-full object-contain"
              />
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-6 md:grid-cols-2">
          {gallery.photos?.map((photo, index) =>
            photo ? (
              <Reveal key={index} delay={0.04 * index}>
                <div className="overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-3 md:p-4">
                  <img
                    src={urlFor(photo).width(1200).url()}
                    alt={`${gallery.title} photo ${index + 1}`}
                    className="mx-auto block max-h-[75vh] w-auto max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ) : null
          )}
        </div>
      </section>
    </main>
  );
}