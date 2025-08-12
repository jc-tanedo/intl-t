import { Locale } from "../locales/types";
import { ReactState, ReactSetState } from "./types";
export declare function useLocale<L extends Locale = Locale>(
  defaultLocale?: L | undefined | null,
  {
    hydration,
    path,
  }?: {
    hydration?: boolean;
    path?: string;
  },
):
  | ReactState<Locale>
  | (L &
      ReactState<L> & {
        locale: L;
        setLocale: ReactSetState<L>;
      });
