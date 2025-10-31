import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import React from 'react';

type BreadcrumbsProps = {
  category?: string;
  productName?: string;
  title?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productName, title }) => {

  return (
    <nav className='flex items-center ps-3 text-xs text-gray-700 mb-6 gap-2'>
      <Link
        href='/'
        className='text-black hover:underline flex items-center gap-1 pt-1'
      >
        <ReactSVG src='/home.svg' className='w-4 h-4 mr-2' />
        Головна
      </Link>
      {category && (
        <>
          <ReactSVG src='/chevron-right.svg' className='w-3 h-3' />
          <Link
            href={`/?category=${encodeURIComponent(category)}`}
            className='text-gray-500 capitalize pt-1'
          >
            {category}
          </Link>
        </>
      )}
      {productName && (
        <>
          <ReactSVG src='/chevron-right.svg' className='w-3 h-3' />
          <span className='text-gray-400 pt-1'>{productName}</span>
        </>
      )}
      {title && (
        <>
          <ReactSVG src='/chevron-right.svg' className='w-3 h-3' />
          <span className='text-gray-400 pt-1'>{title}</span>
        </>
      )}
    </nav>
  );
};
