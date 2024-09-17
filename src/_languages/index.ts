import languageEn from "./en.language";
import languageEs from "./es.language";
import languagePtBR from "./pt-BR.language";
import { ELanguage } from "@/_shared/enums/language.enum";

const languages = {
  [ELanguage.EN]: languageEn,
  [ELanguage.ES]: languageEs,
  [ELanguage.PT_BR]: languagePtBR,
};

export default languages;
