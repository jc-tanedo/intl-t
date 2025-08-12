import { injectVariables } from "../tools/inject";
import { hydration, isClient, isEdge } from "../state";
import { getLocales } from "./dynamic";
const TranslationFunction = isEdge ? Object : Function;
class TranslationProxy extends TranslationFunction {
  __call__;
  name = "Translation";
  constructor(__call__) {
    super();
    this.__call__ = __call__;
    return new Proxy(this, {
      apply(target, thisArg, argArray) {
        return __call__.apply(thisArg, argArray);
      },
      construct(target, [settings]) {
        settings.settings = { ...settings.settings, ...target.settings };
        return new TranslationNode(settings);
      },
      get(target, p, receiver) {
        let val = Reflect.get(target, p, receiver);
        let src;
        if (val !== undefined) {
          if (typeof val !== "function" || !(p in TranslationNode.prototype)) return val;
          src = target;
        } else {
          if (Array.isArray(target.node)) src = target.children.map(c => target[c]);
          else if (p in String.prototype) src = target.base;
          else src = target.node || "";
          val = src[p];
        }
        if (typeof val === "function" && !val.t) val = val.bind(src);
        return val;
      },
      ownKeys(target) {
        return target.children;
      },
    });
  }
}
export class TranslationNode extends TranslationProxy {
  settings;
  t = this;
  translation = this;
  translationNode = this;
  node;
  variables;
  locale;
  path;
  key;
  children;
  __node__;
  global;
  g;
  parent;
  use = isEdge ? this.__call__ : this;
  get = this.use;
  static Node = TranslationNode;
  static createTranslation = createTranslation;
  static createTranslationSettings = createTranslationSettings;
  static injectVariables = injectVariables;
  static getChildren = getChildren;
  static Proxy = TranslationProxy;
  static context = null;
  static t = null;
  static setLocale = undefined;
  static getLocale = function () {
    return this.defaultLocale;
  };
  static Provider = function (...args) {
    return this[this.settings.locale](...args);
  };
  T = new Proxy(isEdge ? this.call.bind(this) : this, {
    apply(target, _, args) {
      if (isEdge) target = target();
      return TranslationNode.Provider.apply(target, args);
    },
    get(target, p, receiver) {
      if (isEdge) target = target();
      const t = Reflect.get(target, p, receiver);
      return t?.T || t;
    },
  });
  Tr = this.T;
  Trans = this.T;
  Translation = this.T;
  TranslationProvider = this.T;
  static hook = function (...args) {
    return this.current(...args);
  };
  hook = new Proxy(isEdge ? this.call.bind(this) : this, {
    apply(target, _, argArray) {
      if (isEdge) target = target();
      return TranslationNode.hook.apply(target, argArray);
    },
    get(target, p, receiver) {
      if (isEdge) target = target();
      const t = Reflect.get(target, p, receiver);
      return t?.hook || t;
    },
  });
  useTranslation = this.hook;
  useTranslations = this.hook;
  getTranslation = this.hook;
  getTranslations = this.hook;
  useLocale = this.hook;
  constructor(params) {
    super((...args) => this.call(...args));
    this.settings = params.settings ??= createTranslationSettings(params);
    const {
      settings = params.settings,
      locale = settings.locale,
      node = settings.tree[locale],
      variables = node?.values || {},
      path = [],
      key = path.at(-1),
      parent = settings,
      preload = false,
    } = params;
    this.node = node;
    this.variables = variables;
    this.locale = locale;
    this.path = path;
    this.key = key;
    this.parent = parent;
    this.children = [];
    this.global = parent.global || this;
    this.g = this.global;
    const descriptors = {};
    const t = this;
    this.getNode(preload);
    settings.allowedLocales.forEach(locale => {
      if (locale === t.locale) {
        t[locale] = parent[locale] ??= t;
        if (typeof node !== "function" && node) return;
        return (descriptors[locale] = {
          configurable: true,
          enumerable: false,
          get() {
            Object.defineProperty(t, locale, { value: t, configurable: true, enumerable: false });
            if (settings.preload && t == settings.t && t.hasOwnProperty("then")) delete settings.t.then;
            return (t.node === node && t.getNode(t[Symbol.for("preload")] ?? true), t);
          },
        });
      }
      descriptors[locale] = {
        get() {
          const node = parent[locale]?.[key] || parent[locale];
          const value =
            node instanceof TranslationNode
              ? node
              : new TranslationNode({
                  settings,
                  locale,
                  variables,
                  parent,
                  node: settings.locales[locale],
                  preload: t[Symbol.for("preload")] ?? true,
                });
          Object.defineProperty(t, locale, { value, configurable: true, enumerable: false });
          return value;
        },
        configurable: true,
        enumerable: false,
      };
    });
    if (settings.preload && !settings.t)
      descriptors.then = {
        value(cb) {
          return new Promise((r, c) =>
            getLocales(settings.getLocale, settings.allowedLocales)
              .then(locales => ((settings.locales = locales), delete t.then, r(t), cb?.(t)))
              .catch(c),
          );
        },
        configurable: true,
      };
    TranslationNode.t ??= settings.t ??= t;
    Object.defineProperties(this, descriptors);
  }
  call(...path) {
    const variables = path.at(-1)?.__proto__ === Object.prototype ? path.pop() : undefined;
    if (typeof path[0] === "object") path = path[0];
    else if (path.length === 1) path = path[0]?.trim().split(this.settings.ps);
    this.set(variables);
    path = path?.filter?.(Boolean);
    if (!path?.length) return this;
    this.getNode();
    const t = path.reduce(
      (o, key, index) =>
        o?.[key] ??
        (() => {
          const value = new TranslationNode({
            node: o?.[this.settings.mainLocale]?.node?.[key] || path.slice(0, index + 1).join(o.settings.ps),
            settings: o.settings,
            locale: o.locale,
            parent: o,
            path: [...o.path, key],
          });
          Object.defineProperty(o, key, { value, configurable: true, enumerable: false });
          return value;
        })(),
      this,
    );
    t.set(variables);
    return t;
  }
  set(variables) {
    if (variables) Object.assign(this.variables, variables);
    return this;
  }
  setSource(source) {
    this.node = source;
    this.__node__ = void 0;
    return this.getNode();
  }
  setNode(node) {
    if (!this) return;
    if (this.__node__ === node) return node;
    this.node = this.__node__ = node;
    this.setChildren();
  }
  getNode(load = true) {
    let node = (this.node ||= this.settings.getLocale.bind(null, this.locale));
    if (load && typeof node === "function") node = node((this.settings.hydrate ??= true));
    if (node instanceof Promise) node.then(this.setNode);
    else this.setNode(node);
    return (this.node = node);
  }
  addChildren(children = []) {
    const t = this;
    const settings = t.settings;
    const locale = t.locale;
    const descriptors = {};
    children.forEach(child => {
      const path = [...t.path, child];
      descriptors[child] = {
        get() {
          const value = new TranslationNode({
            node: t.node[child] || null,
            settings,
            locale,
            parent: t,
            path,
          });
          Object.defineProperty(t, child, { value, configurable: true, enumerable: false });
          return value;
        },
        configurable: true,
        enumerable: false,
      };
    });
    Object.defineProperties(t, descriptors);
    return children;
  }
  setChildren(children = getChildren(this.node)) {
    this.children = children;
    return this.addChildren(children);
  }
  get base() {
    const node = this.getNode();
    return TranslationNode.injectVariables(
      node ? String(typeof node !== "object" ? node : node.base) : this.path.join(this.settings.ps),
      this.values,
      this.settings,
    );
  }
  getChildren() {
    return getChildren(this.node);
  }
  getLocale() {
    return this.settings.locale;
  }
  setLocale(locale = this.settings.locale) {
    if (typeof locale === "function") locale = locale(this.currentLocale);
    this.settings.setLocale(locale) || (this.settings.locale = locale);
    return this.current;
  }
  get values() {
    return { ...this.parent.values, ...this.variables };
  }
  get child() {
    return this.children[0];
  }
  get currentLocale() {
    return this.settings.locale;
  }
  get current() {
    this[Symbol.for("preload")] = false;
    const t = this[this.currentLocale] || this;
    this[Symbol.for("preload")] = null;
    if (isEdge)
      return new Proxy(t.call, {
        get(target, p, receiver) {
          return Reflect.get(t, p, receiver);
        },
      });
    return t;
  }
  get mainLocale() {
    return this.settings.mainLocale;
  }
  get allowedLocales() {
    return this.settings.allowedLocales;
  }
  get locales() {
    return this.allowedLocales;
  }
  get id() {
    return (this[Symbol.for("id")] ??= this.path.join(this.settings.ps));
  }
  get keys() {
    return this.child;
  }
  [Symbol.toStringTag]() {
    return "Translation";
  }
  toString() {
    return String(this.base);
  }
  get raw() {
    return this.toString();
  }
  get promise() {
    return this.then ? new Promise((r, c) => this.then?.(r).catch(c)) : null;
  }
  get then() {
    const t = this;
    let node = (this.node ||= this.settings?.getLocale(this.locale));
    if (typeof node === "function") node = this.node = node((this.settings.hydrate ??= true));
    return node instanceof Promise
      ? cb => new Promise((r, c) => node.then(node => (t.setNode(node), r(t), cb?.(t))).catch(c))
      : (this.setNode(node), null);
  }
  *[Symbol.iterator]() {
    if (Array.isArray(this.node)) return yield* this.children.map(child => this[child]);
    yield this.base;
  }
  toJSON() {
    return typeof this.node === "object" ? this.node : this.base;
  }
}
export const Translation = TranslationNode;
export function createTranslationSettings(settings = {}) {
  if (typeof settings.locales === "function")
    ((settings.getLocale = settings.locales), (settings.locales = void 0), (settings.preload = !isClient));
  settings.locales ??= {};
  settings.allowedLocales ??= Object.keys(settings.locales);
  settings.mainLocale ??= settings.defaultLocale ??= settings.allowedLocales[0];
  settings.defaultLocale ??= settings.mainLocale;
  settings.allowedLocale ??= settings.mainLocale;
  settings.currentLocale ??= TranslationNode.context?.locale || settings.defaultLocale;
  settings.locale ??= settings.currentLocale;
  settings.setLocale ??= TranslationNode.setLocale;
  settings.tree ??= settings.locales;
  settings.variables ??= {};
  settings.hydration ??= hydration;
  settings.ps ??= settings.pathSeparator ??= ".";
  if (TranslationNode.context?.source) settings.locales[TranslationNode.context.locale] = TranslationNode.context.source;
  const gls = settings.getLocale;
  settings.getLocale = l => (settings.locales[l] ??= gls?.(l, (settings.hydrate ??= true)));
  settings.setLocale ??= TranslationNode.setLocale || (l => (settings.locale = l));
  return (settings.settings = settings);
}
export function createTranslation(settings = {}) {
  return new Translation(createTranslationSettings(settings));
}
export const invalidKeys = ["base", "values", "children", "parent", "node", "path", "settings", "key", "default", "catch", "then"];
export function getChildren(node) {
  return node?.children || (typeof node !== "object" || !node ? [] : Object.keys(node).filter(key => !invalidKeys.includes(key)));
}
export function getT() {
  return TranslationNode.t;
}
export const getTranslation = (...args) => getT().current(...args);
export default TranslationNode;
