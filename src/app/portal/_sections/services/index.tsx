import Each from "@/_shared/components/app-each";
import PortalServiceCard from "./portal-service-card";
import { SERVICES_DATA } from "@/_shared/data/services.data";

export default function PortalServices() {
  return (
    <section className="app-container">
      <h2 className="mt-4">Serviços</h2>
      <h5 className="mb-6">
        Soluções Industriais Personalizadas para o seu negócio
      </h5>

      <section className="w-full grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 relative z-10">
        <Each
          data={SERVICES_DATA}
          render={(item, index) => (
            <PortalServiceCard index={index} {...item} />
          )}
        />
      </section>
    </section>
  );
}
