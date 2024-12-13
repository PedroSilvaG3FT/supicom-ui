import { useTranslations } from "next-intl";

export default function PortalAboutUs() {
  const t = useTranslations();

  return (
    <section className="app-container mt-6">
      <h2 className="mb-4">{t("portal.about_us.title")}</h2>

      <section className="grid gap-4 grid-cols-2 mobile:grid-cols-1">
        <p className="whitespace-pre-line">
          {t("portal.about_us.description")}
        </p>

        <video
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-md"
        >
          <source src="/video/drone.mp4" type="video/mp4" />
        </video>
      </section>
    </section>
  );
}
