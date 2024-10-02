import { useTranslations } from "next-intl";
import { Handshake, Settings, Wrench } from "lucide-react";

export default function useServiceData() {
  const t = useTranslations();

  const services = [
    {
      icon: Settings,
      title: t("portal.service.manufacturing_title"),
      imageURL: `/images/services/manufacturing.jpg`,
      description: t("portal.service.manufacturing_description"),
    },
    {
      icon: Handshake,
      title: t("portal.service.rent_title"),
      imageURL: `/images/services/rent.jpg`,
      description: t("portal.service.rent_description"),
    },
    {
      icon: Wrench,
      title: t("portal.service.maintenance_title"),
      imageURL: `/images/services/maintenance.jpg`,
      description: t("portal.service.maintenance_description"),
    },
  ];

  return { services };
}
