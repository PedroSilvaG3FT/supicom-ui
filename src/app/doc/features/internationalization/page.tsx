import { Separator } from "@/_core/components/fragments/separator";
import AppToggleLanguage from "@/_shared/components/app-toggle-language";

export default function InternationalizationPage() {
  return (
    <section>
      <h1 className="page-title">Internationalization</h1>
      <Separator className="my-4" />
      <AppToggleLanguage />

      {/* <h2>{translate.example.title}</h2>
      <h3>{translate.example.subtitle}</h3> */}
    </section>
  );
}
