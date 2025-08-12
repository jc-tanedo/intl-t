import NL from "next/link";
import type { Locale } from "../locales/types";
import { LinkProps } from "./link";
import type { ComponentProps } from "react";
type NL = typeof NL;
export declare function LC<L extends Locale, L_ extends string, LC extends NL>({
  href,
  locale,
  currentLocale,
  config,
  Link,
  ...props
}: LinkProps<L | L_, LC> & ComponentProps<LC>): import("react/jsx-runtime").JSX.Element;
export {};
