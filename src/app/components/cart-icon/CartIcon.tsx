'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import cart from '../../assets/cart.svg';
import Image from 'next/image';

export const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return (
    <div className='relative'>
        <Image
          src={cart}
          alt='cart'
          className='h-auto w-[32px] p-1 ml-2 border-box'
          priority
        />
    
      {totalCount > 0 && (
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
          {totalCount}
        </span>
      )}
    </div>
  );
};
