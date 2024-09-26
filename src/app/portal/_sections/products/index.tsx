import Each from "@/_shared/components/app-each";
import PortalProductCard from "./portal-product-card";
import { PRODUCTS_DATA } from "@/_shared/data/products.data";

const PRODUCTS_ITEMS = PRODUCTS_DATA.slice(0, 3);

export default function PortalProducts() {
  return (
    <section className="app-container">
      <h2 className="mt-4">Nossos Produtos</h2>
      <h5 className="mb-6">Máquinas e Equipamentos de Alta Qualidade</h5>

      <section className="w-full grid gap-4 grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={PRODUCTS_ITEMS}
          render={(item) => <PortalProductCard data={item} />}
        />
      </section>
    </section>
  );
}
