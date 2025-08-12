import "./patch";
import { TranslationNode } from "../core/translation";
import { injectVariables as iv } from "../tools/inject";
export declare const injectVariables: typeof iv;
export { createTranslation, Translation, TranslationNode } from "../core/translation";
export default TranslationNode;
export { getLocales } from "../core/dynamic";
