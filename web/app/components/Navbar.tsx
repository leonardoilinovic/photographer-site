import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.35em] text-neutral-800 transition hover:opacity-70"
        >
          Studio
        </Link>

        <div className="flex items-center gap-6 text-sm uppercase tracking-[0.16em] text-neutral-600 md:gap-8">
          <Link href="/portfolio" className="transition hover:text-black">
            Portfolio
          </Link>
          <Link href="/about" className="transition hover:text-black">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-black">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}