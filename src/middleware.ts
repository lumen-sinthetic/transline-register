import { routing } from "@core/locale/i18n/routing";
import { selfURL } from "@shared/env";
import createMiddleware from "next-intl/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { NextMiddleware, NextResponse } from "next/server";

const intlMiddlewareHandler = createMiddleware(routing);

const middleware: NextMiddleware = req => {
  const res = intlMiddlewareHandler(req);

  const requestUrl = req.nextUrl.href;
  req.headers.set("x-url", requestUrl);
  res.headers.set("x-url", requestUrl);

  const pathname = req.nextUrl.pathname;
  req.headers.set("x-pathname", pathname);
  res.headers.set("x-pathname", pathname);

  const isLoggedIn = req.cookies.get("is-auth")?.value === "true";

  if (req.nextUrl.pathname.includes("register") && isLoggedIn) {
    return NextResponse.redirect(new NextURL("/profile", selfURL));
  }

  if (req.nextUrl.pathname.includes("profile") && !isLoggedIn) {
    return NextResponse.redirect(new NextURL("/register", selfURL));
  }

  return res;
};

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default middleware;
