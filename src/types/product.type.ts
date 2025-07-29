
export const enum CategoryEnum {
  Tea = 'tea',
  Coffee = 'coffee',
  Milk = 'milk',
  Confectionery = 'confectionery',
  Default = 'default',
}

export type CategoryFilter = CategoryEnum | 'all' | null;
export type PriceFilter = { min: number; max: number | null };
export type SortBy = 'name' | 'price' | 'rating';

export interface Product {
  name: string;
  price: string | number;
  rating: number;
  category: CategoryEnum[];
  image: string
}

export interface ExtendedProductProps extends Product {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}
