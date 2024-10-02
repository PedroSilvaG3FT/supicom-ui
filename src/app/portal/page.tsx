import PortalHero from "./_sections/hero";
import PortalNews from "./_sections/news";
import PortalAddress from "./_sections/address";
import PortalPartners from "./_sections/partners";
import PortalServices from "./_sections/services";
import PortalProducts from "./_sections/products";
import PortalTimeline from "./_sections/timeline";

export default function PortalPage() {
  return (
    <>
      <PortalHero />
      <PortalTimeline />
      <PortalServices />
      <PortalProducts />
      <PortalPartners />
      <PortalNews />
      <PortalAddress />
    </>
  );
}
