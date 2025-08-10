import { configureStore } from '@reduxjs/toolkit';
import products from '../components/product-list/productsSlice';


const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {

    return next({
      type: action,
    });
  }
  return next(action);
};


export const store = configureStore({
  reducer: {products},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',

})

