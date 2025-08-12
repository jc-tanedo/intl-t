import type { Locale } from "../locales/types";
export declare function match<L extends Locale>(
  requestLocales?: Locale[] | Locale | null,
  availableLocales?: L[] | readonly L[],
  defaultLocale?: L | null,
): L;
export { match as matchLocale };
