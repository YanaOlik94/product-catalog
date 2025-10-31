'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/app/components/product-detail/productSlice';
import { RootState } from '@/app/store';
import Image from 'next/image';
import Spinner from '@/app/components/spinner/spinner';
import { AddToCartButton } from '../buttons';
import { ProductSlider } from '../product-slider/ProductSlider';
import { Breadcrumbs } from '../breadcrumbs/Breadcrumbs';

export const ProductDetailPage = () => {

  const params = useParams();
  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;


  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.product.productLoadingStatus );
  const product = useSelector((state: RootState) => state.product.product);


  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [dispatch, productId]);

  if (loading || !product) return <Spinner />;

  return (
    <div className='pt-[130px] max-w-5xl mx-auto'>
      <Breadcrumbs productName={product.title} category={product.category} />
      <div className='mt-[70px]'>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title || 'Product image'}
            width={300}
            height={350}
            className='rounded-md object-contain p-3 xl:float-left lg:float-left md:float-none xl:mr-10 lg:mr-10 md:m-auto sm:m-auto'
          />
        ) : (
          <div className='w-[300px] h-[350px] bg-gray-100 rounded-md flex items-center justify-center text-gray-400'>
            No image
          </div>
        )}
        <div className='p-12'>
          <h2 className='xl:text-3xl lg:text-3xl md:text-3xl sm:text-2xl font-bold mb-4'>
            {product.title}
          </h2>
          <p className='text-m mb-2 text-gray-600 font-semibol'>
            {product.description}
          </p>
          <p className='text-2xl font-semibol text-black font-bold mb-4 mt-4'>
            ${product.price}
          </p>
          <p className='mt-2 text-sm text-gray-600 font-semibold'>
            Категорія: {product.category}
          </p>
          <p className='mt-2 text-sm text-gray-600 font-semibold'>
            Рейтинг: {product.rating.rate} ({product.rating.count} оцінок)
          </p>
          <div className='w-[50%] mt-8 float-left'>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <ProductSlider product={product} />
    </div>
  );
};
