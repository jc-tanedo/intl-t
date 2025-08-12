import { jsx as _jsx } from "react/jsx-runtime";
import { default as NL } from "next/link";
import { LC } from "./link_client";
import { getPathname, isRSC } from "./state";
import { resolveHref } from "../tools/resolvers";
import { getRequestLocale } from "./request";
export { LC };
export async function LS({
  href = "",
  locale,
  currentLocale,
  // @ts-ignore
  config = this || {},
  Link = config.Link || NL,
  preventDynamic = config.preventDynamic ?? true,
  ...props
}) {
  if (!href && locale)
    if (preventDynamic) {
      const { allowedLocales, defaultLocale, pathPrefix, redirectPath } = config;
      config = { allowedLocales, defaultLocale, pathPrefix, redirectPath };
      return _jsx(LC, { href: href, locale: locale, currentLocale: currentLocale, config: config, ...props });
    } else href = (await getPathname()) || "";
  // @ts-ignore
  config.getLocale ||= getRequestLocale.bind(null, preventDynamic);
  href = await resolveHref.call(config, href, { ...config, locale, currentLocale });
  return _jsx(Link, { href: href, ...props });
}
export const Link = isRSC ? LS : LC;
