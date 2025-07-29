import { CategoryEnum } from '@/types/product.type';

export interface PropsFilters {
  setIsSettingOpen: (isOpen: boolean) => void;
}
export interface PropsFilterPanel {
  selectedCategories: string[];
  selectedPriceRange: string[];
  selectedCategoryButtons: React.ReactElement[];
  selectedDistanceButtons: React.ReactElement[];
}
export type ExtendedCategoryFilter = CategoryEnum | 'all' | null;
export type PriceFilter = { min: number; max: number | null };

export interface FilterStore {
  choosenCategories: ExtendedCategoryFilter[];
  priceFilter: PriceFilter;
  searchQuery: string;
  sortBy: 'name' | 'price' | 'rating';
}
export interface PriceItem {
  title: string;
  value: string | number;
}
export interface CategoryItem {
  title: string;
}
