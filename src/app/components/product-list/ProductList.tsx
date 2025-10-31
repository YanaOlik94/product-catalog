'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from '../product-item/ProductItem';
import { Product } from '@/app/types/product.type';
import { CSSTransition } from 'react-transition-group';
import Spinner from '@/app/components/spinner/spinner';
import { fetchProducts } from '@/app/components/product-list/productsSlice';
import { RootState } from '@/app/store';
import { useRouter, useSearchParams } from 'next/navigation';

export const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category');
  const pageParam = searchParams.get('page');

  const [categoryFromUrl, setCategoryFromUrl] = useState<string | null>(null);
  const currentPage = Number(pageParam) || 1;
  const perPage = 10; // ← кількість товарів на сторінці

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

  // Зчитуємо категорію з URL
  useEffect(() => {
    if (categoryParam) {
      setCategoryFromUrl(decodeURIComponent(categoryParam));
    } else {
      setCategoryFromUrl(null);
    }
  }, [categoryParam]);

  // Якщо користувач змінює фільтри — прибираємо category із URL
  useEffect(() => {
    if (
      categoryFromUrl &&
      (chosenCategories.length > 0 || searchQuery || priceFilter)
    ) {
      const newUrl = window.location.pathname;
      router.replace(newUrl);
      setCategoryFromUrl(null);
    }
  }, [chosenCategories, searchQuery, priceFilter, categoryFromUrl, router]);

  if (productsLoadingStatus) {
    return <Spinner />;
  }

  //  Фільтрація + сортування
  const filteredProducts = products
    .filter((product: Product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product: Product) => {
      if (categoryFromUrl) {
        return product.category.toLowerCase() === categoryFromUrl.toLowerCase();
      }

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

  // пагінація — беремо лише ті продукти, що відповідають сторінці
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = filteredProducts.slice(start, end);

  const renderProductsList = (arr: Product[]) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0}>
          <h5 className='text-center mt-5'>Продуктів немає</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => (
      <CSSTransition key={id} timeout={500}>
        <ProductItem product={{ id, ...props }} />
      </CSSTransition>
    ));
  };

  return (
    <div className='xl:col-span-3 lg:col-span-3 md:col-span-2 sm:col-span-1'>
      <div className='grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {renderProductsList(paginatedProducts)}
      </div>
    </div>
  );
};
