import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localizedPath } from "./i18n/config";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const prefix = url.pathname.split("/")[1];
  if (prefix === defaultLocale) {
    url.pathname = localizedPath(url.pathname, defaultLocale);
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(prefix)) return NextResponse.next();
  url.pathname = `/${defaultLocale}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|.*\\.).*)"],
};
