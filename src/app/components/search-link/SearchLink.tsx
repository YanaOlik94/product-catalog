'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { SearchParams, getSearchWith } from '@/app/helpers/searchHelpers';

type Props = Omit<LinkProps, 'href'> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();


  const newSearch = getSearchWith(searchParams, params);
  const href = newSearch ? `${pathname}?${newSearch}` : pathname;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};