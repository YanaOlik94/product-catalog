'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import { AddToCartButton } from '../buttons';
import Link from 'next/link';

type ProductItemProps = {
  product: {
    id: number,
    title: string;
    price: number;
    description: string;
    rating: {
      rate: number,
      count: number
    };
    category: string;
    image: string
  };
};

export const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  return (
    <div
      tabIndex={0}
      className='
        p-5 h-full flex flex-col items-center shadow-md cursor-pointer
        border border-[var(--text-gray)] hover:shadow-(--box-shadow) 
        transition-all duration-200'
    >
      <div className='mb-[10px] relative rounded-lg max-w-[260px] max-h-[260px] overflow-hidden'>
        <Link
          href={`/product/${product.id}`}
          passHref
          className='relative size-40 block'
        >
          <Image
            src={product.image}
            alt='Picture of the author'
            fill={true}
            sizes='(max-width: 1600px) 400px'
          />
        </Link>
      </div>
      <h4 className='mb-[10px] mt-[10px] min-h-[60px] text-[16px] text-base/5 text-left font-normal'>
        {product.title}
      </h4>
      <p className='text-left mb-1 text-[16px]'>${product.price}</p>
      <p className='text-left mb-3 text-[14px] text-gray-400'>
        {product.category}
      </p>
      <AddToCartButton product={product} />
    </div>
  );
};
