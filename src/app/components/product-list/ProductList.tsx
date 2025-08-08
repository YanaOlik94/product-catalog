'use client';

import React from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from "../product-item/ProductItem";
import { Filters } from '@/app/components/filters/Filters';
import { Product } from '@/types/product.type';
import { createSelector } from 'reselect';
import { fetchProducts } from '../../actions';


type Props = {
  products: Product[];
};


export const ProductList: React.FC<Props> = () => {

   return (
     <div className='flex justify-center gap-8 pt-[150px] pb-[100px] ml-[50px]'>
       {/* <Filters /> */}
       <div className='ml-[20px] grid grid-cols-3 gap-4 justify-items-center'>
         {products.map((product, index) => (
           <ProductItem
             key={index}
             product={{ ...product, image: '/img.jpg' }}
           />
         ))}
       </div>
     </div>
   );

 };








