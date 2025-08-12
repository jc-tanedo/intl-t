import { type ReactNode } from "react";
import type { Values, ReactChunk } from "../types";
export declare const Chunk: ReactChunk;
export declare function injectReactChunks(content?: string, variables?: Values): ReactNode;
export { injectReactChunks as injectReactChunk };
