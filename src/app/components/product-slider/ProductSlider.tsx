'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductItem } from '../product-item/ProductItem';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/app/components/product-list/productsSlice';
import { RootState } from '@/app/store'; 
import { useEffect, useRef } from 'react';
import Spinner from '../spinner/spinner';
import 'swiper/css';
import { Product } from '@/app/types/product.type';
import { Navigation } from 'swiper/modules';
import { SliderButtons } from '../buttons';
import { useAppDispatch } from '@/app/hooks/hooks';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  product: Product;
};

export const ProductSlider: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const productsLoadingStatus = useSelector(
    (state: RootState) => state.products.productsLoadingStatus
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  if (productsLoadingStatus) {
    return <Spinner />;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className='relative mx-auto py-10 my-24 max-w-6xl'>
      <div className='flex justify-between items-center mb-4 mr-4 ml-4'>
        <h2 className='text-3xl font-bold'>Схожі товари</h2>

        <SliderButtons
          prevPage={() => swiperRef.current?.slidePrev()}
          nextPage={() => swiperRef.current?.slideNext()}
        />
      </div>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // зберігаємо swiper instance
        spaceBetween={20}
        slidesPerView={4}
        loop
        modules={[Navigation]}
        breakpoints={{
          375: {
            slidesPerView: 1
          },
          576: {
            slidesPerView: 2
          },
          1600: {
            slidesPerView: 3
          },
        }}
    
        className='rounded-xl'
      >
        {relatedProducts.map(({ id, ...props }) => (
          <SwiperSlide key={id}>
            <ProductItem product={{ id, ...props }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
