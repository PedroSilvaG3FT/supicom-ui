"use client";

import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/_core/components/fragments/carousel";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Each from "@/_shared/components/app-each";
import { cn } from "@/_core/components/lib/utils";

export default function ProductCarousel() {
  const plugin = useRef(Autoplay({ delay: 4500 }));

  const items = [
    {
      containerClassName: `bg-banner-gradient mobile:bg-primary`,
      title: `Inovações\npara sua empresa`,
      description: `Explore as últimas máquinas e equipamentos\nque vão revolucionar sua linha de produção!`,
      contentClassName: `text-white`,
    },
    {
      containerClassName: `bg-banner-glass`,
      title: `Flexibilidade\npara o Seu Negócio`,
      description: `Tenha acesso aos melhores equipamentos quando precisar.\nAlugue com facilidade e eficiência!`,
      contentClassName: ``,
    },
    {
      containerClassName: `bg-banner-arrow`,
      title: `Parcerias\nque Geram Resultados`,
      description: `Descubra como nossas soluções podem agregar valor ao seu negócio.\nJuntos, somos mais fortes!`,
      contentClassName: `text-white`,
    },
  ];

  return (
    <Carousel className="w-full" plugins={[plugin.current]}>
      <CarouselContent>
        <Each
          data={items}
          render={(item) => (
            <CarouselItem>
              <article
                className={cn(
                  "product-banner__container",
                  item.containerClassName
                )}
              >
                <section
                  className={cn(
                    "product-banner__content",
                    item.contentClassName
                  )}
                >
                  <h2 className="product-banner__title">{item.title}</h2>
                  <p className="product-banner__description">
                    {item.description}
                  </p>
                </section>
              </article>
            </CarouselItem>
          )}
        />
      </CarouselContent>

      <article className="mt-6 flex justify-center items-center gap-2 md:justify-end">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </article>
    </Carousel>
  );
}
