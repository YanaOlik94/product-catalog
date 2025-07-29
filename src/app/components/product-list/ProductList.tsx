'use client';

import { ProductItem } from "../product-item/ProductItem";
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
    <div>

      <div className='w-full max-w-[1200px] mx-auto pt-[150px] grid grid-cols-3 gap-2 justify-items-center'>
        {items.map((item, index) => (
          <ProductItem key={index} product={{ ...item, image: '/img.jpg' }} />
        ))}
      </div>
      
    </div>
  );
};
