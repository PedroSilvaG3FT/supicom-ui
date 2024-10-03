"use client";

import { where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import PortalNewsCard from "./portal-news-card";
import Each from "@/_shared/components/app-each";
import { NewsService } from "@/_core/firebase/services/news.service";
import { INewsDB, INewsItem } from "@/_shared/interface/news.interface";

const _newsService = new NewsService();

export default function PortalNews() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<INewsItem[]>([]);

  const getItems = () => {
    setIsLoading(true);
    _newsService
      .getAll<INewsDB[]>([where("active", "==", true)])
      .then((response) => {
        const data = _newsService._model.buildList(response);
        setItems(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <section className="bg-secondary mt-4 pb-8">
      <section className="app-container">
        <h2 className="mt-4">{t("portal.news.title")}</h2>
        <h5 className="mb-6">{t("portal.news.subtitle")}</h5>

        <section className="w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 relative z-10 app-scroll-snap__mobile">
          <Each
            data={items}
            render={(item) => <PortalNewsCard data={item} />}
          />
        </section>
      </section>
    </section>
  );
}
