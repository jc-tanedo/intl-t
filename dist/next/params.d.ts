import type { Locale } from "../locales/types";
export interface StaticParamsConfig<L extends Locale = Locale, S extends string = string> {
  locales?: L[];
  param?: S;
}
export declare function createStaticParams<L extends Locale, S extends string>(
  config: StaticParamsConfig<L, S>,
): () => Promise<
  {
    [x: string]: Locale;
  }[]
>;
export declare function generateStaticParams<L extends Locale, S extends string>(
  this: StaticParamsConfig<L, S>,
): Promise<
  {
    [x: string]: L;
  }[]
>;
