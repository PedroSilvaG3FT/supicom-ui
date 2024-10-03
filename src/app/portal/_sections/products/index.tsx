import Link from "next/link";
import { useTranslations } from "next-intl";
import { PORTAL_SECTION_ID } from "../_data";
import Each from "@/_shared/components/app-each";
import { ArrowRight, PackageSearch } from "lucide-react";
import { Button } from "@/_core/components/fragments/button";
import useProductData from "@/_shared/hooks/data/product.hook";
import PortalProductCard from "../../_components/portal-product-card";

export default function PortalProducts() {
  const t = useTranslations();
  const { products } = useProductData();

  return (
    <section id={PORTAL_SECTION_ID.product} className="app-container">
      <h2 className="mt-4">{t("portal.product.title")}</h2>
      <h5>{t("portal.product.subtitle")}</h5>

      <Button
        asChild
        variant="link"
        className="relative hidden mobile:flex left-[-18px]"
      >
        <Link href="/portal/produtos">
          {t("portal.product.see_full_catalog")}
          <ArrowRight className="mr-4" />
        </Link>
      </Button>

      <section className="mt-2 w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10 app-scroll-snap__mobile">
        <Each
          data={[...products].slice(0, 3)}
          render={(item) => <PortalProductCard data={item} />}
        />

        <Link
          href="/portal/produtos"
          className="bg-secondary rounded p-4 flex flex-col items-center justify-center group"
        >
          <figure className="rounded-full h-14 w-14 mb-4 flex items-center justify-center bg-primary text-white transition-transform duration-500 group-hover:scale-110">
            <PackageSearch />
          </figure>

          <h4 className="text-center font-semibold transition-transform duration-500 group-hover:scale-95">
            {t("portal.product.see_full_catalog")}
          </h4>
        </Link>
      </section>
    </section>
  );
}
