"use client";

import { ReactNode, useEffect, useRef } from "react";

type HeroParallaxImageProps = {
  children: ReactNode;
  maxShift?: number;
};

export default function HeroParallaxImage({ children, maxShift = 32 }: HeroParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    let ticking = false;

    const update = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      const centerDistance = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalized = Math.max(-1, Math.min(1, centerDistance / (viewportHeight / 2)));
      const translateY = normalized * maxShift * -1;

      element.style.transform = `translateY(${translateY}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => update());
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [maxShift]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
      style={{ transform: "translateY(0px)" }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
