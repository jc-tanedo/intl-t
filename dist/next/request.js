import { getHeadersRequestLocale, getHeadersRequestPathname } from "./headers";
import { getCachedRequestLocale, setCachedRequestLocale } from "./cache";
export { setCachedRequestLocale as setRequestLocale } from "./cache";
// @ts-ignore
export function getRequestLocale(preventDynamic = this?.settings?.preventDynamic || false) {
  return (
    // @ts-ignore
    getCachedRequestLocale.call(this) ||
    // Missing workStore in unstable_rootParams.
    // getRootParamsLocale.call(this) ||
    // @ts-ignore
    (!preventDynamic && getHeadersRequestLocale.call(this).then(setCachedRequestLocale)) ||
    undefined
  );
}
export const getRequestPathname = getHeadersRequestPathname;
