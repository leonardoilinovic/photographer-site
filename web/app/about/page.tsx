import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "../components/Reveal";

type AboutPageData = {
  title?: string;
  bio?: string;
  portrait?: SanityImageSource;
};

export default async function AboutPage() {
  const about: AboutPageData = await client.fetch(aboutPageQuery);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="order-2 lg:order-1">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              About
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">
              {about?.title || "About the Photographer"}
            </h1>

            <div className="mt-8 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              {about?.bio ? (
                about.bio.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p>No bio added yet.</p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            {about?.portrait ? (
              <Image
                src={urlFor(about.portrait).width(1200).height(1500).url()}
                alt={about?.title || "Portrait"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">
                No portrait yet
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </main>
  );
}