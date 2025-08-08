
export const enum CategoryEnum {
  MensClothing = 'men\'s clothing',
  Coffee = 'coffee',
  Milk = 'milk',
  Confectionery = 'confectionery',
  Default = 'default',
}

export type CategoryFilter = CategoryEnum | 'all' | null;
export type PriceFilter = { min: number; max: number | null };
export type SortBy = 'name' | 'price' | 'rating';

export interface Product {
  id: number,
  title: string;
  price: string | number;
  description: string;
  rating: {
    rate: number,
    count: number
  };
  category: string;
  image?: string
};

export interface ExtendedProductProps extends Product {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}
