import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "./components/Reveal";

type GalleryPreview = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: unknown;
  description?: string;
};

type HomepageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: unknown;
  featuredGalleries?: GalleryPreview[];
};

export default async function Home() {
  const homepage: HomepageData = await client.fetch(homepageQuery);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal delay={0.05}>
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.4em] text-neutral-500">
              Modern Editorial Photography
            </p>

            <h1 className="max-w-4xl text-6xl font-light leading-[0.95] md:text-8xl">
              {homepage?.heroTitle || "Modern photography with depth, elegance, and emotion."}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
              {homepage?.heroSubtitle ||
                "A visual portfolio designed to present photography as a refined, immersive brand experience."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="rounded-full bg-black px-7 py-3 text-sm uppercase tracking-[0.18em] text-white transition hover:opacity-85"
              >
                Explore Work
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-black px-7 py-3 text-sm uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            {homepage?.heroImage ? (
              <Image
                src={urlFor(homepage.heroImage).width(1400).height(1700).url()}
                alt="Hero image"
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                No hero image yet
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neutral-500">
                Featured Work
              </p>
              <h2 className="text-5xl font-light md:text-7xl">Selected Galleries</h2>
            </div>

            <Link
              href="/portfolio"
              className="text-sm uppercase tracking-[0.2em] text-neutral-600 hover:text-black"
            >
              View all work
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {homepage?.featuredGalleries?.map((gallery, index) => (
            <Reveal key={gallery._id} delay={0.08 * index}>
              <Link
                href={`/portfolio/${gallery.slug?.current || ""}`}
                className={`group block ${index === 0 ? "lg:col-span-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className={index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}>
                    {gallery.coverImage ? (
                      <Image
                        src={urlFor(gallery.coverImage).width(1400).height(1200).url()}
                        alt={gallery.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-3xl font-light md:text-4xl">{gallery.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">
                    {gallery.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:px-12 lg:grid-cols-[0.9fr_2fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              About the Studio
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <h2 className="max-w-4xl text-4xl font-light leading-tight md:text-6xl">
                Visual storytelling with a clean editorial approach, balancing emotion,
                atmosphere, and intentional composition.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-600 md:text-lg">
                This website is designed to feel immersive and elegant, giving each body
                of work space to breathe while still guiding visitors toward inquiry and
                booking.
              </p>

              <Link
                href="/about"
                className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-neutral-700 hover:text-black"
              >
                Read more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <Reveal>
          <div className="rounded-[2rem] bg-black px-8 py-16 text-white shadow-[0_20px_80px_rgba(0,0,0,0.15)] md:px-14">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/60">
              Let&apos;s work together
            </p>
            <h2 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">
              Ready to create imagery that feels premium, modern, and memorable?
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-white px-7 py-3 text-sm uppercase tracking-[0.18em] text-black transition hover:opacity-85"
            >
              Contact
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}