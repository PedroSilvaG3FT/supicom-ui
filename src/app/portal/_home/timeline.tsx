import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PORTAL_SECTION_ID } from "./_data";
import { Timeline } from "@/_core/components/fragments/ui/timeline";

interface ISectionData {
  title: string;
  imageURL: string;
  description: string;
}

export default function PortalTimeline() {
  const t = useTranslations();

  const _buildSection = (data: ISectionData) => (
    <div>
      <h5 className="font-semibold">{data.title}</h5>
      <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
        {data.description}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Image
          width={500}
          height={500}
          alt={data.title}
          src={data.imageURL}
          className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
        />
      </div>
    </div>
  );

  const data = [
    {
      title: "1994",
      containerClassName: `!pt-0`,
      content: _buildSection({
        title: `Fundação da Supicom`,
        imageURL: `https://assets.aceternity.com/templates/startup-1.webp`,
        description: `A Supicom foi fundada com o objetivo de fornecer soluções em fabricação de máquinas para uso industrial, começando com uma pequena linha de produção voltada para o setor madeireiro.`,
      }),
    },
    {
      title: "2007",
      content: _buildSection({
        title: `Expansão e Novas Parcerias`,
        imageURL: `https://assets.aceternity.com/pro/hero-sections.png`,
        description: `Em 2007, a empresa expandiu sua atuação, estabelecendo parcerias estratégicas com indústrias de cerâmica, borracha e perfumaria. Esse foi um marco que solidificou a presença da Supicom no mercado nacional.`,
      }),
    },
    {
      title: t("base.today"),
      content: _buildSection({
        title: `Inovação com Aluguel de Equipamentos`,
        imageURL: `https://assets.aceternity.com/pro/hero-sections.png`,
        description: `Em 2022, a Supicom lançou seu serviço de aluguel de máquinas e equipamentos industriais, oferecendo uma solução flexível e eficiente para empresas que buscam alternativas ao investimento em imobilizado.`,
      }),
    },
  ];

  return (
    <section id={PORTAL_SECTION_ID.aboutUs} className="w-full">
      <section className="app-container">
        <h2 className="mt-4">{t("portal.about_us.title")}</h2>
      </section>

      <Timeline data={data} />
    </section>
  );
}
