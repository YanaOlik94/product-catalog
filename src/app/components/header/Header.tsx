'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo.png';

export const Header: React.FC = () => {
  return (
    <header className='z-[9990] fixed mx-auto bg-header-bg w-full h-[80px] lg:h-[72px] shadow-xl overflow-visible'>
      <div className='flex items-center py-4 h-[72px]'>
        <Link href='/'>
          <Image
            src={logo}
            alt='Logo'
            className='w-[70px] h-auto p-1 ml-2 border-box'
            priority
          />
        </Link>
        <div className='flex items-center gap-4 ml-6'>
          <Link href='/'>Каталог</Link>
          <Link href='/'>Корзина</Link>
        </div>
      </div>
    </header>
  );
};
