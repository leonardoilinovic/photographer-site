import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { galleriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "../components/Reveal";

type Gallery = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: unknown;
  description?: string;
};

export default async function PortfolioPage() {
  const galleries: Gallery[] = await client.fetch(galleriesQuery);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
            Portfolio
          </p>
          <h1 className="max-w-5xl text-5xl font-light leading-tight md:text-7xl">
            A curated collection of visual stories, portraits, and editorial moments.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12">
        <div className="grid gap-12">
          {galleries.map((gallery, index) => (
            <Reveal key={gallery._id} delay={0.05 * index}>
              <Link
                href={`/portfolio/${gallery.slug?.current || ""}`}
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
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                    Gallery {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-4xl font-light md:text-6xl">{gallery.title}</h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
                    {gallery.description}
                  </p>
                  <span className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-neutral-700 group-hover:text-black">
                    Open gallery
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