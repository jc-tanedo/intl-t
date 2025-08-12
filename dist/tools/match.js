export function match(
  requestLocales,
  // @ts-ignore-error optional binding
  availableLocales = this?.allowedLocales || requestLocales || [],
  // @ts-ignore-error optional binding
  defaultLocale = this?.mainLocale || this?.defaultLocale || availableLocales[0],
) {
  requestLocales = typeof requestLocales === "string" ? [requestLocales] : requestLocales || [];
  let matchedLocale;
  for (let i = 0; i < requestLocales.length; i++) {
    const locale = requestLocales[i];
    let [language, region] = locale.split("-");
    if ((matchedLocale = availableLocales.find(l => l.startsWith(locale)))) break;
    if ((matchedLocale = availableLocales.find(l => l.startsWith(language)))) break;
    matchedLocale = availableLocales.find(l => l.includes(region));
  }
  return matchedLocale || defaultLocale || undefined;
}
export { match as matchLocale };
