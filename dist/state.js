export const isClient = "window" in globalThis;
export const options = Intl.DateTimeFormat().resolvedOptions();
export const locale = isClient ? navigator["language"]?.split(",")[0] : options.locale;
export const timeZone = options.timeZone;
export const now = new Date();
export let hydration;
export let isEdge;
try {
  hydration = Boolean(process);
} catch {
  isEdge = !("window" in globalThis);
}
export const state = {
  timeZone,
  locale,
  now,
};
