export declare const cmdName = "declarations";
export declare const commonDir: string[];
export declare const usage =
  "\nUsage: declarations <files|folders>... [options]\n\nOptions:\n  --out, --output     Output file or folder\n  --watch             Watch files/folders for changes\n  --format <fmt>      Output format: ts, d.ts, d.json.ts (default)\n  --symbol <name>     Exported symbol name (default: data)\n  --del, --remove     Delete original JSON files\n  --no-search         Disable default JSON search\n  --recursive         Search recursively in specified folders\n  --silent            Silence logs\n  -h, --help          Show help\n";
export type DeclarationsFormat = "ts" | "d.ts" | "d.json.ts";
export interface Options {
  inputs: string[];
  output?: string;
  watchMode: boolean;
  format: DeclarationsFormat;
  symbolName?: string;
  removeOriginal: boolean;
  disableSearch: boolean;
  silent: boolean;
}
export declare function parseArgs(args: string[], options?: Partial<Options>): Partial<Options>;
export declare function generateDeclarations(inputs: string | string[], options: Partial<Options>): Promise<void>;
export declare function generateDeclarations(options: Partial<Options>): Promise<void>;
export default function main(args: string[]): Promise<void>;
