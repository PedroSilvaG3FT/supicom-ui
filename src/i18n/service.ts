"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "@/i18n/config";
import { ELocale } from "@/_shared/enums/locale.enum";

// const LOCALE_KEY = "NEXT_LOCALE";
const LOCALE_KEY = "NEXT_LOCALE";

export async function getLocale() {
  return cookies().get(LOCALE_KEY)?.value || defaultLocale;
}

export async function setLocale(locale: ELocale) {
  cookies().set(LOCALE_KEY, locale);
}
