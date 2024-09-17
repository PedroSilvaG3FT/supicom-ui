import { ELocale } from "@/_shared/enums/locale.enum";

export const defaultLocale = ELocale.PT_BR;
export const locales = [ELocale.PT_BR, ELocale.EN, ELocale.ES];

export const LOCALES_FLAGS = {
  [ELocale.EN]: "/images/locales/en.png",
  [ELocale.ES]: "/images/locales/es.png",
  [ELocale.PT_BR]: "/images/locales/pt-BR.png",
} as const;

export const LOCALES_LABEL = {
  [ELocale.EN]: "locales.english",
  [ELocale.ES]: "locales.spanish",
  [ELocale.PT_BR]: "locales.portuguese",
} as const;
