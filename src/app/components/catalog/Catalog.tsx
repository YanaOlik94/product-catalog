'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductList } from '../product-list/ProductList';
import { Filters } from '../filters/Filters';
import { Pagination } from '../pagination/Pagination';

export const Catalog: React.FC = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  
  const totalProducts = 20; 
  const perPage = '10'; 

  return (
    <div className='grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 justify-center  max-w-7xl m-auto pt-[150px] pb-[100px] pl-[20px] pr-[20px]'>
      <Filters />
      <ProductList page={currentPage} perPage={Number(perPage)} />
      <Pagination
        total={totalProducts}
        perPage={Number(perPage)}
        currentPage={currentPage}
      />
    </div>
  );
};
