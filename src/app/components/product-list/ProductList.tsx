'use client';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductItem } from "../product-item/ProductItem";
import { Product } from '@/types/product.type';
import { createSelector } from 'reselect';
import { CSSTransition } from 'react-transition-group';
import Spinner from "@/app/components/spinner/spinner";
import {fetchProducts} from "@/app/components/product-list/productsSlice";
import {categoryImages} from "@/app/assets/imagesMap";

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = () => {

    const productsSelector = createSelector(
        (state) => state.products.products,
        (products: Product[]) => {
            return products;
        }
    );

    const productsList = useSelector(productsSelector);
    const productsLoadingStatus = useSelector((state) => state.products.productsLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        // eslint-disable-next-line
    }, []);

    if (productsLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (productsLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Помилка загрузки</h5>;
    }

    const renderProductsList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition timeout={0} classNames='hero'>
                    <h5 className='text-center mt-5'>Продуктів немає</h5>
                </CSSTransition>
            );
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames='hero'>
                    <ProductItem product={{ ...props }}
                                 image={categoryImages[props.category]}/>
                </CSSTransition>
            );
        });
    };

    const elements = renderProductsList(productsList);

    return (
     <div className='flex justify-center gap-8  ml-[50px]'>
       <div className='ml-[20px] grid grid-cols-3 gap-4 justify-items-center'>
           {elements}
       </div>
     </div>
   );

 };








