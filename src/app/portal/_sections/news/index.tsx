import { useTranslations } from "next-intl";
import PortalNewsCard from "./portal-news-card";
import Each from "@/_shared/components/app-each";
import { NEWS_DATA } from "@/_shared/data/news.data";

export default function PortalNews() {
  const t = useTranslations();

  return (
    <section className="bg-secondary mt-4 pb-8">
      <section className="app-container">
        <h2 className="mt-4">{t("portal.news.title")}</h2>
        <h5 className="mb-6">{t("portal.news.subtitle")}</h5>

        <section className="w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
          <Each
            data={NEWS_DATA}
            render={(item) => <PortalNewsCard data={item} />}
          />
        </section>
      </section>
    </section>
  );
}
