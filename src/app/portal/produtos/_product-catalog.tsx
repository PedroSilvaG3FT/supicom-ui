import Each from "@/_shared/components/app-each";
import useProductData from "@/_shared/hooks/data/product.hook";
import { Separator } from "@/_core/components/fragments/separator";
import PortalProductCard from "../_components/portal-product-card";

export default function ProductCatalog() {
  const { products } = useProductData();

  return (
    <section>
      <h1>Catálogo</h1>
      <h5>Confira nosso catálogo de produtos</h5>

      <Separator className="my-6" />

      <section className="w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={products}
          render={(item) => <PortalProductCard data={item} />}
        />
      </section>
    </section>
  );
}
