import PortalHero from "./_sections/hero";
import PortalAddress from "./_sections/address";
import PortalHistory from "./_sections/history";
import PortalPartners from "./_sections/partners";
import PortalServices from "./_sections/services";

export default function PortalPage() {
  return (
    <>
      <PortalHero />
      <PortalHistory />
      <PortalServices />
      <PortalPartners />
      <PortalAddress />
    </>
  );
}
