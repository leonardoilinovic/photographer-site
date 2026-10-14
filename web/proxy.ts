import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localizedPath } from "./i18n/config";

const defaultLocaleRewriteHeader = "x-default-locale-rewrite";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const prefix = url.pathname.split("/")[1];
  if (prefix === defaultLocale) {
    if (request.headers.has(defaultLocaleRewriteHeader)) {
      const headers = new Headers(request.headers);
      headers.delete(defaultLocaleRewriteHeader);
      return NextResponse.next({ request: { headers } });
    }
    url.pathname = localizedPath(url.pathname, defaultLocale);
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(prefix)) return NextResponse.next();
  url.pathname = `/${defaultLocale}${url.pathname === "/" ? "" : url.pathname}`;
  const headers = new Headers(request.headers);
  headers.set(defaultLocaleRewriteHeader, "1");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.).*)"],
};
