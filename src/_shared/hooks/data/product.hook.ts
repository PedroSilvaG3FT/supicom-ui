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
      title: `Torcedeira Rígida`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/11.jpg`,
      description: `Potência instalada: 240 KW\nTPM MAX: ±900\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `buncher-630-1800`,
      title: `Buncher’s 630 - 1800`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/13.jpg`,
      description: `Potência instalada: 180 KW\nTPM MAX: ±1000\nVelocidade máxima: 200 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `planetaria-1000`,
      title: `Planetária 1000`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/09.jpg`,
      description: `Potência instalada: 95 KW\nTPM MAX: ±1400\nVelocidade máxima: 220 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `desenrolador-duplo`,
      title: `Desenrolador Duplo B630/800/B1000/1250`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/17.jpeg`,
      description: `Potência instalada: 95 KW\nTPM MAX: ±1400\nVelocidade máxima: 220 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `desenrolador-multiplo`,
      title: `Desenrolador Múltiplo 6 Bobinas`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/03.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `desenrolador-vergalhao`,
      title: `Desenrolador Vergalhão`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `bobinador-desbobinador-portal`,
      title: `Bobinador e Desbobinador Portal`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/09.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `multifilar-8-fios`,
      title: `Multifilar de 8 Fios (TM8)`,
      category: getCategoryById(3)!,
      bannerImage: `/images/products/machines/08.jpg`,
      description: `Velocidade máxima: 35 m/s\nPasses máximos: 17\nConfiguração típica: Ø Entrada máx. Ø 0.52 mm / Ø Saída mín. Ø 1.83 mm\nOutras configurações de entrada e saída disponíveis\nMaterial trefilado: cobre/alumínio.`,
      images: [],
    },
    {
      slug: `catterpila-volante`,
      title: `Catterpila e Volante`,
      category: getCategoryById(4)!,
      bannerImage: `/images/mockup.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `sz`,
      title: `SZ`,
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `aplicadores-de-linhas`,
      title: `Aplicadores de Linhas`,
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/10.jpg`,
      description: `Potência instalada: 68 KW\nTPM MAX: ±2200\nVelocidade máxima: 220 m/min\nCabos: rígidos e flexíveis\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `bobinadores`,
      title: `Bobinadores`,
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/11.jpg`,
      description: `Potência instalada: 240 KW\nTPM MAX: ±900\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `desbobinadores`,
      title: `Desbobinadores`,
      category: getCategoryById(5)!,
      bannerImage: `/images/products/machines/13.jpg`,
      description: `Potência instalada: 180 KW\nTPM MAX: ±1000\nVelocidade máxima: 200 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
  ];

  return { categories, products, getCategoryById, getProductyBySlug };
}
