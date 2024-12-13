import { getLocale } from "./service";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    timeZone: "America/Sao_Paulo",
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
