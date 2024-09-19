import PortalFooter from "./_components/portal-footer";
import PortalHeader from "./_components/portal-header";

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
    </>
  );
}
