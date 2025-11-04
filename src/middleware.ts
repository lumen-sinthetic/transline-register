import { routing } from "@core/locale/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextMiddleware } from "next/server";

const intlMiddlewareHandler = createMiddleware(routing);

const middleware: NextMiddleware = req => {
  const res = intlMiddlewareHandler(req);

  const requestUrl = req.nextUrl.href;
  req.headers.set("x-url", requestUrl);
  res.headers.set("x-url", requestUrl);

  const pathname = req.nextUrl.pathname;
  req.headers.set("x-pathname", pathname);
  res.headers.set("x-pathname", pathname);

  return res;
};

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};

export default middleware;
