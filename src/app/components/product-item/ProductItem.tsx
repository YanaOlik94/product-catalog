'use client';

import React, { JSX } from 'react';
import Image from 'next/image';


type ProductItemProps = {
  product: {
    name: string;
    price: string;
    category: string;
    image: string;
  };
};

export const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  return (
    <div
      tabIndex={0}
      className='
        w-[300px] p-5 flex flex-col rounded-lg shadow-md cursor-pointer
        border border-[var(--text-gray)] hover:border-[var(--btn-hover)]
        transition-colors duration-200'
    >
      <div className='mb-[10px] relative rounded-lg w-[260px] h-[260px] overflow-hidden'>
        <Image src='/img.jpg' alt='img' width={260} height={260} />
      </div>
      <h3 className='mb-[10px] text-[18px] font-normal leading-6 line-clamp-2'>
        {product.name}
      </h3>
      <p className='text-left mb-1 text-[16px]'>{product.price}</p>
      <p className='text-left mb-1 text-[16px]'>{product.category}</p>
    </div>
  );
};
