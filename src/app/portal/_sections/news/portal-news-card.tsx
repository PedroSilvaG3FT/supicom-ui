"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/_core/components/lib/utils";
import useAppLocale from "@/_shared/hooks/locale.hook";
import AppSafeHTML from "@/_shared/components/app-safe-html";
import { INewsItem } from "@/_shared/interface/news.interface";

interface IProps {
  data: INewsItem;
}

export default function PortalNewsCard(props: IProps) {
  const { data } = props;
  const t = useTranslations();
  const locale = useAppLocale();

  const [title, setTitle] = useState(data.title?.pt ?? "");
  const [content, setContent] = useState(data.content?.pt ?? "");

  useEffect(() => {
    setTitle(data.title[locale]);
    setContent(data.content[locale]);
  }, [locale]);

  return (
    <article className="overflow-hidden rounded bg-background group mobile:snap-center">
      <figure className={cn("h-48 relative overflow-hidden")}>
        <Image
          layout="fill"
          alt={title}
          objectFit="cover"
          src={data.imageBannerURL}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </figure>

      <section className="py-2 px-4 pb-4 flex flex-col">
        <h5 className="mb-4 font-semibold line-clamp-2 overflow-hidden text-ellipsis">
          {title}
        </h5>
        <AppSafeHTML
          html={content}
          className="text-sm mb-4 line-clamp-3 overflow-hidden text-ellipsis"
        />

        <Link
          href={`/portal/noticia/${data.id}`}
          className="flex text-sm items-center font-semibold mt-auto"
        >
          {t("base.see_more")}
          <ArrowRight className="ml-2 sca group-hover:ml-4 transition-all duration-500" />
        </Link>
      </section>
    </article>
  );
}
