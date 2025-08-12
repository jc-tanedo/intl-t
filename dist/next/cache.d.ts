import type { Translation } from "../types";
export interface Cache {
  locale: string;
  t: Translation;
}
export declare const getCache: () => Partial<Cache>;
export declare function getCachedRequestLocale(): string | undefined;
export declare function setCachedRequestLocale(locale?: string): string | undefined;
