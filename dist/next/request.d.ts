import { getHeadersRequestPathname } from "./headers";
import type { Locale } from "../locales/types";
export { setCachedRequestLocale as setRequestLocale } from "./cache";
export declare function getRequestLocale<L extends Locale>(preventDynamic: true): L | undefined;
export declare function getRequestLocale<L extends Locale>(preventDynamic?: boolean): Promise<L> | L | undefined;
export declare const getRequestPathname: typeof getHeadersRequestPathname;
