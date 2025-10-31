'use client';

import Link from 'next/link';
import Image from 'next/image';
import  logo  from '../../assets/logo.svg';
import { CartIcon } from '../cart-icon/CartIcon';

export const Header: React.FC = () => {
  return (
    <header className='z-[9990] fixed mx-auto bg-white w-full h-[80px] lg:h-[72px] shadow-xl overflow-visible'>
      <div className='flex items-center py-4 px-4 h-[72px]'>
        <Link href='/'>
          <Image
            src={logo}
            alt='Logo'
            className='w-[100px] h-auto p-1 ml-2 border-box'
            priority
          />
        </Link>
        <div className='w-full flex justify-end gap-4 ml-6'>
          <Link href='/cart' className='p-3'>
            <CartIcon />
          </Link>
        </div>
      </div>
    </header>
  );
};
