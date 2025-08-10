'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import productImg from '../../assets/img.jpg';

type ProductItemProps = {
  product: {
    id: number,
    title: string;
    price: string | number;
    description: string;
    rating: {
      rate: number,
      count: number
    };
    category: string;
    image?: string
  };
};

export const ProductItem = ({ product, image }: ProductItemProps): JSX.Element => {
  return (
    <div
      tabIndex={0}
      className='
        p-5 flex flex-col rounded-lg shadow-md cursor-pointer
        border border-[var(--text-gray)] hover:border-[var(--btn-hover)]
        transition-colors duration-200'
    >
      <div className='mb-[10px] relative rounded-lg max-w-[260px] max-h-[260px] overflow-hidden'>
        <Image
            src={image}
            alt={product.category}
            width={100}
            height={100}
            className='m-auto'
        />
      </div>
      <h3 className='mb-[10px] text-[20px] text-xl font-normal'>{product.title}</h3>
      <p className='text-left mb-1 text-[16px]'>{product.price} ₴</p>
      <p className='text-left mb-1 text-[16px] color-var(--text-gray)'>{product.category}</p>
    </div>
  );
};
