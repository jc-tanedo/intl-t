import type { Locale, Node, Promisable, ResolveNode } from "../types";
export declare function getLocale<const N extends Node>(
  node: N | Promisable<N> | ((locale?: Locale) => Promisable<N>),
  locale?: Locale,
  preload?: boolean,
): N;
export declare function getLocales<const T, L extends Locale = Locale>(
  node: T | ((locale: L) => Promisable<T>),
  allowedLocales: readonly L[],
  preload?: boolean,
): Promise<{
  [K in L]: T extends (locale: K) => infer N ? ResolveNode<N> : ResolveNode<T>;
}>;
export declare function getLocales<const T, L extends Locale = Locale>(
  locales: T & Record<L, unknown>,
  preload?: boolean,
): Promise<{
  [K in L & keyof T]: ResolveNode<T[K]>;
}>;
