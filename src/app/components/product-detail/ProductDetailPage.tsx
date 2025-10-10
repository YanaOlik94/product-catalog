'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '@/app/components/product-detail/productSlice';
import { RootState } from '@/app/store';
import Image from 'next/image';
import Spinner from '@/app/components/spinner/spinner';

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
    <div className='p-8 max-w-4xl mx-auto'>
      <div className='flex gap-8'>
         <Image
            src={product.image}
            alt='Picture of the author'
            width={100}
            height={100}
          />
      <div>
          <h2 className='text-3xl font-bold mb-4'>{product.title}</h2>
          <p className='text-lg mb-2 text-gray-700'>{product.description}</p>
          <p className='text-xl font-semibold text-green-600'>
            ${product.price}
          </p>
          <p className='mt-2 text-sm text-gray-500'>
            Рейтинг: {product.rating.rate} ({product.rating.count} оцінок)
          </p>
        </div>
      </div>
    </div>
  );
};
