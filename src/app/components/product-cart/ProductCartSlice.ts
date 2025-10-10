import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product.type';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const getSavedCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  } catch {
    return [];
  }
};

const initialState: CartState = {
  cartItems: getSavedCart(),
};

const saveToStorage = (items: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
        });
      }

      saveToStorage(state.cartItems);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveToStorage(state.cartItems);
    },

    changeQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveToStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
