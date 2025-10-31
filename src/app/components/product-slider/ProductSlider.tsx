'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { ProductItem } from '../product-item/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/components/product-list/productsSlice';
import { RootState } from '@/app/store'; 
import { useEffect, useRef } from 'react';
import Spinner from '../spinner/spinner';
import 'swiper/css';
import { Product } from '@/types/product.type';
import { Navigation } from 'swiper/modules';
import { SliderButtons } from '../buttons';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  product: Product;
};

export const ProductSlider: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const productsLoadingStatus = useSelector(
    (state: RootState) => state.products.productsLoadingStatus
  );

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
