import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";
import PortalServiceCard from "./portal-service-card";
import useServiceData from "@/_shared/hooks/data/service.hook";

export default function PortalServices() {
  const t = useTranslations();
  const { services } = useServiceData();

  return (
    <section className="app-container">
      <h2 className="mt-4">{t("base.services")}</h2>
      <h5 className="mb-6">{t("portal.service.subtitle")}</h5>

      <section className="w-full grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={services}
          render={(item, index) => (
            <PortalServiceCard index={index} {...item} />
          )}
        />
      </section>
    </section>
  );
}
