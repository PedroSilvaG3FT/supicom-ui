import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/_core/components/fragments/accordion";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Each from "@/_shared/components/app-each";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";

export default function FaqPage() {
  const items = [
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
    {
      title: "Uma dúvida frequente",
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages`,
    },
  ];

  return (
    <section className="portal-page-container">
      <h2>Perguntas frequentes</h2>
      <h5>Não encontrou o que precisava ?</h5>

      <Button
        asChild
        size="lg"
        variant="default"
        className={
          "self-start mt-4 group rounded-full cursor-pointer z-10 mobile:self-center"
        }
      >
        <Link href="/portal/contato">
          Entre em contato
          <ArrowRight className="ml-2 group-hover:ml-4 transition-all duration-500" />
        </Link>
      </Button>

      <Separator className="my-8" />

      <section className="w-full flex items-center justify-center">
        <Accordion
          type="single"
          defaultValue="0"
          collapsible
          className="w-2/4 mobile:w-full tablet:w-full"
        >
          <Each
            data={items}
            render={(item, index) => (
              <AccordionItem value={String(index)}>
                <AccordionTrigger>
                  <span className="truncate mobile:max-w-[90%]">
                    {item.title} {index + 1}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{item.text}</AccordionContent>
              </AccordionItem>
            )}
          />
        </Accordion>
      </section>
    </section>
  );
}
