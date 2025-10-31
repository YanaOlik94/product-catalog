'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeQuantity,
  removeFromCart,
  clearCart,
} from './ProductCartSlice';
import { RootState } from '@/app/store';
import Image from 'next/image';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';


export const ProductCart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);


  // Підрахунок загальної суми
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className='p-10 text-center text-gray-600 text-lg'>
         Ваш кошик порожній
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto pt-[130px] pr-5 pl-5 pb-10'>
      <Breadcrumbs title='Корзина' />

      <div className='flex flex-col gap-6'>
        {cartItems.map(({ id, product, quantity }) => (
          <div
            key={id}
            className='flex items-center justify-between flex-col gap-3 sm:flex-row border border-[var(--text-gray)] -2xl p-4'
          >
            <div className='flex items-center justify-start gap-4'>
              <Image
                src={product.image}
                alt='Picture of the author'
                width={100}
                height={100}
              />
              <div>
                <h2 className='xl:text-lg lg:text-lg md:text-lg sm:text-sm font-semibold'>
                  {product.title}
                </h2>
                <p className='text-gray-600 text-sm'>Ціна: ${product.price}</p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              {/* Зміна кількості */}
              <div className='flex items-center gap-2 border border-[var(--text-gray)] -lg px-2 py-1'>
                <button
                  onClick={() =>
                    dispatch(
                      changeQuantity({
                        id,
                        quantity: Math.max(1, quantity - 1),
                      })
                    )
                  }
                  disabled={quantity <= 1}
                  className='text-lg font-bold px-2 disabled:text-gray-400'
                >
                  −
                </button>
                <span className='w-6 text-center'>{quantity}</span>
                <button
                  onClick={() =>
                    dispatch(changeQuantity({ id, quantity: quantity + 1 }))
                  }
                  className='text-lg font-bold px-2'
                >
                  +
                </button>
              </div>

              {/* Дії з товаром */}
              <button
                onClick={() => dispatch(removeFromCart(id))}
                className='text-gray-500 hover:text-black-700 font-medium'
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-between mt-10'>
        <button
          onClick={() => dispatch(clearCart())}
          className='text-gray-500 hover:text-gray-700 underline'
        >
          Очистити кошик
        </button>

        <div className='text-right'>
          <p className='text-xl font-semibold mb-3'>
            Всього:{' '}
            <span className='text-2xl font-semibol text-black font-bold'>
              ${total.toFixed(2)}
            </span>
          </p>
          <button className='btn add-btn mt-5'>Перейти до оплати</button>
        </div>
      </div>
    </div>
  );
};
