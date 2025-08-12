import { TranslationProviderProps } from "../react/context";
import { TranslationNode } from "../core/translation";
import type { isArray, SearchWays, ArrayToString, GlobalTranslation } from "../types";
export declare function TranslationProvider<
  T extends TranslationNode,
  A extends isArray<SearchWays<T>>,
  D extends ArrayToString<A, T["settings"]["ps"]>,
>({ children, t, preventDynamic, hydrate, ...props }: TranslationProviderProps<T, A, D>): Promise<any>;
export declare const T: typeof TranslationProvider;
export { T as Tr, T as Trans };
export declare const TranslationDynamicRendering: typeof TranslationProvider;
declare function hook(...args: any[]): any;
export declare const getTranslation: GlobalTranslation;
export declare const getTranslations: GlobalTranslation;
export { hook as getTranslation, hook as getTranslations };
