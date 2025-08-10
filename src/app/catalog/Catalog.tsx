'use client';

import { ProductList } from "../components/product-list/ProductList";
import { Filters } from '../components/filters/Filters';

export const Catalog: React.FC = () => {
  return (
    <div className='w-full flex justify-center pt-[150px] pb-[100px] pl-[20px] pr-[20px]'>
      <Filters/>
      <ProductList/>
    </div>
  );
};
