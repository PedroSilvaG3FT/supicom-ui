import {
  IProductItem,
  IProductCategory,
} from "@/_shared/interface/product.interface";
import { useTranslations } from "next-intl";

export default function useProductData() {
  const t = useTranslations();

  const getCategoryById = (id: number) =>
    categories.find((item) => item.id === id) || ({} as IProductCategory);

  const getProductyBySlug = (slug: string) =>
    products.find((item) => item.slug === slug) || ({} as IProductItem);

  const categories: IProductCategory[] = [
    { id: 1, title: t("portal.product.categories.stranders") },
    { id: 2, title: t("portal.product.categories.pay_offs") },
    { id: 3, title: t("portal.product.categories.wire_drawing") },
    { id: 4, title: t("portal.product.categories.caterpillar_capstans") },
    { id: 5, title: t("portal.product.categories.sz_line") },
  ];

  const products: IProductItem[] = [
    {
      slug: `torcedeira-rigida`,
      title: t("portal.product.catalog.torcedeira_rigida.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/11.jpg`,
      description: t("portal.product.catalog.torcedeira_rigida.description"),
      images: [],
    },
    {
      slug: `buncher-630-1800`,
      title: t("portal.product.catalog.buncher_630_1800.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/13.jpg`,
      description: t("portal.product.catalog.buncher_630_1800.description"),
      images: [],
    },
    {
      slug: `desenrolador-duplo`,
      title: t("portal.product.catalog.desenrolador_duplo.title"),
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/18.png`,
      description: t("portal.product.catalog.desenrolador_duplo.description"),
      images: [],
    },
    {
      slug: `bobinador-desbobinador-portal`,
      title: t("portal.product.catalog.bobinador_desbobinador_portal.title"),
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/09.jpg`,
      description: t(
        "portal.product.catalog.bobinador_desbobinador_portal.description"
      ),
      images: [],
    },
    {
      slug: `desenrolador-multiplo`,
      title: t("portal.product.catalog.desenrolador_multiplo.title"),
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/03.jpg`,
      description: t(
        "portal.product.catalog.desenrolador_multiplo.description"
      ),
      images: [],
    },
    {
      slug: `planetaria-1000`,
      title: t("portal.product.catalog.planetaria_1000.title"),
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/19.png`,
      description: t("portal.product.catalog.planetaria_1000.description"),
      images: [],
    },
    {
      slug: `multifilar-8-fios`,
      title: t("portal.product.catalog.multifilar_8_fios.title"),
      category: getCategoryById(3)!,
      bannerImage: `/images/products/machines/08.jpg`,
      description: t("portal.product.catalog.multifilar_8_fios.description"),
      images: [],
    },
    {
      slug: `desenrolador-vergalhao`,
      title: t("portal.product.catalog.desenrolador_vergalhao.title"),
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: t(
        "portal.product.catalog.desenrolador_vergalhao.description"
      ),
      images: [],
    },
    {
      slug: `sz`,
      title: t("portal.product.catalog.enfitadeira.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: t("portal.product.catalog.enfitadeira.description"),
      images: [],
    },
    {
      slug: `aplicadores-de-linhas`,
      title: t("portal.product.catalog.aplicadores_de_linhas.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/14.jpg`,
      description: t(
        "portal.product.catalog.aplicadores_de_linhas.description"
      ),
      images: [],
    },
    {
      slug: `catterpila-volante`,
      title: t("portal.product.catalog.catterpila_volante.title"),
      category: getCategoryById(4)!,
      bannerImage: `/images/mockup.jpg`,
      description: t("portal.product.catalog.catterpila_volante.description"),
      images: [],
    },
    {
      slug: `bobinadores`,
      title: t("portal.product.catalog.bobinadores.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/mockup.jpg`,
      description: t("portal.product.catalog.bobinadores.description"),
      images: [],
    },
    {
      slug: `desbobinadores`,
      title: t("portal.product.catalog.desbobinadores.title"),
      category: getCategoryById(5)!,
      bannerImage: `/images/mockup.jpg`,
      description: t("portal.product.catalog.desbobinadores.description"),
      images: [],
    },
  ];

  return { categories, products, getCategoryById, getProductyBySlug };
}
