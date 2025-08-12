import type { Values, Variables } from "../types";
export declare function nested(content: string): {
  value: string;
  index: number | undefined;
  offset: number;
} | null;
export declare const variableRegex: RegExp;
export declare const instructionsRegex: RegExp;
export declare function instructionsMatch(content: string): RegExpMatchArray[];
export declare function injectVariables<T extends string, V extends Values>(
  content?: T,
  variables?: Partial<Variables<T>> & V,
  state?: State,
): string & {};
export { injectVariables as inject };
