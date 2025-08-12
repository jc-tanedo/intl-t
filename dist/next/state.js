import { getRequestLocale, getRequestPathname } from "./request";
import { useLocale, usePathname } from "./router";
import { setClientLocale } from "../react/client";
import { setRequestLocale } from "./request";
import React from "react";
export { isClient } from "../state";
export const isRSC = !("useEffect" in React);
export function getLocale(preventDynamic = false, defaultLocale) {
  // @ts-ignore-error optional binding
  return isRSC ? getRequestLocale.call(this, preventDynamic) : useLocale.call(this, defaultLocale);
}
export function setLocale(locale) {
  // @ts-ignore-error optional binding
  return isRSC ? setRequestLocale.call(this, locale) : setClientLocale.call(this, locale);
}
export const getPathname = isRSC ? getRequestPathname : usePathname;
