"use client";

import { useEffect, useRef, useState } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { urlFor } from "@/sanity/lib/image";
import Reveal from "./Reveal";

type Props = {
  title: string;
  coverImage?: SanityImageSource;
  photos?: SanityImageSource[];
  locale: Locale;
};

export default function GalleryImages({ title, coverImage, photos, locale }: Props) {
  const t = getDictionary(locale);
  const images = [
    ...(coverImage ? [{ source: coverImage, alt: title, originalIndex: -1 }] : []),
    ...(photos ?? []).flatMap((source, index) => source
      ? [{ source, alt: `${title} ${t.photo} ${index + 1}`, originalIndex: index }]
      : []),
  ];
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = active !== null;
  const current = active === null ? null : images[active];
  const navigate = (direction: number) => setActive(index =>
    index === null ? null : (index + direction + images.length) % images.length);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position, top: body.style.top,
      width: body.style.width, overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight);
    Object.assign(body.style, {
      position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden",
      paddingRight: `${padding + scrollbar}px`,
    });
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const buttonStyle = "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <>
      {coverImage ? (
        <section className="mx-auto max-w-7xl px-6 md:px-12">
          <Reveal>
            <button type="button" onClick={() => setActive(0)} aria-label={`${t.openImage}: ${title}`} aria-haspopup="dialog"
              className="block w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4">
              <img
                src={urlFor(coverImage).ignoreImageParams().width(1600).url()}
                alt={title}
                className="block h-auto max-h-[80vh] w-full object-contain"
              />
            </button>
          </Reveal>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {images.map((image, index) => image.originalIndex >= 0 ? (
            <Reveal key={image.originalIndex} delay={0.04 * image.originalIndex}>
              <button type="button" onClick={() => setActive(index)} aria-label={`${t.openImage}: ${image.alt}`} aria-haspopup="dialog"
                className="block w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-3 md:p-4 focus-visible:outline-2 focus-visible:outline-offset-4">
                <img
                  src={urlFor(image.source).ignoreImageParams().width(1200).url()}
                  alt={image.alt}
                  className="mx-auto block h-auto max-h-[75vh] w-auto max-w-full object-contain"
                  loading="lazy"
                />
              </button>
            </Reveal>
          ) : null)}
        </div>
      </section>

      <dialog ref={dialogRef} aria-label={`${t.imageViewer}: ${title}`}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-0 text-white backdrop:bg-black/90"
        onCancel={event => { event.preventDefault(); setActive(null); }}
        onClick={event => { if (event.target === event.currentTarget) setActive(null); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigate(event.key === "ArrowLeft" ? -1 : 1);
          }
          if (event.key === "Tab") {
            const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
        }}>
        {current && (
          <>
            <div className="flex h-full w-full items-center justify-center px-4 py-20 sm:px-20"
              onClick={event => { if (event.target === event.currentTarget) setActive(null); }}
              onTouchStart={event => {
                const touch = event.touches[0];
                touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
              }}
              onTouchEnd={event => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                  event.preventDefault();
                  navigate(dx < 0 ? 1 : -1);
                }
              }}>
              <img key={active}
                src={urlFor(current.source).ignoreImageParams().width(2400).url()}
                alt={current.alt} draggable={false}
                className="block h-auto max-h-full w-auto max-w-full object-contain"
              />
            </div>
            <button type="button" autoFocus aria-label={t.closeLightbox} onClick={() => setActive(null)}
              className={`absolute top-4 right-4 ${buttonStyle}`}><span aria-hidden="true">&#215;</span></button>
            {images.length > 1 && (
              <>
                <button type="button" aria-label={t.previousImage} onClick={() => navigate(-1)}
                  className={`absolute bottom-4 left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${buttonStyle}`}><span aria-hidden="true">&#8592;</span></button>
                <button type="button" aria-label={t.nextImage} onClick={() => navigate(1)}
                  className={`absolute right-4 bottom-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 ${buttonStyle}`}><span aria-hidden="true">&#8594;</span></button>
              </>
            )}
            <p aria-live="polite" aria-atomic="true" className="pointer-events-none absolute inset-x-20 bottom-8 text-center text-xs tracking-[0.2em] text-white/65">
              {active! + 1} / {images.length}
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
