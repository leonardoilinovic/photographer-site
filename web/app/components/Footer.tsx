import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between md:px-12">
        <p>© 2026 Photographer Portfolio. All rights reserved.</p>

        <div className="flex items-center gap-6 uppercase tracking-[0.16em]">
          <Link href="/portfolio" className="hover:text-black">
            Portfolio
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}