import { useTranslations } from "next-intl";
import { PORTAL_SECTION_ID } from "./_data";

export default function PortalAddress() {
  const t = useTranslations();

  return (
    <section id={PORTAL_SECTION_ID.address} className="app-container">
      <h2 className="mb-4">{t("portal.where_are_we")}</h2>

      <iframe
        width="600"
        height="450"
        loading="lazy"
        className="border-none w-full rounded shadow-md"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.1207096157536!2d-46.3318595246731!3d-23.456109978872252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce7d065f79c011%3A0xb8665c554c4c4b41!2sSupicom%20Ind%C3%BAstria%20e%20Com%C3%A9rcio!5e0!3m2!1spt-BR!2sbr!4v1726750107435!5m2!1spt-BR!2sbr"
      ></iframe>
    </section>
  );
}
