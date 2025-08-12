import { createMiddleware } from "./middleware";
import { redirect as r, permanentRedirect as pr } from "next/navigation";
import { resolveHref, resolveLocale, resolvePath } from "../tools/resolvers";
import { useRouter, useLocale, usePathname } from "./router";
import { Link } from "./link";
import { getLocale, getPathname, setLocale } from "./state";
import { createStaticParams } from "./params";
export * from "../tools/match";
export * from "../tools/negotiator";
export * from "../tools/resolvers";
export * from "./link";
export * from "./middleware";
export * from "./params";
export * from "./router";
export * from "./state";
export function resolvedRedirect(href, type) {
  // @ts-ignore
  return r(resolveHref.bind(this || {})(href), type);
}
export function resolvedPermanentRedirect(href, type) {
  // @ts-ignore
  return pr(resolveHref.bind(this || {})(href), type);
}
export const redirect = resolvedRedirect;
export const permanentRedirect = resolvedPermanentRedirect;
export function createNavigation(
  // @ts-ignore
  config = this || {},
) {
  const { allowedLocales } = config;
  if (!allowedLocales && Array.isArray(config.locales)) config.allowedLocales = config.locales;
  config.locales ||= allowedLocales;
  config.param ||= "locale";
  config.pathPrefix ||= config.strategy == "domain" ? "hidden" : "default";
  config.pathBase ||= config.pathPrefix == "hidden" ? "detect-latest" : "detect-default";
  config.defaultLocale ||= allowedLocales?.[0];
  config.redirectPath ||= "r";
  return {
    config,
    useRouter: useRouter.bind(config),
    Link: Link.bind(config),
    redirect: redirect.bind(config),
    permanentRedirect: permanentRedirect.bind(config),
    getLocale: getLocale.bind(config),
    setLocale: setLocale.bind(config),
    resolvePath: resolvePath.bind(config),
    resolveHref: resolveHref.bind(config),
    resolveLocale: resolveLocale.bind(config),
    match: config.match,
    middleware: createMiddleware(config),
    withMiddleware: config.withMiddleware,
    generateStaticParams: createStaticParams(config),
    useLocale: useLocale,
    usePathname,
    getPathname,
    settings: Object.assign(config, config.settings),
    allowedLocales,
    locales: allowedLocales,
    locale: allowedLocales[0],
  };
}
