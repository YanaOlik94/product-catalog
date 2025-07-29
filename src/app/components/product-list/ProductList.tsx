'use client';

import { ProductItem } from "../product-item/ProductItem";
import React from "react";
import { Filters } from "@/app/components/filters/Filters";
const items = [
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
  {
    name: 'Чай Lovare',
    price: '100',
    rating: '4',
    category: 'чаї',
  },
];
export const ProductList: React.FC = () => {
  return (
      <div className="flex gap-8 pt-[150px] pb-[100px] ml-[50px]">
        <Filters />
          <div className='flex-1 w-full max-w-[1000px] ml-[20px] grid grid-cols-3 gap-2 justify-items-center'>
            {items.map((item, index) => (
                <ProductItem key={index} product={{ ...item, image: '/img.jpg' }} />
            ))}
        </div>
    </div>
  );
};
