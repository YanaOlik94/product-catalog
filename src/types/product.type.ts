
export const enum CategoryEnum {
  Tea = 'tea',
  Coffee = 'coffee',
  Milk = 'milk',
  Сonfectionery = 'confectionery',
  Default = 'default',
}

export interface Product {
  name: string;
  price: string | number;
  rating: number;
  category: CategoryEnum[];
}

export interface ExtendedProductProps extends Product {
  isSelected?: boolean;
  onToggleDescription?: () => void;
}
