import { NextResponse } from "next/server";
import { negotiator } from "../tools/negotiator";
import { match } from "../tools/match";
import { LOCALE_HEADERS_KEY, PATH_HEADERS_KEY } from "./headers";
export const LOCALE_COOKIE_KEY = "locale";
export const middlewareConfig = {
  matcher: ["/((?!api|.*\\..*|_next).*)"],
};
// @ts-ignore
export function detect(req, domains = this?.domains || []) {
  const { hostname } = req.nextUrl;
  const domain = domains.find(d => hostname.includes(d.domain));
  return [domain?.defaultLocale || "", ...(domain?.locales || [])];
}
export function createMiddleware(settings) {
  settings.config = middlewareConfig;
  settings.middleware = middleware.bind(settings);
  settings.withMiddleware = withMiddleware.bind(settings);
  settings.match = match.bind(settings);
  settings.domains && (settings.detect ??= detect.bind(settings));
  return Object.assign(settings.middleware, settings, middlewareConfig);
}
export function middleware(req, ev, res) {
  let {
    allowedLocales = [],
    defaultLocale = allowedLocales[0],
    strategy = "param",
    pathPrefix = strategy == "domain" ? "hidden" : "default",
    pathBase = pathPrefix == "hidden" ? "detect-latest" : "detect-default",
    detect = req => negotiator(req),
    redirectPath = "r",
    match = () => "",
    // @ts-ignore
  } = this;
  res ||= NextResponse.next();
  const { nextUrl, cookies } = req;
  let url = nextUrl.clone();
  let [, locale, ...path] = nextUrl.pathname.split("/");
  if (!allowedLocales.includes(locale)) {
    if (locale == redirectPath) ((pathBase = "detect-latest"), (pathPrefix = "always"), (strategy = "param"), (res = undefined));
    else path.unshift(locale);
    if (pathBase == "always-default") locale = defaultLocale;
    else if (pathBase == "always-detect" || !(locale = cookies.get(LOCALE_COOKIE_KEY)?.value))
      locale = match(typeof detect != "function" ? detect || null : detect(req));
    else if (pathBase == "detect-default") locale = defaultLocale;
    else locale ||= defaultLocale;
    url.pathname = [locale, ...path].join("/");
    if (strategy != "headers") {
      if (pathPrefix != "always" && (pathPrefix == "default" ? locale == defaultLocale : true))
        res = res ? NextResponse.rewrite(url) : NextResponse.redirect(((url.pathname = path.join("/")), url));
      else if (pathPrefix == "always") res = NextResponse.redirect(url);
    }
    res ||= NextResponse.redirect(url);
  } else if ((pathPrefix == "default" && locale == defaultLocale) || pathPrefix == "hidden") {
    url.pathname = path.join("/");
    res = NextResponse.redirect(url);
  } else if (strategy == "headers") res = NextResponse.rewrite(((url.pathname = path.join("/")), url));
  res.headers.set(PATH_HEADERS_KEY, (path.unshift(""), path.join("/")));
  res.headers.set(LOCALE_HEADERS_KEY, locale);
  res.cookies.set(LOCALE_COOKIE_KEY, locale);
  return res;
}
export const i18nMiddleware = middleware;
export function withMiddleware(middleware) {
  // @ts-ignore
  const i18nMiddlewareBound = i18nMiddleware.bind(this);
  return (req, ev, res) => {
    res = i18nMiddlewareBound(req, ev, res);
    return middleware(req, ev, res);
  };
}
export { withMiddleware as withI18nMiddleware };
