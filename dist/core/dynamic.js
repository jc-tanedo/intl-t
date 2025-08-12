import { isClient } from "../state";
export function getLocale(node, locale, preload = !isClient) {
  if (preload && typeof node === "function") return getLocale(node(locale), locale, preload);
  return node;
}
export async function getLocales(node, list, preload = typeof list === "boolean" ? list : void 0) {
  let locales =
    typeof node === "object" ? node : typeof list !== "object" ? {} : list.reduce((acc, locale) => ({ ...acc, [locale]: node }), {});
  await Promise.all(Object.keys(locales).map(async locale => (locales[locale] = await getLocale(locales[locale], locale, preload))));
  return locales;
}
