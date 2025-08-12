"use client";
import { useRouter as ur, usePathname as up } from "next/navigation";
import { resolvePath, resolveHref } from "../tools/resolvers";
import { useLocale } from "../react/hooks";
export { useLocale };
export const usePathname = () => resolvePath(up());
const state = {};
// @ts-ignore
function useResolvedRouter({ useRouter = ur, ...config } = this || {}) {
  const router = useRouter();
  let path = state.path?.();
  let locale = state.locale?.();
  const handler =
    method =>
    (href, { locale, ...options } = {}) =>
      router[method](resolveHref(href, { ...config, locale }), options);
  return {
    ...router,
    push: handler("push"),
    replace: handler("replace"),
    prefetch: handler("prefetch"),
    get pathname() {
      state.path ||= usePathname;
      return (path ||= state.path());
    },
    get locale() {
      state.locale ||= () => useLocale()[0];
      return (locale ||= state.locale());
    },
  };
}
export const useRouter = useResolvedRouter;
