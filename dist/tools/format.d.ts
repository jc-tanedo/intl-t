import { type State } from "../state";
import { inject } from "./inject";
export declare function list(value?: string[], options?: Intl.ListFormatOptions, { locale }?: State): string;
export declare function number(value?: number, options?: Intl.NumberFormatOptions, { locale }?: State): string;
export declare function currency(value?: number, options?: Intl.NumberFormatOptions, { locale }?: State): string;
export declare function date(value?: Date, options?: Intl.DateTimeFormatOptions, { locale }?: State): string;
export declare const re: {
  readonly se: readonly [1000, "conds"];
  readonly mi: readonly [60000, "nutes"];
  readonly ho: readonly [3600000, "urs"];
  readonly da: readonly [86400000, "ys"];
  readonly we: readonly [604800000, "eks"];
  readonly mo: readonly [2592000000, "nths"];
  readonly qu: readonly [7884000000, "arters"];
  readonly ye: readonly [31536000000, "ars"];
};
export declare function relative(
  value?: Date | number,
  options?: Intl.RelativeTimeFormatOptions & Record<string, any>,
  { locale, now }?: State,
): string;
export declare const format: {
  list: typeof list;
  number: typeof number;
  currency: typeof currency;
  date: typeof date;
  relative: typeof relative;
  time: typeof date;
  price: typeof currency;
  inject: typeof inject;
  timeZone: import("../locales").TimeZone;
  locale: import("../locales").Locale;
  now: Date;
  hydration?: boolean;
  formatOptions?: import("../locales").FormatOptions;
  formatFallback?: string;
};
