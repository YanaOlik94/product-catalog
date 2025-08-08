import { createReducer } from '@reduxjs/toolkit';

import {
  productsFetching,
  productsFetched,
  productsFetchingError
} from '../actions';

const initialState = {
  products: [],
  productsLoadingStatus: 'idle',
};

const products = createReducer(
  initialState,
  {
    [productsFetching]: (state) => {
      state.productsLoadingStatus = 'loading';
    },
    [productsFetched]: (state, action) => {
      state.productsLoadingStatus = 'idle';
      state.products = action.payload;
    },
    [productsFetchingError]: (state) => {
      state.productsLoadingStatus = 'error';
    },
  },
  [],
  (state) => state
);

export default products;