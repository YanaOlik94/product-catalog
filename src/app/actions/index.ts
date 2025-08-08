import { createAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { Product } from '@/types/product.type';

type RequestFn = (url: string) => Promise<Product[]>;

export const fetchProducts =
  (request: RequestFn) => (dispatch: AppDispatch) => {
    dispatch(productsFetching());
    request('https://fakestoreapi.com/products')
      .then((data) => dispatch(productsFetched(data)))
      .catch(() => dispatch(productsFetchingError()));
  };

// екшени з типами
export const productsFetching = createAction('PRODUCTS_FETCHING');

export const productsFetched = createAction<Product[]>('PRODUCTS_FETCHED');

export const productsFetchingError = createAction('PRODUCTS_FETCHING_ERROR');
