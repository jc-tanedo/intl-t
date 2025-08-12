"use client";
import { createElement, createContext, useContext, useMemo, useState, useEffect } from "react";
import { useLocale } from "./hooks";
import { TranslationNode } from "./translation";
export const TranslationContext = createContext(null);
export function TranslationProvider({
  // @ts-ignore-error optional binding
  t = this,
  onLocaleChange,
  locale,
  children,
  i18nKey,
  id = i18nKey,
  path = id,
  messages,
  source = messages,
  variables,
  settings,
  ...state
}) {
  const context = useContext(TranslationContext) || {};
  context.t = t ??= context.t ??= TranslationNode.t;
  context.reRender ??= useState(0)[1];
  if (locale || onLocaleChange) context.localeState = [locale, onLocaleChange];
  else ((context.localeState ??= useLocale.call(t, locale)), (locale = context.localeState[0]));
  children &&= createElement(TranslationContext, { value: context }, children);
  if (!t?.settings) return ((TranslationNode.context = { locale, source }), children);
  t.settings.locale = locale;
  useMemo(() => Object.assign(t.settings, settings, state), [settings, t, state]);
  t = t.current(path);
  useMemo(() => {
    t.setSource(source);
  }, [t, source]);
  useEffect(() => {
    t.then?.(() => context.reRender?.(p => p + 1));
  }, [t, t.currentLocale]);
  variables && t.set(variables);
  return children || t.base;
}
export const T = TranslationProvider;
export { T as Trans, T as Tr };
export function hook(...args) {
  const context = useContext(TranslationContext) || {};
  // @ts-ignore-error optional binding
  let t = this || (context.t ||= TranslationNode.t);
  if (!t) throw new Error("Translation not found");
  context.t ||= t;
  t.settings.locale = (context.localeState ||= useLocale.call(t))[0];
  t = t.current;
  context.reRender ||= useState(0)[1];
  useEffect(() => {
    t.then?.(() => context.reRender?.(p => p + 1));
  }, [t]);
  return t(...args);
}
// @ts-ignore
export { hook as useTranslation, hook as useTranslations };
