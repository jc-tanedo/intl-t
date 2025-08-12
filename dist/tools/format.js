import { state } from "../state";
import { inject } from "./inject";
// @ts-ignore
export function list(value = [], options, { locale } = this) {
  return new Intl.ListFormat(locale, options).format(value);
}
// @ts-ignore
export function number(value = 0, options, { locale } = this) {
  return new Intl.NumberFormat(locale, options).format(value);
}
// @ts-ignore
export function currency(value = 0, options = {}, { locale } = this) {
  options.style = "currency";
  options.currency ??= "USD";
  return new Intl.NumberFormat(locale, options).format(value);
}
// @ts-ignore
export function date(value = new Date(), options, { locale } = this) {
  return new Intl.DateTimeFormat(locale, options).format(value);
}
export const re = {
  se: [1000, "conds"],
  mi: [60000, "nutes"],
  ho: [3600000, "urs"],
  da: [86400000, "ys"],
  we: [604800000, "eks"],
  mo: [2592000000, "nths"],
  qu: [7884000000, "arters"],
  ye: [31536000000, "ars"],
};
export function relative(
  value = 0,
  options = {},
  // @ts-ignore
  { locale, now } = this,
) {
  let { unit } = options;
  if (value instanceof Date) {
    value = value.getTime() - now.getTime();
    unit
      ? (value = Math.floor(value / re[`${unit[0]}${unit[1]}`][0]))
      : Object.entries(re).find(([k1, [v, k2]]) => (value >= v ? ((value = Math.floor(value / v)), (options.unit = k1 + k2)) : false));
  }
  unit ??= "day";
  return new Intl.RelativeTimeFormat(locale, options).format(value, unit);
}
export const format = { ...state, list, number, currency, date, relative, time: date, price: currency, inject };
