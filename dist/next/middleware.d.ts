import { MiddlewareConfig as MG, NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { I18NDomains } from "next/dist/server/config-shared";
import { match } from "../tools/match";
import { ResolveConfig } from "../tools/resolvers";
import type { Locale } from "../locales/types";
export declare const LOCALE_COOKIE_KEY = "locale";
export type Middleware = (req: NextRequest, ev: NextFetchEvent, res?: NextResponse) => NextResponse | Promise<NextResponse> | undefined;
export type MiddlewareFactory = (middleware: Middleware) => Middleware;
export interface MiddlewareConfig<L extends Locale> extends MG, ResolveConfig<L> {
  pathBase?: "always-default" | "detect-default" | "detect-latest" | "always-detect";
  strategy?: "domain" | "param" | "headers";
  detect?: false | string | string[] | ((req: NextRequest) => string[] | string);
  domains?: I18NDomains;
  config?: MG;
  middleware?: Middleware;
  withMiddleware?: MiddlewareFactory;
  match?: typeof match;
}
export declare const middlewareConfig: MG;
export declare function detect(req: NextRequest, domains?: I18NDomains): string[];
export declare function createMiddleware<L extends Locale>(settings: MiddlewareConfig<L>): Middleware & MiddlewareConfig<L> & MG;
export declare function middleware<L extends Locale>(req: NextRequest, ev: NextFetchEvent, res?: NextResponse): NextResponse<unknown>;
export declare const i18nMiddleware: typeof middleware;
export declare function withMiddleware(
  middleware: Middleware,
): (req: NextRequest, ev: NextFetchEvent, res?: NextResponse) => NextResponse<unknown> | Promise<NextResponse<unknown>> | undefined;
export { withMiddleware as withI18nMiddleware };
