"use client";

import { useRef, useState } from "react";
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
  galleries: CarouselGallery[];
};

function GalleryCard({ gallery }: { gallery: CarouselGallery }) {
  const href = gallery.slug?.current
    ? `/portfolio/${gallery.slug.current}`
    : "/portfolio";

  return (
    <Link href={href} className="group block">
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
              No image
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/65">
              Selected Gallery
            </p>

            <h3 className="mt-2 text-3xl font-light tracking-[-0.02em] text-white sm:text-[2.15rem]">
              {gallery.title}
            </h3>

            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/80">
              View Gallery
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedCarousel({
  galleries,
}: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!galleries?.length) return null;

  const hasMany = galleries.length > 2;
  const itemsPerView = 4;
  const maxScroll = Math.max(0, galleries.length - itemsPerView);

  const scroll = (direction: 'next' | 'prev') => {
    let newIndex = current;
    
    if (direction === 'next') {
      newIndex = current < maxScroll ? current + 1 : 0;
    } else {
      newIndex = current > 0 ? current - 1 : maxScroll;
    }
    
    setCurrent(newIndex);
    
    // Scroll to the new item
    setTimeout(() => {
      itemRefs.current[newIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 0);
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
      <Reveal>
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
              Featured Work
            </p>
            <h2 className="text-5xl font-light md:text-7xl">
              Selected Galleries
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-black"
          >
            View all work
          </Link>
        </div>
      </Reveal>

      {hasMany ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Previous gallery"
            className="absolute -left-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur hover:bg-white hover:border-black/20 transition md:flex cursor-pointer"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Next gallery"
            className="absolute -right-16 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-black shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur hover:bg-white hover:border-black/20 transition md:flex cursor-pointer"
          >
            →
          </button>

          <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={containerRef}>
            {galleries.map((gallery, index) => (
              <div
                key={gallery._id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="shrink-0 basis-[88%] snap-start sm:basis-[72%] lg:basis-[calc(25%-18px)]"
              >
                <Reveal delay={0.06 * (index % 4)}>
                  <GalleryCard gallery={gallery} />
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxScroll + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setCurrent(index);
                  setTimeout(() => {
                    itemRefs.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "start",
                    });
                  }, 0);
                }}
                aria-label={`Go to position ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  current === index
                    ? "w-8 bg-black"
                    : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {galleries.map((gallery, index) => (
            <Reveal key={gallery._id} delay={0.08 * index}>
              <GalleryCard gallery={gallery} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}