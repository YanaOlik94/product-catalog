'use client';

import { ProductList } from "../components/product-list/ProductList";
import { Filters } from '../components/filters/Filters';

export const Catalog: React.FC = () => {
  return (
    <div className='w-full'>
      <Filters/>
      <ProductList/>
    </div>
  );
};
