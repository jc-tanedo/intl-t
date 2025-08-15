import { Translation } from "./core";
export default interface Global {}
export type GlobalTranslation = Global extends {
  Translation: infer T;
}
  ? T
  : Translation;
export type GlobalSettings = GlobalTranslation["settings"];
export type GlobalPathSeparator = string extends GlobalSettings["ps"] ? "." : GlobalSettings["ps"];
export type GlobalLocale = GlobalSettings["allowedLocale"];
export type GlobalNode = GlobalSettings["tree"];
