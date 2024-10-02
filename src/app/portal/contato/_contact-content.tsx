import Link from "next/link";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Each from "@/_shared/components/app-each";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/_core/components/fragments/button";
import { WhatsAppUtil } from "@/_shared/utils/whatsapp.util";
import { Separator } from "@/_core/components/fragments/separator";

export default function ContactContent() {
  const t = useTranslations();

  const phoneNumberRedirect = WhatsAppUtil.buildLink(
    WhatsAppUtil.contacts.service,
    `Olá, gostaria de conversar com um representante.`
  );

  const items = [
    {
      title: t("portal.contact.customer_support"),
      description: t("portal.contact.customer_support_description"),
    },
    {
      title: t("portal.contact.suggestions"),
      description: t("portal.contact.suggestions_description"),
    },
    {
      title: t("portal.contact.partnerships"),
      description: t("portal.contact.partnerships_description"),
    },
  ];

  return (
    <section>
      <h1 className="mb-4">{t("base.contact")}</h1>
      <p className="w-3/4 mobile:w-full">{t("portal.contact.description")}</p>

      <section className="mt-6 flex gap-2">
        <Button asChild variant="secondary" className="rounded-full">
          <Link href={phoneNumberRedirect} target="_blank">
            <IconBrandWhatsapp />
          </Link>
        </Button>

        <Button variant="secondary" asChild className="rounded-full">
          <Link href={phoneNumberRedirect} target="_blank">
            <Mail />
          </Link>
        </Button>
      </section>

      <Separator className="my-6" />

      <section className="grid gap-4 grid-cols-3 mobile:grid-cols-1">
        <Each
          data={items}
          render={(item) => (
            <article>
              <h5 className="font-semibold mb-4">{item.title}</h5>
              <p>{item.description}</p>
            </article>
          )}
        />
      </section>
    </section>
  );
}
