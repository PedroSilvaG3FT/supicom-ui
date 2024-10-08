import {
  IProductItem,
  IProductCategory,
} from "@/_shared/interface/product.interface";

export default function useProductData() {
  const getCategoryById = (id: number) =>
    categories.find((item) => item.id === id) || ({} as IProductCategory);

  const getProductyBySlug = (slug: string) =>
    products.find((item) => item.slug === slug) || ({} as IProductItem);

  const categories: IProductCategory[] = [
    { id: 1, title: `Bunchers` },
    { id: 2, title: `Desenroladores` },
    { id: 3, title: `Multifilares` },
  ];

  const products: IProductItem[] = [
    {
      slug: `torcedeira-rigida`,
      title: `Torcedeira Rigida`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/11.jpg`,
      description: `Potência instalada: 240 KW\nTPM MAX: ±900\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `buncher-1600`,
      title: `Buncher’s 630 - 1800`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/13.jpg`,
      description: `Potência instalada: 180 KW\nTPM MAX: ±1000\nVelocidade máxima: 200 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `buncher-1250`,
      title: `Desbobinador e Bobinador Portal`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/09.jpg`,
      description: `Potência instalada: 95 KW\nTPM MAX: ±1400\nVelocidade máxima: 220 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    {
      slug: `desenrolador-duplo`,
      title: `Desenrolador duplo`,
      category: getCategoryById(1)!,
      bannerImage: `/images/products/machines/17.jpeg`,
      description: `Potência instalada: 95 KW\nTPM MAX: ±1400\nVelocidade máxima: 220 m/min\nCabos: rígidos, flexíveis e PP\nVariável em função do cabo e processo.`,
      images: [],
    },
    // {
    //   slug: `buncher-1000`,
    //   title: `Buncher 1000`,
    //   category: getCategoryById(1)!,
    //   bannerImage: `/images/products/machines/10.jpg`,
    //   description: `Potência instalada: 68 KW\nTPM MAX: ±2200\nVelocidade máxima: 220 m/min\nCabos: rígidos e flexíveis\nVariável em função do cabo e processo.`,
    //   images: [],
    // },
    // {
    //   slug: `buncher-800`,
    //   title: `Buncher 800`,
    //   category: getCategoryById(1)!,
    //   bannerImage: `/images/products/machines/04.jpg`,
    //   description: `Potência instalada: 42 KW\nTPM MAX: ±3400\nVelocidade máxima: 350 m/min\nCabos: rígidos e flexíveis\nVariável em função do cabo e processo.`,
    //   images: [],
    // },
    // {
    //   slug: `buncher-630`,
    //   title: `Buncher 630`,
    //   category: getCategoryById(1)!,
    //   bannerImage: `/images/products/machines/03.jpg`,
    //   description: `Potência instalada: 20 KW\nTPM MAX: ±5000\nVelocidade máxima: 400 m/min\nVariável em função do cabo e processo.`,
    //   images: [],
    // },
    {
      slug: `enfitadeira`,
      title: `Enfitadeira`,
      category: getCategoryById(2)!,
      bannerImage: `/images/products/machines/07.jpg`,
      description: `Potência instalada: 7.5 KW\nVelocidade máxima: 300 m/min\nBobinas: Ø 800 / Ø 630.`,
      images: [],
    },
    {
      slug: `multifilar-8-fios`,
      title: `Multifilar de 8 Fios`,
      category: getCategoryById(3)!,
      bannerImage: `/images/products/machines/08.jpg`,
      description: `Velocidade máxima: 35 m/s\nPasses máximos: 17\nConfiguração típica: Ø Entrada máx. Ø 0.52 mm / Ø Saída mín. Ø 1.83 mm\nOutras configurações de entrada e saída disponíveis\nMaterial trefilado: cobre/alumínio.`,
      images: [],
    },
  ];

  return { categories, products, getCategoryById, getProductyBySlug };
}
