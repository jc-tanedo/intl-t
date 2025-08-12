import { locale as l } from "../state";
import { match } from "./match";
// @ts-ignore-error optional binding
export function resolveLocale(path = "", locales = this?.allowedLocales || []) {
  const locale = path.match(/^\/([a-z]{2}(?:-[A-Za-z]+)*)(?:$|\/)/)?.[1];
  if (!locale || !locales) return locale;
  return locales.includes(locale) ? locale : undefined;
}
export function resolveHref(
  href = "",
  {
    locale = resolveLocale(href),
    currentLocale,
    redirectPath,
    // @ts-ignore-error optional binding
    config = this || {},
    allowedLocales = config.allowedLocales,
    pathPrefix = config.pathPrefix || "always",
    defaultLocale = config.defaultLocale,
    getLocale = () => match(l, allowedLocales, undefined),
  } = this || {}, // @ts-ignore-error optional binding
) {
  if (href[0] !== "/") return href;
  if (pathPrefix == "hidden" && locale) pathPrefix = "always";
  if (pathPrefix == "hidden") locale = "";
  else locale ||= currentLocale || getLocale() || redirectPath;
  const fn = locale => {
    if (pathPrefix == "default" && locale == defaultLocale) locale = "";
    locale &&= `/${locale}`;
    return locale + href;
  };
  return locale instanceof Promise ? new Promise(async r => r(fn(await locale))) : fn(locale);
}
export function resolvePath(pathname, locales = []) {
  const [, _, p] = pathname.match(/(\/[a-z]{2}(?:-[A-Za-z]+)*)(\/.*|$)/) || [];
  if (!locales[0] || !p) return p || "/";
  return locales.some(l => _?.includes(l)) ? p : _ + p;
}
