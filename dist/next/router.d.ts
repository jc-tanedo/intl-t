import { useRouter as ur, usePathname as up } from "next/navigation";
import { ResolveConfig } from "../tools/resolvers";
import { useLocale } from "../react/hooks";
import type { Locale } from "../locales/types";
export interface Options {
  locale?: Locale;
}
declare module "next/dist/shared/lib/app-router-context.shared-runtime" {
  interface NavigateOptions extends Options {}
  interface PrefetchOptions extends Options {}
  interface AppRouterInstance extends Options {
    pathname?: string;
  }
}
export { useLocale };
export declare const usePathname: typeof up;
export interface RouterConfig<L extends Locale = Locale> extends ResolveConfig<L> {
  useRouter?: typeof ur;
}
export declare const useRouter: typeof ur;
