'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo.jpg';

export const Header: React.FC = () => {
  return (
    <header className='z-[9990] fixed mx-auto bg-header-bg w-full h-[80px] lg:h-[72px] shadow-xl overflow-visible'>
      <div className='flex items-center py-4 h-[72px]'>
        <Link href='/'>
          <Image
            src={logo}
            alt='Logo DoGood'
            className='w-[70px] h-auto'
            priority
          />
        </Link>
        <h2 className='text-center w-5/6 text-3xl'>Каталог</h2>
      </div>
    </header>
  );
};
