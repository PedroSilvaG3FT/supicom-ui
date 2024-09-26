export interface IProductCategory {
  id: number;
  title: string;
}

export interface IProductItem {
  slug: string;
  title: string;
  images: string[];
  description: string;
  bannerImage: string;
  category: IProductCategory;
}
