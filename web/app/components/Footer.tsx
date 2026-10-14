import { getDictionary } from "@/i18n/dictionary";
import { type Locale } from "@/i18n/config";
import Link from "next/link";
import NavbarWordmark from "./NavbarWordmark";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const legalLinks = locale === "de"
    ? [{ href: "/impressum", label: "Impressum" }, { href: "/datenschutz", label: "Datenschutz" }]
    : [{ href: "/en/imprint", label: "Imprint" }, { href: "/en/privacy", label: "Privacy" }];

  return (
    <footer className="mt-auto shrink-0 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-2 text-center text-sm text-neutral-600 md:px-12">
        <p>© 2026 {t.siteTitle}. {t.rights}</p>
        <nav aria-label={locale === "de" ? "Rechtliche Informationen" : "Legal information"} className="mt-2 flex justify-center gap-4 text-xs text-neutral-500">
          {legalLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="transition hover:text-black">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex justify-center px-6 pb-4 md:pb-5">
        <NavbarWordmark variant="footer" />
      </div>
    </footer>
  );
}