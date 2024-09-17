import baseLanguage from "./src/i18n/locales/pt-BR.json";

type Messages = typeof baseLanguage;

declare global {
  interface IntlMessages extends Messages {}
}
