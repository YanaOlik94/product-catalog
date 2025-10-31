import React from 'react';
import { ReactSVG } from 'react-svg';
import { SearchLink } from '../search-link/SearchLink';
import clsx from 'clsx';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
}) => {
  const lastPage = Math.ceil(total / +perPage);
  const allPagesCount = Math.ceil(total / +perPage);

  function getFromPage() {
    let from = 1;
    if (currentPage > 3) {
      from = currentPage - 1;
      if (currentPage + 2 > allPagesCount) {
        from = allPagesCount - 3;
      }
    }
    return Math.max(1, from);
  }

  function getToPage() {
    let to = allPagesCount;
    if (currentPage + 2 < allPagesCount) {
      to = currentPage + 1;
      if (currentPage < 3) {
        to = 4;
      }
    }
    return Math.min(allPagesCount, to);
  }


  const fromPage = getFromPage();
  const toPage = getToPage();

  const currentPageNumbers = getNumbers(
    fromPage,
    toPage,
  );

  return (
    <div className='xl:col-span-4 lg:col-span-4 md:col-span-3  sm:col-span-1 w-full flex justify-center gap-3 mt-7'>
      <SearchLink params={{ page: (currentPage - 1).toString() }}>
        <button
          className='pagination-arrow border border-[var(--text-gray)] p-3'
          type='button'
          disabled={currentPage === 1}
        >
          <ReactSVG src='chevron-left.svg' />
        </button>
      </SearchLink>

      {currentPage > 3 && (
        <>
          <SearchLink params={{ page: '1' }} className=''>
            <button className='border-1 h' type='button'>
              1
            </button>
          </SearchLink>

          <p>...</p>
        </>
      )}

      {currentPageNumbers.map((page) => (
        <SearchLink params={{ page: page.toString() }} key={page}>
          <button
            key={page}
            className={clsx('pagination-item', {
              'pagination-item--active': currentPage === page,
            })}
            type='button'
          >
            {page}
          </button>
        </SearchLink>
      ))}

      {currentPage + 2 < allPagesCount && (
        <>
          <p>...</p>

          <SearchLink params={{ page: allPagesCount.toString() }}>
            <button className='border-1' type='button'>
              {allPagesCount}
            </button>
          </SearchLink>
        </>
      )}

      <SearchLink params={{ page: (currentPage + 1).toString() }}>
        <button
          className='pagination-arrow border border-[var(--text-gray)] p-3'
          type='button'
          disabled={currentPage === lastPage}
        >
          <ReactSVG src='chevron-right.svg' />
        </button>
      </SearchLink>
    </div>
  );
};
