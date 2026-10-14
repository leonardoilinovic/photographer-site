import { Alex_Brush, Montserrat } from "next/font/google";
import styles from "./Navbar.module.css";

const script = Alex_Brush({ weight: "400", subsets: ["latin", "latin-ext"], display: "swap" });
const caption = Montserrat({ weight: "400", subsets: ["latin"], display: "swap" });

/** Shared typography artwork; navbar sizing remains the default. */
export default function NavbarWordmark({ variant = "navbar" }: { variant?: "navbar" | "footer" }) {
  const isFooter = variant === "footer";
  return (
    <div
      aria-hidden={isFooter ? undefined : true}
      role={isFooter ? "img" : undefined}
      aria-label={isFooter ? "Kristijan Turbić Photography" : undefined}
      className={`${styles.wordmark} ${isFooter ? `${styles.footerStamp} w-[192px] opacity-80 md:w-[244px]` : "w-44 md:w-52"}`}
    >
      <span className={styles.monogram}>KT</span>
      <span className={`${styles.signature} ${script.className}`}>Kristijan Turbić</span>
      <span className={`${styles.caption} ${caption.className}`}>PHOTOGRAPHY</span>
    </div>
  );
}
