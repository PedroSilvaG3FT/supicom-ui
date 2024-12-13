import Link from "next/link";
import Image from "next/image";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { WhatsAppUtil } from "@/_shared/utils/whatsapp.util";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import { FlipWords } from "@/_core/components/fragments/ui/flip-words";
import { BackgroundBeams } from "@/_core/components/fragments/ui/background-beams";

export default function MaintencePage() {
  const phoneNumberRedirect = WhatsAppUtil.buildLink(
    WhatsAppUtil.contacts.service,
    `Olá, gostaria de conversar com um representante.`
  );

  const words = [
    "Inovação Industrial",
    "Qualidade Superior",
    "Tecnologia Avançada",
    "Soluções Personalizadas",
    "Eficiência Operacional",
    "Equipamentos Específicos",
    "Manutenção Especializada",
    "Desempenho Confiável",
    "Peças e Acessórios",
    "Serviços de Excelência",
    "Compromisso com a Qualidade",
    "Atendimento Personalizado",
    "Sustentabilidade e Inovação",
    "Máquinas de Alto Desempenho",
  ];

  return (
    <section className="relative p-16 h-[100dvh] flex flex-col items-center justify-end mobile:px-3">
      <BackgroundBeams />

      <article className="flex flex-col justify-center items-center px-4">
        <Image
          width={400}
          height={100}
          alt="Supicom"
          src={"/images/logo.svg"}
        />

        <Separator className="my-4" />

        <h1 className="text-2xl text-center mx-auto font-normal">
          Estamos preparando um novo portal para você!
        </h1>

        <FlipWords
          words={words}
          className="!text-primary text-xl my-4 text-center"
        />

        <Button asChild className="z-10">
          <Link href={phoneNumberRedirect} target="_blank">
            Falar com um atendente
            <IconBrandWhatsapp className="ml-4" />
          </Link>
        </Button>
      </article>
    </section>
  );
}
