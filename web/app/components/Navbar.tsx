"use client";

import { usePathname } from "next/navigation";
import { getNavigationDictionary } from "@/i18n/dictionary";
import { locales, languageNames, localizedPath, type Locale } from "@/i18n/config";
import NavbarWordmark from "./NavbarWordmark";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getNavigationDictionary(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = localizedPath(pathname, "de").replace(/\/$/, "") === "";
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  return (
    <header
      data-home={isHome}
      data-surface={scrolled || open}
      className={`${styles.header} ${isHome ? "fixed" : "sticky"} top-0 z-50 w-full rounded-b-[18px] border-b border-black/5 bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-xl`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <nav aria-label={t.mainNavigation} className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 px-6 md:px-12">
        <Link
          href={localizedPath("/", locale)}
          aria-label={`Kristijan Turbic Photography - ${t.home}`}
          onClick={() => setOpen(false)}
          className="shrink-0 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          <NavbarWordmark />
        </Link>

        <div className="ml-auto flex items-center gap-2 md:order-3 md:ml-8 lg:ml-12">
          <div className="inline-flex items-center text-[10px] tracking-[0.16em]">
            {locales.map((language, index) => (
              <Fragment key={language}>
                {index > 0 && <span aria-hidden="true" className="text-neutral-300">/</span>}
                <Link
                  href={localizedPath(pathname, language)}
                  lang={language}
                  hrefLang={language}
                  aria-label={languageNames[language]}
                  aria-current={locale === language ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex h-11 w-8 items-center justify-center transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 ${locale === language ? "font-medium text-neutral-900" : "text-neutral-400"}`}
                >
                  {language.toUpperCase()}
                </Link>
              </Fragment>
            ))}
          </div>

          <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="navigation-links"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center text-neutral-800 transition hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
              <path d={open ? "M6 6l12 12M6 18L18 6" : "M3 8h18M3 16h18"} />
            </svg>
          </button>
        </div>

        <div id="navigation-links" lang={locale} className={`${open ? "flex" : "hidden"} w-full flex-col items-start gap-1 border-t border-neutral-200/70 pt-3 pb-5 text-xs uppercase tracking-[0.2em] text-neutral-600 md:order-2 md:ml-auto md:flex md:w-auto md:flex-row md:items-center md:gap-8 lg:gap-10 md:border-0 md:p-0`}>
          <Link href={localizedPath("/portfolio", locale)} onClick={() => setOpen(false)} className="flex min-h-11 w-full items-center transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 md:w-auto">
            {t.portfolio}
          </Link>
          <Link href={localizedPath("/about", locale)} onClick={() => setOpen(false)} className="flex min-h-11 w-full items-center transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 md:w-auto">
            {t.about}
          </Link>
          <Link href={localizedPath("/contact", locale)} onClick={() => setOpen(false)} className="flex min-h-11 w-full items-center transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 md:w-auto">
            {t.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}
