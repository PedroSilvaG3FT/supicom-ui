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
    { id: 1, title: "Máquinas para Indústria Madeireira" },
    { id: 2, title: "Máquinas para Indústria Cerâmica" },
    { id: 3, title: "Máquinas para Indústria Gráfica" },
    { id: 4, title: "Aluguel de Máquinas Industriais" },
    { id: 5, title: "Equipamentos de Vigilância" },
  ];

  const products: IProductItem[] = [
    {
      title: `Máquina de Corte de Madeira Industrial`,
      images: [`/images/products/example.jpg`],
      description: `Equipamento de alta precisão para corte de madeira, ideal para marcenarias e serrarias.`,
      bannerImage: `https://images.unsplash.com/photo-1504384308090-c894fdcc538d`,
      category: getCategoryById(1),
      slug: `maquina-corte-madeira-industrial`,
    },
    {
      title: `Prensa Hidráulica para Cerâmica`,
      images: [`/images/products/example.jpg`],
      description: `Prensa de alta capacidade para produção em larga escala de produtos cerâmicos.`,
      bannerImage: `https://images.unsplash.com/photo-1498050108023-c5249f4df085`,
      category: getCategoryById(2),
      slug: `prensa-hidraulica-para-ceramica`,
    },
    {
      title: `Impressora Industrial para Litografia`,
      images: [`/images/products/example.jpg`],
      description: `Impressora de alta qualidade para litografia, utilizada na produção gráfica em grandes volumes.`,
      bannerImage: `/images/products/example.jpg`,
      category: getCategoryById(3),
      slug: `impressora-industrial-litografia`,
    },
    {
      title: `Guindaste Compacto para Aluguel`,
      images: [`/images/products/example.jpg`],
      description: `Guindaste compacto ideal para obras de pequeno e médio porte, disponível para locação.`,
      bannerImage: `https://images.unsplash.com/photo-1504384308090-c894fdcc538d`,
      category: getCategoryById(4),
      slug: `guindaste-compacto-aluguel`,
    },
    {
      title: `Sistema de Vigilância com Câmeras Industriais`,
      images: [`/images/products/example.jpg`],
      description: `Pacote de câmeras de segurança para monitoramento industrial, com suporte a ambientes adversos.`,
      bannerImage: `https://images.unsplash.com/photo-1504384308090-c894fdcc538d`,
      category: getCategoryById(5),
      slug: `sistema-vigilancia-cameras-industriais`,
    },
  ];

  return { categories, products, getCategoryById, getProductyBySlug };
}
