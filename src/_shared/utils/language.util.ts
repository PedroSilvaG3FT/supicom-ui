"use client";

import languages from "@/_languages";
import { CookieUtil } from "./cookie.utl";
import { ELanguage } from "../enums/language.enum";

export class LanguageUtil {
  public static readonly LANGUAGE_KEY = "@app:language";

  public static set(value: string) {
    CookieUtil.set(LanguageUtil.LANGUAGE_KEY, value);
  }

  public static get(): ELanguage {
    const value = CookieUtil.get<string>(LanguageUtil.LANGUAGE_KEY);
    return (value as ELanguage) || ELanguage.PT_BR;
  }

  public static translate() {
    return languages[LanguageUtil.get()];
  }
}
