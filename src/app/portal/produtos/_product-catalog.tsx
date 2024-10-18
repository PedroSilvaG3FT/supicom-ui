"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";
import { Button } from "@/_core/components/fragments/button";
import useProductData from "@/_shared/hooks/data/product.hook";
import { Separator } from "@/_core/components/fragments/separator";
import PortalProductCard from "../_components/portal-product-card";

const defaultCategoryId = 0;

export default function ProductCatalog() {
  const t = useTranslations();
  const [categoryId, setCategoryId] = useState(defaultCategoryId);
  const { products, categories } = useProductData();

  const filteredProducts = products.filter((item) => {
    if (categoryId === defaultCategoryId) return true;
    else return item.category.id === categoryId;
  });

  return (
    <section>
      <h1>{t("base.catalog")}</h1>
      <h5>{t("portal.product.check_catalog")}</h5>

      <Separator className="my-6" />

      <section className="mb-6 w-full flex gap-4 items-center">
        <Button
          onClick={() => setCategoryId(defaultCategoryId)}
          variant={categoryId === defaultCategoryId ? "default" : "outline"}
        >
          Todos
        </Button>

        <Each
          data={categories}
          render={(item) => (
            <Button
              onClick={() => setCategoryId(item.id)}
              variant={item.id === categoryId ? "default" : "outline"}
            >
              {item.title}
            </Button>
          )}
        />
      </section>

      <section className="w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={filteredProducts}
          render={(item) => <PortalProductCard data={item} />}
        />
      </section>
    </section>
  );
}
