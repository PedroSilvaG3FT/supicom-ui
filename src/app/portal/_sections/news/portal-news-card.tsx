import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/_core/components/lib/utils";
import { INewsItem } from "@/_shared/interface/news.interfaces";

interface IProps {
  data: INewsItem;
}

export default function PortalNewsCard(props: IProps) {
  const { data } = props;
  const t = useTranslations();

  return (
    <article className="overflow-hidden rounded bg-background group">
      <figure className={cn("h-48 relative overflow-hidden")}>
        <Image
          layout="fill"
          alt={data.title}
          objectFit="cover"
          src={data.imageBannerURL}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </figure>

      <section className="py-2 px-4 pb-4 flex flex-col">
        <h5 className="mb-4 font-semibold line-clamp-2 overflow-hidden text-ellipsis">
          {data.title}
        </h5>

        <p className="mb-4 line-clamp-3 overflow-hidden text-ellipsis">
          {data.content}
        </p>

        <Link
          href="#"
          target="_blank"
          className="flex text-sm items-center font-semibold mt-auto"
        >
          {t("base.see_more")}
          <ArrowRight className="ml-2 sca group-hover:ml-4 transition-all duration-500" />
        </Link>
      </section>
    </article>
  );
}
