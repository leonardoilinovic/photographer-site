import { locales } from "@/i18n/config";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { getLocale, type LocalePageProps } from "@/i18n/server";
import "../globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  applicationName: SITE_NAME,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<LocalePageProps & {
  children: React.ReactNode;
}>) {
  const locale = await getLocale(params);
  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex min-h-dvh flex-col bg-white text-black antialiased [&>main]:shrink-0 [&>header]:shrink-0">
        <Navbar locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}