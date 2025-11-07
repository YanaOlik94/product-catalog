'use client';

import React, { FC, JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {
  setSearchQuery,
  setChosenCategories,
  setPriceFilter,
  setSortBy,
  resetFilters,
} from '../filters/filtersSlice';
import {
  CategoryEnum,
  CategoryFilter,
  PriceFilter,
  SortBy,
} from '@/app/types/product.type';

type Props = {
  className?: string;
};

const priceOptions: PriceFilter[] = [
  { min: 0, max: 100 },
  { min: 100, max: 200 },
  { min: 200, max: 400 },
  { min: 400, max: null },
];

export const Filters: FC<Props> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { searchQuery, chosenCategories, priceFilter, sortBy } = useSelector(
    (state: RootState) => state.filters
  );

  const categories = [
    'all',
    ...Object.values(CategoryEnum),
  ] as CategoryFilter[];

  const toggleCategory = (category: CategoryFilter) => {
    if (category === 'all') {
      dispatch(setChosenCategories(['all']));
      return;
    }

    const updated = new Set(chosenCategories);
    updated.delete('all');

    if (updated.has(category)) updated.delete(category);
    else updated.add(category);

    dispatch(setChosenCategories(Array.from(updated)));
  };

  const removePriceFilter = () => {
    dispatch(setPriceFilter(null));
  };

  return (
    <div className='col-span-1 p-6 h-fit border border-[var(--text-gray)] space-y-4'>
      {/* Пошук */}
      <div>
        <label className='block mb-1 font-semibold'>Пошук</label>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className='w-full border border-[var(--text-gray)] px-2 py-2'
        />
      </div>

      {/* Категорії */}
      <div>
        <label className='block mb-1 font-semibold'>Категорії</label>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1  border  border-[var(--text-gray)]cursor-pointer ${
                chosenCategories.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Ціна */}
      <div>
        <label className='block mb-1 font-semibold'>Ціна</label>
        <select
          value={priceFilter ? JSON.stringify(priceFilter) : ''}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) {
              removePriceFilter();
              return;
            }

            try {
              const parsed = JSON.parse(val) as PriceFilter;
              dispatch(setPriceFilter(parsed));
            } catch {
              removePriceFilter();
            }
          }}
          className='w-full border border-[var(--text-gray)] px-2 py-3'
        >
          <option value=''>Усі</option>
          {priceOptions.map((range, index) => {
            const label = range.max
              ? `${range.min} – ${range.max} ₴`
              : `від ${range.min} ₴`;

            return (
              <option key={index} value={JSON.stringify(range)}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      {/* Сортування */}
      <div>
        <label className='block mb-1 font-semibold'>Сортувати за</label>
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value as SortBy))}
          className='w-full border border-[var(--text-gray)] px-2 py-3'
        >
          <option value='name'>За назвою</option>
          <option value='price'>За ціною</option>
          <option value='rating'>За рейтингом</option>
        </select>
      </div>

      {/* Скинути фільтри */}
      <button
        onClick={() => dispatch(resetFilters())}
        className='btn add-btn mt-4'
      >
        Скинути фільтри
      </button>
    </div>
  );
};
