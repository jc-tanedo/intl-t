import { MiddlewareConfig } from "./middleware";
import { redirect as r, permanentRedirect as pr, RedirectType } from "next/navigation";
import { ResolveConfig, resolvePath } from "../tools/resolvers";
import { RouterConfig } from "./router";
import type { Locale, TranslationSettings } from "../types";
import { LinkConfig, NL } from "./link";
import { StaticParamsConfig } from "./params";
import type { FC } from "react";
export * from "../tools/match";
export * from "../tools/negotiator";
export * from "../tools/resolvers";
export * from "./link";
export * from "./middleware";
export * from "./params";
export * from "./router";
export * from "./state";
export declare function resolvedRedirect(href?: string, type?: RedirectType): never;
export declare function resolvedPermanentRedirect(href?: string, type?: RedirectType): never;
export declare const redirect: typeof r;
export declare const permanentRedirect: typeof pr;
export interface IntlConfig<L extends Locale = Locale, T extends FC<any> = NL>
  extends ResolveConfig<L>,
    StaticParamsConfig<L>,
    MiddlewareConfig<L>,
    RouterConfig<L>,
    LinkConfig<T> {
  settings?: Partial<TranslationSettings<L>>;
}
export declare function createNavigation<L extends Locale, LC extends FC<any>>(
  config?: IntlConfig<L, LC>,
): {
  config: IntlConfig<L, LC>;
  useRouter: typeof import("next/navigation").useRouter;
  Link: ({
    href,
    locale,
    currentLocale,
    config,
    Link,
    preventDynamic,
    ...props
  }: import("./link").LinkProps<
    L,
    import("react").ForwardRefExoticComponent<
      Omit<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, keyof import("next/link").LinkProps<any>> &
        import("next/link").LinkProps<any> & {
          children?: React.ReactNode | undefined;
        } & import("react").RefAttributes<HTMLAnchorElement>
    >
  > &
    Omit<
      Omit<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, keyof import("next/link").LinkProps<any>> &
        import("next/link").LinkProps<any> & {
          children?: React.ReactNode | undefined;
        } & import("react").RefAttributes<HTMLAnchorElement>,
      keyof import("./link").LinkProps<
        Locale,
        import("react").ForwardRefExoticComponent<
          Omit<import("react").AnchorHTMLAttributes<HTMLAnchorElement>, keyof import("next/link").LinkProps<any>> &
            import("next/link").LinkProps<any> & {
              children?: React.ReactNode | undefined;
            } & import("react").RefAttributes<HTMLAnchorElement>
        >
      >
    >) => Promise<import("react/jsx-runtime").JSX.Element>;
  redirect: typeof r;
  permanentRedirect: typeof pr;
  getLocale: {
    (preventDynamic: true, defaultLocale?: L | undefined): L | undefined;
    (preventDynamic?: boolean, defaultLocale?: L | undefined): L | Promise<L> | undefined;
  };
  setLocale: (locale: L) => string | undefined;
  resolvePath: typeof resolvePath;
  resolveHref: (
    href?: string,
    {
      locale,
      currentLocale,
      redirectPath,
      config,
      allowedLocales,
      pathPrefix,
      defaultLocale,
      getLocale,
    }?: import("./navigation").LocalizedHref<L>,
  ) => import("../types").Awaitable<`/${string}` | `/${L}${string}`>;
  resolveLocale: (path?: string, locales?: L[]) => L | undefined;
  match: typeof import("./navigation").match;
  middleware: import("./middleware").Middleware & MiddlewareConfig<L> & import("next/server").MiddlewareConfig;
  withMiddleware: import("./middleware").MiddlewareFactory;
  generateStaticParams: () => Promise<
    {
      [x: string]: Locale;
    }[]
  >;
  useLocale: (
    defaultLocale?: L | null | undefined,
    {
      hydration,
      path,
    }?: {
      hydration?: boolean;
      path?: string;
    },
  ) =>
    | import("../types").ReactState<Locale>
    | (L &
        import("../types").ReactState<L> & {
          locale: L;
          setLocale: import("../types").ReactSetState<L>;
        });
  usePathname: typeof import("next/navigation").usePathname;
  getPathname: typeof import("next/navigation").usePathname | typeof import("./headers").getHeadersRequestPathname;
  settings: IntlConfig<L, LC> & Partial<TranslationSettings<L, L, unknown, import("../types").Values, string, import("../types").Node>>;
  allowedLocales: L[] | readonly L[] | undefined;
  locales: L[] | readonly L[];
  locale: L;
};
