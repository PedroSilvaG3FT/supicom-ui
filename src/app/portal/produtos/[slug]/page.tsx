"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Show from "@/_shared/components/app-show";
import Each from "@/_shared/components/app-each";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/_core/components/fragments/button";
import useProductData from "@/_shared/hooks/data/product.hook";
import AppStarsLabel from "@/_shared/components/app-stars-label";
import { Separator } from "@/_core/components/fragments/separator";
import { IProductItem } from "@/_shared/interface/product.interface";
import RequestQuoteButton from "../../_components/request-quote-button";
import AppLoadingIndicator from "@/_shared/components/loading/app-loading-indicator";

export default function ProductDetail() {
  const params = useParams();
  const t = useTranslations();

  const { getProductyBySlug } = useProductData();
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState({} as IProductItem);

  const [gallery, setGallery] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState("");

  const hasProduct = !!Object.keys(product).length;

  useEffect(() => {
    const data = getProductyBySlug(String(params.slug));
    const hasData = !!Object.keys(data).length;

    if (hasData) {
      setProduct(data);
      setCurrentImage(data.bannerImage);
      setGallery([data.bannerImage, ...data.images]);
    }

    setIsLoaded(true);
  }, []);

  return (
    <section className="portal-page-container">
      <Show>
        <Show.When condition={!isLoaded}>
          <section className="min-h-[80dvh] flex flex-col items-center justify-center">
            <AppLoadingIndicator />
            <h3>{t("base.consulting")}...</h3>
          </section>
        </Show.When>

        <Show.When condition={!hasProduct}>
          <section className="min-h-[80dvh] flex flex-col items-center justify-center">
            <Search className="w-12 h-12 mb-4" />
            <h3>{t("portal.product.not_fount")}...</h3>
          </section>
        </Show.When>

        <Show.Else>
          <section>
            <Button asChild variant="link" className="relative left-[-18px]">
              <Link href="/portal/produtos">
                <ArrowLeft className="mr-4" />
                {t("portal.product.see_full_catalog")}
              </Link>
            </Button>

            <section className="mt-3 grid gap-6 lg:grid-cols-2">
              <div>
                <article className="lg:sticky top-24">
                  <Image
                    width={400}
                    height={400}
                    src={currentImage}
                    alt={product?.title}
                    className="mb-4 w-full h-96 object-contain rounded-lg bg-black mobile:h-64"
                  />

                  <Show>
                    <Show.When condition={gallery.length > 1}>
                      <section className="mb-4 grid gap-2 grid-cols-5 mobile:grid-cols-4">
                        <Each
                          data={gallery}
                          render={(item) => (
                            <Image
                              src={item}
                              width={200}
                              height={200}
                              alt={product.title}
                              onClick={() => setCurrentImage(item)}
                              className="object-cover h-20 object-center rounded-md cursor-pointer transition-transform duration-500 hover:scale-95"
                            />
                          )}
                        />
                      </section>
                    </Show.When>
                  </Show>

                  <RequestQuoteButton
                    className="w-full rounded-full"
                    initialProductsSlug={[product.slug]}
                  />
                </article>
              </div>

              <section>
                <h1 className="text-2xl font-semibold">{product.title}</h1>
                <h5 className="text-foreground/60">
                  {product.category?.title}
                </h5>

                <span className="px-4 py-0.5 rounded-full border text-primary text-xs border-primary">
                  {t("base.quality_supicom")}
                </span>

                <AppStarsLabel className="my-2" />
                <Separator className="my-4" />

                <p className="whitespace-pre-line">{product.description}</p>
                <br />
                <p className="font-semibold">{t("base.more_info")}</p>
              </section>
            </section>
          </section>
        </Show.Else>
      </Show>
    </section>
  );
}
