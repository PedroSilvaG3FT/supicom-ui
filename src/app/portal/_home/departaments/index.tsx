import { useTranslations } from "next-intl";
import PortalDepartamentCard, {
  IPortalDepartamentCardProps,
} from "./portal-departament-card";

export default function PortalDepartaments() {
  const t = useTranslations();

  const engineering: IPortalDepartamentCardProps = {
    title: t("portal.our_departments.engineering_title"),
    description: t("portal.our_departments.engineering_description"),

    figureClassName: `mt-auto object-right rounded-t-2xl mobile:h-52 mobile:rounded-md`,
    imageClassName: `object-center`,
    descriptionClassName: `mb-3`,
    contentClassName: `h-full flex flex-col`,
    className: `border-r pb-0 flex flex-col justify-between mobile:border-none`,
    images: [
      "/images/departaments/engenharia_01.jpg",
      "/images/departaments/engenharia_02.jpg",
      "/images/departaments/engenharia_03.jpg",
      "/images/departaments/engenharia_04.jpg",
      "/images/departaments/engenharia_05.jpg",
      "/images/departaments/engenharia_06.jpg",
    ],
  };

  const machining: IPortalDepartamentCardProps = {
    title: t("portal.our_departments.machining_title"),
    description: t("portal.our_departments.machining_description"),

    contentClassName: `gap-6 flex mobile:flex-col`,
    descriptionClassName: `flex-1 order-1 pt-2 flex items-center`,
    className: `border-b h-2/4 pb-0 mobile:border-none mobile:h-auto`,
    figureClassName: `h-56 w-[30%] relative top-2 rounded-none rounded-t-2xl shadow-lg mobile:order-1 mobile:w-full mobile:rounded-md`,
    images: [
      "/images/departaments/usinagem_01.jpg",
      "/images/departaments/usinagem_02.jpg",
      "/images/departaments/usinagem_03.jpg",
      "/images/departaments/usinagem_04.jpg",
      "/images/departaments/usinagem_05.jpg",
      "/images/departaments/usinagem_06.jpg",
      "/images/departaments/usinagem_07.jpg",
      "/images/departaments/usinagem_08.jpg",
      "/images/departaments/usinagem_09.jpg",
      "/images/departaments/usinagem_10.jpg",
    ],
  };

  const assembly: IPortalDepartamentCardProps = {
    title: t("portal.our_departments.assembly_title"),
    description: t("portal.our_departments.assembly_description"),

    contentClassName: `gap-6 flex mobile:flex-col`,
    descriptionClassName: `flex-1 pt-2 flex items-center`,
    imageClassName: `object-left`,
    className: `border-b h-2/4 pb-0 mobile:border-none mobile:h-auto`,
    figureClassName: `h-56 w-[30%] relative top-2 rounded-none rounded-t-2xl shadow-lg mobile:w-full mobile:rounded-md`,
    images: [
      "/images/departaments/montagem_mecanica_01.jpg",
      "/images/departaments/montagem_mecanica_02.jpg",
      "/images/departaments/montagem_mecanica_03.jpg",

      "/images/departaments/montagem_eletrica_01.jpg",
      // "/images/departaments/montagem_eletrica_02.jpg",
      "/images/departaments/montagem_eletrica_03.jpg",
      // "/images/departaments/montagem_eletrica_04.jpg",
    ],
  };

  return (
    <section className="app-container">
      <h4 className="mb-4 font-medium">{t("portal.our_departments.title")}:</h4>

      <section className="grid items-stretch grid-cols-[32%_1fr] mobile:grid-cols-1 border rounded-md mobile:border-none">
        <PortalDepartamentCard {...engineering} />

        <article>
          <PortalDepartamentCard {...machining} />
          <PortalDepartamentCard {...assembly} />
        </article>
      </section>
    </section>
  );
}
