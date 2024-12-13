import { useLocale } from "next-intl";
import { ELocale, LocaleShorted } from "../enums/locale.enum";

function useAppLocale() {
  const locale = useLocale();

  const disct = {
    [ELocale.EN]: "en",
    [ELocale.ES]: "es",
    [ELocale.PT_BR]: "pt",
  };

  return disct[locale as keyof typeof disct] as LocaleShorted;
}

export default useAppLocale;
