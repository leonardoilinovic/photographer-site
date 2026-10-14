"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

type PortraitRevealProps = {
  topImage: SanityImageSource;
  bottomImage?: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
};

export default function PortraitReveal({
  topImage,
  bottomImage,
  alt,
  width = 1200,
  height = 1500,
}: PortraitRevealProps) {
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Animation loop for fluid motion
  useEffect(() => {
    if (!hovered) return;

    const animate = () => {
      setAnimationFrame(prev => prev + 1);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hovered]);

  const topUrl = useMemo(() => urlFor(topImage).width(width).height(height).url(), [topImage, width, height]);
  const bottomUrl = useMemo(
    () => (bottomImage ? urlFor(bottomImage).width(width).height(height).url() : null),
    [bottomImage, width, height]
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPointer({ x, y });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPointer(null);
  };

  const handleMouseEnter = () => setHovered(true);

  const hasBottom = Boolean(bottomUrl);

  // Create irregular fluid shape using multiple overlapping gradients
  const createFluidMask = (x: number, y: number) => {
    const time = animationFrame * 0.02; // Control animation speed
    const offset1 = Math.sin(time) * 15;
    const offset2 = Math.cos(time * 1.3) * 12;
    const offset3 = Math.sin(time * 0.7) * 18;

    return `
      radial-gradient(ellipse 180px 140px at ${x + offset1}px ${y - 10}px, transparent 0%, transparent 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 80%, black 100%),
      radial-gradient(ellipse 120px 160px at ${x - 40 + offset2}px ${y + 20}px, transparent 0%, transparent 25%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.7) 75%, black 95%),
      radial-gradient(ellipse 140px 100px at ${x + 30 + offset3}px ${y + 40}px, transparent 0%, transparent 35%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.9) 85%, black 100%)
    `;
  };

  const maskImage = hasBottom && hovered && pointer
    ? createFluidMask(pointer.x, pointer.y)
    : "none";

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {hasBottom && (
        <div className="absolute inset-0">
          <Image
            src={bottomUrl!}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>
      )}

      <div
        className="absolute inset-0"
        style={hasBottom ? {
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskComposite: "intersect",
          maskComposite: "intersect",
        } : {}}
      >
        <Image
          src={topUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
    </div>
  );
}
