import { Product } from '@/types/product.type';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}
