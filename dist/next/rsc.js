import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import { TranslationProvider as TranslationClientProvider } from "../react/context";
import { TranslationNode } from "../core/translation";
import { getCache } from "./cache";
import { getRequestLocale } from "./request";
import { createTranslation } from "./translation";
export async function TranslationProvider({ children, t = this, preventDynamic, hydrate, ...props }) {
  const cache = getCache();
  t ||= cache.t ||= TranslationNode.t || createTranslation(props.settings);
  props.locale ||= cache.locale;
  preventDynamic ??= t.settings.preventDynamic;
  if (!(props.locale || preventDynamic)) {
    Object.assign(props, { t, preventDynamic: true });
    return _jsx(Suspense, {
      fallback: _jsx(TranslationProvider, { ...props, children: children }),
      children: _jsx(TranslationDynamicRendering, { ...props, children: children }),
    });
  }
  t.settings.locale = cache.locale = props.locale;
  t = await t.current;
  if (!children) return t(props.path || props.id || props.i18nKey).base;
  props.source = props.source || props.messages || ((hydrate ?? t.settings.hydrate) && { ...t.node }) || void 0;
  // @ts-ignore
  return _jsx(TranslationClientProvider, { ...props, children: children });
}
export const T = TranslationProvider;
export { T as Tr, T as Trans };
export const TranslationDynamicRendering = async ({ children, ...props }) => {
  props.locale ||= await getRequestLocale.call(props.t);
  return _jsx(TranslationProvider, { ...props, children: children });
};
function hook(...args) {
  const cache = getCache();
  // @ts-ignore-error optional binding
  let t = this || (cache.t ||= TranslationNode.t);
  if (!t) throw new Error("Translation not found");
  const locale = cache.locale ? (t.settings.locale = cache.locale) : getRequestLocale.call(t);
  if (locale instanceof Promise || (t = t.current).promise) {
    let tp, tc;
    return new Proxy(t, {
      get(_, p, receiver) {
        return p in Promise.prototype
          ? cb => new Promise(async r => (await locale, (tp ||= tc = (await t.current)(...args)), r(tp), cb(tp)))
          : Reflect.get((tc ||= t(...args)), p, receiver);
      },
    });
  }
  return t(...args);
}
// @ts-ignore
export { hook as getTranslation, hook as getTranslations };
