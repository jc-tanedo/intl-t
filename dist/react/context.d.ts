import type { isArray, SearchWays, ArrayToString, ReactState, ReactSetState, Locale, TranslationProps as TP } from "../types";
import type { GlobalTranslation } from "../global";
import { TranslationNode } from "./translation";
export type TranslationContext = null | {
  reRender?: ReactSetState<number>;
  localeState?: ReactState<Locale>;
  t?: TranslationNode;
};
export declare const TranslationContext: import("react").Context<TranslationContext>;
interface TranslationProps<T extends TranslationNode, A extends string[] = string[], D extends string = string>
  extends TP<T["settings"], T["node"], T["values"], A, D> {
  t?: T;
}
export { TranslationProps as TranslationProviderProps };
export declare function TranslationProvider<
  T extends TranslationNode,
  A extends isArray<SearchWays<T>>,
  D extends ArrayToString<A, T["settings"]["ps"]>,
>({
  t,
  onLocaleChange,
  locale,
  children,
  i18nKey,
  id,
  path,
  messages,
  source,
  variables,
  settings,
  ...state
}: TranslationProps<T, A, D>):
  | bigint
  | false
  | import("../types").Base
  | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>
  | import("../types").Content<T["node"]>
  | null
  | undefined;
export declare const T: typeof TranslationProvider;
export { T as Trans, T as Tr };
export declare function hook(...args: any[]): any;
export declare const useTranslation: GlobalTranslation;
export declare const useTranslations: GlobalTranslation;
export { hook as useTranslation, hook as useTranslations };
