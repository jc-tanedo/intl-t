import { resolveLocale } from "../tools/resolvers";
import { locale as l } from "../state";
export const LOCALE_CLIENT_KEY = "LOCALE";
"localStorage" in globalThis ? null : (globalThis.localStorage = undefined);
export function setClientLocale(locale, key = LOCALE_CLIENT_KEY) {
  // @ts-ignore-error optional binding
  if (this?.settings) this.settings.locale = locale;
  locale && localStorage?.setItem(key, locale);
  return locale;
}
export function getClientLocale(key = LOCALE_CLIENT_KEY) {
  // @ts-ignore-error optional binding
  const settings = this?.settings;
  const r = resolveLocale.bind(settings);
  // @ts-expect-error location type from browser
  const locale = localStorage?.getItem(key) || r(location.pathname) || r(l);
  if (settings) settings.locale = locale;
  return locale;
}
