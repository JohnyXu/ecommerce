import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface IProduct {
  _id: string;
  name: string;
  slug: ISanitySlug;
  price: number;
  details: string;
  image: SanityImageSource[];
}

export interface IBanner {
  _id: string;
  buttonText: string;
  image: SanityImageSource;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
}
