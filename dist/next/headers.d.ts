export declare const LOCALE_HEADERS_KEY = "x-locale";
export declare const PATH_HEADERS_KEY = "x-path";
export declare const getHeaders: () => Promise<Headers>;
export declare function getHeadersRequestLocale(key?: string): Promise<string | null>;
export declare function getHeadersRequestPathname(key?: string): Promise<string | null>;
