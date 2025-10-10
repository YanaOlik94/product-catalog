'use client';

import { ProductList } from '../product-list/ProductList';
import { Filters } from '../filters/Filters';

export const Catalog: React.FC = () => {
  return (
    <div className='grid grid-cols-4 justify-center max-w-7xl m-auto pt-[150px] pb-[100px] pl-[20px] pr-[20px]'>
      <Filters />
      <ProductList />
    </div>
  );
};
