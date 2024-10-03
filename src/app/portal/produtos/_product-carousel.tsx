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
import { useTranslations } from "next-intl";

export default function ProductCarousel() {
  const t = useTranslations();
  const plugin = useRef(Autoplay({ delay: 4500 }));

  const items = [
    {
      title: t("portal.product.banner_01_title"),
      description: t("portal.product.banner_01_description"),
      containerClassName: `bg-banner-gradient mobile:bg-primary`,
      contentClassName: `text-white`,
    },
    // {
    //   contentClassName: ``,
    //   containerClassName: `bg-banner-glass`,
    //   title: t("portal.product.banner_02_title"),
    //   description: t("portal.product.banner_02_description"),
    // },
    {
      contentClassName: `text-white`,
      containerClassName: `bg-banner-arrow`,
      title: t("portal.product.banner_03_title"),
      description: t("portal.product.banner_03_description"),
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
