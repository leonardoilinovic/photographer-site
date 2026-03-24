import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import Reveal from "../components/Reveal";

type ContactPageData = {
  email?: string;
  phone?: string;
  instagram?: string;
  contactText?: string;
};

export default async function ContactPage() {
  const contact: ContactPageData = await client.fetch(contactPageQuery);

  return (
    <main className="bg-white text-black">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-12 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-500">
              Contact
            </p>

            <h1 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">
              Let&apos;s create something memorable.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              {contact?.contactText ||
                "For bookings, collaborations, campaigns, or other inquiries, feel free to get in touch."}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-neutral-200 p-8 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Contact Details
            </p>

            <div className="space-y-6 text-base text-neutral-800">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Email
                </p>
                {contact?.email ? (
                  <a href={`mailto:${contact.email}`} className="hover:text-black">
                    {contact.email}
                  </a>
                ) : (
                  <p>No email added yet.</p>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Phone
                </p>
                {contact?.phone ? (
                  <a href={`tel:${contact.phone}`} className="hover:text-black">
                    {contact.phone}
                  </a>
                ) : (
                  <p>No phone added yet.</p>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Instagram
                </p>
                {contact?.instagram ? (
                  <Link
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all hover:text-black"
                  >
                    {contact.instagram}
                  </Link>
                ) : (
                  <p>No Instagram link added yet.</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}