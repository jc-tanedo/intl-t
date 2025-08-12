import type { Locale } from "../locales/types";
import type {
  Node,
  Values,
  Key,
  Variables,
  Content,
  LastKey,
  TranslationSettings,
  TranslationType,
  TranslationData,
  TranslationDataAdapter,
  Children,
  FollowWay,
  TranslationKeys,
  Join,
  TranslationFC,
  TranslationNodeFC,
  Override,
} from "./types";
import type { GlobalTranslation } from "../global";
import { injectVariables } from "../tools/inject";
declare const TranslationFunction: FunctionConstructor;
declare abstract class TranslationProxy extends TranslationFunction {
  protected __call__: Function;
  name: string;
  constructor(__call__: Function);
}
export declare class TranslationNode<
  S extends TranslationSettings = TranslationSettings,
  N = S["tree"][S["allowedLocale"]],
  V extends Values = S["variables"],
  L extends S["allowedLocale"] = S["allowedLocale"],
  R extends Key[] = [],
> extends TranslationProxy {
  settings: S;
  t: this;
  translation: this;
  translationNode: TranslationNode<S, N, V, L, R>;
  node: N;
  variables: Variables<N, V>;
  locale: L;
  path: [] extends R ? Key[] : R;
  key: LastKey<R>;
  children: Children<N>[];
  private __node__;
  global: TranslationType<S, S["tree"][L], S["variables"], L>;
  g: typeof this.global;
  private parent;
  use: this;
  get: this;
  static Node: typeof TranslationNode;
  static createTranslation: typeof createTranslation;
  static createTranslationSettings: typeof createTranslationSettings;
  static injectVariables: typeof injectVariables;
  static getChildren: typeof getChildren;
  static Proxy: typeof TranslationProxy;
  static context: any;
  static t: any;
  static setLocale: undefined;
  static getLocale: (this: any) => any;
  static Provider: TranslationFC;
  protected T: TranslationNodeFC<S, N, V>;
  Tr: TranslationNodeFC<S, N, V>;
  Trans: TranslationNodeFC<S, N, V>;
  Translation: TranslationNodeFC<S, N, V>;
  TranslationProvider: TranslationNodeFC<S, N, V>;
  static hook: (this: any, ...args: any[]) => any;
  protected hook: typeof this;
  useTranslation: this;
  useTranslations: this;
  getTranslation: this;
  getTranslations: this;
  useLocale: this;
  [x: symbol]: any;
  constructor(params: TranslationData<S, N, V, L, R>);
  call(...path: any[]): any;
  set<VV extends Values>(variables?: Override<Variables<N, V>, VV>): TranslationType<S, N, V & VV, L, R>;
  setSource(source: any): N;
  protected setNode(node: N): N | undefined;
  getNode(load?: boolean): N;
  addChildren(children?: Children<N>[]): Children<N>[];
  setChildren(children?: Children<N>[]): Children<N>[];
  get base(): Content<N>;
  getChildren(): Children<N>[];
  getLocale(): S["allowedLocale"];
  setLocale<LL extends S["allowedLocale"] = L>(
    locale?: LL | (string & {}) | ((p: L) => LL),
  ): TranslationType<S, FollowWay<S["tree"][LL], R>, V, LL, R>;
  get values(): Variables<N, V>;
  get child(): Children<N>;
  get currentLocale(): S["allowedLocale"];
  get current(): TranslationType<S, FollowWay<S["tree"][S["allowedLocale"]], R>, V, L, R>;
  get mainLocale(): S["mainLocale"];
  get allowedLocales(): S["allowedLocale"][];
  get locales(): S["allowedLocale"][];
  get id(): Join<R extends string[] ? R : string[], S["ps"]>;
  get keys(): TranslationKeys<
    {
      node: N;
    },
    S["ps"]
  >;
  [Symbol.toStringTag](): string;
  toString(): Content<N> & string;
  get raw(): Content<N> & string;
  get promise(): Promise<this> | null;
  get then(): Promise<this>["then"] | null;
  [Symbol.iterator](): Generator<any, undefined, unknown>;
  toJSON(): N;
}
export type Translation<T extends TranslationData = TranslationData> = TranslationDataAdapter<T>;
export declare const Translation: {
  new <
    AllowedLocale extends Locale = Locale,
    MainLocale extends AllowedLocale = AllowedLocale,
    const Tree extends Record<AllowedLocale, any> = Record<AllowedLocale, any>,
    const Variables extends Values = Values,
    PathSeparator extends string = ".",
    N = Node,
  >(
    settings: Partial<TranslationSettings<AllowedLocale, MainLocale, Tree, Variables, PathSeparator, N>>,
  ): TranslationType<TranslationSettings<AllowedLocale, MainLocale, Tree, Variables, PathSeparator>>;
  new <const T extends TranslationData>(data: T): Translation<T>;
} & typeof TranslationNode;
export declare function createTranslationSettings<
  L extends Locale = Locale,
  M extends L = L,
  const T = unknown,
  const V extends Values = Values,
  PS extends string = ".",
  const N = Node,
>(settings?: Partial<TranslationSettings<L, M, T, V, PS, N>>): TranslationSettings<L, M, T, V, PS, N>;
export declare function createTranslation<
  AllowedLocale extends Locale = Locale,
  MainLocale extends AllowedLocale = AllowedLocale,
  const Tree = unknown,
  const Variables extends Values = Values,
  PathSeparator extends string = ".",
  const N = Node,
>(
  settings?: Partial<TranslationSettings<AllowedLocale, MainLocale, Tree, Variables, PathSeparator, N>>,
): TranslationType<TranslationSettings<AllowedLocale, MainLocale, Tree, Variables, PathSeparator, N>>;
export declare const invalidKeys: readonly [
  "base",
  "values",
  "children",
  "parent",
  "node",
  "path",
  "settings",
  "key",
  "default",
  "catch",
  "then",
];
export declare function getChildren<N>(node: N): Children<N>[];
export declare function getT(): GlobalTranslation;
export declare const getTranslation: GlobalTranslation;
export default TranslationNode;
