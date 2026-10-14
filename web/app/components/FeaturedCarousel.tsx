"use client";

import { getDictionary } from "@/i18n/dictionary";
import { localizedPath, type Locale } from "@/i18n/config";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "./Reveal";

type CarouselGallery = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: SanityImageSource;
  description?: string;
};

type FeaturedCarouselProps = {
  locale: Locale;
  galleries: CarouselGallery[];
};

function GalleryCard({ gallery, locale }: { gallery: CarouselGallery; locale: Locale }) {
  const t = getDictionary(locale);
  const href = gallery.slug?.current
    ? `/portfolio/${gallery.slug.current}`
    : "/portfolio";

  return (
    <Link href={localizedPath(href, locale)} className="group block">
      <article className="relative overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {gallery.coverImage ? (
            <Image
              src={urlFor(gallery.coverImage).width(1400).height(1750).url()}
              alt={gallery.title}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              {t.noImage}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/65">
              {t.selectedGallery}
            </p>

            <h3 className="mt-2 text-3xl font-light tracking-[-0.02em] text-white sm:text-[2.15rem]">
              {gallery.title}
            </h3>

            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/80">
              {t.viewGallery}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedCarousel({
  galleries,
  locale,
}: FeaturedCarouselProps) {
  const t = getDictionary(locale);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const first = itemRefs.current[0];
      if (!first) return;
      const step = first.getBoundingClientRect().width + 24;
      const end = Math.max(0, container.scrollWidth - container.clientWidth);
      const last = Math.max(0, Math.ceil((end - 1) / step));
      setMaxScroll(last);
      setCurrent(container.scrollLeft >= end - 2 ? last : Math.round(container.scrollLeft / step));
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    container.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", update);
    };
  }, [galleries.length]);

  if (!galleries?.length) return null;
  const hasMany = galleries.length > 2;

  const goTo = (index: number) => {
    const container = containerRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;
    container.scrollTo({
      left: item.offsetLeft - (itemRefs.current[0]?.offsetLeft ?? 0),
      behavior: "smooth",
    });
  };

  const scroll = (direction: "next" | "prev") => {
    goTo(direction === "next"
      ? (current < maxScroll ? current + 1 : 0)
      : (current > 0 ? current - 1 : maxScroll));
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <Reveal>
        <div className="mb-8 flex flex-col md:mb-14 gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
              {t.featured}
            </p>
            <h2 className="text-4xl font-light sm:text-5xl md:text-7xl">
              {t.selectedGalleries}
            </h2>
          </div>

          <Link
            href={localizedPath("/portfolio", locale)}
            className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-black"
          >
            {t.viewAll}
          </Link>
        </div>
      </Reveal>

      {hasMany ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label={t.previousGallery}
            className="absolute left-2 min-[1408px]:-left-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur hover:bg-white hover:border-black/20 transition md:flex cursor-pointer"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label={t.nextGallery}
            className="absolute right-2 min-[1408px]:-right-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur hover:bg-white hover:border-black/20 transition md:flex cursor-pointer"
          >
            →
          </button>

          <div className="relative flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={containerRef}>
            {galleries.map((gallery, index) => (
              <div
                key={gallery._id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="shrink-0 basis-[88%] snap-start sm:basis-[72%] lg:basis-[calc(25%-18px)]"
              >
                <Reveal delay={0.06 * (index % 4)}>
                  <GalleryCard gallery={gallery} locale={locale} />
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1 md:mt-6 md:gap-2">
            {Array.from({ length: maxScroll + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-current={current === index ? "true" : undefined}
                aria-label={`${t.goToPosition} ${index + 1}`}
                className={`flex h-11 min-w-6 md:h-1.5 md:min-w-0 items-center justify-center rounded-full after:h-1.5 after:rounded-full after:transition-all ${
                  current === index
                    ? "after:w-8 after:bg-black"
                    : "after:w-1.5 after:bg-neutral-300 hover:after:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {galleries.map((gallery, index) => (
            <Reveal key={gallery._id} delay={0.08 * index}>
              <GalleryCard gallery={gallery} locale={locale} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}