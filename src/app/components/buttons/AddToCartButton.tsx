import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../product-cart/ProductCartSlice';
import { Product } from '@/types/product.type';
import { RootState } from '@/app/store'; 

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const isInCart = cartItems.some((item: any) => item.id === product.id);
  const clazz = isInCart ? 'add-btn--selected' : 'add-btn';

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${clazz}`}
    >
      {isInCart ? 'У кошику' : 'Додати у кошик'}
    </button>
  );
};
