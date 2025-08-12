import type { FormatOptions, Locale, TimeZone } from "./locales";
export interface State<L extends Locale = Locale> {
  timeZone: TimeZone;
  locale: L;
  now: Date;
  hydration?: boolean;
  formatOptions?: FormatOptions;
  formatFallback?: string;
}
export declare const isClient: boolean;
export declare const options: Intl.ResolvedDateTimeFormatOptions;
export declare const locale: string;
export declare const timeZone: string;
export declare const now: Date;
export declare let hydration: boolean;
export declare let isEdge: boolean;
export declare const state: State;
