import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/_core/components/lib/utils";
import RequestQuoteButton from "./request-quote-button";
import { Separator } from "@/_core/components/fragments/separator";
import { IProductItem } from "@/_shared/interface/product.interface";

interface IProps {
  data: IProductItem;
}

export default function PortalProductCard(props: IProps) {
  const { data } = props;
  const t = useTranslations();

  return (
    <article className="bg-secondary overflow-hidden rounded group">
      <figure
        className={cn(
          "h-56 flex items-center justify-center relative overflow-hidden"
        )}
      >
        <Image
          layout="fill"
          alt={data.title}
          objectFit="cover"
          src={data.bannerImage}
          className="w-full h-full"
        />

        {data.bannerTitle && (
          <h3 className="z-1 relative w-full text-center font-semibold text-white">
            {data.bannerTitle}
          </h3>
        )}
      </figure>

      <section className="px-4 py-2">
        <span className="px-4 py-0.5 rounded-full border text-primary text-xs border-primary">
          {t("base.quality_supicom")}
        </span>

        <h5 className="font-semibold mt-2 truncate">{data.title}</h5>

        <nav className="flex items-center">
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
          <Star fill="foreground" className="w-4 h-4" />
        </nav>

        <p className="text-sm line-clamp-2 overflow-hidden text-ellipsis mt-4">
          {data.description}
        </p>

        <Link
          href={`/portal/produtos/${data.slug}`}
          className="mt-1 underline font-semibold text-xs text-foreground/60 flex gap-2 items-center"
        >
          {t("base.see_more")}
        </Link>

        <Separator className="my-2" />

        <footer className="flex gap-6 flex-col items-center justify-between pr-2 pb-1.5">
          <RequestQuoteButton
            size="sm"
            variant="link"
            className="pl-0"
            initialProductsSlug={[data.slug]}
          />
        </footer>
      </section>
    </article>
  );
}
