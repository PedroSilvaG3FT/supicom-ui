import ContactForm from "./_contact-form";
import ContactContent from "./_contact-content";
import PortalAddress from "../_home/address";

export default function ContactPage() {
  return (
    <>
      <section className="portal-page-container bg-primary/10 grid gap-12 items-center grid-cols-1 lg:grid-cols-[1fr_40%]">
        <ContactContent />
        <ContactForm />
      </section>

      <PortalAddress />
    </>
  );
}
