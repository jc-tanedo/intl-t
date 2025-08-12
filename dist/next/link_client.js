"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import NL from "next/link";
import { resolveHref } from "../tools/resolvers";
import { useLocale, usePathname } from "./router";
export function LC({
  href = "",
  locale,
  currentLocale,
  // @ts-ignore
  config = this || {},
  Link = config.Link || NL,
  ...props
}) {
  if (!href && locale) href = usePathname();
  // @ts-ignore
  config.getLocale ||= () => useLocale()[0];
  href = resolveHref(href, { ...config, locale, currentLocale });
  return _jsx(Link, { href: href, ...props });
}
