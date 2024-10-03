import dynamic from "next/dynamic";
import PortalFooter from "./_components/portal-footer";
import PortalHeader from "./_components/portal-header";

const PortalRequestQuoteFab = dynamic(
  () => import("./_components/portal-request-quote-fab"),
  { ssr: false }
);

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PortalHeader />
      {children}
      <PortalFooter />

      <PortalRequestQuoteFab />
    </>
  );
}
