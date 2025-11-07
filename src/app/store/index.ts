import { configureStore } from '@reduxjs/toolkit';
import products from '../components/product-list/productsSlice';
import filters from '../components/filters/filtersSlice';
import product from '../components/product-detail/productSlice';
import cart from '@/app/components/product-cart/ProductCartSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringMiddleware = () => (next: (arg0: { type: string; }) => any) => (action: any) => {
  if (typeof action === 'string') {

    return next({
      type: action,
    });
  }
  return next(action);
};


export const store = configureStore({
  reducer: {products, product, filters, cart},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;