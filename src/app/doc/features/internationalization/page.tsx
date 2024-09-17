import { useTranslations } from "next-intl";
import { Separator } from "@/_core/components/fragments/separator";
import AppToggleLocale from "@/_shared/components/locale/app-toggle-locale";

export default function InternationalizationPage() {
  const t = useTranslations();

  return (
    <section>
      <h1 className="page-title">Internationalization</h1>

      <Separator className="my-4" />
      <AppToggleLocale mode="inline" className="mb-4" />

      <h2 className="font-semibold">{t("example.title")}</h2>
      <h4 className="mb-5">{t("example.subtitle")}</h4>
      <p className="whitespace-break-spaces">{t("example.description")}</p>
    </section>
  );
}
