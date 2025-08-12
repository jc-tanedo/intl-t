import { default as NL, LinkProps as LP } from "next/link";
import { LC } from "./link_client";
import { ResolveConfig } from "../tools/resolvers";
import type { Locale } from "../locales/types";
import type { FC, ReactNode, ComponentProps } from "react";
export type NL = typeof NL;
export interface LinkConfig<LC extends FC<any> = NL> {
  Link?: LC;
  preventDynamic?: boolean;
}
export interface LinkProps<L extends Locale = Locale, LC extends FC<any> = NL> extends LinkConfig<LC>, Omit<LP, "href"> {
  href?: string;
  locale?: L;
  currentLocale?: L;
  config?: ResolveConfig<L> & LinkConfig<LC>;
  children?: ReactNode;
}
export { LC };
export declare function LS<L extends Locale, L_ extends string, LC extends FC<any>>({
  href,
  locale,
  currentLocale,
  config,
  Link,
  preventDynamic,
  ...props
}: LinkProps<L | L_, LC> & Omit<ComponentProps<LC>, keyof LinkProps>): Promise<import("react/jsx-runtime").JSX.Element>;
export declare const Link: typeof LS;
