import PortalHero from "./hero";
import PortalNews from "./news";
import dynamic from "next/dynamic";
import PortalAddress from "./address";
import PortalPartners from "./partners";
import PortalServices from "./services";
import PortalProducts from "./products";
import PortalDepartaments from "./departaments";

const PortalAboutUs = dynamic(() => import("./about-us"), { ssr: false });

export default function PortalPage() {
  return (
    <>
      <PortalHero />
      <PortalAboutUs />
      <PortalDepartaments />
      <PortalServices />
      <PortalProducts />
      {/* <PortalTimeline /> */}
      <PortalPartners />
      <PortalAddress />
      <PortalNews />
    </>
  );
}
