import Link from "next/link";
import { PackageSearch } from "lucide-react";
import Each from "@/_shared/components/app-each";
import useProductData from "@/_shared/hooks/data/product.hook";
import PortalProductCard from "../../_components/portal-product-card";

export default function PortalProducts() {
  const { products } = useProductData();

  return (
    <section className="app-container">
      <h2 className="mt-4">Produtos</h2>
      <h5 className="mb-6">Máquinas e Equipamentos de Alta Qualidade</h5>

      <section className="w-full grid gap-4 grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={[...products].slice(0, 3)}
          render={(item) => <PortalProductCard data={item} />}
        />

        <Link
          href="/portal/produtos"
          className="bg-secondary rounded-xl p-4 flex flex-col items-center justify-center group"
        >
          <figure className="rounded-full h-14 w-14 mb-4 flex items-center justify-center bg-primary text-white transition-transform duration-500 group-hover:scale-110">
            <PackageSearch />
          </figure>

          <h4 className="text-center font-semibold transition-transform duration-500 group-hover:scale-95">
            Ver catálogo <br />
            completo
          </h4>
        </Link>
      </section>
    </section>
  );
}
