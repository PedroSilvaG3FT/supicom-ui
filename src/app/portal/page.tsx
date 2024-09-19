import PortalHero from "./_sections/hero";
import PortalHistory from "./_sections/history";
import PortalPartners from "./_sections/partners";
import PortalServices from "./_sections/services";

export default function PortalPage() {
  return (
    <>
      <PortalHero />
      <PortalServices />
      <PortalPartners />
      <PortalHistory />
    </>
  );
}
