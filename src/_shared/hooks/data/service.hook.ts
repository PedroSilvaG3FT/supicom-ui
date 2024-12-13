import { useTranslations } from "next-intl";
import { ChartNoAxesCombined, Handshake, Settings, Wrench } from "lucide-react";

export default function useServiceData() {
  const t = useTranslations();

  const services = [
    {
      icon: Settings,
      title: t("portal.service.manufacturing_title"),
      description: t("portal.service.manufacturing_description"),
    },
    {
      icon: ChartNoAxesCombined,
      title: t("portal.service.development_title"),
      description: t("portal.service.development_description"),
    },
    {
      icon: Handshake,
      title: t("portal.service.rent_title"),
      description: t("portal.service.rent_description"),
    },
    {
      icon: Wrench,
      title: t("portal.service.maintenance_title"),
      description: t("portal.service.maintenance_description"),
    },
  ];

  return { services };
}
