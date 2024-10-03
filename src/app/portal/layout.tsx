import PortalFooter from "./_components/portal-footer";
import PortalHeader from "./_components/portal-header";
import PortalRequestQuoteFab from "./_components/portal-request-quote-fab";

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
