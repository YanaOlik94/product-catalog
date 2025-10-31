import { Product } from '@/app/types/product.type';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
