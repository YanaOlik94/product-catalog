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
    <div className='max-w-5xl mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-8'>Ваш кошик</h1>

      <div className='flex flex-col gap-6'>
        {cartItems.map(({ id, product, quantity }) => (
          <div
            key={id}
            className='flex items-center justify-between bg-white shadow rounded-2xl p-4'
          >
            <div className='flex items-center gap-4'>
                <Image
                  src={product.image}
                  alt='Picture of the author'
                  width={100}
                  height={100}
                  />
              <div>
                <h2 className='text-lg font-semibold'>{product.title}</h2>
                <p className='text-gray-600 text-sm'>Ціна: ${product.price}</p>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              {/* Зміна кількості */}
              <div className='flex items-center gap-2 border rounded-lg px-2 py-1'>
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
                className='text-red-500 hover:text-red-700 font-medium'
              >
                Видалити
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
            Всього: <span className='text-green-600'>${total.toFixed(2)}</span>
          </p>
          <button className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700'>
            Перейти до оплати
          </button>
        </div>
      </div>
    </div>
  );
};
