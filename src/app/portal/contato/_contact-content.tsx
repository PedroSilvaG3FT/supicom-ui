import Link from "next/link";
import { Mail } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "@/_core/components/fragments/button";
import { WhatsAppUtil } from "@/_shared/utils/whatsapp.util";
import { Separator } from "@/_core/components/fragments/separator";

const phoneNumberRedirect = WhatsAppUtil.buildLink(
  WhatsAppUtil.contacts.service,
  `Olá, gostaria de conversar com um representante.`
);

export default function ContactContent() {
  const items = [
    {
      title: `Suporte ao cliente`,
      description: `Tem dúvidas ou problemas? Fale conosco para receber suporte.`,
    },
    {
      title: `Sugestões`,
      description: `Compartilhe suas ideias e sugestões para melhorarmos nossos serviços.`,
    },
    {
      title: `Parceirias`,
      description: `Interessado em parcerias? Entre em contato para colaborar conosco.`,
    },
  ];

  return (
    <section>
      <h1 className="font-semibold mb-4">Contato</h1>
      <p className="w-3/4 mobile:w-full">
        Entre em contato conosco para obter suporte, enviar sugestões ou
        discutir parcerias. Estamos sempre prontos para ajudar.
      </p>

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
