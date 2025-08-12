import type { Locale } from "../locales/types";
export { isClient } from "../state";
export declare const isRSC: boolean;
export declare function getLocale<L extends Locale>(preventDynamic: true, defaultLocale?: L): L | undefined;
export declare function getLocale<L extends Locale>(preventDynamic?: boolean, defaultLocale?: L): Promise<L> | L | undefined;
export declare function setLocale<L extends Locale>(locale: L): string | undefined;
export declare const getPathname: typeof import("next/navigation").usePathname | typeof import("./headers").getHeadersRequestPathname;
