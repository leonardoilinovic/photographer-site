"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function MagneticLink({
  href,
  children,
  className = "",
}: MagneticLinkProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}