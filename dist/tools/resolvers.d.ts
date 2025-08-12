import type { Locale, Awaitable } from "../types";
export declare function resolveLocale<L extends Locale>(path?: string, locales?: L[]): L | undefined;
type LL<L extends string = string> = L | null | undefined | "" | `/${string}` | Promise<L | null | undefined>;
export interface ResolveConfig<L extends Locale = Locale> {
  pathPrefix?: "always" | "default" | "optional" | "hidden";
  allowedLocales?: L[] | readonly L[];
  redirectPath?: string;
  defaultLocale?: L;
}
export interface LocalizedHref<L extends Locale = Locale> extends ResolveConfig<L> {
  locale?: LL<L>;
  currentLocale?: L;
  config?: ResolveConfig<L>;
  getLocale?: () => LL<L>;
}
export declare function resolveHref<L extends Locale>(
  href?: string,
  { locale, currentLocale, redirectPath, config, allowedLocales, pathPrefix, defaultLocale, getLocale }?: LocalizedHref<L>,
): Awaitable<`/${L | ""}${string}`>;
export declare function resolvePath(pathname: string, locales?: string[]): string;
export {};
