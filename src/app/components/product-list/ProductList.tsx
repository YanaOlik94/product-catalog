'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from '../product-item/ProductItem';
import { Product } from '@/types/product.type';
import { CSSTransition } from 'react-transition-group';
import Spinner from '@/app/components/spinner/spinner';
import { fetchProducts } from '@/app/components/product-list/productsSlice';
import { categoryImages } from '@/app/assets/imagesMap';
import { RootState } from '@/app/store'; 

export const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const productsLoadingStatus = useSelector(
    (state: RootState) => state.products.productsLoadingStatus
  );

  const { searchQuery, chosenCategories, priceFilter, sortBy } = useSelector(
    (state: RootState) => state.filters
  );

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  if (productsLoadingStatus) {
    return <Spinner />;
  }

  //  Фільтруємо продукти
  const filteredProducts = products
    .filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: Product) => {
      if (!chosenCategories.length || chosenCategories.includes('all'))
        return true;

      return chosenCategories.includes(product.category);
    })
    .filter((product: Product) => {
      if (!priceFilter) return true;
      const { min, max } = priceFilter;
      return product.price >= min && (max === null || product.price <= max);
    })
    .sort((a: Product, b: Product) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      return a.title.localeCompare(b.title);
    });

  // Рендеримо продукти
  const renderProductsList = (arr: Product[]) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} >
          <h5 className='text-center mt-5'>Продуктів немає</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => (
      <CSSTransition key={id} timeout={500}>
          <ProductItem
            product={{ id, ...props }}
          />
      </CSSTransition>
    ));
  };

  const elements = renderProductsList(filteredProducts);

  return (
    <div className='col-span-3 flex justify-center gap-8 ml-[50px]'>
      <div className='ml-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {elements}
      </div>
    </div>
  );
};
